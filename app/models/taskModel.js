class Task {
  constructor(title, description, deadline, status = "Pendente") {
    this.id = Task.incrementId();
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.status = status;
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

const tasks = [];

module.exports = { Task, tasks };
