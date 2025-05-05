const express = require('express');
const router = express.Router();
const LocationBus = require('../models/locationbus');
const auth = require('../middleware/auth');
const { transporter } = require('../server');

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
  }
  next();
};

router.post('/demander', auth, async (req, res) => {
  try {
    const { de, a, date, duree, typeBus } = req.body;

    if (!de || !a || !date || !duree || !typeBus) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    if (!/^[A-Za-z\s]+$/.test(de) || !/^[A-Za-z\s]+$/.test(a)) {
      return res.status(400).json({ error: 'Les champs "De" et "À" doivent contenir uniquement des lettres' });
    }
    if (!/^\d+$/.test(duree) || duree <= 0) {
      return res.status(400).json({ error: 'La durée doit être un nombre positif' });
    }

    const location = new LocationBus({
      clientId: req.user.id,
      clientEmail: req.user.email,
      de,
      a,
      date,
      duree,
      typeBus,
    });

    const saved = await location.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject: 'Confirmation de demande de location',
      text: `Bonjour,\n\nVotre demande de location de bus de ${de} à ${a} le ${new Date(date).toLocaleDateString()} pour ${duree} jours a été reçue.\n\nCordialement,\nÉquipe SRT Gabès`,
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de la demande de location' });
  }
});

router.get('/all', auth, isAdmin, async (req, res) => {
  try {
    const locations = await LocationBus.find({}).populate('clientId', 'nom prenom email');
    res.status(200).json(locations);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de la récupération des demandes' });
  }
});

router.put('/decision/:id', auth, isAdmin, async (req, res) => {
  try {
    const { decision, montant } = req.body;

    if (!['acceptee', 'refusee'].includes(decision)) {
      return res.status(400).json({ error: 'Décision invalide' });
    }
    if (decision === 'acceptee' && (!montant || montant <= 0)) {
      return res.status(400).json({ error: 'Montant requis pour accepter la demande' });
    }

    const location = await LocationBus.findByIdAndUpdate(
      req.params.id,
      { etat: decision, montant: decision === 'acceptee' ? montant : 0 },
      { new: true }
    );

    if (!location) {
      return res.status(404).json({ error: 'Demande non trouvée' });
    }

    const subject = decision === 'acceptee' ? 'Votre demande de location a été acceptée' : 'Votre demande de location a été refusée';
    const text =
      decision === 'acceptee'
        ? `Bonjour,\n\nVotre demande de location de bus de ${location.de} à ${location.a} le ${new Date(location.date).toLocaleDateString()} a été acceptée. Montant estimatif : ${montant} DT.\nVeuillez confirmer ou refuser via votre espace client.\n\nCordialement,\nÉquipe SRT Gabès`
        : `Bonjour,\n\nVotre demande de location de bus de ${location.de} à ${location.a} le ${new Date(location.date).toLocaleDateString()} a été refusée.\n\nCordialement,\nÉquipe SRT Gabès`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: location.clientEmail,
      subject,
      text,
    });

    res.status(200).json(location);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de la mise à jour de la demande' });
  }
});

router.get('/mesdemandes/:clientId', auth, async (req, res) => {
  try {
    if (req.user.id !== req.params.clientId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }
    const locations = await LocationBus.find({ clientId: req.params.clientId });
    res.status(200).json(locations);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de la récupération des demandes' });
  }
});

router.put('/reponse/:id', auth, async (req, res) => {
  try {
    const { reponseClient } = req.body;

    if (!['confirmee', 'refusee'].includes(reponseClient)) {
      return res.status(400).json({ error: 'Réponse invalide' });
    }

    const location = await LocationBus.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Demande non trouvée' });
    }
    if (location.clientId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }

    location.reponseClient = reponseClient;
    const updated = await location.save();

    const subject = reponseClient === 'confirmee' ? 'Confirmation de réservation' : 'Refus de réservation';
    const text =
      reponseClient === 'confirmee'
        ? `Bonjour,\n\nVous avez confirmé la réservation pour la location de bus de ${location.de} à ${location.a} le ${new Date(location.date).toLocaleDateString()}. Montant : ${location.montant} DT.\n\nCordialement,\nÉquipe SRT Gabès`
        : `Bonjour,\n\nVous avez refusé la réservation pour la location de bus de ${location.de} à ${location.a} le ${new Date(location.date).toLocaleDateString()}.\n\nCordialement,\nÉquipe SRT Gabès`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: location.clientEmail,
      subject,
      text,
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de l\'envoi de la réponse' });
  }
});

module.exports = router;