import apiClient from '../core/axios';
import { showAlertFromJS } from '../core/alerts/AlertContext';

export const login = async (data) => {
    let response = null;
    try {
         response = await apiClient.post('/api/auth/login', data); 
    } catch (error) {
        showAlertFromJS(error.response?.data?.message || "Login failed", "error");
    }
    return response == null? response = { success: false } : response;
};

export const register = async (data) => {
    let response = null;
    try {
        const response = await apiClient.post('/api/auth/register', data);
        return response;
    } catch (error) {
        showAlertFromJS(error.response?.data?.message || "Registration failed", "error");
    }
    return response == null? response = { success: false } : response;
};