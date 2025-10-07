import axios from "axios";

// Get API URL from environment variable, fallback to localhost for development
export const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Silent error handling - errors will be handled by calling code
    return Promise.reject(error);
  }
);

export default apiClient;
