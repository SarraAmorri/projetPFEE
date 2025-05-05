'use client'

import { useState } from 'react'

export default function urbain() {
  const [urbanLines, setUrbanLines] = useState([
    {
      NumLignes: 'A4',
      Depart: 'Gabès',
      Arrivee: 'Métouia',
      Stationtraversee: 'Chenchou, Ghannouch',
      Horaires: '06:30 - 22:00',
      Prix: 1.200,
      Active: 'oui',
    },
    {
      NumLignes: 'A5',
      Depart: 'Gabès',
      Arrivee: 'Ghannouch',
      Stationtraversee: 'Manzel, Chenchou',
      Horaires: '07:00 - 20:30',
      Prix: 0.900,
      Active: 'non',
    },
    {
      NumLignes: 'A6',
      Depart: 'Métouia',
      Arrivee: 'Zarat',
      Stationtraversee: 'Chott Essalem',
      Horaires: '05:30 - 21:00',
      Prix: 1.500,
      Active: 'oui',
    },
  ])

  const handleActiveChange = (index, value) => {
    const updatedLines = [...urbanLines]
    updatedLines[index].Active = value
    setUrbanLines(updatedLines)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 via-emerald-100 to-lime-100 px-4 py-10 flex items-center justify-center">
      <div className="max-w-5xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
        RÉSEAU DU TRANSPORT URBAIN
        </h1>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-emerald-200 text-emerald-900 rounded-t-lg">
            <tr>
              <th className="px-4 py-3 text-left">Numéro</th>
              <th className="px-4 py-3 text-left">Départ</th>
              <th className="px-4 py-3 text-left">Arrivée</th>
              <th className="px-4 py-3 text-left">Stations traversées</th>
              <th className="px-4 py-3 text-left">Horaires</th>
              <th className="px-4 py-3 text-left">Prix (TND)</th>
              <th className="px-4 py-3 text-left">Active</th>
            </tr>
          </thead>
          <tbody>
            {urbanLines.map((line, index) => (
              <tr
                key={index}
                className="border-t hover:bg-emerald-50 transition duration-200"
              >
                <td className="px-4 py-3 font-semibold text-sky-700">{line.NumLignes}</td>
                <td className="px-4 py-3">{line.Depart}</td>
                <td className="px-4 py-3">{line.Arrivee}</td>
                <td className="px-4 py-3">{line.Stationtraversee}</td>
                <td className="px-4 py-3">{line.Horaires}</td>
                <td className="px-4 py-3">{line.Prix.toFixed(3)}</td>
                <td className="px-4 py-3">
                  <label className="mr-3 inline-flex items-center text-green-700">
                    <input
                      type="radio"
                      name={`active-${index}`}
                      value="oui"
                      checked={line.Active === 'oui'}
                      onChange={() => handleActiveChange(index, 'oui')}
                      className="mr-1 accent-green-500"
                    />
                    Oui
                  </label>
                  <label className="inline-flex items-center text-red-600">
                    <input
                      type="radio"
                      name={`active-${index}`}
                      value="non"
                      checked={line.Active === 'non'}
                      onChange={() => handleActiveChange(index, 'non')}
                      className="mr-1 accent-red-400"
                    />
                    Non
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}