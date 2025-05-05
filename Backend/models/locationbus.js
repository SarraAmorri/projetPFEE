const mongoose = require('mongoose');

const LocationBusSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    de: {
      type: String,
      required: true,
      trim: true,
    },
    a: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    duree: {
      type: Number,
      required: true,
      min: [1, 'La durée doit être positive'],
    },
    typeBus: {
      type: String,
      required: true,
      trim: true,
    },
    etat: {
      type: String,
      enum: ['en_attente', 'acceptee', 'refusee'],
      default: 'en_attente',
    },
    montant: {
      type: Number,
      default: 0,
      min: [0, 'Le montant ne peut pas être négatif'],
    },
    reponseClient: {
      type: String,
      enum: ['en_attente', 'confirmee', 'refusee'],
      default: 'en_attente',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LocationBus', LocationBusSchema);