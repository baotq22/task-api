const taskSchema = require("../models/taskSchema");
const userSchema = require("../models/userSchema");

const taskController = {}

taskController.createTask = async (req, res) => {
  try {
    const { name, description } = req.body;
    const task = new taskSchema({ name, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

taskController.getTaskById = async (req, res) => {
  try {
    const task = await taskSchema.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

taskController.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskSchema.find(req.query);
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

taskController.assignAndUnassignTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;

    const task = await taskSchema.findById(taskId);
    const user = await userSchema.findById(userId);

    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    task.assignedTo = userId;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

taskController.updateStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'working', 'review', 'done', 'archive'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const task = await taskSchema.findById(taskId);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = taskController