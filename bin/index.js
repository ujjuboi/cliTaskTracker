#! /usr/bin/env node

import fs from "fs/promises";
import { readTasks, deleteTasks } from "./helpers/tracker-client.js";
import { welcomeScreen, renderManual, addTaskMode, deleteTaskMode } from "./helpers/displayers.js";

welcomeScreen();

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
    addTaskMode();
    break;
  case "-r":
    // Make another handler to show count of each task states
    console.log(boxen(['Legend:', chalk.blue('[ ]todo'), chalk.yellow('[-]in-progress'), chalk.green('[x]done')].join(' '), { title: "Read Mode", titleAlignment: "center", padding: 1 }))
    displayTasks();
    break;
  case "-d":
    deleteTaskMode();
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
    renderManual();
    break;
}
