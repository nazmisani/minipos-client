import axios from "axios";

// Get API URL from environment variable, fallback to localhost for development
export const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Add request interceptor to log outgoing requests
apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `🔵 API Request: ${config.method?.toUpperCase()} ${config.url}`,
      {
        data: config.data,
        params: config.params,
      }
    );
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `✅ API Response: ${response.config.method?.toUpperCase()} ${
        response.config.url
      }`,
      {
        status: response.status,
        data: response.data,
      }
    );
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      // Server responded with error status
      console.error("❌ API Error Response:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
        method: error.config?.method,
        requestData: error.config?.data,
      });

      // Add user-friendly error message
      if (error.response.status === 400) {
        error.userMessage =
          error.response.data?.message ||
          "Invalid request. Please check your input.";
      } else if (error.response.status === 401) {
        error.userMessage = "Unauthorized. Please login again.";
      } else if (error.response.status === 403) {
        error.userMessage = "You don't have permission to do this action.";
      } else if (error.response.status === 404) {
        error.userMessage = "Resource not found.";
      } else if (error.response.status === 500) {
        error.userMessage =
          "Server error. Please try again or contact support.";
      }
    } else if (error.request) {
      // Request made but no response
      console.error("❌ API No Response:", {
        url: error.config?.url,
        method: error.config?.method,
      });
      error.userMessage =
        "Cannot connect to server. Check your internet connection.";
    } else {
      // Something else happened
      console.error("❌ API Error:", error.message);
      error.userMessage = "An unexpected error occurred.";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
