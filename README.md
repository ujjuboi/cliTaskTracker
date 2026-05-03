https://roadmap.sh/projects/task-tracker

# Task Tracker CLI Project

Task Tracker is a project used to track and manage your tasks. In this task, you will build a simple command line interface (CLI) to track what you need to do, what you have done, and what you are currently working on.

This project will help you practice your programming skills, including:

- Working with the filesystem
- Handling user inputs
- Building a simple CLI application

---

# Requirements

The application should run from the command line, accept user actions and inputs as arguments, and store the tasks in a JSON file.

Users should be able to:

- Add tasks
- Update tasks
- Delete tasks
- Mark a task as **in progress**
- Mark a task as **done**
- List all tasks
- List all completed tasks
- List all pending tasks
- List all in-progress tasks

---

# Constraints

Use the following constraints while implementing the project:

- You can use any programming language
- Use positional arguments in the command line
- Store tasks in a JSON file in the current directory
- Create the JSON file automatically if it does not exist
- Use the native filesystem module of your language
- Do not use external libraries or frameworks
- Handle errors and edge cases gracefully

---

# Example Commands

```bash
# Add a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Update a task
task-cli update 1 "Buy groceries and cook dinner"

# Delete a task
task-cli delete 1

# Mark task as in progress
task-cli mark-in-progress 1

# Mark task as done
task-cli mark-done 1

# List all tasks
task-cli list

# List tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```

---

# Task Properties

Each task should contain the following properties:

| Property      | Description                              |
| ------------- | ---------------------------------------- |
| `id`          | Unique identifier for the task           |
| `description` | Short description of the task            |
| `status`      | `todo`, `in-progress`, or `done`         |
| `createdAt`   | Date and time when task was created      |
| `updatedAt`   | Date and time when task was last updated |

Make sure these fields are added when a task is created and updated whenever the task changes.

---

# Getting Started

## 1. Set Up Your Development Environment

Choose a language you are comfortable with, such as:

- Python
- JavaScript
- Java
- Go
- C#

Install a code editor or IDE such as:

- VSCode
- PyCharm
- IntelliJ IDEA

---

## 2. Project Initialization

Create a project folder and initialize Git.

```bash
mkdir task-tracker
cd task-tracker
git init
```

---

## 3. Implement Features

Build the project step by step:

1. Parse command line arguments
2. Create and load the JSON file
3. Add task functionality
4. List tasks
5. Update tasks
6. Delete tasks
7. Mark tasks as in-progress
8. Mark tasks as done
9. Filter tasks by status

---

## 4. Testing and Debugging

Test every feature carefully:

- Verify commands work correctly
- Check JSON data is stored properly
- Test invalid IDs
- Test missing arguments
- Test empty descriptions
- Ensure timestamps update correctly

---

## 5. Finalizing the Project

Before completion:

- Ensure all features work
- Refactor messy code
- Add comments where needed
- Improve error messages
- Write a proper `README.md` file

---

# Suggested JSON Structure

```json
[
  {
    "id": 1,
    "description": "Buy groceries",
    "status": "todo",
    "createdAt": "2026-04-19T10:00:00Z",
    "updatedAt": "2026-04-19T10:00:00Z"
  }
]
```

---

# Skills You Will Learn

By completing this project, you will improve your knowledge of:

- Command line applications
- File handling
- JSON storage
- Input validation
- Error handling
- CRUD operations
- Clean code structure

---

# Possible Future Improvements

Once completed, you can extend the project with:

- Due dates
- Priority levels
- Search tasks
- Categories/tags
- Colored terminal output
- Export to CSV
- SQLite database storage
- Interactive CLI menus

---

# Outcome

By the end of this project, you will have developed a practical task management CLI tool that can be used personally or shared with others.

It also builds a strong foundation for more advanced software projects and real-world development.

---

# Happy Coding 🚀
