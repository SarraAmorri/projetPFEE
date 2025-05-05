// backend/models/user.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    tel: { type: String, required: true, match: [/^\d{8}$/, 'Le téléphone doit contenir 8 chiffres.'] },
    numcin: { type: String, required: true, match: [/^\d{8}$/, 'Le CIN doit contenir 8 chiffres.'] },
    address: { type: String, required: true, trim: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);