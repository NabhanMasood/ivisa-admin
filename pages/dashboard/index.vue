<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
      <!-- Page Header -->
      <div class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4">
        <div class="flex-1 min-w-0">
          <h1 class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <label class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
            style="font-weight: 400; letter-spacing: 0%">
            Here's what's happening.
          </label>
        </div>
      </div>

      <!-- Date Filter Tabs -->
      <div class="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-[8px] w-fit">
        <button
          @click="selectedPeriod = '30d'"
          :class="[
            selectedPeriod === '30d'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            'px-4 py-2 rounded-[6px] text-sm font-medium transition-all duration-200'
          ]"
        >
          30 Days
        </button>
        <button
          @click="selectedPeriod = '7d'"
          :class="[
            selectedPeriod === '7d'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            'px-4 py-2 rounded-[6px] text-sm font-medium transition-all duration-200'
          ]"
        >
          7 Days
        </button>
        <button
          @click="selectedPeriod = '24h'"
          :class="[
            selectedPeriod === '24h'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            'px-4 py-2 rounded-[6px] text-sm font-medium transition-all duration-200'
          ]"
        >
          24 Hours
        </button>
      </div>

      <!-- Stats Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <!-- Total Revenue Card -->
        <div class="bg-white dark:bg-[#09090B] rounded-[8px] border border-gray-200 dark:border-gray-800 p-6">
          <div class="grid grid-cols-2 gap-7">
            <div>
                <p class="text-sm font-normal text-[#64748B] dark:text-gray-400">Total Revenue</p>
              <p class="text-2xl font-medium text-[#020617] dark:text-white">
                {{ isLoading ? '...' : formatCurrency(metrics.totalRevenue) }}
              </p>
            </div>
              <div class="w-full h-12">
              <canvas ref="revenueChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Total Applications Card -->
        <div class="bg-white dark:bg-[#09090B] rounded-[8px] border border-gray-200 dark:border-gray-800 p-6">
          <div class="grid grid-cols-2 gap-7">
            <div>
                <p class="text-sm font-normal text-[#64748B] dark:text-gray-400">Total Applications</p>
              <p class="text-2xl font-medium text-[#020617] dark:text-white">
                {{ isLoading ? '...' : formatNumber(metrics.totalApplications) }}
              </p>
            </div>
            <div class="w-full h-12">
              <canvas ref="applicationsChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Open Applications Card -->
        <div class="bg-white dark:bg-[#09090B] rounded-[8px] border border-gray-200 dark:border-gray-800 p-6">
          <div class="grid grid-cols-2 gap-7">
            <div>
                <p class="text-sm font-normal text-[#64748B] dark:text-gray-400">Open Applications</p>
              <p class="text-2xl font-medium text-[#020617] dark:text-white">
                {{ isLoading ? '...' : formatNumber(metrics.openApplications) }}
              </p>
            </div>
            <div class="w-full h-12">
              <canvas ref="openApplicationsChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Approved Applications Card -->
        <div class="bg-white dark:bg-[#09090B] rounded-[8px] border border-gray-200 dark:border-gray-800 p-6">
          <div class="grid grid-cols-2 gap-7">
            <div>
              <p class="text-sm font-normal text-[#64748B] dark:text-gray-400">Approved Applications</p>
              <p class="text-2xl font-medium text-[#020617] dark:text-white">
                {{ isLoading ? '...' : formatNumber(metrics.approvedApplications) }}
              </p>
            </div>
            <div class="w-full h-12">
              <canvas ref="approvedApplicationsChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Total Customers Card -->
        <div class="bg-white dark:bg-[#09090B] rounded-[8px] border border-gray-200 dark:border-gray-800 p-6">
          <div class="grid grid-cols-2 gap-7">
            <div>
              <p class="text-sm font-normal text-[#64748B] dark:text-gray-400">Total Customers</p>
              <p class="text-2xl font-medium text-[#020617] dark:text-white">
                {{ isLoading ? '...' : formatNumber(metrics.totalCustomers) }}
              </p>
            </div>
            <div class="w-full h-12">
              <canvas ref="customersChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Pending Payments Card -->
        <div class="bg-white dark:bg-[#09090B] rounded-[8px] border border-gray-200 dark:border-gray-800 p-6">
          <div class="grid grid-cols-2 gap-7">
            <div>
              <p class="text-sm font-normal text-[#64748B] dark:text-gray-400">Pending Payments</p>
              <p class="text-2xl font-medium text-[#020617] dark:text-white">
                {{ isLoading ? '...' : formatNumber(metrics.pendingPayments) }}
              </p>
            </div>
            <div class="w-full h-12">
              <canvas ref="pendingPaymentsChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js';
