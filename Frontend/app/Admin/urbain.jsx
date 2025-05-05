'use client'
import { useState, useEffect } from 'react'
import { getUserRole } from '../../../utils/getUserRole'
import AdminActions from '../../../admin/AdminActions'
import LineModal from '../../../admin/LineModal'

export default function Urbain() {
  const [urbanLines, setUrbanLines] = useState([
    {
      id: 1,
      NumLignes: 'A4',
      Depart: 'Gabès',
      Arrivee: 'Métouia',
      Stationtraversee: 'Chenchou, Ghannouch',
      Horaires: '06:30 - 22:00',
      Prix: 1.200,
      Active: 'oui'
    }
  ])

  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(null)
  const [modal, setModal] = useState({ add: false, edit: false })

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { role } = await getUserRole()
        setIsAdmin(role === 'admin')
      } catch (error) {
        console.error("Erreur:", error)
      } finally {
        setLoading(false)
      }
    }
    checkAdmin()
  }, [])

  const handleSubmit = (data) => {
    if (modal.add) {
      setUrbanLines([...urbanLines, { ...data, id: Date.now() }])
    } else if (modal.edit && selectedId !== null) {
      setUrbanLines(urbanLines.map(l => l.id === selectedId ? { ...data, id: selectedId } : l))
    }
    setModal({ add: false, edit: false })
  }

  if (loading) return <div className="text-center p-8">Chargement...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des Lignes Urbaines</h1>
      
      {isAdmin && (
        <AdminActions 
          onAdd={() => setModal({ add: true, edit: false })}
          onEdit={() => {
            if (selectedId !== null) {
              setModal({ add: false, edit: true })
            } else {
              alert("Veuillez sélectionner une ligne à modifier.")
            }
          }}
          onDelete={() => {
            if (selectedId !== null && confirm("Supprimer cette ligne ?")) {
              setUrbanLines(urbanLines.filter(l => l.id !== selectedId))
              setSelectedId(null)
            }
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-emerald-600 text-white">
            <tr>
              {isAdmin && <th className="px-6 py-3 text-left">Sélection</th>}
              <th className="px-6 py-3 text-left">Ligne</th>
              <th className="px-6 py-3 text-left">Départ</th>
              <th className="px-6 py-3 text-left">Arrivée</th>
              <th className="px-6 py-3 text-left">Stations</th>
              <th className="px-6 py-3 text-left">Horaires</th>
              <th className="px-6 py-3 text-left">Prix</th>
              <th className="px-6 py-3 text-left">Statut</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {urbanLines.map((line) => (
              <tr
                key={line.id}
                className={selectedId === line.id ? "bg-gray-100" : ""}
                onClick={() => isAdmin && setSelectedId(line.id)}
              >
                {isAdmin && (
                  <td className="px-6 py-4">
                    <input
                      type="radio"
                      name="selected"
                      checked={selectedId === line.id}
                      onChange={() => setSelectedId(line.id)}
                    />
                  </td>
                )}
                <td className="px-6 py-4">{line.NumLignes}</td>
                <td className="px-6 py-4">{line.Depart}</td>
                <td className="px-6 py-4">{line.Arrivee}</td>
                <td className="px-6 py-4">{line.Stationtraversee}</td>
                <td className="px-6 py-4">{line.Horaires}</td>
                <td className="px-6 py-4">{line.Prix.toFixed(3)} TND</td>
                <td className="px-6 py-4">{line.Active}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LineModal
        isOpen={modal.add || modal.edit}
        onClose={() => setModal({ add: false, edit: false })}
        onSubmit={(data) => handleSubmit(data)}
        initialData={modal.edit ? urbanLines.find(l => l.id === selectedId) : null}
        title={modal.add ? "Ajouter une ligne" : "Modifier la ligne"}
      />
    </div>
  )
}
