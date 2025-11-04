import { useApi, handleApiError, type ApiResponse } from './useApi'

export interface Customer {
  id?: number | string
  name?: string
  customerName?: string
  email: string
  phone: string
  fullname?: string
  residenceCountry?: string
  totalApplications?: number
  status?: string
  createdDate?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateCustomerDto {
  fullname: string
  email: string
  phone: string
  residenceCountry: string
}

export interface CustomersListResponse {
  status: boolean
  message: string
  count: number
  data: Array<{
    id: number
    name: string
    email: string
    phone: string
    totalApplications: number
    status: string
  }>
}

export interface CustomerDetailResponse {
  status: boolean
  message: string
  data: {
    id: number
    customerName: string
    email: string
    phone: string
    residenceCountry: string
    createdDate: string
    createdAt: string
    updatedAt: string
  }
}

export interface BillingInfoResponse {
  status: boolean
  message: string
  data: {
    totalOrders: number
    totalSpent: string
    lastPayment: string | null
  }
}

export interface ApplicationsResponse {
  status: boolean
  message: string
  count: number
  data: Array<{
    id: number
    applicationNumber?: string
    destination?: string
    visaProduct?: string
    price?: string
    status?: string
  }>
}

export const useCustomersApi = () => {
  const api = useApi()

  const createCustomer = async (data: CreateCustomerDto): Promise<ApiResponse<Customer>> => {
    try {
      const response = await api.post<Customer>('/customers', data)
      return {
        data: response.data,
        message: 'Customer created successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  const getAllCustomers = async (): Promise<ApiResponse<CustomersListResponse['data']>> => {
    try {
      const response = await api.get<CustomersListResponse>('/customers')
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      return {
        data: [],
        message: response.data.message || 'No customers found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  const getCustomerById = async (id: number | string): Promise<ApiResponse<CustomerDetailResponse['data']>> => {
    try {
      const response = await api.get<CustomerDetailResponse>(`/customers/${id}`)
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      return {
        data: null as any,
        message: response.data.message || 'Customer not found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  const getCustomerBilling = async (id: number | string): Promise<ApiResponse<BillingInfoResponse['data']>> => {
    try {
      const response = await api.get<BillingInfoResponse>(`/customers/${id}/billing`)
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      return {
        data: {
          totalOrders: 0,
          totalSpent: '0.00',
          lastPayment: null,
        },
        message: response.data.message || 'Billing info not found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  const getCustomerApplications = async (id: number | string): Promise<ApiResponse<ApplicationsResponse['data']>> => {
    try {
      const response = await api.get<ApplicationsResponse>(`/customers/${id}/applications`)
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      return {
        data: [],
        message: response.data.message || 'No applications found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  return {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    getCustomerBilling,
    getCustomerApplications,
  }
}