import { usePaymentsApi, type Payment } from '~/composables/usePaymentsApi';
import { useApplication } from '~/composables/useApplication';
import { useCustomersApi } from '~/composables/useCustomersApi';

// Register Chart.js components
Chart.register(...registerables);

// Set page title
useHead({
  title: "Dashboard - iVisa",
});

// API composables
const { getAllPayments, calculateAnalytics } = usePaymentsApi();
const { getAllApplications, getApplicationSummary } = useApplication();
const { getAllCustomers, getCustomerSummary } = useCustomersApi();

// Date period selection
const selectedPeriod = ref('30d');

// Loading state
const isLoading = ref(false);
const errorMessage = ref('');

// Dashboard data
const payments = ref<Payment[]>([]);
const applications = ref<any[]>([]);
const customers = ref<any[]>([]);
const applicationSummary = ref<any>(null);
const customerSummary = ref<{
  totalCustomers: number
  activeCustomers: number
  inactiveCustomers: number
  suspendedCustomers: number
  totalApplications: number
} | null>(null);

// Dashboard metrics
const metrics = computed(() => {
  const paymentAnalytics = calculateAnalytics(payments.value);
  const filteredPayments = filterByPeriod(payments.value, selectedPeriod.value);
  const filteredApplications = filterByPeriod(applications.value, selectedPeriod.value);
  const filteredCustomers = filterByPeriod(customers.value, selectedPeriod.value);
  
  // Calculate revenue for selected period
  const periodRevenue = filteredPayments.reduce((sum, payment) => {
    const status = payment.status?.toLowerCase() || '';
    const hasPaidAt = !!(payment.paidAt || payment.datePaid);
    const isSuccessfulPayment = 
      status === 'paid' || 
      status === 'approved' || 
      status === 'succeeded' || 
      status === 'completed' ||
      status === 'success' ||
      hasPaidAt;
    const isRefunded = status === 'refunded' || status === 'refund';
    
    if (isSuccessfulPayment && !isRefunded) {
      const amount = typeof payment.amount === 'string' 
        ? parseFloat(payment.amount.replace(/[^0-9.-]+/g, '')) || 0
        : (payment.amount || 0);
      return sum + Math.abs(amount);
    }
    return sum;
  }, 0);

  // Count applications by status
  const openApplications = filteredApplications.filter(app => {
    const status = app.status?.toLowerCase() || '';
    return status === 'open' || status === 'in review' || status === 'pending' || status === 'processing';
  }).length;

  const approvedApplications = filteredApplications.filter(app => {
    const status = app.status?.toLowerCase() || '';
    return status === 'approved' || status === 'completed' || status === 'success';
  }).length;

  const pendingPayments = filteredPayments.filter(payment => {
    const status = payment.status?.toLowerCase() || '';
    const hasPaidAt = !!(payment.paidAt || payment.datePaid);
    const isSuccessfulPayment = 
      status === 'paid' || 
      status === 'approved' || 
      status === 'succeeded' || 
      status === 'completed' ||
      status === 'success' ||
      hasPaidAt;
    const isRefunded = status === 'refunded' || status === 'refund';
    
    return !isSuccessfulPayment && !isRefunded && 
           (status === 'pending' || status === 'in review' || status === 'processing' || status === 'processing_payment' || !status);
  }).length;

  // Use customer summary if available, otherwise fall back to filtered count
  const totalCustomers = customerSummary.value?.totalCustomers ?? filteredCustomers.length;

  return {
    totalRevenue: periodRevenue,
    totalApplications: filteredApplications.length,
    openApplications,
    approvedApplications,
    totalCustomers,
    pendingPayments,
  };
});

