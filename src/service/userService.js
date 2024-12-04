import apiClient from '../core/axios';

export const login = async (data) => {
  try {
    return await apiClient.post('/api/auth/login', data);
  } catch (error) {
    console.error('Error Fetching User Data:', error);
  }
}

export const register = async (data) => {
  try {
    return await apiClient.post('/api/auth/register', data);
  } catch (error) {
    console.error('Error Fetching User Data:', error);
  }
}