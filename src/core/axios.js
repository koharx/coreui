import axios from 'axios';

// const url = process.env.REACT_APP_API_URL;
// console.log(url);

const apiClient = axios.create({
  baseURL: "http://localhost:5048", 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data; 
  },
  (error) => {
    if (error.response) {
      console.error('Response Error:', error.response.data);
      if (error.response.status === 401) {
        console.error('Unauthorized! Redirecting to login...');
        window.location.href = '/login'; 
      }
    } else if (error.request) {
      console.error('No Response Received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;