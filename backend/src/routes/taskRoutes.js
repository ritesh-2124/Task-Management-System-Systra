// back-end/src/routes/task.routes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/auth');

// GET all tasks
router.get('/',authenticate ,taskController.getTasks);

// POST a new task
router.post('/', authenticate,taskController.createTask);

// PUT update a task by ID
router.put('/:id', authenticate,taskController.updateTask);

// DELETE a task by ID
router.delete('/:id', authenticate,taskController.deleteTask);

module.exports = router;
