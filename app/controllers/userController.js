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
      task.status = "Pendente"; // Opcional: reverte se ainda não concluiu, mas a data ainda vale
    }
  });

  res.render("index", { tasks });
};

exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    console.log(`Task with ID ${id} deleted.`);
    res.status(200).json({ message: "Tarefa deletada com sucesso" });
  } else {
    console.log(`Task with ID ${id} not found.`);
    res.status(404).json({ error: "Tarefa não encontrada" });
  }
};

exports.completeTask = (req, res) => {
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
};

exports.editTask = (req, res) => {
  const taskId = parseInt(req.body.id);
  const { title, description, deadline } = req.body;

  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    task.title = title;
    task.description = description;
    task.deadline = deadline;
    console.log(`Tarefa com ID ${taskId} editada com sucesso.`);
    res.redirect("/");
  } else {
    console.log(`Tarefa com ID ${taskId} não encontrada para edição.`);
    res.status(404).json({ error: "Tarefa não encontrada" });
  }
};
