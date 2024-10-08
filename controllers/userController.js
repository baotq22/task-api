const taskSchema = require("../models/taskSchema");
const userSchema = require("../models/userSchema");

const userController = {}

userController.createUser = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingUser = await userSchema.findOne({ name });

    if (!existingUser) {
      const newUser = new userSchema({ name });
      await newUser.save();
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: "User with this name is exist before! Try again" });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

userController.getUsers = async (req, res, next) => {
  try {
    const users = await userSchema.find(req.query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

userController.getUsersById = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

userController.getAllTasksOfUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await userSchema.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const tasks = await taskSchema.find({ assignedTo: userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = userController