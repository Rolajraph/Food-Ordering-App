import axios from 'axios';
import env from '../config/env';

const axiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the JWT to every outgoing request, if one exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Globally handle expired/invalid tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      // Full redirect (not client-side navigation) — ensures all
      // in-memory auth state (Context, etc.) is wiped clean too
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;