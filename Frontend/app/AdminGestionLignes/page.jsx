import React, { useEffect, useState } from 'react';

const AdminGestionLignes = () => {
    const [lignes, setLignes] = useState([]);
    
    useEffect(() => {
        fetch('/api/lignes')
            .then(response => response.json())
            .then(data => setLignes(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const handleDelete = (id) => {
        fetch(`/api/lignes/${id}`, { method: 'DELETE' })
            .then(() => {
                setLignes(lignes.filter(ligne => ligne._id !== id));
            })
            .catch(error => console.error('Erreur de suppression:', error));
    };

    return (
        <div>
            <h1>Gestion des Lignes Urbaines</h1>
            <button>Ajouter</button>
            <button>Modifier</button>
            <table>
                <thead>
                    <tr>
                        <th>Sélection</th>
                        <th>Ligne</th>
                        <th>Départ</th>
                        <th>Arrivée</th>
                        <th>Stations</th>
                        <th>Horaires</th>
                        <th>Prix</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {lignes.map(ligne => (
                        <tr key={ligne._id}>
                            <td><input type="checkbox" /></td>
                            <td>{ligne.ligne}</td>
                            <td>{ligne.depart}</td>
                            <td>{ligne.arrivee}</td>
                            <td>{ligne.stations}</td>
                            <td>{ligne.horaires}</td>
                            <td>{ligne.prix} TND</td>
                            <td>{ligne.statut}</td>
                            <td><button onClick={() => handleDelete(ligne._id)}>Supprimer</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminGestionLignes;
