// composables/useSalesKanban.ts
import { ref } from "vue";
import { useRuntimeConfig } from "#app";

export interface SalesKanbanApplication {
  id: number;
  applicationNumber: string;
  email: string;
  customerName: string;
  customerId: number;
  phoneNumber: string | null;
  nationality: string;
  destinationCountry: string;
  visaType: string;
  visaProductName: string;
  numberOfTravelers: number;
  totalAmount: number;
  currentStep: number;
  draftData: any;
  status: string;
  salesStatus: string;
  salesNotes: string | null;
  salesStatusUpdatedAt: string | null;
  emailCapturedAt: string;
  pendingReminderSentAt: string | null;
  couponEmailSentAt: string | null;
  createdAt: string;
  updatedAt: string;
  abandonedDaysAgo: number;
  // Inquiry specific fields
  sourceType: "application" | "inquiry";
  inquirySubject: string | null;
  inquiryMessage: string | null;
  inquiryName: string | null;
  travellingFrom: string | null;
}

export interface SalesKanbanStats {
  new_lead: number;
  contacted: number;
  follow_up: number;
  converted: number;
  lost: number;
  total: number;
}

export interface SalesKanbanFilters {
  search?: string;
  destination?: string;
  visaType?: string;
  dateFrom?: string;
  dateTo?: string;
  reminderSent?: boolean;
  couponSent?: boolean;
  minAmount?: number;
  maxAmount?: number;
  salesStatus?: string;
}

export const useSalesKanban = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const getApiBaseUrl = (): string => {
    const config = useRuntimeConfig();
    const configBaseUrl = config.public.apiBase as string | undefined;
    const baseUrl =
      typeof configBaseUrl === "string" && configBaseUrl
        ? configBaseUrl
        : "http://localhost:5001";
    return baseUrl.replace(/\/+$/, "");
  };

  /**
   * Get all draft applications for the Sales Kanban board
   */
  const getSalesKanbanApplications = async (
    filters?: SalesKanbanFilters
  ): Promise<SalesKanbanApplication[]> => {
    loading.value = true;
    error.value = null;

    try {
      const baseUrl = getApiBaseUrl();
      const url = new URL(`${baseUrl}/visa-applications/sales-kanban`);

      if (filters) {
        if (filters.search) url.searchParams.append("search", filters.search);
        if (filters.destination)
          url.searchParams.append("destination", filters.destination);
        if (filters.visaType)
          url.searchParams.append("visaType", filters.visaType);
        if (filters.dateFrom)
          url.searchParams.append("dateFrom", filters.dateFrom);
        if (filters.dateTo) url.searchParams.append("dateTo", filters.dateTo);
        if (filters.reminderSent !== undefined)
          url.searchParams.append("reminderSent", String(filters.reminderSent));
        if (filters.couponSent !== undefined)
          url.searchParams.append("couponSent", String(filters.couponSent));
        if (filters.minAmount !== undefined)
          url.searchParams.append("minAmount", String(filters.minAmount));
        if (filters.maxAmount !== undefined)
          url.searchParams.append("maxAmount", String(filters.maxAmount));
        if (filters.salesStatus)
          url.searchParams.append("salesStatus", filters.salesStatus);
      }

      const response = await fetch(url.toString());
      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(
          result.message || "Failed to fetch sales kanban applications"
        );
      }

      return result.data;
    } catch (err: any) {
      error.value = err.message || "An error occurred";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Get statistics for the Sales Kanban board
   */
  const getSalesKanbanStats = async (): Promise<SalesKanbanStats> => {
    loading.value = true;
    error.value = null;

    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(
        `${baseUrl}/visa-applications/sales-kanban/stats`
      );
      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(result.message || "Failed to fetch sales kanban stats");
      }

      return result.data;
    } catch (err: any) {
      error.value = err.message || "An error occurred";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Update the sales status of an application (drag-drop)
   */
  const updateSalesStatus = async (
    id: number,
    salesStatus: string,
    salesNotes?: string
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(
        `${baseUrl}/visa-applications/${id}/sales-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ salesStatus, salesNotes }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(result.message || "Failed to update sales status");
      }

      return result.data;
    } catch (err: any) {
      error.value = err.message || "An error occurred";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Get unique destinations for filter dropdown
   */
  const getDestinations = async (): Promise<string[]> => {
    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(
        `${baseUrl}/visa-applications/sales-kanban/destinations`
      );
      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(result.message || "Failed to fetch destinations");
      }

      return result.data;
    } catch (err: any) {
      error.value = err.message || "An error occurred";
      return [];
    }
  };

  /**
   * Get unique visa types for filter dropdown
   */
  const getVisaTypes = async (): Promise<string[]> => {
    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(
        `${baseUrl}/visa-applications/sales-kanban/visa-types`
      );
      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(result.message || "Failed to fetch visa types");
      }

      return result.data;
    } catch (err: any) {
      error.value = err.message || "An error occurred";
      return [];
    }
  };

  /**
   * Send a custom email to an application's customer
   */
  const sendCustomEmail = async (
    applicationId: number,
    subject: string,
    body: string
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(
        `${baseUrl}/visa-applications/sales-kanban/send-custom-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ applicationId, subject, body }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(result.message || "Failed to send custom email");
      }

      return result.data;
    } catch (err: any) {
      error.value = err.message || "An error occurred";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Send a template email to an application's customer
   */
  const sendTemplateEmail = async (
    applicationId: number,
    templateType: "reminder" | "coupon" | "help_offer",
    couponCode?: string
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(
        `${baseUrl}/visa-applications/sales-kanban/send-template-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ applicationId, templateType, couponCode }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(result.message || "Failed to send template email");
      }

      return result.data;
    } catch (err: any) {
      error.value = err.message || "An error occurred";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Get available coupons for dropdown
   */
  const getAvailableCoupons = async (): Promise<
    Array<{
      id: number;
      code: string;
      type: "percent" | "amount";
      value: number;
      validity: string;
      status: string;
    }>
  > => {
    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/coupons`);
      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(result.message || "Failed to fetch coupons");
      }

      // Filter only enabled and valid coupons
      const today = new Date().toISOString().split("T")[0];
      return result.data.filter(
        (c: any) => c.status === "enable" && c.validity >= today
      );
    } catch (err: any) {
      error.value = err.message || "An error occurred";
      return [];
    }
  };

  /**
   * Get new lead count for sidebar badge
   */
  const getNewLeadCount = async (): Promise<number> => {
    try {
      const stats = await getSalesKanbanStats();
      return stats.new_lead || 0;
    } catch (err: any) {
      error.value = err.message || "An error occurred";
      return 0;
    }
  };

  return {
    loading,
    error,
    getSalesKanbanApplications,
    getSalesKanbanStats,
    updateSalesStatus,
    getDestinations,
    getVisaTypes,
    sendCustomEmail,
    sendTemplateEmail,
    getAvailableCoupons,
    getNewLeadCount,
  };
};
