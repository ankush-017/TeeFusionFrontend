import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API,
});

// Auto attach JWT to headers
API.interceptors.request.use((config) => {
    
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ⬅️ Send token with every request
  }
  return config;
});

export default API;