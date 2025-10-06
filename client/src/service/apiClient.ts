import axios from "axios";

// Get API URL from environment variable, fallback to localhost for development
export const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Debug: Log the API URL being used
console.log("🔗 API Base URL:", baseUrl);

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Add request interceptor for debugging
apiClient.interceptors.request.use((config) => {
  console.log(
    `API Request: ${config.method?.toUpperCase()} ${config.baseURL}${
      config.url
    }`
  );
  return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
