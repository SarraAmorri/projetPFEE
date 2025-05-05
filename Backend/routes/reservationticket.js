const express = require('express')
const router = express.Router()
const { ajouterReservation } = require('../Controllers/reservationController')

router.post('/ajout', ajouterReservation)

module.exports = router
