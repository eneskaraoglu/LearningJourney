"use strict";

// PostgreSQL Integration with node-postgres - Reference Solution

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/learning_journey";
const pool = new Pool({ connectionString });

async function checkConnection() {
  const { rows } = await pool.query("SELECT NOW() AS now");
  return rows[0].now;
}

async function createUser(name, email) {
  const sql = "INSERT INTO users(name, email) VALUES($1, $2) RETURNING id, name, email";
  try {
    const { rows } = await pool.query(sql, [name, email]);
    return rows[0];
  } catch (error) {
    if (error.code === "23505") {
      const err = new Error("EMAIL_EXISTS");
      err.code = "EMAIL_EXISTS";
      throw err;
    }
    throw error;
  }
}

async function findUserByEmail(email) {
  const { rows } = await pool.query("SELECT id, name, email FROM users WHERE email = $1", [email]);
  return rows[0] || null;
}

async function createTask(userId, title) {
  const { rows } = await pool.query(
    "INSERT INTO tasks(user_id, title, done) VALUES($1, $2, false) RETURNING id, user_id, title, done",
    [userId, title]
  );
  return rows[0];
}

async function listTasksByUser(userId) {
  const { rows } = await pool.query(
    "SELECT id, user_id, title, done FROM tasks WHERE user_id = $1 ORDER BY id DESC",
    [userId]
  );
  return rows;
}

async function createUserWithWelcomeTask(input) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const userRes = await client.query(
      "INSERT INTO users(name, email) VALUES($1, $2) RETURNING id, name, email",
      [input.name, input.email]
    );
    const user = userRes.rows[0];

    await client.query(
      "INSERT INTO tasks(user_id, title, done) VALUES($1, $2, false)",
      [user.id, "Welcome task"]
    );

    await client.query("COMMIT");
    return user;
  } catch (error) {
    await client.query("ROLLBACK");
    if (error.code === "23505") {
      const err = new Error("EMAIL_EXISTS");
      err.code = "EMAIL_EXISTS";
      throw err;
    }
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  checkConnection,
  createUser,
  findUserByEmail,
  createTask,
  listTasksByUser,
  createUserWithWelcomeTask
};
