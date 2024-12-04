// import axios from 'axios';
// 3
// 4const API_BASE_URL = 'https://your.api-base.url'; 

// const api = axios.create({
// 4          "baseURL": API_BASE_URL,
// 5          "timeout": 5000,
// 6          "headers": { 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' },
// 7        });


// api.interceptors.request.use(
// 5          (config) => {
// 6            // Modify config before sending the request
// 7            config.headers['Authorization'] = 'Bearer YOUR_ACCESS_TOKEN';
// 8            return config;
// 9          },
// 10          (error) => {
// 11            // Handle request error
// 12            return Promise.reject(error);
// 13          }
// 14        );
// 15    
// 16        // Response interceptor
// 17        api.interceptors.response.use(
// 18          (response) => {
// 19            // Modify response data before passing it to the calling function
// 20            return response.data;
// 21          },
// 22          (error) => {
// 23            // Handle response error
// 24            return Promise.reject(error);
// 25          }
// 26        );
// 27       
// export default api;
