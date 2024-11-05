import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ApiInfoRequest,
  ApiInfoResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../types/apiSlice';
const baseUrl = import.meta.env.VITE_BASE_URL; // Access Vite env variable

// Create the API slice
export const apiSlice = createApi({
  reducerPath: 'api', // Unique key to define the state slice
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }), // Base URL of the API
  endpoints: (builder) => ({
    // Define the login mutation
    loginApiEndpoint: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login', // API endpoint for login
        method: 'POST', // HTTP method (POST)
        body: credentials, // The payload (email & password)
      }),
    }),

    // Define the register mutation
    registerApiEndpoint: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/auth/register', // API endpoint for register
        method: 'POST', // HTTP method (POST)
        body: credentials, // The payload (email & password)
      }),
    }),

    // Define the api info mutation
    apiInfoApiEndpoint: builder.mutation<ApiInfoResponse, ApiInfoRequest>({
      query: (credentials) => ({
        url: `/api/ipinfo?ip=${credentials.ip}`, // API endpoint for register
        method: 'GET', // HTTP method (GET)
      }),
    }),
  }),
});

// Export the auto-generated hooks for the `loginApiEndpoint` and `registerApiEndpoint` mutations
export const {
  useLoginApiEndpointMutation,
  useRegisterApiEndpointMutation,
  useApiInfoApiEndpointMutation,
} = apiSlice;
