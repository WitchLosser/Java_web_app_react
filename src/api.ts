import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Your backend API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;