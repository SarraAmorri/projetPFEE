// models/interurbain.js
const mongoose = require('mongoose');

const InterurbainSchema = new mongoose.Schema({
  Depart: {
    type: String,
    required: [true, 'Please add a departure city'],
    trim: true
  },
  Arrivee: {
    type: String,
    required: [true, 'Please add an arrival city'],
    trim: true
  },
  Horaires: {
    type: String,
    required: [true, 'Please add schedules'],
    trim: true
  },
  Prix: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be a positive number']
  },
  active: {
    type: Boolean,
    default: true
  },
  placesDisponibles: {
    type: Number,
    default: 50,
    min: [0, 'Available seats must be positive']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Interurbain', InterurbainSchema);