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

router.put("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id); // Obtém o ID da tarefa a ser atualizada
  const { status } = req.body; // Obtém o novo status do corpo da requisição

  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    task.status = status; // Atualiza o status da tarefa
    console.log(`Tarefa com ID ${taskId} atualizada para o status: ${status}`);
    res.status(200).json({ message: "Tarefa atualizada com sucesso", task });
  } else {
    console.log(`Tarefa com ID ${taskId} não encontrada.`);
    res.status(404).json({ error: "Tarefa não encontrada" });
  }
});

module.exports = router;
