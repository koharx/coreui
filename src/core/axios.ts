import axios from 'axios';


const apiClient = axios.create({
  baseURL: process.env.REACT_APP_AUTHSERVICE_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
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
    const customResponse = {};
    if(response.status == 200){
      customResponse.data = response.data;
      customResponse.success = true;
    }
    else{
      customResponse.success = false;
    }
     return customResponse; 
  },
  (error) => {
    if (error.response) {
      console.error('Response Error:', error.response.data);
      if (error.response.status === 401) {
        console.error('Unauthorized! Redirecting to login...');
        window.location.href = '/'; 
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