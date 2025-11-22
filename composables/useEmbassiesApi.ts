import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Embassy interface
 */
export interface Embassy {
  id?: number | string
  embassyName: string
  location: string
  destinationCountry: string
  originCountry: string
  createdAt?: string
  updatedAt?: string
}

/**
 * Create Embassy DTO
 */
export interface CreateEmbassyDto {
  destinationCountry: string
  originCountry: string
  embassyName: string
  address: string
}

/**
 * API Response structure for getAllEmbassies
 */
export interface EmbassiesListResponse {
  status: boolean
  message: string
  count: number
  data: Array<{
    destinationCountry: string
    originCountriesCount: number
  }>
}

/**
 * API Response structure for getEmbassiesByDestination
 */
export interface EmbassiesByDestinationResponse {
  status: boolean
  message: string
  count: number
  data: Array<{
    originCountry: string
    embassiesCount: number
  }>
}

/**
 * API Response structure for getEmbassiesByDestinationAndOrigin
 */
export interface EmbassiesByDestinationAndOriginResponse {
  status: boolean
  message: string
  count: number
  data: Embassy[]
}

/**
 * Embassies API Service
 * Provides all CRUD operations for embassies
 */
export const useEmbassiesApi = () => {
  const api = useApi()

  /**
   * Create a new embassy
   * POST http://localhost:5000/embassies
   */
  const createEmbassy = async (data: CreateEmbassyDto): Promise<ApiResponse<Embassy>> => {
    try {
      const response = await api.post<Embassy | { status: boolean; message: string; data: Embassy }>('/embassies', data)
      
      // Handle different response structures
      let embassyData: Embassy
      
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as { status: boolean; message: string; data: Embassy }
        if (wrappedResponse.status && wrappedResponse.data) {
          embassyData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to create embassy')
        }
      } else {
        // Direct embassy object
        embassyData = response.data as Embassy
      }
      
      return {
        data: embassyData,
        message: 'Embassy created successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get all embassies (summary)
   * GET http://localhost:5000/embassies
   */
  const getAllEmbassies = async (): Promise<ApiResponse<Array<{ destinationCountry: string; originCountriesCount: number }>>> => {
    try {
      const response = await api.get<EmbassiesListResponse>('/embassies')
      
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
        message: response.data.message || 'No embassies found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get embassies by destination country
   * GET http://localhost:5000/embassies/destination/:country
   */
  const getEmbassiesByDestination = async (destinationCountry: string): Promise<ApiResponse<Array<{ originCountry: string; embassiesCount: number }>>> => {
    try {
      const response = await api.get<EmbassiesByDestinationResponse>(`/embassies/destination/${encodeURIComponent(destinationCountry)}`)
      
      // Handle the API response structure
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      
      return {
        data: [],
        message: response.data.message || 'No embassies found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get embassies by destination and origin country
   * GET http://localhost:5000/embassies/destination/:country/origin/:originCountry
   */
  const getEmbassiesByDestinationAndOrigin = async (
    destinationCountry: string,
    originCountry: string
  ): Promise<ApiResponse<Embassy[]>> => {
    try {
      const response = await api.get<EmbassiesByDestinationAndOriginResponse>(
        `/embassies/destination/${encodeURIComponent(destinationCountry)}/origin/${encodeURIComponent(originCountry)}`
      )
      
      // Handle the API response structure
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      
      return {
        data: [],
        message: response.data.message || 'No embassies found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Delete an embassy by ID
   * DELETE /embassies/:id
   */
  const deleteEmbassy = async (id: number | string): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/embassies/${id}`)
      
      return {
        data: undefined,
        message: 'Embassy deleted successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Delete embassies by destination country
   * DELETE /embassies/destination/:country
   */
  const deleteEmbassiesByDestination = async (destinationCountry: string): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/embassies/destination/${encodeURIComponent(destinationCountry)}`)
      
      return {
        data: undefined,
        message: 'Embassies deleted successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Delete embassies by destination and origin country
   * DELETE /embassies/destination/:country/origin/:originCountry
   */
  const deleteEmbassiesByDestinationAndOrigin = async (
    destinationCountry: string,
    originCountry: string
  ): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/embassies/destination/${encodeURIComponent(destinationCountry)}/origin/${encodeURIComponent(originCountry)}`)
      
      return {
        data: undefined,
        message: 'Embassies deleted successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  return {
    createEmbassy,
    getAllEmbassies,
    getEmbassiesByDestination,
    getEmbassiesByDestinationAndOrigin,
    deleteEmbassy,
    deleteEmbassiesByDestination,
    deleteEmbassiesByDestinationAndOrigin,
  }
}

