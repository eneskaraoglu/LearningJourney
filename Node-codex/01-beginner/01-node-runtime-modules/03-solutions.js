// 1) Runtime info
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('Current dir:', process.cwd());

// 2) Math utilities
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return null;
  return a / b;
}

// 3) Sample usage
console.log('add(2, 3) =', add(2, 3));
console.log('subtract(7, 4) =', subtract(7, 4));
console.log('multiply(3, 5) =', multiply(3, 5));
console.log('divide(10, 0) =', divide(10, 0));
