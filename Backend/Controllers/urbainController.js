const Urban = require('../models/Urban');
const asyncHandler = require('express-async-handler');

// @desc    Récupérer toutes les lignes urbaines
// @route   GET /api/urban
// @access  Public
exports.getUrbanLines = asyncHandler(async (req, res) => {
  const { active } = req.query;
  let query = {};
  
  if (active === 'true' || active === 'false') {
    query.active = active === 'true';
  }

  const lines = await Urban.find(query).sort({ NumLignes: 1 });
  
  res.json({
    success: true,
    count: lines.length,
    data: lines
  });
});

// @desc    Ajouter une nouvelle ligne urbaine
// @route   POST /api/urban
// @access  Privé/Admin
exports.addUrbanLine = asyncHandler(async (req, res) => {
  const { NumLignes } = req.body;
  
  // Vérifier si la ligne existe déjà
  const existingLine = await Urban.findOne({ NumLignes });
  if (existingLine) {
    return res.status(400).json({
      success: false,
      error: 'Une ligne avec ce numéro existe déjà'
    });
  }

  const line = await Urban.create(req.body);
  
  res.status(201).json({
    success: true,
    data: line
  });
});

// @desc    Mettre à jour une ligne urbaine
// @route   PUT /api/urban/:id
// @access  Privé/Admin
exports.updateUrbanLine = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { active, ...updateData } = req.body;

  // Ne permettre que la modification du statut active si l'utilisateur n'est pas admin
  const updateFields = req.user.role === 'admin' ? req.body : { active };

  const line = await Urban.findByIdAndUpdate(id, updateFields, {
    new: true,
    runValidators: true
  });

  if (!line) {
    return res.status(404).json({
      success: false,
      error: 'Ligne urbaine non trouvée'
    });
  }

  res.json({
    success: true,
    data: line
  });
});

// @desc    Supprimer une ligne urbaine
// @route   DELETE /api/urban/:id
// @access  Privé/Admin
exports.deleteUrbanLine = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const line = await Urban.findByIdAndDelete(id);

  if (!line) {
    return res.status(404).json({
      success: false,
      error: 'Ligne urbaine non trouvée'
    });
  }

  res.json({
    success: true,
    data: {}
  });
});