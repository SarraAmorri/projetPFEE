'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminLocation() {
  const [demandes, setDemandes] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [montant, setMontant] = useState({});

  const handleDecision = async (id, decision, montantValue) => {
    try {
      if (decision === 'acceptee' && (!montantValue || montantValue <= 0)) {
        setError('Veuillez entrer un montant valide pour accepter la demande.');
        return;
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/locationbus/decision/${id}`,
        { decision, montant: decision === 'acceptee' ? Number(montantValue) : 0 },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      setDemandes((prev) =>
        prev.map((demande) =>
          demande._id === id
            ? { ...demande, etat: decision, montant: response.data.montant }
            : demande
        )
      );
      setMontant((prev) => ({ ...prev, [id]: '' })); // Réinitialiser le champ montant
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la mise à jour de la demande.');
    }
  };

  const handleMontantChange = (id, value) => {
    setMontant((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const fetchDemandes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/locationbus/all`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        setDemandes(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des demandes.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDemandes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-lime-100 p-8">
      <h1 className="text-2xl font-bold text-center text-emerald-800 mb-8">
        Gestion des demandes de location
      </h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {isLoading ? (
        <p className="text-center text-gray-600">Chargement...</p>
      ) : demandes.length === 0 ? (
        <p className="text-center text-gray-600">Aucune demande trouvée.</p>
      ) : (
        <div className="space-y-6">
          {demandes.map((demande) => (
            <div
              key={demande._id}
              className="bg-white p-6 rounded-xl shadow-md space-y-2"
            >
              <p>
                <strong>De :</strong> {demande.de}
              </p>
              <p>
                <strong>À :</strong> {demande.a}
              </p>
              <p>
                <strong>Date :</strong>{' '}
                {new Date(demande.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Durée :</strong> {demande.duree} jours
              </p>
              <p>
                <strong>Type de bus :</strong> {demande.typeBus}
              </p>
              <p>
                <strong>Client :</strong> {demande.clientEmail}
              </p>
              <p>
                <strong>État :</strong> {demande.etat}
              </p>
              {demande.etat === 'acceptee' && (
                <p>
                  <strong>Montant :</strong> {demande.montant} DT
                </p>
              )}
              {demande.etat === 'en_attente' && (
                <div className="mt-4">
                  <label className="block font-semibold mb-1">
                    Montant (DT) :
                  </label>
                  <input
                    type="number"
                    value={montant[demande._id] || ''}
                    onChange={(e) =>
                      handleMontantChange(demande._id, e.target.value)
                    }
                    className="w-full border rounded p-2 mb-4"
                    min="0"
                    placeholder="Entrez le montant"
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        handleDecision(
                          demande._id,
                          'acceptee',
                          montant[demande._id]
                        )
                      }
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Accepter
                    </button>
                    <button
                      onClick={() => handleDecision(demande._id, 'refusee', 0)}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Refuser
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}