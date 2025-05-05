// app/menuadmin/page.jsx
'use client'
import { useState, useEffect } from 'react';
import { urbanService } from '../../services/urbain';

export default function MenuAdmin() {
  const [urbanLines, setUrbanLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    NumLignes: '',
    Depart: '',
    Arrivee: '',
    Stationtraversee: '',
    Horaires: '06:00 - 22:00',
    Prix: 1.200,
    Active: 'oui'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUrbanLines();
  }, []);

  const fetchUrbanLines = async () => {
    try {
      setLoading(true);
      const data = await urbanService.getAllLines(false);
      setUrbanLines(data.data || data); // Adapté selon la structure de réponse
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const lineData = {
        ...formData,
        active: formData.Active === 'oui'
      };

      if (editingId) {
        await urbanService.updateLine(editingId, lineData);
      } else {
        await urbanService.addLine(lineData);
      }
      
      await fetchUrbanLines();
      resetForm();
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // ... autres fonctions (handleEdit, handleDelete, etc.)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Votre interface */}
    </div>
  );
}