import { useApi, handleApiError, type ApiResponse } from './useApi'

export interface Payment {
  id: number
  applicationId?: number
  customerId?: number
  orderId?: string
  transactionId?: string
  paymentIntentId?: string
  stripePaymentId?: string
  customerName?: string
  application?: string
  applicationNumber?: string
  destination?: string
  destinationCountry?: string
  amount?: string | number
  currency?: string
  status?: string
  paymentMethod?: string
  paymentGateway?: string
  cardholderName?: string
  cardLast4?: string
  cardBrand?: string
  paidAt?: string | Date
  failedAt?: string | Date
  failureReason?: string
  createdAt?: string | Date
  updatedAt?: string | Date
  datePaid?: string | Date
  // Additional fields that might be in the response
  customer?: {
    id: number
    name?: string
    fullname?: string
    email?: string
    phoneNumber?: string
  }
  visaApplication?: {
    id: number
    applicationNumber?: string
    destinationCountry?: string
    visaProduct?: string
  }
}

export interface PaymentsListResponse {
  status: boolean
  message: string
  count?: number
  data: Payment[] | {
    payments: Payment[]
    totalRevenue?: number
    totalOrders?: number
    pendingPayments?: number
    refundedOrders?: number
  }
}

export interface PaymentDetailResponse {
  status: boolean
  message: string
  data: Payment
}

export interface PaymentAnalytics {
  totalRevenue: number
  totalOrders: number
  pendingPayments: number
  refundedOrders: number
}

export const usePaymentsApi = () => {
  const api = useApi()

  /**
   * Get all payments
   * GET /payments
   */
  const getAllPayments = async (): Promise<ApiResponse<Payment[]>> => {
    try {
      const response = await api.get<PaymentsListResponse | Payment[]>('/payments')
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        // Direct array response
        return {
          data: response.data,
          success: true,
        }
      } else if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, count, data }
        const wrappedResponse = response.data as PaymentsListResponse
        if (wrappedResponse.status) {
          // Check if data is an array or object with payments array
          if (Array.isArray(wrappedResponse.data)) {
            return {
              data: wrappedResponse.data,
              message: wrappedResponse.message,
              success: true,
            }
          } else if (wrappedResponse.data && typeof wrappedResponse.data === 'object' && 'payments' in wrappedResponse.data) {
            return {
              data: (wrappedResponse.data as any).payments || [],
              message: wrappedResponse.message,
              success: true,
            }
          }
        }
        return {
          data: [],
          message: wrappedResponse.message || 'No payments found',
          success: false,
        }
      }
      
      return {
        data: [],
        message: 'No payments found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get payment by ID
   * GET /payments/:id
   */
  const getPaymentById = async (id: number | string): Promise<ApiResponse<Payment>> => {
    try {
      const response = await api.get<PaymentDetailResponse>(`/payments/${id}`)
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      return {
        data: null as any,
        message: response.data.message || 'Payment not found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get payment by application ID
   * GET /payments/application/:applicationId
   */
  const getPaymentByApplicationId = async (applicationId: number | string): Promise<ApiResponse<Payment>> => {
    try {
      const response = await api.get<PaymentDetailResponse>(`/payments/application/${applicationId}`)
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      return {
        data: null as any,
        message: response.data.message || 'Payment not found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get payments by customer ID
   * GET /payments/customer/:customerId
   * @param customerId - The customer ID
   * @param status - Optional status filter (e.g., 'completed', 'pending')
   */
  const getPaymentsByCustomerId = async (
    customerId: number | string,
    status?: string
  ): Promise<ApiResponse<Payment[]>> => {
    try {
      let url = `/payments/customer/${customerId}`
      if (status) {
        url += `?status=${encodeURIComponent(status)}`
      }
      
      const response = await api.get<PaymentsListResponse | Payment[]>(url)
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        // Direct array response
        return {
          data: response.data,
          success: true,
        }
      } else if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, count, data }
        const wrappedResponse = response.data as PaymentsListResponse
        if (wrappedResponse.status) {
          // Check if data is an array or object with payments array
          if (Array.isArray(wrappedResponse.data)) {
            return {
              data: wrappedResponse.data,
              message: wrappedResponse.message,
              success: true,
            }
          } else if (wrappedResponse.data && typeof wrappedResponse.data === 'object' && 'payments' in wrappedResponse.data) {
            return {
              data: (wrappedResponse.data as any).payments || [],
              message: wrappedResponse.message,
              success: true,
            }
          }
        }
        return {
          data: [],
          message: wrappedResponse.message || 'No payments found',
          success: false,
        }
      }
      
      return {
        data: [],
        message: 'No payments found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Calculate analytics from payments array
   */
  const calculateAnalytics = (payments: Payment[]): PaymentAnalytics => {
    const analytics: PaymentAnalytics = {
      totalRevenue: 0,
      totalOrders: payments.length,
      pendingPayments: 0,
      refundedOrders: 0,
    }

    payments.forEach((payment) => {
      const status = payment.status?.toLowerCase() || ''
      const hasPaidAt = !!(payment.paidAt || payment.datePaid)
      
      // Calculate total revenue from successful payments
      // Include payments that are: paid, approved, succeeded, completed
      // OR have a paidAt/datePaid date (indicating they were successfully paid)
      const isSuccessfulPayment = 
        status === 'paid' || 
        status === 'approved' || 
        status === 'succeeded' || 
        status === 'completed' ||
        status === 'success' ||
        hasPaidAt
      
      // Exclude refunded payments from revenue
      const isRefunded = status === 'refunded' || status === 'refund'
      
      if (isSuccessfulPayment && !isRefunded) {
        const amount = typeof payment.amount === 'string' 
          ? parseFloat(payment.amount.replace(/[^0-9.-]+/g, '')) || 0
          : (payment.amount || 0)
        analytics.totalRevenue += Math.abs(amount) // Use absolute value to handle negative amounts
      }

      // Count pending payments (exclude successful and refunded)
      if (
        !isSuccessfulPayment &&
        !isRefunded &&
        (status === 'pending' || 
         status === 'in review' ||
         status === 'processing' ||
         status === 'processing_payment' ||
         !status)
      ) {
        analytics.pendingPayments++
      }

      // Count refunded orders
      if (isRefunded) {
        analytics.refundedOrders++
      }
    })

    return analytics
  }

  return {
    getAllPayments,
    getPaymentById,
    getPaymentByApplicationId,
    getPaymentsByCustomerId,
    calculateAnalytics,
  }
}

