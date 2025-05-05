// models/Urban.js
const mongoose = require('mongoose');

const urbanSchema = new mongoose.Schema({
  NumLignes: { type: String, required: true, unique: true },
  Depart: { type: String, required: true },
  Arrivee: { type: String, required: true },
  Stationtraversee: { type: String, required: true },
  Horaires: { type: String, default: '06:00 - 22:00' },
  Prix: { type: Number, required: true, min: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Urban', urbanSchema);