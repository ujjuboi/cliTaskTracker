import { firstTimeDB } from "../utils/taskHandler.js";
import { flags } from "../constants/task.js";
import chalk from "chalk";
import boxen from "boxen";
import { addTasks, deleteTasks } from "./tracker-client.js";

export function welcomeScreen() {
  const dbCheck = firstTimeDB();
  if (dbCheck instanceof Error) {
    errorDisplayer(dbCheck);
  }
  console.log("Welcome to", chalk.blue.bold("Task Tracker CLI"));
}

export function renderManual() {
  const renderMan = Object.keys(flags).map((flag) => {
    return ("-" + flag + ": " + flags[flag]);
  }).join("\n");
  console.log(
    boxen(renderMan, {
      title: "Manual/Commands",
      titleAlignment: "center",
      padding: 1,
    }),
  );
}

export function displayTasks() {
  readTasks().then((tasks) => {
    if (tasks instanceof Error) {
      errorDisplayer(tasks);
    } else {
      console.log(tasks);
    }
  })
}

function errorDisplayer(error) {
  console.log(chalk.red(error.message));
}

function successDisplayer(message) {
  console.log(chalk.green(message))
}

export function addTaskMode() {
  console.log(
    boxen('Enter you tasks seperated with commas "," type "q" to exit: ', {
      title: "Create Mode",
      titleAlignment: "center",
      padding: 1,
    }),
  );
  addTasks().then((val) =>
    successDisplayer(val)
  ).catch((val) =>
    errorDisplayer(val)
  );
}

export function deleteTaskMode() {
  console.log(
    boxen(
      [
        "Enter the index of the task you want to",
        chalk.redBright("delete"),
        'type "q" to exit: ',
      ].join(" "),
      { title: "Delete Mode", titleAlignment: "center", padding: 1 },
    ),
  );
  deleteTasks().then((val) => successDisplayer(val)).catch((val) => errorDisplayer(val));
}