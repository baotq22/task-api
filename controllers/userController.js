const userSchema = require("../models/userSchema");

const userController = {}

userController.createUser = async (res, req, next) => {
  try {
    const { name } = req.body;
    const newUser = new userSchema({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

userController.getUsers = async (res, req, next) => {
  try {
    const users = await userSchema.find(req.query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

userController.getUsersById = async (res, req, next) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = userController