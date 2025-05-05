// routes/interurbain.js
const express = require('express');
const router = express.Router();
const {
  getAllLines,
  getLineById,
  addLine,
  updateLine,
  deleteLine
} = require('../Controllers/interurbain');
const { protect, isAdmin } = require('../middleware/auth');

router.get('/all', getAllLines);
router.get('/getbyid/:id', getLineById);
router.post('/ajout', protect, isAdmin, addLine);
router.put('/update/:id', protect, isAdmin, updateLine);
router.delete('/supprimer/:id', protect, isAdmin, deleteLine);

module.exports = router;