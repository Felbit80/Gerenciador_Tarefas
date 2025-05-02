const express = require("express");
const router = express.Router();
const { tasks } = require("../models/taskModel");
const userController = require("../controllers/userController");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all tasks
 *     responses:
 *       200:
 *         description: A list of tasks.
 */
router.get("/", userController.getTasks);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new task
 *     responses:
 *       201:
 *         description: Task created successfully.
 */
router.post("/", userController.createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve all tasks in JSON format
 *     responses:
 *       200:
 *         description: A JSON array of tasks.
 */
router.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

/**
 * @swagger
 * /create-task:
 *   get:
 *     summary: Render the task creation page
 *     responses:
 *       200:
 *         description: Task creation page rendered.
 */
router.get("/create-task", (req, res) => {
  res.render("createTask");
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the task to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found.
 */
router.delete("/api/tasks/:id", userController.deleteTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Mark a task as completed by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the task to mark as completed.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task marked as completed.
 *       404:
 *         description: Task not found.
 */
router.put("/api/tasks/:id", userController.completeTask);

/**
 * @swagger
 * /edit-task/{id}:
 *   post:
 *     summary: Edit a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the task to edit.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task edited successfully.
 *       404:
 *         description: Task not found.
 */
router.post("/edit-task/:id", userController.editTask);

/**
 * @swagger
 * /edit-task/{id}:
 *   get:
 *     summary: Render the task editing page
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the task to edit.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task editing page rendered.
 *       404:
 *         description: Task not found.
 */
router.get("/edit-task/:id", userController.getTaskById);

module.exports = router;
