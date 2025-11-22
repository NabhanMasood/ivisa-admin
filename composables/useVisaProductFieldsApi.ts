import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Visa Product Field interface
 */
export interface VisaProductField {
  id?: number
  visaProductId: number
  fieldType: 'text' | 'number' | 'date' | 'upload' | 'dropdown' | 'textarea'
  question: string
  isRequired: boolean
  displayOrder: number
  isActive: boolean
  options?: string[] // For dropdown fields
  minLength?: number // For text/number fields
  maxLength?: number // For text/number fields
  allowedFileTypes?: string[] // For upload fields
  maxFileSize?: number // For upload fields (in bytes)
  createdAt?: string
  updatedAt?: string
}

/**
 * Create Visa Product Field DTO
 */
export interface CreateVisaProductFieldDto {
  visaProductId: number
  fieldType: 'text' | 'number' | 'date' | 'upload' | 'dropdown' | 'textarea'
  question: string
  isRequired?: boolean
  displayOrder?: number
  isActive?: boolean
  options?: string[]
  minLength?: number
  maxLength?: number
  allowedFileTypes?: string[]
  maxFileSize?: number
}

/**
 * Update Visa Product Field DTO
 */
export interface UpdateVisaProductFieldDto {
  visaProductId?: number
  fieldType?: 'text' | 'number' | 'date' | 'upload' | 'dropdown' | 'textarea'
  question?: string
  isRequired?: boolean
  displayOrder?: number
  isActive?: boolean
  options?: string[]
  minLength?: number
  maxLength?: number
  allowedFileTypes?: string[]
  maxFileSize?: number
}

/**
 * API Response structure for getVisaProductFields
 */
export interface VisaProductFieldsListResponse {
  status: boolean
  message: string
  count?: number
  data: VisaProductField[]
}

/**
 * Visa Product Fields API Service
 * Provides all CRUD operations for visa product fields
 */
