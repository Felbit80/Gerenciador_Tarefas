const { Task, tasks } = require("../models/taskModel");

exports.createTask = (req, res) => {
  const { title, description, deadline } = req.body;
  const newTask = new Task(title, description, deadline);
  tasks.push(newTask);
  res.redirect("/");
};

exports.getTasks = (req, res) => {
  const currentDate = new Date();

  tasks.forEach((task) => {
    const deadline = new Date(task.deadline);
    if (currentDate > deadline && task.status !== "Concluída") {
      task.status = "Atrasada";
    } else if (currentDate <= deadline && task.status === "Atrasada") {
      task.status = "Pendente";
    }
  });

  res.render("index", { tasks });
};

exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: "Tarefa deletada com sucesso" });
  } else {
    res.status(404).json({ error: "Tarefa não encontrada" });
  }
};

exports.completeTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { status } = req.body;

  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    task.status = status;
    res.status(200).json({ message: "Tarefa atualizada com sucesso", task });
  } else {
    res.status(404).json({ error: "Tarefa não encontrada" });
  }
};

exports.editTask = (req, res) => {
  const taskId = parseInt(req.body.id);
  const { title, description, deadline } = req.body;

  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    task.title = title;
    task.description = description;
    task.deadline = deadline;
    res.redirect("/");
  } else {
    res.status(404).json({ error: "Tarefa não encontrada" });
  }
};

exports.getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ error: "Tarefa não encontrada" });
  }
};