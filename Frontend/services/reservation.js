import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const reservationService = {
  getReservations: async () => {
    try {
      const response = await axios.get(`${API_URL}/reservations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  },
  // Autres méthodes CRUD
};

export default reservationService;