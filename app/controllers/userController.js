const { Task, tasks } = require("../models/taskModel");

exports.createTask = (req, res) => {
  const { title, description, deadline } = req.body;
  const id = tasks.length + 1;
  const status = "Pendente";

  const newTask = new Task(id, title, description, deadline, status);
  tasks.push(newTask);
};

exports.getTasks = (req, res) => {
  res.render("index", { tasks });
  console.log("Tasks retrieved:", tasks);
};
