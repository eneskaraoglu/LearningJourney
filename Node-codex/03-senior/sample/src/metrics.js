"use strict";

const metrics = {
  success: 0,
  error: 0,
  latency: {
    lt50: 0,
    lt100: 0,
    lt300: 0,
    gte300: 0
  }
};

function bucket(durationMs) {
  if (durationMs < 50) return "lt50";
  if (durationMs < 100) return "lt100";
  if (durationMs < 300) return "lt300";
  return "gte300";
}

function track(statusCode, durationMs) {
  if (statusCode >= 400) metrics.error += 1;
  else metrics.success += 1;
  metrics.latency[bucket(durationMs)] += 1;
}

module.exports = { metrics, track };
