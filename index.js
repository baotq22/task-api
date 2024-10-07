const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/user.api.js');
const taskRoutes = require('./routes/task.api.js');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
