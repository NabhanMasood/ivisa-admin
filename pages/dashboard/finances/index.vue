<template>
  <DashboardLayout>
          <div class="space-y-8 sm:space-y-4">
            <!-- Page Title -->
            <div
              class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4"
            >
              <div class="flex-1 min-w-0">
                <h1
                  class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white"
                >
                  Finances
                </h1>
                <label
                  class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
                  style="font-weight: 400; letter-spacing: 0%"
                >
                  Here you can find all the finances
                </label>
              </div>
            </div>
            <!-- Search and Filters Row -->
            <div
              class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4"
            >
              <!-- Search and Filter Buttons -->
              <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
                <!-- Search Bar -->
                <div class="relative flex-1 w-full sm:w-[30%]">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search Finances"
                    class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                    style="border-radius: 7px"
                  />
                </div>
              </div>

            </div>

            <!-- Stat Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              <!-- Total Revenue Card -->
              <div class="bg-white dark:bg-[#09090B] rounded-[8px] border border-gray-200 dark:border-gray-800 p-6">
                <div class="grid grid-cols-2 gap-7">
                  <div class="text-nowrap whitespace-nowrap">
                    <p class="text-sm font-normal text-[#64748B] dark:text-gray-400">Total Revenue</p>
                    <p class="text-2xl font-medium text-[#020617] dark:text-white">{{ formatCurrency(analytics.totalRevenue) }}</p>
                  </div>
                  <div class="w-full h-12">
                    <canvas ref="revenueChart"></canvas>
                  </div>
                </div>
              </div>

              <!-- Total Orders Card -->
              <div class="bg-white dark:bg-[#09090B] rounded-[8px] border border-gray-200 dark:border-gray-800 p-6">
                <div class="grid grid-cols-2 gap-7">
                  <div class="text-nowrap whitespace-nowrap">
                    <p class="text-sm font-normal text-[#64748B] dark:text-gray-400">Total Orders</p>
                    <p class="text-2xl font-medium text-[#020617] dark:text-white">{{ formatNumber(analytics.totalOrders) }}</p>
                  </div>
                  <div class="w-full h-12">
                    <canvas ref="ordersChart"></canvas>
                  </div>
                </div>
              </div>

              <!-- Pending Payments Card -->
              <div class="bg-white dark:bg-[#09090B] rounded-[8px] border border-gray-200 dark:border-gray-800 p-6">
                <div class="grid grid-cols-2 gap-7">
                  <div class="text-nowrap whitespace-nowrap">
                    <p class="text-sm font-normal text-[#64748B] dark:text-gray-400">Pending Payments</p>
                    <p class="text-2xl font-medium text-[#020617] dark:text-white">{{ formatNumber(analytics.pendingPayments) }}</p>
                  </div>
                  <div class="w-full h-12">
                    <canvas ref="pendingPaymentsChart"></canvas>
                  </div>
                </div>
              </div>

            </div>

            <!-- Finances Table -->
            <div
              class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
              style="border-radius: 7px"
            >
              <div class="overflow-x-auto">
                <table class="w-full min-w-[600px] sm:min-w-[800px]">
                  <thead
                    class="bg-[#FFFFFF] dark:bg-[#09090B] border-b dark:border-gray-800"
                  >
                    <tr class="!h-[37px] bg-[#F9FAFB] dark:bg-[#18181B]">
                      <!-- force small row height -->
                      <th
                        class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2 text-left align-middle"
                      >
                        <input
                          type="checkbox"
                          v-model="selectAll"
                          class="border-gray-300"
                          style="border-radius: 7px"
                        />
                      </th>

                      <th
                        class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Order #</span>
                        </div>
                      </th>
                      <th
                        class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Customer Name</span>
                        </div>
                      </th>
                      <th
                        class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Application</span>
                        </div>
                      </th>
                      <th
                        class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Amount</span>
                        </div>
                      </th>
                      <th
                        class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Date Paid</span>
                        </div>
                      </th>
                      <th
                        class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Status</span>
                        </div>
                      </th>
                      <th class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr v-if="isLoading" class="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td colspan="8" class="px-2 sm:px-3 lg:px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        Loading payments...
                      </td>
                    </tr>
                    <tr v-else-if="filteredOrders.length === 0" class="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td colspan="8" class="px-2 sm:px-3 lg:px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        {{ errorMessage || 'No payments found' }}
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="order in filteredOrders"
                      :key="order.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td class="px-2 sm:px-3 lg:px-4 py-2">
                        <input
                          type="checkbox"
                          v-model="order.selected"
                          class="border-gray-300"
                          style="border-radius: 7px"
                        />
                      </td>
                      <td
                        class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-white font-semibold"
                        style="
                          font-size: 14px;
                          font-weight: 400;
                          font-style: normal;
                          line-height: 20px;
                          font-family: 'Geist', sans-serif;
                          letter-spacing: 0;
                        "
                      >
                        <div class="flex items-center gap-2">
                          <span>{{ truncatePaymentIntent(order.paymentIntentId || order.transactionId || order.orderId || `ORD-${order.id}`) }}</span>
                          <button
                            @click="copyToClipboard(order.paymentIntentId || order.transactionId || order.orderId || `ORD-${order.id}`, order.id)"
                            class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                            :title="copiedIds[order.id] ? 'Copied!' : 'Copy full payment intent ID'"
                          >
                            <Check v-if="copiedIds[order.id]" class="h-3 w-3 text-green-600 dark:text-green-400" />
                            <Copy v-else class="h-3 w-3 text-gray-500 dark:text-gray-400" />
                          </button>
                        </div>
                      </td>
                      <td
                        class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-[#475467] dark:text-white"
                        style="
                          font-size: 14px;
                          font-weight: 400;
                          font-style: normal;
                          line-height: 20px;
                          font-family: 'Geist', sans-serif;
                          letter-spacing: 0;
                        "
                      >
                        {{ order.customerName || order.customer?.name || order.customer?.fullname || 'N/A' }}
                      </td>
                      <td
                        class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-[#475467] dark:text-white"
                        style="
                          font-size: 14px;
                          font-weight: 400;
                          font-style: normal;
                          line-height: 20px;
                          font-family: 'Geist', sans-serif;
                          letter-spacing: 0;
                        "
                      >
                        {{ order.application || order.applicationNumber || order.visaApplication?.applicationNumber || 'N/A' }}
                      </td>
                      <td
                        class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-[#475467] dark:text-white"
                        style="
                          font-size: 14px;
                          font-weight: 400;
                          font-style: normal;
                          line-height: 20px;
                          font-family: 'Geist', sans-serif;
                          letter-spacing: 0;
                        "
                      >
                        {{ formatPaymentAmount(order.amount, order.currency) }}
                      </td>
                      <td
                        class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-[#475467] dark:text-white"
                        style="
                          font-size: 14px;
                          font-weight: 400;
                          font-style: normal;
                          line-height: 20px;
                          font-family: 'Geist', sans-serif;
                          letter-spacing: 0;
                        "
                      >
                        {{ formatDate(order.datePaid || order.paidAt) }}
                      </td>
                      <td class="px-2 sm:px-3 lg:px-4 py-2">
                        <span
                          :class="getStatusPillClasses(order.status)"
                          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {{ formatStatus(order.status) }}
                        </span>
                      </td>
                      <td class="px-2 sm:px-3 lg:px-4 py-2">
                        <div class="flex items-center space-x-2">
                          <button
                            @click="viewOrder(order)"
                            class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            title="View"
                          >
                            <Eye
                              class="h-4 w-4 text-gray-600 dark:text-gray-400"
                            />
                          </button>
                         
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Pagination -->
            <div
              class="flex flex-row items-center justify-between flex-wrap gap-2 sm:gap-4 w-full"
            >
              <!-- Selection Count -->
              <div
                class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap"
              >
                {{ selectedCount }} of {{ orders.length }} row(s) selected.
              </div>

              <!-- Navigation Buttons -->
              <div class="flex items-center space-x-2">
                <button
                  class="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs sm:text-sm"
                  :disabled="currentPage === 1"
                  :class="{
                    'opacity-50 cursor-not-allowed': currentPage === 1,
                  }"
                  style="border-radius: 7px"
                >
                  Previous
                </button>

                <button
                  class="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs sm:text-sm"
                  style="border-radius: 7px"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </DashboardLayout>
</template>

<script setup lang="ts">
import {
  Search,
  Eye,
  Copy,
  Check,
} from "lucide-vue-next";
import { Chart, registerables } from 'chart.js';
import type { Payment } from '~/composables/usePaymentsApi';
import { usePaymentsApi } from '~/composables/usePaymentsApi';

// Register Chart.js components
Chart.register(...registerables);

// Set page title
useHead({
  title: "Finances - iVisa",
});

// API composable
const { getAllPayments, calculateAnalytics } = usePaymentsApi();

// Loading and error states
const isLoading = ref(false);
const errorMessage = ref("");

// Payments data
const payments = ref<Payment[]>([]);
const orders = ref<any[]>([]);

// Copy state
const copiedIds = ref<Record<number | string, boolean>>({});

// Analytics
const analytics = ref({
  totalRevenue: 0,
  totalOrders: 0,
  pendingPayments: 0,
});

// Chart refs
const revenueChart = ref(null);
const ordersChart = ref(null);
const pendingPaymentsChart = ref(null);

// Chart instances
let revenueChartInstance = null;
let ordersChartInstance = null;
let pendingPaymentsChartInstance = null;

// Chart data - generate from payments if available
const getChartData = () => {
  if (payments.value.length === 0) {
    return [20, 25, 30, 22, 28, 35, 40, 38, 42, 45, 38, 35, 30, 25, 20, 22, 28, 32, 35, 30, 25, 20, 18, 22, 25, 28, 30, 25, 20, 22];
  }
  
  // Generate chart data from payments by grouping by date
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  return last30Days.map(date => {
    const dayPayments = payments.value.filter(p => {
      const paymentDate = p.paidAt || p.createdAt;
      if (!paymentDate) return false;
      const paymentDateStr = new Date(paymentDate).toISOString().split('T')[0];
      return paymentDateStr === date && (p.status?.toLowerCase() === 'paid' || p.status?.toLowerCase() === 'approved');
    });
    
    return dayPayments.reduce((sum, p) => {
      const amount = typeof p.amount === 'string' 
        ? parseFloat(p.amount.replace(/[^0-9.-]+/g, '')) || 0
        : p.amount || 0;
      return sum + amount;
    }, 0);
  });
};

// Create revenue chart (stacked bar chart)
const createRevenueChart = () => {
  if (revenueChart.value) {
    const existingChart = Chart.getChart(revenueChart.value);
    if (existingChart) {
      existingChart.destroy();
    }
    
    const ctx = revenueChart.value.getContext('2d');
    const data = getChartData();
    
    revenueChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((_, i) => i + 1),
        datasets: [
          {
            label: 'Revenue',
            data: data.map(val => val * 0.6),
            backgroundColor: '#10B981',
            borderWidth: 0
          },
          {
            label: 'Additional',
            data: data.map(val => val * 0.4),
            backgroundColor: '#F59E0B',
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }
    });
  }
};

// Create line charts for other metrics
const createLineChart = (canvasRef, color = '#8B5CF6') => {
  if (canvasRef.value) {
    const existingChart = Chart.getChart(canvasRef.value);
    if (existingChart) {
      existingChart.destroy();
    }
    
    const ctx = canvasRef.value.getContext('2d');
    const data = getChartData();
    
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i + 1),
        datasets: [{
          data: data,
          borderColor: color,
          backgroundColor: color + '20',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }
    });
  }
};

