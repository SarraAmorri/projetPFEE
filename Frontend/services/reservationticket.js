const API_URL = 'http://localhost:5000/api/reservationticket'

// Helper function to get headers with token
const getHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  }
}

export const ajouterReservation = async ({ numberOfPlaces, busId }) => {
  try {
    const response = await fetch(`${API_URL}/ajout`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ numberOfPlaces, busId }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Erreur lors de l'ajout de la réservation")
    }

    return await response.json()
  } catch (error) {
    throw new Error(error.message || "Erreur réseau lors de l'ajout de la réservation")
  }
}

// Récupérer toutes les réservations (admin)
export const getAllReservations = async () => {
  const response = await fetch(`${API_URL}/all`, {
    method: 'GET',
    headers,
  });
  if (!response.ok) throw new Error("Erreur lors de la récupération des réservations.");
  return response.json();
};

// Récupérer une réservation par ID (admin)
export const getReservationById = async (id) => {
  const response = await fetch(`${API_URL}/getbyid/${id}`, {
    method: 'GET',
    headers,
  });
  if (!response.ok) throw new Error("Erreur lors de la récupération de la réservation.");
  return response.json();
};

// Supprimer une réservation (admin)
export const supprimerReservation = async (id) => {
  const response = await fetch(`${API_URL}/supprimer/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) throw new Error("Erreur lors de la suppression.");
  return response.json();
};

// Modifier une réservation (admin)
export const modifierReservation = async (id, data) => {
  const response = await fetch(`${API_URL}/update/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erreur lors de la mise à jour.");
  return response.json();
};
