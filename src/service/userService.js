import apiClient from '../core/axios';

export const login = async (data) => {
  try {
    const response = await apiClient.post('/api/auth/login', data);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error Fetching User Data:', error);
    throw error;
  }
}

export const register = async (data) => {
  try {
    return await apiClient.post('/api/auth/register', data);
  } catch (error) {
    console.error('Error Fetching User Data:', error);
  }
}