// Initialize all charts
const initializeCharts = () => {
  createRevenueChart();
  ordersChartInstance = createLineChart(ordersChart, '#8B5CF6');
  pendingPaymentsChartInstance = createLineChart(pendingPaymentsChart, '#8B5CF6');
};

// Update charts with new data
const updateCharts = () => {
  if (revenueChartInstance) {
    const data = getChartData();
    revenueChartInstance.data.labels = data.map((_, i) => i + 1);
    revenueChartInstance.data.datasets[0].data = data.map(val => val * 0.6);
    revenueChartInstance.data.datasets[1].data = data.map(val => val * 0.4);
    revenueChartInstance.update();
  }
  
  if (ordersChartInstance) {
    const data = getChartData();
    ordersChartInstance.data.labels = data.map((_, i) => i + 1);
    ordersChartInstance.data.datasets[0].data = data;
    ordersChartInstance.update();
  }
  
  if (pendingPaymentsChartInstance) {
    const data = getChartData();
    pendingPaymentsChartInstance.data.labels = data.map((_, i) => i + 1);
    pendingPaymentsChartInstance.data.datasets[0].data = data;
    pendingPaymentsChartInstance.update();
  }
};

// Initialize charts on mount and load data
onMounted(async () => {
  await loadPayments();
  nextTick(() => {
    initializeCharts();
  });
});

