// app/services/urbain.js
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

export const urbanService = {
  getAllLines: async (activeOnly = true) => {
    try {
      const response = await api.get('/urban', {
        params: { active: activeOnly }
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  addLine: async (lineData) => {
    try {
      const response = await api.post('/urban', lineData);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  updateLine: async (id, lineData) => {
    try {
      const response = await api.put(`/urban/${id}`, lineData);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  deleteLine: async (id) => {
    try {
      const response = await api.delete(`/urban/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  toggleStatus: async (id, isActive) => {
    try {
      const response = await api.patch(`/urban/${id}/status`, { active: isActive });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};