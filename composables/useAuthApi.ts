import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Permission interface
 */
export interface Permission {
  countries: boolean
  visaProducts: boolean
  nationalities: boolean
  embassies: boolean
  coupons: boolean
  additionalInfo: boolean
  customers: boolean
  applications: boolean
  finances: boolean
}

/**
 * Admin/User interface
 */
export interface Admin {
  id: number
  fullName: string
  email: string
  password?: string
  role?: string
  permissions?: Permission
  createdAt?: string
  updatedAt?: string
}

/**
 * Register DTO
 */
export interface RegisterDto {
  fullName: string
  email: string
  password: string
}

/**
 * Login DTO
 */
export interface LoginDto {
  email: string
  password: string
}

/**
 * Login Response
 */
export interface LoginResponse {
  message: string
  token: string
  admin: Admin
}

/**
 * Register Response
 */
export interface RegisterResponse {
  message: string
  admin: Admin
}

/**
 * Auth API Service
 * Provides authentication operations
 */
export const useAuthApi = () => {
  const api = useApi()

  /**
   * Register a new user
   * POST http://localhost:5000/auth/register
   */
  const register = async (data: RegisterDto): Promise<ApiResponse<RegisterResponse>> => {
    try {
      const response = await api.post<RegisterResponse>('/auth/register', data)

      return {
        data: response.data,
        message: response.data.message || 'Registration successful',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Login user
   * POST http://localhost:5000/auth/login
   */
  const login = async (data: LoginDto): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', data)

      // Store token in cookie
      if (response.data.token) {
        const tokenCookie = useCookie('admin_auth_token', {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          secure: true,
          sameSite: 'strict',
        })
        tokenCookie.value = response.data.token

        // Also store admin info (useCookie handles serialization automatically)
        const adminCookie = useCookie<Admin>('admin_user_info', {
          maxAge: 60 * 60 * 24 * 7,
          secure: true,
          sameSite: 'strict',
        })
        adminCookie.value = response.data.admin
      }

      return {
        data: response.data,
        message: response.data.message || 'Login successful',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Logout user
   */
  const logout = () => {
    const tokenCookie = useCookie('admin_auth_token')
    const adminCookie = useCookie('admin_user_info')

    tokenCookie.value = null
    adminCookie.value = null
  }

  /**
   * Get current user from token
   */
  const getCurrentUser = (): Admin | null => {
    const adminCookie = useCookie<Admin>('admin_user_info')
    if (adminCookie.value) {
      return adminCookie.value
    }
    return null
  }

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = (): boolean => {
    const tokenCookie = useCookie('admin_auth_token')
    return !!tokenCookie.value
  }

  /**
   * Get admin profile by ID from backend
   * Useful for refreshing current user data
   */
  const getAdminProfile = async (adminId: number): Promise<ApiResponse<{ admin: Admin }>> => {
    try {
      const api = useApi()
      const response = await api.get<{ status: boolean; admin: Admin }>(`/auth/profile/${adminId}`)

      // Update local cookie with fresh data
      if (response.data.status && response.data.admin) {
        const adminCookie = useCookie<Admin>('admin_user_info', {
          maxAge: 60 * 60 * 24 * 7,
          secure: true,
          sameSite: 'strict',
        })
        adminCookie.value = response.data.admin
      }

      return {
        data: response.data,
        message: 'Profile fetched successfully',
        success: response.data.status === true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  return {
    register,
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
    getAdminProfile,
  }
}

