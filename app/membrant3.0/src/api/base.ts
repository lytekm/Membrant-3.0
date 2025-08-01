// src/api/base.ts
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // only true if using cookies
});

// Automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('Attach token');
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { API_BASE };
