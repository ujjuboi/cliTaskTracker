const createTaskTable = `CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL,
  status TEXT CHECK(status IN ('todo', 'in-progress', 'done')) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME
)`
export default createTaskTable;