#! /usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import fs from "fs/promises";
import readline from "readline";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("notes/oneNote.db", (err) => {
  if (err) {
    console.error(err.message);
    return null;
  }
});
const flags = {
  a: "add",
  d: "delete",
  m: "mark",
  u: "unmark",
  r: "read",
  w: "update",
};

console.log("Welcome to", chalk.blue.bold("Task Tracker CLI"));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const addTasks = () => {
  rl.question("- ", (input) => {
    if (input === "q") {
      console.log(chalk.whiteBright.bgBlue("Task(s) created successfully!"));
      return rl.close();
    }
    if (input.includes(",")) {
      input = input
        .split(",")
        .map((task) => task + "-U")
        .join(",");
    } else {
      input += "-U,";
    }
    fs.appendFile("./notes/oneNote.txt", input, (err) => {
      if (err) console.error(chalk.redBright.bgRed(err));
    });
    addTasks();
  });
};

async function readTasks(mode) {
  try {
    let data = await fs.readFile("./notes/oneNote.txt");

    data = data.toString().trim().split(",");
    data.map((task, index) => {
      if (task === "") {
        data.splice(index, 1);
      }
    });
    if (data.length === 0 || data[0] === "") {
      console.log(chalk.whiteBright.bgRedBright("No tasks found!"));
      return rl.close();
    }
    if (mode === "getRawData") return data;
    data = data
      .map((task, i) => {
        const taskState = task.split("-");
        if (taskState[1] === "U") {
          return `${i + 1}. [ ] ${taskState[0].trim()}`;
        } else {
          return `${i + 1}. [x] ${taskState[0].trim()}`;
        }
      })
      .join("\n");
    return data;
  } catch (err) {
    console.error(chalk.redBright.bgRed(err));
  }
}

const deleteTasks = async () => {
  const data = await readTasks("getRawData");
  if (data === undefined) return;
  console.log(await readTasks());
  rl.question("", (input) => {
    if (input === "q") {
      console.log(chalk.whiteBright.bgRedBright("Saved successfully."));
      return rl.close();
    } else if (0 < Number(input) && Number(input) < data.length + 1) {
      data.splice(Number(input) - 1, 1);
      fs.writeFile("./notes/oneNote.txt", data.toString(), (err) => {
        if (err) console.error(chalk.redBright.bgRed(err));
      });
      console.log(chalk.whiteBright.bgRedBright("Task deleted."));
    } else {
      console.error(chalk.redBright("Index not found!"));
    }
    deleteTasks();
  });
};

const markTasks = async () => {
  const data = await readTasks("getRawData");
  if (data === undefined) return;
  console.log(await readTasks());
  rl.question("", (input) => {
    if (input === "q") {
      console.log(chalk.whiteBright.bgBlueBright("Saved successfully."));
      return rl.close();
    } else if (0 < Number(input) && Number(input) < data.length + 1) {
      data[Number(input - 1)] = data[Number(input - 1)].split("-")[0] + "-M";
      fs.writeFile("./notes/oneNote.txt", data.toString(), (err) => {
        if (err) console.error(chalk.redBright.bgRed(err));
      });
      console.log(chalk.whiteBright.bgBlueBright("Marked as done."));
    } else {
      console.error(chalk.redBright("Index not found!"));
    }
    markTasks();
  });
};

const unMarkTasks = async () => {
  const data = await readTasks("getRawData");
  if (data === undefined) return;
  console.log(await readTasks());
  rl.question("", (input) => {
    if (input === "q") {
      console.log(chalk.whiteBright.bgBlueBright("Saved successfully."));
      return rl.close();
    } else if (0 < Number(input) && Number(input) < data.length + 1) {
      data[Number(input - 1)] = data[Number(input - 1)].split("-")[0] + "-U";
      fs.writeFile("./notes/oneNote.txt", data.toString(), (err) => {
        if (err) console.error(chalk.redBright.bgRed(err));
      });
      console.log(chalk.whiteBright.bgBlueBright("Added in the to-do."));
    } else {
      console.error(chalk.redBright("Index not found!"));
    }
    unMarkTasks();
  });
};

const editTasks = async () => {
  const data = await readTasks("getRawData");
  if (data === undefined) return;
  console.log(await readTasks());
  rl.question("", (input) => {
    if (0 < Number(input) && Number(input) < data.length + 1) {
      rl.question("Type in the edits: ", (taskEdit) => {
        data[input - 1] = taskEdit + "-" + data[input - 1].split("-")[1];
        fs.writeFile("./notes/oneNote.txt", data.toString(), (err) => {
          if (err) console.error(chalk.redBright.bgRed(err));
        });
        readTasks().then((val) =>
          console.log(
            boxen(val, {
              title: "After Edit",
              titleAlignment: "center",
              padding: 1,
            }),
          ),
        );
        console.log(chalk.whiteBright.bgBlueBright("Saved successfully."));
        return rl.close();
      });
    } else {
      console.error(chalk.redBright("Index not found!"));
    }
  });
};

switch (process.argv.slice(2)[0]) {
  case "-a":
    console.log(
      boxen('Enter you tasks seperated with commas "," type "q" to exit: ', {
        title: "Create Mode",
        titleAlignment: "center",
        padding: 1,
      }),
    );
    addTasks(rl);
    break;
  case "-r":
    const tasks = await readTasks();
    if (tasks === undefined) tasks = "";
    console.log(
      boxen(tasks, {
        title: "Read Mode",
        titleAlignment: "center",
        padding: 1,
      }),
    );
    rl.close();
    break;
  case "-d":
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
    deleteTasks();
    break;
  case "-m":
    console.log(
      boxen(
        [
          "Enter the index of the task you want to",
          chalk.blueBright("mark"),
          'as done type "q" to exit: ',
        ].join(" "),
        { title: "Mark Mode", titleAlignment: "center", padding: 1 },
      ),
    );
    markTasks();
    break;
  case "-u":
    console.log(
      boxen(
        [
          "Enter the index of the task you want to",
          chalk.greenBright("unmark"),
          'type "q" to exit: ',
        ].join(" "),
        { title: "UnMark Mode", titleAlignment: "center", padding: 1 },
      ),
    );
    unMarkTasks();
    break;
  case "-w":
    console.log(
      boxen(
        [
          "Enter the index of the task you want to",
          chalk.yellowBright("update"),
        ].join(" "),
        { title: "Edit Mode", titleAlignment: "center", padding: 1 },
      ),
    );
    editTasks();
    break;
  default:
    let renderMan = "";
    Object.keys(flags).forEach((item) => {
      renderMan += "-" + item + ": " + flags[item] + "\n";
    });
    console.log(
      boxen(renderMan, {
        title: "Manual/Commands",
        titleAlignment: "center",
        padding: 1,
      }),
    );
    rl.close();
    break;
}
