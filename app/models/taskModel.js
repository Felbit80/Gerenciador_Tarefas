class Task {
  constructor(id, title, description, deadline, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.status = status;
  }
}
const tasks = [];

module.exports = { Task, tasks };
