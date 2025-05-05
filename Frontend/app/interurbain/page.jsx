'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InterUrbanLinesPage() {
  const [interurbanLines] = useState([
    { Depart: 'Gabès', Arrivee: 'Sfax', Horaires: '06:00 - 18:00', Prix: 7.500, busId: '123' },
    { Depart: 'Gabès', Arrivee: 'Tunis', Horaires: '07:00 - 20:00', Prix: 18.000, busId: '124' },
    { Depart: 'Gabès', Arrivee: 'Djerba', Horaires: '08:30 - 17:30', Prix: 10.000, busId: '125' },
  ])

  const router = useRouter()
  const handleReservation = (busId) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        router.push(`/reservationticket/${busId}`)
      } else {
        router.push(`/login?redirect=/reservationticket/${busId}`)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 via-emerald-100 to-lime-100 px-4 py-10 flex items-center justify-center">
      <div className="max-w-5xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
          RÉSEAU DU TRANSPORT INTERURBAIN
        </h1>

        {interurbanLines.map((line, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center mb-4">
              <div>
                <p className="text-gray-500 text-sm font-semibold">ID Bus</p>
                <p className="text-gray-800">{line.busId}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold">Départ</p>
                <p className="text-gray-800">{line.Depart}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold">Arrivée</p>
                <p className="text-gray-800">{line.Arrivee}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold">Horaires</p>
                <p className="text-gray-800">{line.Horaires}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold">Prix</p>
                <p className="text-gray-800">{line.Prix.toFixed(3)} TND</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleReservation(line.busId)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Réserver un ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