// Cleanup on unmount
onUnmounted(() => {
  if (revenueChartInstance) revenueChartInstance.destroy();
  if (ordersChartInstance) ordersChartInstance.destroy();
  if (pendingPaymentsChartInstance) pendingPaymentsChartInstance.destroy();
});

// Load payments from API
const loadPayments = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  
  try {
    const result = await getAllPayments();
    
    if (result.success && result.data) {
      payments.value = result.data;
      
      // Transform payments to orders format for display
      orders.value = payments.value.map((payment) => ({
        id: payment.id,
        orderId: payment.orderId || payment.transactionId || `ORD-${payment.id}`,
        customerName: payment.customerName || payment.customer?.name || payment.customer?.fullname || 'N/A',
        application: payment.application || payment.applicationNumber || payment.visaApplication?.applicationNumber || 'N/A',
        destination: payment.destination || payment.destinationCountry || payment.visaApplication?.destinationCountry || 'N/A',
        amount: payment.amount,
        currency: payment.currency,
        datePaid: payment.datePaid || payment.paidAt,
        status: payment.status || 'Pending',
        selected: false,
        // Keep original payment data
        ...payment,
      }));
      
      // Calculate analytics
      analytics.value = calculateAnalytics(payments.value);
      
      // Debug logging
      if (process.dev) {
        console.log('Payments loaded:', payments.value.length);
        console.log('Analytics calculated:', analytics.value);
        console.log('Sample payment:', payments.value[0]);
      }
      
      // Update charts with new data
      nextTick(() => {
        updateCharts();
      });
    } else {
      errorMessage.value = result.message || 'Failed to load payments';
      orders.value = [];
    }
  } catch (error: any) {
    console.error('Error loading payments:', error);
    errorMessage.value = error.message || 'Failed to load payments';
    orders.value = [];
  } finally {
    isLoading.value = false;
  }
};

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);

