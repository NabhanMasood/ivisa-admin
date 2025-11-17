<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
      <!-- Page Header -->
      <div
        class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4"
      >
        <div class="flex items-center gap-3">
          <button
            @click="goBack"
            class="p-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31] transition-colors border border-gray-200 dark:border-gray-800 w-[42px] h-[36px] flex items-center justify-center"
            style="border-radius: 5px"
            title="Go back"
          >
            <ArrowLeft class="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>
          <div class="flex-1 min-w-0">
            <h1
              class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white"
            >
              {{ payment?.orderId || payment?.transactionId || `ORD-${orderId}` }}
            </h1>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 justify-end">
        <button
          class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 border bg-white dark:bg-[#18181B] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors"
        >
          Download Docs
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Update Status
        </button>
      </div>

      <!-- Order Details Card -->
      <div
        class="bg-white dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 p-6"
      >
        <div class="space-y-6">
          <div class="flex-1 min-w-0">
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
              Order Details
            </h1>
            <label
              class="text-[#475467] dark:text-white text-[14px] sm:text-base leading-[12px] sm:leading-6"
              style="font-weight: 400; letter-spacing: 0%"
            >
              Here you can see the order details.
            </label>
          </div>

          <div v-if="isLoading" class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Loading payment details...
          </div>
          <div v-else-if="errorMessage" class="py-8 text-center text-sm text-red-500 dark:text-red-400">
            {{ errorMessage }}
          </div>
          <div v-else-if="payment" class="flex flex-col">
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Customer Name</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                payment.customerName || payment.customer?.name || payment.customer?.fullname || 'N/A'
              }}</span>
            </div>
            <div
              v-if="payment.visaApplication?.visaProduct"
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Visa Product</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                payment.visaApplication.visaProduct
              }}</span>
            </div>
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Total Amount</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                formatPaymentAmount(payment.amount, payment.currency)
              }}</span>
            </div>
            <div
              v-if="payment.stripePaymentId || payment.paymentIntentId || payment.transactionId"
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Stripe Payment ID</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                payment.stripePaymentId || payment.paymentIntentId || payment.transactionId || 'N/A'
              }}</span>
            </div>
            <div
              v-if="payment.paymentGateway"
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Payment Gateway</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                payment.paymentGateway
              }}</span>
            </div>
            <div
              v-if="payment.paymentMethod"
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Payment Method</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                payment.paymentMethod
              }}</span>
            </div>
            <div
              v-if="payment.cardholderName || payment.cardLast4"
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Card Details</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                formatCardDetails(payment.cardholderName, payment.cardLast4, payment.cardBrand)
              }}</span>
            </div>
            <div class="grid grid-cols-2 gap-4 py-5">
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Date Paid</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                formatDate(payment.datePaid || payment.paidAt)
              }}</span>
            </div>
            <div
              v-if="payment.failedAt || payment.failureReason"
              class="grid grid-cols-2 gap-4 py-5 border-t border-gray-200 dark:border-gray-700 mt-4"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Failure Reason</span
              >
              <span class="text-sm text-red-600 dark:text-red-400">{{
                payment.failureReason || 'N/A'
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "~/components/DashboardLayout.vue";
import { ArrowLeft, Download } from "lucide-vue-next";
import { usePaymentsApi } from '~/composables/usePaymentsApi';
import type { Payment } from '~/composables/usePaymentsApi';

// Get route parameters
const route = useRoute();
const router = useRouter();

// Get order ID from route params
const orderId = computed(() => route.params.id);

// API composable
const { getPaymentById } = usePaymentsApi();

// Loading and error states
const isLoading = ref(false);
const errorMessage = ref("");

// Payment data
const payment = ref<Payment | null>(null);

// Load payment from API
const loadPayment = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  
  try {
    const result = await getPaymentById(orderId.value);
    
    if (result.success && result.data) {
      payment.value = result.data;
    } else {
      errorMessage.value = result.message || 'Payment not found';
      payment.value = null;
    }
  } catch (error: any) {
    console.error('Error loading payment:', error);
    errorMessage.value = error.message || 'Failed to load payment details';
    payment.value = null;
  } finally {
    isLoading.value = false;
  }
};

// Format payment amount
const formatPaymentAmount = (amount, currency = 'USD') => {
  if (!amount && amount !== 0) return 'N/A';
  
  const numAmount = typeof amount === 'string' 
    ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) || 0
    : amount;
  
  if (numAmount === 0) return 'N/A';
  
  return `${currency || 'USD'} ${numAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Format date for display
const formatDate = (dateString) => {
  if (!dateString || dateString === '-') return '-';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    return '-';
  }
};

// Format card details
const formatCardDetails = (cardholderName, cardLast4, cardBrand) => {
  if (!cardholderName && !cardLast4) return 'N/A';
  
  let details = '';
  if (cardBrand) {
    details += cardBrand;
  }
  if (cardLast4) {
    if (details) details += ' ';
    details += `****${cardLast4}`;
  }
  if (cardholderName) {
    if (details) details += ' - ';
    details += cardholderName;
  }
  
  return details || 'N/A';
};

// Set page title
useHead({
  title: computed(() => {
    if (payment.value) {
      return `${payment.value.orderId || payment.value.transactionId || `ORD-${orderId.value}`} - Payment Details - iVisa`;
    }
    return `Payment Details - iVisa`;
  }),
});

// Load payment on mount
onMounted(() => {
  loadPayment();
});

// Navigation
const goBack = () => {
  router.push("/dashboard/finances");
};
</script>
