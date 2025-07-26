import axios from 'axios';

const BASE_URL = 'https://akil-backend.onrender.com';

/**
 * Sends signup request
 */
export const signup = async (data) => {
  const response = await axios.post(`${BASE_URL}/signup`, data);
  return response.data;
};

/**
 * Sends login request and returns token
 */
export const login = async (data) => {
  const response = await axios.post(`${BASE_URL}/login`, data);
  return response.data;
};

/**
 * Stores token securely (can be switched to cookies)
 */
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Retrieves token
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Removes token on logout
 */
export const logout = () => {
  localStorage.removeItem('token');
};

/**
 * Check if user is logged in
 */
export const isAuthenticated = () => {
  return !!getToken();
};
