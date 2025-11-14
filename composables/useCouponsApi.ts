import { useApi, handleApiError, type ApiResponse } from './useApi'

export type CouponType = 'percent' | 'amount'

export interface Coupon {
  id: number | string
  code: string
  type: CouponType
  validity: string
  value?: number
  usageLimit?: number | null
  usageCount?: number
  status?: 'enable' | 'disable'
  createdAt?: string
  updatedAt?: string
}

export interface CreateCouponDto {
  code: string
  type: CouponType
  validity: string
  value?: number
  usageLimit?: number | null
  status?: 'enable' | 'disable'
}

export interface UpdateCouponDto {
  code?: string
  type?: CouponType
  validity?: string
  value?: number
  usageLimit?: number | null
  status?: 'enable' | 'disable'
}

export interface CouponsListResponse {
  status: boolean
  message: string
  count?: number
  data: Array<Coupon>
}

export interface CouponDetailResponse {
  status: boolean
  message: string
  data: Coupon
}

export const useCouponsApi = () => {
  const api = useApi()

  const createCoupon = async (data: CreateCouponDto): Promise<ApiResponse<Coupon>> => {
    try {
      console.debug('[useCouponsApi] createCoupon: request payload', data)
      const response = await api.post<Coupon>('/coupons', data)
      console.debug('[useCouponsApi] createCoupon: response', response.status, response.data)
      return {
        data: response.data,
        message: 'Coupon created successfully',
        success: true,
      }
    } catch (error) {
      console.error('[useCouponsApi] createCoupon: error', error)
      throw new Error(handleApiError(error))
    }
  }

  const getAllCoupons = async (): Promise<ApiResponse<CouponsListResponse['data']>> => {
    try {
      console.debug('[useCouponsApi] getAllCoupons: request')
      const response = await api.get<CouponsListResponse>('/coupons')
      console.debug('[useCouponsApi] getAllCoupons: response', response.status, response.data)
      if (response.data?.status && response.data?.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      return {
        data: [],
        message: response.data?.message || 'No coupons found',
        success: false,
      }
    } catch (error) {
      console.error('[useCouponsApi] getAllCoupons: error', error)
      throw new Error(handleApiError(error))
    }
  }

  const getCouponById = async (id: number | string): Promise<ApiResponse<CouponDetailResponse['data']>> => {
    try {
      console.debug('[useCouponsApi] getCouponById: request', { id })
      const response = await api.get<CouponDetailResponse>(`/coupons/${id}`)
      console.debug('[useCouponsApi] getCouponById: response', response.status, response.data)
      if (response.data?.status && response.data?.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      return {
        data: null as any,
        message: response.data?.message || 'Coupon not found',
        success: false,
      }
    } catch (error) {
      console.error('[useCouponsApi] getCouponById: error', error)
      throw new Error(handleApiError(error))
    }
  }

  const updateCoupon = async (id: number | string, data: UpdateCouponDto): Promise<ApiResponse<Coupon>> => {
    try {
      console.debug('[useCouponsApi] updateCoupon: request payload', { id, data })
      const response = await api.patch<Coupon>(`/coupons/${id}`, data)
      console.debug('[useCouponsApi] updateCoupon: response', response.status, response.data)
      return {
        data: response.data,
        message: 'Coupon updated successfully',
        success: true,
      }
    } catch (error) {
      console.error('[useCouponsApi] updateCoupon: error', error)
      throw new Error(handleApiError(error))
    }
  }

  const deleteCoupon = async (id: number | string): Promise<ApiResponse<void>> => {
    try {
      console.debug('[useCouponsApi] deleteCoupon: request', { id })
      await api.delete(`/coupons/${id}`)
      console.debug('[useCouponsApi] deleteCoupon: success')
      return {
        data: undefined,
        message: 'Coupon deleted successfully',
        success: true,
      }
    } catch (error) {
      console.error('[useCouponsApi] deleteCoupon: error', error)
      throw new Error(handleApiError(error))
    }
  }

  return {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
  }
}


