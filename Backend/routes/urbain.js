// routes/urban.js
const express = require('express');
const router = express.Router();
const {
  getUrbanLines,
  addUrbanLine,
  updateUrbanLine,
  deleteUrbanLine,
  toggleLineStatus
} = require('../controllers/urban');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getUrbanLines)
  .post(protect, authorize('admin'), addUrbanLine);

router.route('/:id')
  .put(protect, authorize('admin'), updateUrbanLine)
  .delete(protect, authorize('admin'), deleteUrbanLine);

router.route('/:id/status')
  .patch(protect, authorize('admin'), toggleLineStatus);

module.exports = router;