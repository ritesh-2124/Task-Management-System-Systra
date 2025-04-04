const db = require('../models');
const Task = db.Task;
// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.findAll({
      where: {
        userId 
      }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;
    const userId = req.userId;
    if(!userId){
        return res.status(401).json({ message: "Unauthorized" });
    }
    const task = await Task.create({ title, description, status, due_date , userId});
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.update({ title, description, status, due_date });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a task
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
