import axios from "axios";

const isServer = typeof window === "undefined";

export const api = axios.create({
  baseURL: isServer
    ? process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"
    : "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Optional: Interceptor for auth token
if (!isServer) {
  api.interceptors.request.use((config) => {
    // Example: attach token from localStorage if exists (client only)
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

// Optional: Response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here
    // Example: if (error.response?.status === 401) { ... }
    return Promise.reject(error);
  }
);
