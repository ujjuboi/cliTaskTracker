export const success = "Op successful";

export const flags = {
  a: "add",
  d: "delete",
  m: "mark",
  u: "unmark",
  r: "read",
  w: "update",
};

export const createTaskTable = `CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL,
  status TEXT CHECK(status IN ('todo', 'in-progress', 'done')) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt DATETIME
)`

export const insertQuery = `INSERT INTO tasks (description, status, createdAt) VALUES(?, 'todo', CURRENT_TIMESTAMP)`;

export const readQuery = 'SELECT * FROM tasks WHERE id = ?';
export const readAllQuery = 'SELECT * FROM tasks';

export const deleteQuery = 'DELETE FROM tasks WHERE id = ?';

export const countQuery = 'SELECT COUNT(*) AS total FROM tasks';