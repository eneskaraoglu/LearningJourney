const cache = new Map();

async function getOrSet(key, ttlMs, loader) {
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.expiresAt > now) return hit.value;

  const value = await loader();
  cache.set(key, { value, expiresAt: now + ttlMs });
  return value;
}

function invalidate(key) {
  cache.delete(key);
}

async function processEmailJob(job) {
  if (!job.to || !job.subject) throw new Error('invalid job payload');
  return { status: 'sent', id: job.id };
}

module.exports = { getOrSet, invalidate, processEmailJob };