// Dropdown states - only one can be open at a time
const statusDropdownOpen = ref(false);
const planDropdownOpen = ref(false);
const roleDropdownOpen = ref(false);





const toggleStatusDropdown = () => {
  // Close other dropdowns if open
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  // Toggle status dropdown
  statusDropdownOpen.value = !statusDropdownOpen.value;
};

const togglePlanDropdown = () => {
  // Close other dropdowns if open
  statusDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  // Toggle plan dropdown
  planDropdownOpen.value = !planDropdownOpen.value;
};

const toggleRoleDropdown = () => {
  // Close other dropdowns if open
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  // Toggle role dropdown
  roleDropdownOpen.value = !roleDropdownOpen.value;
};


// Close dropdowns when clicking outside
onMounted(() => {
  const handleClickOutside = (event) => {
    if (!event.target.closest(".relative")) {
      statusDropdownOpen.value = false;
      planDropdownOpen.value = false;
      roleDropdownOpen.value = false;
    }
  };
  document.addEventListener("click", handleClickOutside);

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});


const filteredOrders = computed(() => {
  if (!searchQuery.value) return orders.value;

  const query = searchQuery.value.toLowerCase();
  return orders.value.filter(
    (order) => {
      const paymentIntentId = (order.paymentIntentId || order.transactionId || order.orderId || `ORD-${order.id}`).toLowerCase();
      const customerName = (order.customerName || order.customer?.name || order.customer?.fullname || '').toLowerCase();
      const application = (order.application || order.applicationNumber || order.visaApplication?.applicationNumber || '').toLowerCase();
      
      return (
        paymentIntentId.includes(query) ||
        customerName.includes(query) ||
        application.includes(query)
      );
    }
  );
});

const selectedCount = computed(() => {
  return orders.value.filter((order) => order.selected).length;
});

const getStatusPillClasses = (status) => {
  if (!status) return "bg-gray-500 text-white border border-gray-500";
  
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case "approved":
    case "paid":
    case "completed":
      return "bg-black text-white border border-black";
    case "in review":
    case "processing":
    case "review":
      return "bg-white text-black border border-black";
    case "pending":
      return "bg-orange-500 text-white border border-orange-500";
    case "rejected":
    case "failed":
    case "declined":
      return "bg-red-500 text-white border border-red-500";
    case "on hold":
    case "hold":
      return "bg-gray-500 text-white border border-gray-500";
    case "refunded":
    case "refund":
      return "bg-yellow-500 text-white border border-yellow-500";
    default:
      return "bg-gray-500 text-white border border-gray-500";
  }
};

// Format status for display
const formatStatus = (status) => {
  if (!status) return 'Pending';
  return status.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

// Format payment amount
const formatPaymentAmount = (amount, currency = 'USD') => {
  if (!amount && amount !== 0) return '-';
  
  const numAmount = typeof amount === 'string' 
    ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) || 0
    : amount;
  
  if (numAmount === 0) return '-';
  
  return `${currency || 'USD'} ${numAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Format currency for display
const formatCurrency = (amount) => {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Format number for display
const formatNumber = (num) => {
  return num.toLocaleString('en-US');
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
    });
  } catch (error) {
    return '-';
  }
};

// Truncate payment intent ID to first 5-6 characters
const truncatePaymentIntent = (paymentIntentId: string | undefined | null) => {
  if (!paymentIntentId) return 'N/A';
  const id = String(paymentIntentId);
  if (id.length <= 6) return id;
  return id.substring(0, 6) + '...';
};

// Copy to clipboard function
const copyToClipboard = async (text: string, orderId: number | string) => {
  try {
    await navigator.clipboard.writeText(text);
    copiedIds.value[orderId] = true;
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      copiedIds.value[orderId] = false;
    }, 2000);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      copiedIds.value[orderId] = true;
      setTimeout(() => {
        copiedIds.value[orderId] = false;
      }, 2000);
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  }
};

// Watch for select all changes
watch(selectAll, (newValue) => {
  orders.value.forEach((order) => {
    order.selected = newValue;
  });
});

// Navigation functions
const router = useRouter();

const viewOrder = (order) => {
  router.push(`/dashboard/finances/${order.id}`);
};
</script>
