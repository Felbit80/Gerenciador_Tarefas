const express = require("express");
const router = express.Router();
const path = require("path");
const { Task, tasks } = require("../models/taskModel");
const userController = require("../controllers/userController");

router.get("/", userController.getTasks);

router.post("/", userController.createTask);

router.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

router.get("/create-task", (req, res) => {
  res.render("createTask");
});

router.delete("/api/tasks/:id", userController.deleteTask);

router.put("/api/tasks/:id", userController.completeTask);

router.post("/edit-task/:id", userController.editTask);

router.get("/edit-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    res.render("editTask", { task, taskId });
  } else {
    res.status(404).send("Tarefa não encontrada");
  }
});

module.exports = router;
