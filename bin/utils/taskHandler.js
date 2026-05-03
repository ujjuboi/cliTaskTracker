import { success, countQuery, createTaskTable, deleteQuery, insertQuery, readQuery, readAllQuery } from "../constants/task.js";
import sqlite3 from "sqlite3";
import util from "util";

const db = new sqlite3.Database("bin/notes/oneNote.db", (err) => {
  if (err) {
    return new Error(err.message);
  }
});

const dbGet = util.promisify(db.get).bind(db);

export function firstTimeDB() {
  try {

    db.run(createTaskTable, (err) => {
      if (err) {
        throw new Error('Error creating table:', err.message);
      }
    });
    return success;
  } catch (err) {
    return err;
  }
}

function dbDestructor(db) {
  db.close((err) => {
    if (err) {
      return new Error(err.message);
    }
  });
}

export const taskCreater = (input) => {

  try {
    if (input.includes(",")) {
      input = input.split(",").forEach((task) => {
        db.run(insertQuery, [task.trim()], (err) => {
          if (err) {
            throw new Error('Error creating task:', task, err.message);
          }
        });
      })
    } else {
      db.run(insertQuery, [input], (err) => {
        if (err) {
          throw new Error('Error creating task:', input, err.message);
        }
      });
    }
    return success;
    dbDestructor(db);
  } catch (err) {
    dbDestructor(db);
    return err;
  }
}

export const taskDeleter = (id) => {

  try {
    db.run(deleteQuery, [id], (err, tasks) => {
      if (err) throw err;
      return success;
    });
  } catch (err) {
    return new Error('Error deleting task:', id, err.message);
    dbDestructor(db);
  }
}

export const taskReader = (id) => {
  try {
    if (!id) {
      db.all(readAllQuery, [], (err, tasks) => {
        if (err) throw err;
        return tasks;
      });
    } else {
      db.get(readAllQuery, [id], (err, task) => {
        if (err) throw err;
        return task;
      })
    }
    dbDestructor(db);
  } catch (err) {
    return new Error('Error reading tasks:', err.message);
    dbDestructor(db);
  }
}

export const taskCounter = async () => {
  let total = 0;
  try {
    const result = await dbGet(countQuery);
    total = result?.total;
  } catch (err) {
    throw new Error("No tasks found.");
  } finally {
    dbDestructor(db);
  }
  return total;
}

export function formatData(task) {
  switch (task?.status) {
    case 'todo':
      return `${task?.id}. [ ] ${task?.description.trim()}`;
      break;
    case 'in-progress':
      return `${task?.id}. [-] ${task?.description.trim()}`;
      break;
    case 'done':
      return `${task?.id}. [x] ${task?.description.trim()}`;
      break;
    default:
      return '';
      break;
  }
}