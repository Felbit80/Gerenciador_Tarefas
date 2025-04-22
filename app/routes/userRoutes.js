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

module.exports = router;
