const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'replace-this-in-real-project';

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function generateToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (_) {
    return null;
  }
}

(async function demo() {
  const hash = await hashPassword('P@ssw0rd!');
  console.log('Password ok:', await verifyPassword('P@ssw0rd!', hash));
  const token = generateToken({ id: 7, role: 'user' });
  console.log('Payload:', verifyToken(token));
})();