// Filter data by period
const filterByPeriod = (data: any[], period: string): any[] => {
  const now = new Date();
  const cutoffDate = new Date();
  
  if (period === '24h') {
    cutoffDate.setHours(now.getHours() - 24);
  } else if (period === '7d') {
    cutoffDate.setDate(now.getDate() - 7);
  } else if (period === '30d') {
    cutoffDate.setDate(now.getDate() - 30);
  }
  
  return data.filter(item => {
    const itemDate = item.createdAt ? new Date(item.createdAt) : 
                     item.datePaid ? new Date(item.datePaid) : 
                     item.paidAt ? new Date(item.paidAt) : null;
    
    if (!itemDate) return false;
    return itemDate >= cutoffDate;
  });
};

// Generate time-series data for charts
const generateTimeSeriesData = (data: any[], period: string, valueExtractor: (item: any) => number): number[] => {
  const filtered = filterByPeriod(data, period);
  const now = new Date();
  const startDate = new Date();
  
  let intervals: number;
  let intervalMs: number;
  
  if (period === '24h') {
    intervals = 24;
    intervalMs = 60 * 60 * 1000; // 1 hour
    startDate.setHours(now.getHours() - 24);
  } else if (period === '7d') {
    intervals = 7;
    intervalMs = 24 * 60 * 60 * 1000; // 1 day
    startDate.setDate(now.getDate() - 7);
  } else {
    intervals = 30;
    intervalMs = 24 * 60 * 60 * 1000; // 1 day
    startDate.setDate(now.getDate() - 30);
  }
  
  const series: number[] = new Array(intervals).fill(0);
  
  filtered.forEach(item => {
    const itemDate = item.createdAt ? new Date(item.createdAt) : 
                     item.datePaid ? new Date(item.datePaid) : 
                     item.paidAt ? new Date(item.paidAt) : null;
    
    if (!itemDate || itemDate < startDate) return;
    
    const diff = itemDate.getTime() - startDate.getTime();
    const index = Math.floor(diff / intervalMs);
    
    if (index >= 0 && index < intervals) {
      series[index] += valueExtractor(item);
    }
  });
  
  return series;
};

// Chart refs
const revenueChart = ref(null);
const applicationsChart = ref(null);
const openApplicationsChart = ref(null);
const approvedApplicationsChart = ref(null);
const customersChart = ref(null);
const pendingPaymentsChart = ref(null);

// Chart instances
let revenueChartInstance = null;
let applicationsChartInstance = null;
let openApplicationsChartInstance = null;
let approvedApplicationsChartInstance = null;
let customersChartInstance = null;
let pendingPaymentsChartInstance = null;

