"use strict";

// Caching and Background Jobs - Reference Solution

const cacheStore = new Map();
const metrics = { cacheHit: 0, cacheMiss: 0, jobsProcessed: 0, jobsFailed: 0, deadLetter: 0 };

async function getOrSet(key, ttlMs, loader) {
  const now = Date.now();
  const hit = cacheStore.get(key);

  if (hit && hit.expiresAt > now) {
    metrics.cacheHit += 1;
    return hit.value;
  }

  metrics.cacheMiss += 1;
  const value = await loader();
  cacheStore.set(key, { value, expiresAt: now + ttlMs });
  return value;
}

function invalidate(key) {
  cacheStore.delete(key);
}

function invalidateProductKeys(productId) {
  invalidate(`product:${productId}`);
  invalidate("products:list");
}

function isTransientError(error) {
  return ["ETIMEDOUT", "ECONNRESET", "TEMP_PROVIDER_DOWN"].includes(error.code);
}

async function processEmailJob(job) {
  if (!job || !job.id || !job.to || !job.subject) {
    const err = new Error("INVALID_JOB_PAYLOAD");
    err.code = "INVALID_JOB_PAYLOAD";
    throw err;
  }

  if (job._sent) return { id: job.id, status: "already-sent" };

  if (job.simulateTransientFailure) {
    const err = new Error("provider temporary down");
    err.code = "TEMP_PROVIDER_DOWN";
    throw err;
  }

  job._sent = true;
  return { id: job.id, status: "sent" };
}

async function runJobWithRetry(job, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const result = await processEmailJob(job);
      metrics.jobsProcessed += 1;
      return result;
    } catch (error) {
      if (attempt < maxAttempts && isTransientError(error)) {
        await new Promise((r) => setTimeout(r, attempt * 50));
        continue;
      }
      metrics.jobsFailed += 1;
      metrics.deadLetter += 1;
      return { id: job.id, status: "dead-letter", reason: error.code || error.message };
    }
  }

  return { id: job.id, status: "dead-letter", reason: "UNKNOWN" };
}

module.exports = {
  metrics,
  getOrSet,
  invalidate,
  invalidateProductKeys,
  processEmailJob,
  runJobWithRetry
};
