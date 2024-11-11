import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ApiDeleteHistoryRequest,
  ApiDeleteHistoryResponse,
  ApiHistoryRequest,
  ApiHistoryResponse,
  ApiInfoRequest,
  ApiInfoResponse,
  ApiPostHistoryRequest,
  ApiPostHistoryResponse,
  BookmarkNoteResponse,
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
  tagTypes: ['History', 'Security', 'Notes'],

  endpoints: (builder) => ({
    // Define the login mutation
    loginApiEndpoint: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login', // API endpoint for login
        method: 'POST', // HTTP method (POST)
        body: credentials, // The payload (email & password)
      }),
      invalidatesTags: ['Security'],
    }),

    // Define the register mutation
    registerApiEndpoint: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/auth/register', // API endpoint for register
        method: 'POST', // HTTP method (POST)
        body: credentials, // The payload (email & password)
      }),
      invalidatesTags: ['Security'],
    }),

    // Define the get api info mutation from third party api
    apiInfoApiEndpoint: builder.mutation<ApiInfoResponse, ApiInfoRequest>({
      query: (credentials) => ({
        url: `/api/ipinfo?ip=${credentials.ip}`, // API endpoint for register
        method: 'GET', // HTTP method (GET)
      }),
      invalidatesTags: ['History'],
    }),

    // Define the get api list mutation from mongoose
    getHistoryListEndpoint: builder.query<
      ApiHistoryResponse,
      ApiHistoryRequest
    >({
      query: ({
        page = 1,
        limit = 10,
        sortField = 'createdAt',
        sortOrder = 'desc',
      }) => ({
        url: `/api/ipinfo/search-history`,
        method: 'GET',
        params: {
          page,
          limit,
          sortField,
          sortOrder,
        },
      }),
      providesTags: ['History'],
    }),

    // Define the create mutation
    postHistoryEndpoint: builder.mutation<
      ApiPostHistoryResponse,
      ApiPostHistoryRequest
    >({
      query: (credentials) => ({
        url: '/api/ipinfo', // API endpoint for register
        method: 'POST', // HTTP method (POST)
        body: credentials, // The payload (email & password)
      }),
      invalidatesTags: ['History'],
    }),

    // Define the delete ip address mutation
    deleteHistoryEndpoint: builder.mutation<
      ApiDeleteHistoryResponse,
      ApiDeleteHistoryRequest
    >({
      query: (arg) => ({
        url: '/api/ipinfo',
        method: 'DELETE',
        body: arg, // Use `arg` here instead of `credentials`
      }),
      invalidatesTags: ['History'], // Use invalidatesTags to automatically refetch
    }),

    // Define the get api list mutation from mongoose
    getBookmarkNoteEndpoint: builder.query<
      BookmarkNoteResponse,
      ApiHistoryRequest
    >({
      query: ({
        page = 1,
        limit = 10,
        sortField = 'createdAt',
        sortOrder = 'desc',
      }) => ({
        url: `/bookmark`,
        method: 'GET',
        params: {
          page,
          limit,
          sortField,
          sortOrder,
        },
      }),
      providesTags: ['Notes'],
    }),
  }),
});

// Export the auto-generated hooks for the `loginApiEndpoint` and `registerApiEndpoint` mutations
export const {
  useLoginApiEndpointMutation,
  useRegisterApiEndpointMutation,
  useApiInfoApiEndpointMutation,
  useGetHistoryListEndpointQuery,
  usePostHistoryEndpointMutation,
  useDeleteHistoryEndpointMutation,
  useGetBookmarkNoteEndpointQuery,
} = apiSlice;
