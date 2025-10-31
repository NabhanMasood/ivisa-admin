import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Country interface
 */
export interface Country {
  id?: number | string
  countryName: string
  code?: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

/**
 * API Response structure for getCountries
 */
export interface CountriesListResponse {
  status: boolean
  message: string
  count: number
  data: Country[]
}

/**
 * Create Country DTO
 */
export interface CreateCountryDto {
  countryName: string
}

/**
 * Update Country DTO
 */
export interface UpdateCountryDto {
  countryName?: string
  code?: string
  description?: string
}

/**
 * Countries API Service
 * Provides all CRUD operations for countries
 */
export const useCountriesApi = () => {
  const api = useApi()

  /**
   * Create a new country
   */
  const createCountry = async (data: CreateCountryDto): Promise<ApiResponse<Country>> => {
    try {
      const response = await api.post<Country>('/countries', data)
      
      return {
        data: response.data,
        message: 'Country created successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get all countries
   */
  const getCountries = async (): Promise<ApiResponse<Country[]>> => {
    try {
      const response = await api.get<CountriesListResponse>('/countries')
      
      // Handle the API response structure with status, message, count, and data
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      
      return {
        data: [],
        message: response.data.message || 'No countries found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get a single country by ID
   * GET http://localhost:5000/countries/:id
   */
  const getCountryById = async (id: number | string): Promise<ApiResponse<Country>> => {
    try {
      const response = await api.get<Country | { status: boolean; message: string; data: Country }>(`/countries/${id}`)
      
      // Handle different response structures
      let countryData: Country
      
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as { status: boolean; message: string; data: Country }
        if (wrappedResponse.status && wrappedResponse.data) {
          countryData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Country not found')
        }
      } else {
        // Direct country object
        countryData = response.data as Country
      }
      
      return {
        data: countryData,
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Update a country by ID using PATCH
   * PATCH http://localhost:5000/countries/:id
   */
  const updateCountry = async (
    id: number | string,
    data: UpdateCountryDto
  ): Promise<ApiResponse<Country>> => {
    try {
      const response = await api.patch<Country | { status: boolean; message: string; data: Country }>(`/countries/${id}`, data)
      
      // Handle different response structures
      let countryData: Country
      
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as { status: boolean; message: string; data: Country }
        if (wrappedResponse.status && wrappedResponse.data) {
          countryData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to update country')
        }
      } else {
        // Direct country object
        countryData = response.data as Country
      }
      
      return {
        data: countryData,
        message: 'Country updated successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Delete a country by ID
   */
  const deleteCountry = async (id: number | string): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/countries/${id}`)
      
      return {
        data: undefined,
        message: 'Country deleted successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  return {
    createCountry,
    getCountries,
    getCountryById,
    updateCountry,
    deleteCountry,
  }
}

