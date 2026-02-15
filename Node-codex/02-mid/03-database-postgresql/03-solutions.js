const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/learning_journey'
});

async function createUser(name, email) {
  const sql = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING id, name, email';
  const { rows } = await pool.query(sql, [name, email]);
  return rows[0];
}

async function findUserByEmail(email) {
  const { rows } = await pool.query('SELECT id, name, email FROM users WHERE email = $1', [email]);
  return rows[0] || null;
}

module.exports = { createUser, findUserByEmail };
