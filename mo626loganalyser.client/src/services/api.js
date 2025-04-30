// services/api.js
import axios from 'axios';

// Create an Axios instance with custom configuration
const api = axios.create({
  baseURL: 'http://localhost:44368/api/logs',//process.env.REACT_APP_API_URL || 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  config => {
    // Add authorization token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log outgoing requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Request:', config);
    }
    
    return config;
  },
  error => {
    // Handle request errors
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => {
    // Transform response data if needed
    if (process.env.NODE_ENV === 'development') {
      console.log('Response:', response);
    }
    
    return response;
  },
  error => {
    // Global error handling
    const { response } = error;
    
    if (response && response.status) {
      switch (response.status) {
        case 401:
          // Handle unauthorized (e.g., redirect to login)
          console.error('Unauthorized access');
          // Example: store.dispatch(logout());
          break;
        case 403:
          console.error('Forbidden access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error(`Error with status code: ${response.status}`);
      }
    } else if (error.request) {
      // Network error or server didn't respond
      console.error('Network error or no response from server');
    } else {
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;