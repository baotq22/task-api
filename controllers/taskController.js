const taskSchema = require("../models/taskSchema");

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
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

taskController.assignAndUnassignTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;

    const task = await Task.findById(taskId);
    const user = await User.findById(userId);

    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    task.assignedTo = userId;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = taskController