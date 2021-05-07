const express = require('express');
const User = require('../models/User');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const router = express.Router();

const advanceResults = require('../middleware/advanceResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'))

router.route('/')
  .get(advanceResults(User, ''), getUsers)
    .post(createUser);

  router.route('/:id')
  .get(getUser)
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

  module.exports = router;