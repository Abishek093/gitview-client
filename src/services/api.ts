// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// Check your .env file
// It should have something like:
// VITE_API_BASE_URL=http://localhost:3000/api

// Then in your api.ts, confirm it's using this correctly:
import axios from 'axios';

// Log the actual API base URL being used
console.log('Using API base URL:', import.meta.env.VITE_API_BASE_URL);

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config?.url, config?.baseURL);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
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