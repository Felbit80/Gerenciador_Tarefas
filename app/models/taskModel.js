class Task {
  static latestId = 0;

  constructor(title, description, deadline, status = "Pendente") {
    this.id = Task.generateId();
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.status = status;
  }

  static generateId() {
    return ++this.latestId;
  }
}

const tasks = [];

module.exports = { Task, tasks };
