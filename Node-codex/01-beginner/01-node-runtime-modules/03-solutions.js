"use strict";

// Node Runtime and Module System - Reference Solution

function parseNumber(value, label) {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    throw new Error(`INVALID_NUMBER:${label}`);
  }
  return n;
}

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) throw new Error("DIVIDE_BY_ZERO");
    return a / b;
  }
};

function runCli(argv) {
  const appMode = process.env.APP_MODE || "development";
  console.log("runtime", {
    node: process.version,
    platform: process.platform,
    cwd: process.cwd(),
    appMode,
    args: argv
  });

  const [aRaw, bRaw, opRaw] = argv;
  if (!aRaw || !bRaw || !opRaw) {
    console.log("Usage: node 03-solutions.js <a> <b> <operation>");
    console.log("Operations:", Object.keys(operations).join(", "));
    return;
  }

  const op = opRaw.toLowerCase();
  if (!operations[op]) {
    throw new Error(`INVALID_OPERATION:${op}`);
  }

  const a = parseNumber(aRaw, "a");
  const b = parseNumber(bRaw, "b");
  const result = operations[op](a, b);
  console.log(`result => ${a} ${op} ${b} = ${result}`);
}

try {
  runCli(process.argv.slice(2));
} catch (error) {
  console.error("error", { message: error.message });
  process.exitCode = 1;
}
