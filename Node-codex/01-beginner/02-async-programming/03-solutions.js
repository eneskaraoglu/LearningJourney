"use strict";

// Asynchronous Programming in Node.js - Reference Solution

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateFetch(name, ms, failRate = 0) {
  await wait(ms);
  if (Math.random() < failRate) {
    throw new Error(`${name.toUpperCase()}_FETCH_FAILED`);
  }
  return { name, loadedAt: new Date().toISOString() };
}

async function loadSequential() {
  const started = Date.now();
  const user = await simulateFetch("user", 80);
  const orders = await simulateFetch("orders", 120);
  const profile = await simulateFetch("profile", 100);
  return { durationMs: Date.now() - started, data: { user, orders, profile } };
}

async function loadParallel() {
  const started = Date.now();
  const user = await simulateFetch("user", 80);
  const [orders, profile] = await Promise.all([
    simulateFetch("orders", 120),
    simulateFetch("profile", 100)
  ]);
  return { durationMs: Date.now() - started, data: { user, orders, profile } };
}

async function withRetry(fn, attempts = 3, backoffMs = 50) {
  let lastError;
  for (let i = 1; i <= attempts; i += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < attempts) await wait(backoffMs * i);
    }
  }
  throw lastError;
}

(async function main() {
  try {
    const seq = await loadSequential();
    const par = await loadParallel();

    console.log("sequential", seq.durationMs, "ms");
    console.log("parallel", par.durationMs, "ms");

    const unstable = await withRetry(() => simulateFetch("analytics", 40, 0.3), 4, 40);
    console.log("unstable-result", unstable);

    const settled = await Promise.allSettled([
      simulateFetch("service-a", 30, 0.2),
      simulateFetch("service-b", 30, 0.2),
      simulateFetch("service-c", 30, 0.2)
    ]);

    const summary = settled.reduce(
      (acc, item) => {
        acc[item.status] += 1;
        return acc;
      },
      { fulfilled: 0, rejected: 0 }
    );
    console.log("settled-summary", summary);
  } catch (error) {
    console.error("async-flow-error", {
      source: "main",
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
})();
