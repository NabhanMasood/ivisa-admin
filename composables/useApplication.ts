// composables/useApplication.ts
import { ref } from "vue";
import { useRuntimeConfig } from "#app";


/**
 * Helper function to get API base URL from runtime config
 */
const getApiBaseUrl = (): string => {
  const config = useRuntimeConfig();
  const configBaseUrl = config.public.apiBase as string | undefined;
  const baseUrl = (typeof configBaseUrl === 'string' && configBaseUrl) ? configBaseUrl : "http://localhost:5001";
  return baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
};

export interface TravelerData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'Male' | 'Female' | 'Other'
  passportNationality: string
  passportNumber: string
  passportExpiryDate: string
  residenceCountry: string
  hasSchengenVisa: boolean
  placeOfBirth?: string
}

export interface PaymentData {
  cardholderName: string
  cardLast4?: string
  cardBrand?: string
  transactionId?: string
  paymentIntentId?: string
  paymentGateway?: string
}

export interface CompleteApplicationData {
  customerId?: number
  visaProductId: number
  nationality: string
  destinationCountry: string
  visaType: '180-single' | '180-multiple' | '90-single'
  numberOfTravelers: number
  travelers: TravelerData[]
  processingType: 'standard' | 'rush' | 'super-rush'
  processingFee: number
  payment: PaymentData
  notes?: string
}

export type AdminCustomField = {
  fieldType: 'text' | 'number' | 'date' | 'dropdown' | 'upload' | 'textarea'
  question: string
  isRequired?: boolean
  options?: string[]
  minLength?: number
  maxLength?: number
  allowedFileTypes?: string[]
  maxFileSize?: number
  travelerId?: number
}

export type ResubmissionRequest = {
  target: 'application' | 'traveler'
  travelerId?: number
  fieldIds?: number[]
  newFields?: AdminCustomField[]
  note?: string | null
}

export const useApplication = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const createCustomerFromTraveler = async (traveler: TravelerData) => {
    try {
      const config = useRuntimeConfig()
      const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '')

      const response = await fetch(`${baseUrl}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: `${traveler.firstName} ${traveler.lastName}`,
          email: traveler.email,
          phone: traveler.phone,
          residenceCountry: traveler.residenceCountry,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to create customer')
      }

      return result.data
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create customer')
    }
  }

  const submitCompleteApplication = async (data: CompleteApplicationData) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '')

      let customerId = data.customerId

      if (!customerId && data.travelers.length > 0) {
        const firstTraveler = data.travelers[0]
        if (!firstTraveler) {
          throw new Error('At least one traveler is required')
        }
        const customer = await createCustomerFromTraveler(firstTraveler)
        customerId = customer.id
      }

      if (!customerId) {
        throw new Error('Unable to create or find customer')
      }

      const response = await fetch(`${baseUrl}/visa-applications/submit-complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          customerId,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to submit application')
      }

      return {
        ...result.data,
        customerId,
      }
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getAllApplications = async (search?: string) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '')

      const url = new URL(`${baseUrl}/visa-applications`)
      if (search) {
        url.searchParams.append('search', search)
      }

      const response = await fetch(url.toString())
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch applications')
      }

      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getApplication = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '')

      const response = await fetch(`${baseUrl}/visa-applications/${id}`)
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch application')
      }

      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getCustomerApplications = async (customerId: number, search?: string) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '')

      const url = new URL(`${baseUrl}/visa-applications/customer/${customerId}`)
      if (search) {
        url.searchParams.append('search', search)
      }

      const response = await fetch(url.toString())
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch customer applications')
      }

      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getApplicationSummary = async () => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '')

      const response = await fetch(`${baseUrl}/visa-applications/summary`)
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch summary')
      }

      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getApplicationTravelers = async (applicationId: number | string) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '')

      // Fetch the whole application and return its travelers array
      const response = await fetch(`${baseUrl}/visa-applications/${applicationId}`)
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch application')
        throw new Error(result.message || 'Failed to fetch application')
      }

      return Array.isArray(result.data?.travelers) ? result.data.travelers : []
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getApplicationPayment = async (applicationId: number | string) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '')

      const response = await fetch(`${baseUrl}/payments/application/${applicationId}`)
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch payment')
      }

      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getActiveResubmissionRequests = async (applicationId: number | string) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '')

      const response = await fetch(`${baseUrl}/visa-applications/${applicationId}/resubmission-requests/active`)
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch resubmission requests')
      }

      return result
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }


  const requestResubmission = async (
    applicationId: number | string,
    requests: ResubmissionRequest[]
  ) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '')

      try {
        console.log('🔵 requestResubmission called', {
          applicationId,
          url: `${baseUrl}/visa-applications/${applicationId}/resubmission-requests`,
          requestsCount: requests.length,
          requests: requests.map(r => ({
            target: r.target,
            travelerId: r.travelerId,
            fieldIdsCount: r.fieldIds?.length || 0,
            newFieldsCount: r.newFields?.length || 0,
            hasNote: !!r.note
          }))
        })
      } catch { }

      const response = await fetch(`${baseUrl}/visa-applications/${applicationId}/resubmission-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests }),
      })

      const result = await response.json()

      try {
        console.log('🟢 requestResubmission response', {
          ok: response.ok,
          status: response.status,
          result
        })
      } catch { }

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to request resubmission')
      }

      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }


  const updateApplicationStatus = async (id: number | string, status: string) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '')

      const response = await fetch(`${baseUrl}/visa-applications/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to update application status')
      }

      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    submitCompleteApplication,
    getAllApplications,
    getApplication,
    getCustomerApplications,
    getApplicationSummary,
    getApplicationTravelers,
    getApplicationPayment,
    requestResubmission,
    getActiveResubmissionRequests,
    updateApplicationStatus,
  };
};
