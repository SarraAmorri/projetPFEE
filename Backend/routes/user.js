// routes/user.js
const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getMe,
  updateUser,
  deleteUser
} = require('../controllers/user');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/update', protect, updateUser);
router.delete('/delete', protect, deleteUser);

module.exports = router;