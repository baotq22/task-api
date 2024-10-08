const express = require('express');
const { body, param } = require('express-validator');
const Task = require('../models/taskSchema');
const User = require('../models/userSchema');
const { validate } = require('../middlewares/validate');
const { createTask, getTaskById, assignAndUnassignTask, getAllTasks, updateStatus } = require('../controllers/taskController');

const router = express.Router();

// Create a task
router.post('/', [
  body('name').isString().notEmpty().withMessage('Task name is required'),
  body('description').isString().notEmpty().withMessage('Task description is required'),
  validate
], createTask);

// Get all tasks
router.get('/', getAllTasks);

// Get a task by id
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid Task ID'),
  validate
], getTaskById);

// Assign/unassign a task to a user
router.patch('/:taskId/assign', [
  param('taskId').isMongoId().withMessage('Invalid Task ID'),
  body('userId').isMongoId().withMessage('Invalid User ID'),
  validate
], assignAndUnassignTask);

//update stutus task
router.patch('/:taskId/status', updateStatus);

module.exports = router;
