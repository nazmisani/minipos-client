import axios from "axios";
import { baseUrl } from "./api";

// Create axios instance
export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Add request interceptor to include token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from cookie or localStorage
    if (typeof window !== "undefined") {
      // Try to get from cookie first (if using HttpOnly cookies)
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      // Or get from localStorage as fallback
      const localToken = localStorage.getItem("token");

      const authToken = token || localToken;

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on 401
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
