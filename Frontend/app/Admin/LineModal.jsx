'use client'
import { useState, useEffect } from 'react'

export default function LineModal({ isOpen, onClose, onSubmit, initialData, title }) {
  const [form, setForm] = useState({
    NumLignes: '',
    Depart: '',
    Arrivee: '',
    Stationtraversee: '',
    Horaires: '',
    Prix: 0,
    Active: 'oui'
  })

  useEffect(() => {
    if (initialData) setForm(initialData)
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <form onSubmit={(e) => {
          e.preventDefault()
          onSubmit(form)
        }}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Numéro de ligne</label>
              <input
                type="text"
                name="NumLignes"
                value={form.NumLignes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Départ</label>
                <input
                  type="text"
                  name="Depart"
                  value={form.Depart}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Arrivée</label>
                <input
                  type="text"
                  name="Arrivee"
                  value={form.Arrivee}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Stations</label>
              <input
                type="text"
                name="Stationtraversee"
                value={form.Stationtraversee}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Horaires</label>
                <input
                  type="text"
                  name="Horaires"
                  value={form.Horaires}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Prix (TND)</label>
                <input
                  type="number"
                  step="0.001"
                  name="Prix"
                  value={form.Prix}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Statut</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="Active"
                    value="oui"
                    checked={form.Active === 'oui'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Active
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="Active"
                    value="non"
                    checked={form.Active === 'non'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Inactive
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
