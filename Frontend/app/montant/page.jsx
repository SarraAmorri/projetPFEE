'use client'

import { useState } from 'react'

export default function montant() {
  const [montant, setMontant] = useState('')
  const [decision, setDecision] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Montant:', montant)
    console.log('Décision:', decision)
  
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Formulaire de validation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Montant (DT) :</label>
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Décision :</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="decision"
                  value="accepter"
                  checked={decision === 'accepter'}
                  onChange={() => setDecision('accepter')}
                  className="mr-2"
                />
                Accepter
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="decision"
                  value="refuser"
                  checked={decision === 'refuser'}
                  onChange={() => setDecision('refuser')}
                  className="mr-2"
                />
                Refuser
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  )
}
