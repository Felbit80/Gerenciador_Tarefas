const express = require("express");
const router = express.Router();
const path = require("path");
const { Task, tasks } = require("../models/taskModel");
const userController = require("../controllers/userController");

router.get("/", userController.getTasks);

router.post("/", (req, res) => {
  userController.createTask(req, res);
  res.redirect("/");
});

router.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

router.get("/create-task", (req, res) => {
  res.render("createTask");
});

module.exports = router;
