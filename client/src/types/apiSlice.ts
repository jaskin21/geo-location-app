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
