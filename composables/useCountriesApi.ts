import { useApi, handleApiError, type ApiResponse } from "./useApi";

/**
 * Country interface
 */
export interface Country {
  id?: number | string;
  countryName: string;
  logoUrl?: string | null;
  code?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * API Response structure for getCountries
 */
export interface CountriesListResponse {
  status: boolean;
  message: string;
  count: number;
  data: Country[];
}

/**
 * Backend API response wrapper
 */
interface BackendApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

/**
 * Create Country DTO (for JSON payload)
 */
export interface CreateCountryDto {
  countryName: string;
  logoUrl?: string;
}

/**
 * Update Country DTO (for JSON payload)
 */
export interface UpdateCountryDto {
  countryName?: string;
  logoUrl?: string;
  code?: string;
  description?: string;
}

/**
 * Countries API Service
 * Provides all CRUD operations for countries
 */
export const useCountriesApi = () => {
  const api = useApi();
  const config = useRuntimeConfig();

  /**
   * Create a new country (supports FormData for file upload)
   */
  const createCountry = async (
    data: CreateCountryDto | FormData
  ): Promise<ApiResponse<Country>> => {
    try {
      if (data instanceof FormData) {
        // Handle FormData (file upload) - use $fetch directly
        const response = await $fetch<BackendApiResponse<Country>>(
          `${config.public.NUXT_PUBLIC_API_BASE_URL}/countries`,
          {
            method: "POST",
            body: data,
          }
        );

        return {
          data: response.data,
          message: response.message || "Country created successfully",
          success: response.status ?? true,
        };
      } else {
        // Handle JSON payload - use api wrapper
        const response = await api.post<BackendApiResponse<Country>>(
          "/countries",
          data
        );

        return {
          data: response.data.data,
          message: response.data.message || "Country created successfully",
          success: response.data.status ?? true,
        };
      }
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  };

  /**
   * Get all countries
   */
  const getCountries = async (): Promise<ApiResponse<Country[]>> => {
    try {
      const response = await api.get<CountriesListResponse>("/countries");

      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        };
      }

      return {
        data: [],
        message: response.data.message || "No countries found",
        success: false,
      };
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  };

  /**
   * Get a single country by ID
   */
  const getCountryById = async (
    id: number | string
  ): Promise<ApiResponse<Country>> => {
    try {
      const response = await api.get<BackendApiResponse<Country>>(
        `/countries/${id}`
      );

      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        };
      }

      throw new Error(response.data.message || "Country not found");
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  };

  /**
   * Update a country by ID (supports FormData for file upload)
   */
  const updateCountry = async (
    id: number | string,
    data: UpdateCountryDto | FormData
  ): Promise<ApiResponse<Country>> => {
    try {
      if (data instanceof FormData) {
        // Handle FormData (file upload) - use $fetch directly
        const response = await $fetch<BackendApiResponse<Country>>(
          `${config.public.NUXT_PUBLIC_API_BASE_URL}/countries/${id}`,
          {
            method: "PATCH",
            body: data,
          }
        );

        return {
          data: response.data,
          message: response.message || "Country updated successfully",
          success: response.status ?? true,
        };
      } else {
        // Handle JSON payload - use api wrapper
        const response = await api.patch<BackendApiResponse<Country>>(
          `/countries/${id}`,
          data
        );

        if (response.data.status && response.data.data) {
          return {
            data: response.data.data,
            message: response.data.message || "Country updated successfully",
            success: true,
          };
        }

        throw new Error(response.data.message || "Failed to update country");
      }
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  };

  /**
   * Delete a country by ID
   */
  const deleteCountry = async (
    id: number | string
  ): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/countries/${id}`);

      return {
        data: undefined,
        message: "Country deleted successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  };

  return {
    createCountry,
    getCountries,
    getCountryById,
    updateCountry,
    deleteCountry,
  };
};