// Create revenue chart (stacked bar chart)
const createRevenueChart = () => {
  if (revenueChart.value) {
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(revenueChart.value);
    if (existingChart) {
      existingChart.destroy();
    }
    
    const ctx = revenueChart.value.getContext('2d');
    const revenueData = generateTimeSeriesData(payments.value, selectedPeriod.value, (payment) => {
      const status = payment.status?.toLowerCase() || '';
      const hasPaidAt = !!(payment.paidAt || payment.datePaid);
      const isSuccessfulPayment = 
        status === 'paid' || 
        status === 'approved' || 
        status === 'succeeded' || 
        status === 'completed' ||
        status === 'success' ||
        hasPaidAt;
      const isRefunded = status === 'refunded' || status === 'refund';
      
      if (isSuccessfulPayment && !isRefunded) {
        const amount = typeof payment.amount === 'string' 
          ? parseFloat(payment.amount.replace(/[^0-9.-]+/g, '')) || 0
          : (payment.amount || 0);
        return Math.abs(amount);
      }
      return 0;
    });
    
    // Normalize data for visualization (scale down for better display)
    const maxValue = Math.max(...revenueData, 1);
    const normalizedData = revenueData.map(val => (val / maxValue) * 100);
    
    revenueChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: revenueData.map((_, i) => i + 1),
        datasets: [
          {
            label: 'Revenue',
            data: normalizedData.map(val => val * 0.6),
            backgroundColor: '#10B981',
            borderWidth: 0
          },
          {
            label: 'Additional',
            data: normalizedData.map(val => val * 0.4),
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
const createLineChart = (canvasRef: any, dataArray: number[], color = '#8B5CF6') => {
  if (canvasRef.value && dataArray.length > 0) {
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(canvasRef.value);
    if (existingChart) {
      existingChart.destroy();
    }
    
    const ctx = canvasRef.value.getContext('2d');
    
    // Normalize data for visualization
    const maxValue = Math.max(...dataArray, 1);
    const normalizedData = dataArray.map(val => (val / maxValue) * 100);
    
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: dataArray.map((_, i) => i + 1),
        datasets: [{
          data: normalizedData,
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
  
  const applicationsData = generateTimeSeriesData(applications.value, selectedPeriod.value, () => 1);
  applicationsChartInstance = createLineChart(applicationsChart, applicationsData, '#8B5CF6');
  
  const openAppsData = generateTimeSeriesData(
    applications.value.filter(app => {
      const status = app.status?.toLowerCase() || '';
      return status === 'open' || status === 'in review' || status === 'pending' || status === 'processing';
    }), 
    selectedPeriod.value, 
    () => 1
  );
  openApplicationsChartInstance = createLineChart(openApplicationsChart, openAppsData, '#8B5CF6');
  
  const approvedAppsData = generateTimeSeriesData(
    applications.value.filter(app => {
      const status = app.status?.toLowerCase() || '';
      return status === 'approved' || status === 'completed' || status === 'success';
    }), 
    selectedPeriod.value, 
    () => 1
  );
  approvedApplicationsChartInstance = createLineChart(approvedApplicationsChart, approvedAppsData, '#8B5CF6');
  
  const customersData = generateTimeSeriesData(customers.value, selectedPeriod.value, () => 1);
  customersChartInstance = createLineChart(customersChart, customersData, '#8B5CF6');
  
  const pendingPaymentsData = generateTimeSeriesData(
    payments.value.filter(payment => {
      const status = payment.status?.toLowerCase() || '';
      const hasPaidAt = !!(payment.paidAt || payment.datePaid);
      const isSuccessfulPayment = 
        status === 'paid' || 
        status === 'approved' || 
        status === 'succeeded' || 
        status === 'completed' ||
        status === 'success' ||
        hasPaidAt;
      const isRefunded = status === 'refunded' || status === 'refund';
      
      return !isSuccessfulPayment && !isRefunded && 
             (status === 'pending' || status === 'in review' || status === 'processing' || status === 'processing_payment' || !status);
    }), 
    selectedPeriod.value, 
    () => 1
  );
  pendingPaymentsChartInstance = createLineChart(pendingPaymentsChart, pendingPaymentsData, '#8B5CF6');
};

// Load dashboard data
const loadDashboardData = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    // Fetch all data in parallel
    const [paymentsResult, applicationsResult, customersResult, summaryResult] = await Promise.all([
      getAllPayments().catch(() => ({ success: false, data: [] })),
      getAllApplications().catch(() => []),
      getAllCustomers().catch(() => ({ success: false, data: [] })),
      getCustomerSummary().catch(() => ({ success: false, data: null })),
    ]);
    
    payments.value = paymentsResult.success ? paymentsResult.data : [];
    applications.value = Array.isArray(applicationsResult) ? applicationsResult : [];
    customers.value = customersResult.success ? customersResult.data : [];
    customerSummary.value = summaryResult.success ? summaryResult.data : null;
    
    // Initialize charts after data is loaded
    await nextTick();
    initializeCharts();
  } catch (error: any) {
    console.error('Error loading dashboard data:', error);
    errorMessage.value = error.message || 'Failed to load dashboard data';
  } finally {
    isLoading.value = false;
  }
};

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format number
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

// Watch for period changes
watch(selectedPeriod, () => {
  nextTick(() => {
    initializeCharts();
  });
});

// Initialize on mount
onMounted(() => {
  loadDashboardData();
});

// Cleanup on unmount
onUnmounted(() => {
  if (revenueChartInstance) revenueChartInstance.destroy();
  if (applicationsChartInstance) applicationsChartInstance.destroy();
  if (openApplicationsChartInstance) openApplicationsChartInstance.destroy();
  if (approvedApplicationsChartInstance) approvedApplicationsChartInstance.destroy();
  if (customersChartInstance) customersChartInstance.destroy();
  if (pendingPaymentsChartInstance) pendingPaymentsChartInstance.destroy();
});
</script>