export const useVisaProductFieldsApi = () => {
  const api = useApi()
  const debug = (msg: string, data?: any) => {
    try { console.log(msg, data) } catch { }
  }

  /**
   * Create a new visa product field
   * POST /visa-product-fields
   */
  const createVisaProductField = async (
    data: CreateVisaProductFieldDto
  ): Promise<ApiResponse<VisaProductField>> => {
    try {
      const response = await api.post<VisaProductField | { status: boolean; message: string; data: VisaProductField }>(
        '/visa-product-fields',
        data
      )

      let fieldData: VisaProductField

      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as { status: boolean; message: string; data: VisaProductField }
        if (wrappedResponse.status && wrappedResponse.data) {
          fieldData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to create visa product field')
        }
      } else {
        fieldData = response.data as VisaProductField
      }

      return {
        data: fieldData,
        message: 'Visa product field created successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get all fields for a visa product
   * GET /visa-product-fields/by-visa-product/:visaProductId
   */
  const getVisaProductFieldsByVisaProduct = async (
    visaProductId: number | string
  ): Promise<ApiResponse<VisaProductField[]>> => {
    try {
      const response = await api.get<VisaProductFieldsListResponse | VisaProductField[]>(
        `/visa-product-fields/by-visa-product/${visaProductId}`
      )

      if (Array.isArray(response.data)) {
        return {
          data: response.data,
          success: true,
        }
      } else if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as VisaProductFieldsListResponse
        if (wrappedResponse.status && wrappedResponse.data) {
          return {
            data: wrappedResponse.data,
            message: wrappedResponse.message,
            success: true,
          }
        }
        return {
          data: [],
          message: wrappedResponse.message || 'No fields found',
          success: false,
        }
      }

      return {
        data: [],
        message: 'No fields found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get a single field by ID
   * GET /visa-product-fields/:id
   */
  const getVisaProductFieldById = async (
    id: number | string
  ): Promise<ApiResponse<VisaProductField>> => {
    try {
      const response = await api.get<VisaProductField | { status: boolean; message: string; data: VisaProductField }>(
        `/visa-product-fields/${id}`
      )

      let fieldData: VisaProductField

      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as { status: boolean; message: string; data: VisaProductField }
        if (wrappedResponse.status && wrappedResponse.data) {
          fieldData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Visa product field not found')
        }
      } else {
        fieldData = response.data as VisaProductField
      }

      return {
        data: fieldData,
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Update a visa product field by ID
   * PATCH /visa-product-fields/:id
   */
  const updateVisaProductField = async (
    id: number | string,
    data: UpdateVisaProductFieldDto
  ): Promise<ApiResponse<VisaProductField>> => {
    try {
      const response = await api.patch<VisaProductField | { status: boolean; message: string; data: VisaProductField }>(
        `/visa-product-fields/${id}`,
        data
      )

      let fieldData: VisaProductField

      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as { status: boolean; message: string; data: VisaProductField }
        if (wrappedResponse.status && wrappedResponse.data) {
          fieldData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to update visa product field')
        }
      } else {
        fieldData = response.data as VisaProductField
      }

      return {
        data: fieldData,
        message: 'Visa product field updated successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Delete a visa product field by ID
   * DELETE /visa-product-fields/:id
   */
  const deleteVisaProductField = async (
    id: number | string
  ): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/visa-product-fields/${id}`)

      return {
        data: undefined,
        message: 'Visa product field deleted successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Duplicate a visa product field by ID
   * POST /visa-product-fields/:id/duplicate
   */
  const duplicateVisaProductField = async (
    id: number | string
  ): Promise<ApiResponse<VisaProductField>> => {
    try {
      const response = await api.post<VisaProductField | { status: boolean; message: string; data: VisaProductField }>(
        `/visa-product-fields/${id}/duplicate`,
        {}
      )

      let fieldData: VisaProductField

      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as { status: boolean; message: string; data: VisaProductField }
        if (wrappedResponse.status && wrappedResponse.data) {
          fieldData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to duplicate visa product field')
        }
      } else {
        fieldData = response.data as VisaProductField
      }

      return {
        data: fieldData,
        message: 'Visa product field duplicated successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get all fields (if backend supports it)
   * This might need to be implemented by getting all visa products and their fields
   */
  const getAllVisaProductFields = async (): Promise<ApiResponse<VisaProductField[]>> => {
    try {
      // Try to get all fields directly (if backend supports it)
      // Otherwise, we'll need to get all visa products and fetch their fields
      debug('🔵 getAllVisaProductFields', { url: '/visa-product-fields' })
      const response = await api.get<VisaProductFieldsListResponse | VisaProductField[]>(
        '/visa-product-fields'
      )

      if (Array.isArray(response.data)) {
        return {
          data: response.data,
          success: true,
        }
      } else if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as VisaProductFieldsListResponse
        if (wrappedResponse.status && wrappedResponse.data) {
          return {
            data: wrappedResponse.data,
            message: wrappedResponse.message,
            success: true,
          }
        }
        return {
          data: [],
          message: wrappedResponse.message || 'No fields found',
          success: false,
        }
      }

      return {
        data: [],
        message: 'No fields found',
        success: false,
      }
    } catch (error) {
      // If endpoint doesn't exist, return empty array
      // The list page will handle fetching fields per visa product
      return {
        data: [],
        message: 'Endpoint not available. Use getVisaProductFieldsByVisaProduct instead.',
        success: false,
      }
    }
  }

  /**
   * Get fields WITH responses for a specific application (optionally scoped to a traveler)
   * GET /visa-product-fields/by-application/:applicationId?travelerId=...
   *
   * Returns field definitions already merged with any existing responses.
   */
  const getFieldsWithResponsesByApplication = async (
    applicationId: number | string,
    travelerId?: number | string
  ): Promise<ApiResponse<any>> => {
    try {
      const query = travelerId ? `?travelerId=${encodeURIComponent(String(travelerId))}` : ''
      debug('🔵 getFieldsWithResponsesByApplication', {
        applicationId,
        travelerId,
        url: `/visa-product-fields/by-application/${applicationId}${query}`,
      })
      const response = await api.get<any>(`/visa-product-fields/by-application/${applicationId}${query}`)
      // Assume backend returns a wrapped { status, message, data } or direct data
      if (response && typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrapped = response.data as { status: boolean; message?: string; data?: any }
        return {
          data: wrapped.data ?? null,
          message: wrapped.message,
          success: !!wrapped.status,
        }
      }
      return {
        data: response?.data ?? null,
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get only responses for an application (optionally for a traveler)
   * GET /visa-product-fields/responses/:applicationId?travelerId=...
   *
   * Expected to return an object keyed by fieldId.
   */
  const getResponsesByApplication = async (
    applicationId: number | string,
    travelerId?: number | string
  ): Promise<ApiResponse<Record<string | number, any>>> => {
    try {
      const query = travelerId ? `?travelerId=${encodeURIComponent(String(travelerId))}` : ''
      debug('🔵 getResponsesByApplication', {
        applicationId,
        travelerId,
        url: `/visa-product-fields/responses/${applicationId}${query}`,
      })
      const response = await api.get<any>(`/visa-product-fields/responses/${applicationId}${query}`)
      if (response && typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrapped = response.data as { status: boolean; message?: string; data?: any }
        return {
          data: (wrapped.data as Record<string | number, any>) ?? {},
          message: wrapped.message,
          success: !!wrapped.status,
        }
      }
      return {
        data: (response?.data as Record<string | number, any>) ?? {},
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  return {
    createVisaProductField,
    getVisaProductFieldsByVisaProduct,
    getVisaProductFieldById,
    updateVisaProductField,
    deleteVisaProductField,
    duplicateVisaProductField,
    getAllVisaProductFields,
    getFieldsWithResponsesByApplication,
    getResponsesByApplication,
  }
}
