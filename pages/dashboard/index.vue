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
              <p class="text-2xl font-medium text-[#020617] dark:text-white">$245,000</p>
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
              <p class="text-2xl font-medium text-[#020617] dark:text-white">1,245</p>
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
              <p class="text-2xl font-medium text-[#020617] dark:text-white">48</p>
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
              <p class="text-2xl font-medium text-[#020617] dark:text-white">870</p>
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
              <p class="text-2xl font-medium text-[#020617] dark:text-white">540</p>
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
              <p class="text-2xl font-medium text-[#020617] dark:text-white">48</p>
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

<script setup>
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

// Set page title
useHead({
  title: "Dashboard - iVisa",
});

// Date period selection
const selectedPeriod = ref('30d');

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

// Chart data based on selected period
const getChartData = (period) => {
  const baseData = {
    '30d': [20, 25, 30, 22, 28, 35, 40, 38, 42, 45, 38, 35, 30, 25, 20, 22, 28, 32, 35, 30, 25, 20, 18, 22, 25, 28, 30, 25, 20, 22],
    '7d': [20, 25, 30, 22, 28, 35, 40],
    '24h': [20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72, 75, 78]
  };
  return baseData[period] || baseData['30d'];
};

// Create revenue chart (stacked bar chart)
const createRevenueChart = () => {
  if (revenueChart.value) {
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(revenueChart.value);
    if (existingChart) {
      existingChart.destroy();
    }
    
    const ctx = revenueChart.value.getContext('2d');
    const data = getChartData(selectedPeriod.value);
    
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
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(canvasRef.value);
    if (existingChart) {
      existingChart.destroy();
    }
    
    const ctx = canvasRef.value.getContext('2d');
    const data = getChartData(selectedPeriod.value);
    
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
  applicationsChartInstance = createLineChart(applicationsChart, '#8B5CF6');
  openApplicationsChartInstance = createLineChart(openApplicationsChart, '#8B5CF6');
  approvedApplicationsChartInstance = createLineChart(approvedApplicationsChart, '#8B5CF6');
  customersChartInstance = createLineChart(customersChart, '#8B5CF6');
  pendingPaymentsChartInstance = createLineChart(pendingPaymentsChart, '#8B5CF6');
};

// Watch for period changes
watch(selectedPeriod, () => {
  nextTick(() => {
    initializeCharts();
  });
});

// Initialize charts on mount
onMounted(() => {
  nextTick(() => {
    initializeCharts();
  });
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
