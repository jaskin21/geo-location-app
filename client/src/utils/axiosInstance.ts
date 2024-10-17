import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // Replace with your actual API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    // Save the token (e.g., JWT) in localStorage or sessionStorage
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token); // Store token securely
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`; // Set token for future requests
    }

    return response.data;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post('/auth/register', {
      username,
      email,
      password,
      role: 'user',
    });
    console.log(response);
    // Save the token (e.g., JWT) in localStorage or sessionStorage
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token); // Store token securely
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`; // Set token for future requests
    }

    return response.data;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};
