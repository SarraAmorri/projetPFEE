import axios from 'axios';

// Use environment variable for API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = {
  async register(data) {
    try {
      console.log('Envoi des données d\'inscription:', data);
      const response = await axios.post(`${API_URL}/api/user/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de l\'inscription:',
        JSON.stringify({
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        })
      );
      throw new Error(
        error.response?.status === 404
          ? 'L\'endpoint d\'inscription n\'existe pas sur le serveur.'
          : error.response?.data?.message ||
            'Erreur de connexion au serveur. Vérifiez si le serveur est en cours d\'exécution.'
      );
    }
  },

  async login(data) {
    try {
      console.log('Envoi des données de connexion:', data);
      const response = await axios.post(`${API_URL}/api/user/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la connexion:',
        JSON.stringify({
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        })
      );
      throw new Error(
        error.response?.status === 404
          ? 'L\'endpoint de connexion n\'existe pas sur le serveur.'
          : error.response?.data?.message ||
            'Erreur de connexion au serveur. Vérifiez si le serveur est en cours d\'exécution.'
      );
    }
  },
};

export default api;