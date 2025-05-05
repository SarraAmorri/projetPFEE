'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ajouterReservation } from '../../../services/reservationticket'

export default function ReservationTicket() {
  const [nbrPlaces, setNbrPlaces] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const busId = params?.busId

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      // Validate input
      const places = parseInt(nbrPlaces, 10)
      if (isNaN(places) || places <= 0) {
        throw new Error('Veuillez saisir un nombre de places valide.')
      }
      if (places > 70) {
        throw new Error('Le nombre de places ne doit pas dépasser 70.')
      }

      // Make reservation
      const result = await ajouterReservation({ 
        numberOfPlaces: places, 
        busId: 5,
      })

      setSuccess(`Réservation confirmée pour ${places} place(s).`)
      setNbrPlaces('')

      // Optional: Redirect after success
      setTimeout(() => {
        router.push('/') // Or wherever you want to redirect
      }, 2000)
      
    } catch (err) {
      setError(err.message)
      // If token is invalid/expired, redirect to login
      if (err.message.includes('Token') || err.message.includes('non autorisé')) {
        router.push('/login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 via-emerald-100 to-lime-100 px-4 py-10 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-emerald-700 mb-6">
          Réservation de Ticket
        </h1>
        {busId && (
          <p className="text-center text-gray-600 mb-4">Bus ID: {busId}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nbrPlaces" className="block font-medium text-gray-700">
              Nombre de places :
            </label>
            <input
              type="number"
              id="nbrPlaces"
              value={nbrPlaces}
              onChange={(e) => setNbrPlaces(e.target.value)}
              min="1"
              max="70"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Entrez le nombre de places"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Réservation en cours...' : 'Valider la réservation'}
          </button>
        </form>
      </div>
    </div>
  )
}
