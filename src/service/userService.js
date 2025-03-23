import apiClient from "../core/axios";
import { showAlertFromJS } from "../hooks/alerts/AlertContext";

export const userLogin = async (data) => {
    let response = { success: false };
    try {
         response = await apiClient.post('/api/auth/login', data); 
    } catch (error) {
        showAlertFromJS(error.response?.data?.message || "Login failed", "error");
    }
    return response;
};

export const userRegister = async (data) => {
    let response = { success: false };
    try {
        const response = await apiClient.post('/api/auth/register', data);
        return response;
    } catch (error) {
        showAlertFromJS(error.response?.data?.message || "Registration failed", "error");
    }
    return response;
};