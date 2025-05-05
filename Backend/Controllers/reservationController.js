const Reservation = require('../models/reservationticket')

exports.ajouterReservation = async (req, res) => {
  const { busId, numberOfPlaces } = req.body

  if (!busId || !numberOfPlaces) {
    return res.status(400).json({ message: 'Champs requis manquants.' })
  }

  try {
    const reservation = new Reservation({ busId, numberOfPlaces })
    await reservation.save()
    res.status(201).json({ message: 'Réservation enregistrée avec succès.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
