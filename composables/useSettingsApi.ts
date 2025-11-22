import { useApi, handleApiError, type ApiResponse } from './useApi'

export interface Setting {
  id: number
  key: string
  value: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface SettingsListResponse {
  status: boolean
  message: string
  data: Array<Setting>
}

export interface SettingDetailResponse {
  status: boolean
  message: string
  data: Setting | { key: string; value: string }
}

export interface UpdateSettingDto {
  value: string
}

export const useSettingsApi = () => {
  const api = useApi()

  /**
   * Get all settings
   * GET /settings
   */
  const getAllSettings = async (): Promise<ApiResponse<SettingsListResponse['data']>> => {
    try {
      const apiInstance = api as any;
      const baseURL = apiInstance.defaults?.baseURL || 'unknown';
      console.debug('[useSettingsApi] getAllSettings: request to', `${baseURL}/settings`)
      const response = await api.get<SettingsListResponse>('/settings')
      console.debug('[useSettingsApi] getAllSettings: response', response.status, response.data)
      
      if (response.data?.status && response.data?.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      return {
        data: [],
        message: response.data?.message || 'No settings found',
        success: false,
      }
    } catch (error) {
      console.error('[useSettingsApi] getAllSettings: error', error)
      // Handle 404 specifically - endpoint might not be implemented yet
      const axiosError = error as any;
      const baseURL = axiosError?.config?.baseURL || axiosError?.request?.responseURL || 'unknown';
      const status = axiosError?.response?.status;
      
      if (status === 404) {
        return {
          data: [],
          message: `Settings endpoint not found at ${baseURL}/settings. Please verify: 1) Backend server is running, 2) Correct API base URL (check if backend is on port 8000 vs 5001), 3) Settings endpoints are implemented.`,
          success: false,
        }
      }
      
      if (status === 401 || status === 403) {
        return {
          data: [],
          message: 'Authentication required. Please ensure you are logged in as admin.',
          success: false,
        }
      }
      
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get specific setting by key
   * GET /settings/:key
   */
  const getSetting = async (key: string): Promise<ApiResponse<string>> => {
    try {
      console.debug('[useSettingsApi] getSetting: request', { key })
      const response = await api.get<SettingDetailResponse>(`/settings/${key}`)
      console.debug('[useSettingsApi] getSetting: response', response.status, response.data)
      
      if (response.data?.status && response.data?.data) {
        const value = typeof response.data.data === 'object' && 'value' in response.data.data
          ? response.data.data.value
          : (response.data.data as Setting).value
        return {
          data: value,
          message: response.data.message,
          success: true,
        }
      }
      return {
        data: '',
        message: response.data?.message || 'Setting not found',
        success: false,
      }
    } catch (error) {
      console.error('[useSettingsApi] getSetting: error', error)
      // Handle 404 specifically
      const axiosError = error as any;
      if (axiosError?.response?.status === 404) {
        return {
          data: '',
          message: 'Settings endpoint not found',
          success: false,
        }
      }
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Update setting
   * PATCH /settings/:key
   */
  const updateSetting = async (key: string, value: string): Promise<ApiResponse<Setting>> => {
    try {
      console.debug('[useSettingsApi] updateSetting: request payload', { key, value })
      const response = await api.patch<SettingDetailResponse>(`/settings/${key}`, { value })
      console.debug('[useSettingsApi] updateSetting: response', response.status, response.data)
      
      if (response.data?.status && response.data?.data) {
        const setting = typeof response.data.data === 'object' && 'id' in response.data.data
          ? response.data.data as Setting
          : null
        
        if (setting) {
          return {
            data: setting,
            message: response.data.message || 'Setting updated successfully',
            success: true,
          }
        }
      }
      
      throw new Error(response.data?.message || 'Failed to update setting')
    } catch (error) {
      console.error('[useSettingsApi] updateSetting: error', error)
      // Handle 404 specifically
      const axiosError = error as any;
      if (axiosError?.response?.status === 404) {
        throw new Error('Settings endpoint not found. Please ensure the backend API is updated with the settings endpoints.')
      }
      throw new Error(handleApiError(error))
    }
  }

  return {
    getAllSettings,
    getSetting,
    updateSetting,
  }
}

