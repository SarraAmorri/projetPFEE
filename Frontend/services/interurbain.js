import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const interurbanService = {
  getAllLines: async () => {
    try {
      const response = await api.get('/interurbain/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching interurban lines:', error);
      throw error;
    }
  },

  getLineById: async (id) => {
    try {
      const response = await api.get(`/interurbain/getbyid/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching interurban line:', error);
      throw error;
    }
  },

  addLine: async (lineData) => {
    try {
      const response = await api.post('/interurbain/ajout', lineData);
      return response.data;
    } catch (error) {
      console.error('Error adding interurban line:', error);
      throw error;
    }
  },

  updateLine: async (id, lineData) => {
    try {
      const response = await api.put(`/interurbain/update/${id}`, lineData);
      return response.data;
    } catch (error) {
      console.error('Error updating interurban line:', error);
      throw error;
    }
  },

  deleteLine: async (id) => {
    try {
      const response = await api.delete(`/interurbain/supprimer/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting interurban line:', error);
      throw error;
    }
  }
};

export default interurbanService;