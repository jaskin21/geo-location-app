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
    ip: string,
    city?: string,
    region?: string,
    country: string,
    loc: string,
    postal: string,
    timezone: string
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
