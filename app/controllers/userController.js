const { Task, tasks } = require("../models/taskModel");

exports.createTask = (req, res) => {
  const { title, description, deadline } = req.body;
  const id = tasks.length + 1;
  const status = "Pendente";

  const newTask = new Task(title, description, deadline, status);
  tasks.push(newTask);

  res.redirect("/");
};

exports.getTasks = (req, res) => {
  res.render("index", { tasks });
  console.log("Tasks retrieved:", tasks);
};

exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    console.log(`Task with ID ${id} deleted.`);
    res.status(200).json({ message: "Tarefa deletada com sucesso" });
  } else {
    console.log(`Task with ID ${id} not found.`);
    res.status(404).json({ error: "Tarefa não encontrada" });
  }
};