// app/admin/AdminActions.jsx

'use client';
import React from 'react';

const AdminActions = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Gestion des Lignes Urbaines
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Ajouter
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
          Modifier
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Supprimer
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 font-bold">
            <tr>
              <th className="px-4 py-2">Sélection</th>
              <th className="px-4 py-2">Ligne</th>
              <th className="px-4 py-2">Départ</th>
              <th className="px-4 py-2">Arrivée</th>
              <th className="px-4 py-2">Stations</th>
              <th className="px-4 py-2">Horaires</th>
              <th className="px-4 py-2">Prix</th>
              <th className="px-4 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">
                <input type="checkbox" />
              </td>
              <td className="px-4 py-2">A4</td>
              <td className="px-4 py-2">Gabès</td>
              <td className="px-4 py-2">Métouia</td>
              <td className="px-4 py-2">Chenchou, Ghannouch</td>
              <td className="px-4 py-2">06:30 - 22:00</td>
              <td className="px-4 py-2">1.200 TND</td>
              <td className="px-4 py-2">oui</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminActions;
