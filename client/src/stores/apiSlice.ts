import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the structure of the login request
interface LoginRequest {
  email: string;
  password: string;
}

// Define the structure of the login response (adjust according to your API's response)
interface LoginResponse {
  token: string; // Example: The response could be a token or user data
  user: {
    id: string;
    email: string;
  };
}

const baseUrl = import.meta.env.VITE_BASE_URL;

// Create the API slice
export const apiSlice = createApi({
  reducerPath: 'api', // Unique key to define the state slice
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }), // Base URL of the API
  endpoints: (builder) => ({
    // Define the login mutation
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login', // API endpoint for login
        method: 'POST', // HTTP method (POST)
        body: credentials, // The payload (email & password)
      }),
    }),
  }),
});

// Export the auto-generated hook for the `login` mutation
export const { useLoginMutation } = apiSlice;
