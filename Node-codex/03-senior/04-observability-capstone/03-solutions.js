"use strict";

// Observability and Capstone Implementation - Reference Solution

const crypto = require("crypto");

const metrics = {
  success: 0,
  error: 0,
  latencyBuckets: {
    lt50: 0,
    lt100: 0,
    lt300: 0,
    gte300: 0
  }
};

function classifyLatency(durationMs) {
  if (durationMs < 50) return "lt50";
  if (durationMs < 100) return "lt100";
  if (durationMs < 300) return "lt300";
  return "gte300";
}

function requestLogger(req, res, next) {
  const startedAt = Date.now();
  const requestId = req.headers["x-request-id"] || crypto.randomUUID();

  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  res.on("finish", () => {
    const durationMs = Date.now() - startedAt;
    const bucket = classifyLatency(durationMs);

    if (res.statusCode >= 400) metrics.error += 1;
    else metrics.success += 1;
    metrics.latencyBuckets[bucket] += 1;

    console.log(
      JSON.stringify({
        level: res.statusCode >= 500 ? "error" : "info",
        requestId,
        method: req.method,
        path: req.path,
        status: res.statusCode,
        durationMs,
        bucket,
        at: new Date().toISOString()
      })
    );
  });

  next();
}

function metricsHandler(req, res) {
  res.json({
    counters: {
      success: metrics.success,
      error: metrics.error,
      total: metrics.success + metrics.error
    },
    latencyBuckets: metrics.latencyBuckets
  });
}

const capstoneChecklist = {
  project: "Task Management API",
  modules: ["auth", "users", "tasks", "analytics"],
  nonFunctional: ["validation", "tests", "structured-logging", "metrics", "deployment-docs"],
  milestones: [
    "M1: Core auth + users endpoints",
    "M2: Task CRUD + filtering",
    "M3: Observability + test suite",
    "M4: Deployment + runbook"
  ],
  risks: [
    "Scope creep from too many features",
    "Insufficient test coverage on edge cases",
    "Missing environment config parity between local and deployment"
  ]
};

module.exports = { metrics, requestLogger, metricsHandler, capstoneChecklist };
