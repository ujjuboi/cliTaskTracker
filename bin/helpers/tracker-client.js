// Has all async functions - Used for taking user input
// Returns all promise objects

import * as readline from 'node:readline/promises';
import { taskCreater, taskReader, formatData, taskDeleter, taskCounter } from "../utils/taskHandler.js";
import { success } from '../constants/task.js';
// import { displayTasks } from "../index.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function addTasks() {
  try {
    const input = await rl.question('- ');
    if (input === 'q') {
      rl.close();
    } else {
      const createStatus = taskCreater(input);
      if (createStatus === success) await addTasks();
      else throw createStatus;
    }
  } catch (err) {
    rl.close();
    return new Error(err);
  }
  return 'Task(s) created successfully.';
};

export async function deleteTasks() {
  try {
    const input = await rl.question(' ');
    if (input === 'q') {
      rl.close();
    } else {
      const totalTasks = await taskCounter();
      if (totalTasks instanceof Error) {
        throw totalTasks;
      }
      if (0 < input && input < totalTasks) {
        const deleteStatus = taskDeleter(input);
        if (deleteStatus === success) await deleteTasks();
        else throw deleteStatus;
      } else {
        throw 'Index not found!';
      }
    }
  } catch (err) {
    rl.close();
    return new Error(err);
  }
  return 'Changes saved.';
};

export async function readTasks(id) {
  try {
    const data = await taskReader(id);
    if (data instanceof Error) {
      throw new Error(data);
    }
    if (data.length === 0) {
      throw new Error("No tasks found!");
    }
    const formattedData = data.map((task) => {
      return formatData(task)
    }).join('\n');
    rl.close();
    return formattedData;
  } catch (err) {
    rl.close();
    return new Error(err);
  }
};

