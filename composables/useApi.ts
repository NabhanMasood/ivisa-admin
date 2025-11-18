import axios, {
  type AxiosInstance,
  AxiosError,
  type AxiosRequestConfig,
} from "axios";

/**
 * API Configuration
 * Centralized axios instance with proper error handling and interceptors
 */
let apiInstance: AxiosInstance | null = null;

/**
 * Get or create axios instance with default configuration
 */
export const useApi = () => {
  const config = useRuntimeConfig();

  // Create instance if it doesn't exist
  if (!apiInstance) {
    apiInstance = axios.create({
      baseURL:
        config.public.NUXT_PUBLIC_API_BASE_URL ||
        config.public.API_BASE_URL ||
        "https://ivisa123-backend-production.up.railway.app",
      timeout: 30000, // 30 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor - Add auth tokens, logging, etc.
    apiInstance.interceptors.request.use(
      (config) => {
        // Add authentication token if available
        const token = useCookie("auth_token");
        if (token.value) {
          config.headers.Authorization = `Bearer ${token.value}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle errors globally
    apiInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        // Handle common errors
        if (error.response) {
          // Server responded with error status
          const status = error.response.status;

          switch (status) {
            case 401:
              // Unauthorized - redirect to login
              console.error("Unauthorized access");
              // Uncomment if you have auth setup
              // navigateTo('/login')
              break;
            case 403:
              console.error("Forbidden access");
              break;
            case 404:
              console.error("Resource not found");
              break;
            case 500:
              console.error("Server error");
              break;
          }
        } else if (error.request) {
          // Request made but no response received
          console.error("Network error - No response from server");
        } else {
          // Something else happened
          console.error("Request error:", error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  return apiInstance;
};

/**
 * API Response wrapper for consistent error handling
 */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Handle API errors and return user-friendly messages
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{
      message?: string;
      error?: string;
    }>;

    if (axiosError.response?.data) {
      return (
        axiosError.response.data.message ||
        axiosError.response.data.error ||
        "An error occurred while processing your request"
      );
    }

    if (axiosError.request) {
      return "Unable to connect to the server. Please check your internet connection.";
    }

    return axiosError.message || "An unexpected error occurred";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred";
};
