// Define the structure of the login request
export interface LoginRequest {
  email: string;
  password: string;
}

// Define the structure of the login response (adjust according to your API's response)
export interface LoginResponse {
  status: string;
  token: string; // Example: The response could be a token or user data
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: string; // Example: The response could be a token or user data
  message: string;
}

export interface ApiInfoRequest {
  ip: string;
}

export interface ApiInfoResponseData {
  ip: string;
  city?: string;
  region?: string;
  country: string;
  loc: string;
  postal: string;
  timezone: string;
}

export interface ApiInfoResponse {
  status: string;
  data: ApiInfoResponseData;
}

// {
//     "ip": "110.54.158.145",
//     "city": "Davao",
//     "region": "Davao Region",
//     "country": "PH",
//     "loc": "7.0731,125.6128",
//     "org": "AS4775 Globe Telecoms",
//     "postal": "8000",
//     "timezone": "Asia/Manila",
//     "readme": "https://ipinfo.io/missingauth"
// }

export interface ApiHistoryRequest {
  page?: number; // Optional, page number for pagination
  limit?: number; // Optional, number of items per page
  sortField?: string; // Optional, field to sort by (e.g., 'createdAt', 'city')
  sortOrder?: 'asc' | 'desc'; // Optional, sort order (ascending or descending)
}

export interface ApiHistoryResponseData extends ApiInfoResponseData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ApiHistoryResponse {
  status: string;
  data: ApiHistoryResponseData[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  sortField: string;
  sortOrder: string;
}

export interface ApiPostHistoryRequest {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  postal?: string;
  timezone?: string;
}

export interface ApiPostHistoryResponse {
  status: string;
  data: ApiHistoryResponseData[];
}

export interface ApiDeleteHistoryRequest {
  ids: string[]; // Add ids property to match expected request shape
}

export interface ApiDeleteHistoryResponse {
  message: string;
}

export interface BookmarkNoteResponseData {
  _id: string;
  ip: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface SpicificBookmarkNoteResponse {
  status: string;
  data: BookmarkNoteResponseData;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  sortField: string;
  sortOrder: string;
}

export interface BookmarkNoteResponse {
  status: string;
  data: BookmarkNoteResponseData[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  sortField: string;
  sortOrder: string;
}

export interface BookmarkPostNoteRequest {
  ip: string;
  note: string;
}


export interface BookmarkPostNoteResponse {
  status: string;
  data: BookmarkNoteResponseData[];
}

export interface BookmarkDeleteResponse {
  message: string;
}

export interface BookmarkDeleteRequest {
  ids: string[]; // Add ids property to match expected request shape
}