
import axios from 'axios';

console.log('Using API base URL:', import.meta.env.VITE_API_BASE_URL);

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config?.url, config?.baseURL);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Received response:', response.status, response.statusText);
    return response;
  },
  (error) => {
    console.error('API error response:', error.response || error);
    return Promise.reject(error);
  }
);