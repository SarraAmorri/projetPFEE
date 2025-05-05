// controllers/interurbain.js
const asyncHandler = require('express-async-handler');
const Interurbain = require('../models/interurbain');

// @desc    Get all interurban lines
// @route   GET /api/interurbain/all
// @access  Public
exports.getAllLines = asyncHandler(async (req, res) => {
  const lines = await Interurbain.find({});
  res.status(200).json({
    success: true,
    count: lines.length,
    data: lines
  });
});

// @desc    Get single interurban line
// @route   GET /api/interurbain/getbyid/:id
// @access  Public
exports.getLineById = asyncHandler(async (req, res) => {
  const line = await Interurbain.findById(req.params.id);
  
  if (!line) {
    return res.status(404).json({
      success: false,
      error: 'Interurban line not found'
    });
  }

  res.status(200).json({
    success: true,
    data: line
  });
});

// @desc    Add new interurban line
// @route   POST /api/interurbain/ajout
// @access  Private/Admin
exports.addLine = asyncHandler(async (req, res) => {
  const { Depart, Arrivee, Horaires, Prix, active } = req.body;

  // Validation
  if (!Depart || !Arrivee || !Horaires || !Prix) {
    return res.status(400).json({
      success: false,
      error: 'Please include all required fields'
    });
  }

  // Check if line already exists
  const existingLine = await Interurbain.findOne({ Depart, Arrivee });
  if (existingLine) {
    return res.status(400).json({
      success: false,
      error: 'Line already exists'
    });
  }

  const line = await Interurbain.create({
    Depart,
    Arrivee,
    Horaires,
    Prix,
    active: active || true,
    placesDisponibles: 50
  });

  res.status(201).json({
    success: true,
    data: line
  });
});

// @desc    Update interurban line
// @route   PUT /api/interurbain/update/:id
// @access  Private/Admin
exports.updateLine = asyncHandler(async (req, res) => {
  let line = await Interurbain.findById(req.params.id);

  if (!line) {
    return res.status(404).json({
      success: false,
      error: 'Line not found'
    });
  }

  line = await Interurbain.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: line
  });
});

// @desc    Delete interurban line
// @route   DELETE /api/interurbain/supprimer/:id
// @access  Private/Admin
exports.deleteLine = asyncHandler(async (req, res) => {
  const line = await Interurbain.findById(req.params.id);

  if (!line) {
    return res.status(404).json({
      success: false,
      error: 'Line not found'
    });
  }

  await line.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});