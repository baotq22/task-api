const express = require('express');
const { body, param } = require('express-validator');
const User = require('../models/userSchema');
const { validate } = require('../middlewares/validate');
const { getUsers, createUser, getUsersById } = require('../controllers/userController');

const router = express.Router();

// Create a new user
router.post('/', [
  body('name').isString().notEmpty().withMessage('Name is required'),
  validate
], createUser);

// Get all users
router.get('/', getUsers);

// Get a user by id
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid User ID'),
  validate
], getUsersById);

module.exports = router;
