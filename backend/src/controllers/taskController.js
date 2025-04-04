const db = require('../models');
const Task = db.Task;
const { Op } = require('sequelize');

exports.getTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10, status, sortBy = 'due_date', order = 'ASC' } = req.query;

    const offset = (page - 1) * limit;

    const where = { userId };
    if (status) {
      where.status = status;
    }

    const { rows: tasks, count: totalTasks } = await Task.findAndCountAll({
      where,
      order: [[sortBy, order.toUpperCase()]],
      offset: parseInt(offset),
      limit: parseInt(limit),
    });

    const totalPages = Math.ceil(totalTasks / limit);

    res.json({ tasks, totalTasks, totalPages, currentPage: parseInt(page) });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

exports.createTask = async (req, res) => {
    try {
      const { title, description, status, due_date } = req.body;
      const userId = req.userId;
  
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      if (!title || !description || !status || !due_date) {
        return res.status(400).json({ message: "All fields are required." });
      }
      const allowedStatuses = ['To Do', 'In Progress', 'Completed'];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status. Allowed values: To Do, In Progress, Completed." });
      }
  
      if (isNaN(Date.parse(due_date))) {
        return res.status(400).json({ message: "Invalid due_date format. Expected a valid date." });
      }
  
      const task = await Task.create({ title, description, status, due_date, userId });
      res.status(201).json(task);
    } catch (error) {
      console.error("Create Task Error:", error);
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!status) {
        return res.status(400).json({ message: "Status field is required." });
      }
  
      const allowedStatuses = ['To Do', 'In Progress', 'Completed'];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status. Allowed values: To Do, In Progress, Completed." });
      }
  
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      await task.update({ status });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to update task." });
    }
  };
  

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
