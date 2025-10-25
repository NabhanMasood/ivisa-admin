<template>
  <DashboardLayout>
          <div class="space-y-8 sm:space-y-4">
            <!-- Page Title and Add Button -->
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
              <a
                href="/dashboard/finances/add"
                class="bg-black h-[36px] dark:bg-white text-white dark:text-black px-3 sm:px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 rounded-[7px] flex-shrink-0"
              >
                <div
                  class="flex items-center justify-center w-4 h-4 border border-white dark:border-black rounded-full bg-black dark:bg-white"
                >
                  <Plus class="h-4 w-4 text-white dark:text-black" />
                </div>
                <span
                  class="text-sm sm:text-base"
                  style="
                    font-size: 14px;
                    font-weight: 400;
                    font-style: normal;
                    line-height: 20px;
                    font-family: 'Geist', sans-serif;
                    letter-spacing: 0;
                  "
                  >Add Finance</span
                >
              </a>
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

              <!-- Columns Filter Button -->
              <div class="flex justify-center sm:justify-end w-full sm:w-auto">
                <div class="relative w-full sm:w-auto">
                  <button
                    @click="toggleColumnsDropdown"
                    class="w-full h-[36px] sm:w-auto bg-[#FFFFFF] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31] transition-colors flex items-center justify-center space-x-2 text-sm"
                    style="border-radius: 5px"
                  >
                    <Columns class="h-4 w-4" />
                    <span class="sm:inline">Columns</span>
                  </button>

                  <!-- Columns Dropdown -->
                  <div
                    v-if="columnsDropdownOpen"
                    class="absolute top-full right-0 z-10 mt-2 w-48 bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
                    style="border-radius: 5px"
                  >
                    <!-- Column Options -->
                    <div class="py-1">
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px"
                      >
                        <span
                          class="mr-3 text-black dark:text-white text-sm font-bold"
                          >✓</span
                        >
                        <span class="text-sm text-gray-900 dark:text-white"
                          >Name</span
                        >
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px"
                      >
                        <span
                          class="mr-3 text-black dark:text-white text-sm font-bold"
                          >✓</span
                        >
                        <span class="text-sm text-gray-900 dark:text-white"
                          >Role</span
                        >
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px"
                      >
                        <span
                          class="mr-3 text-black dark:text-white text-sm font-bold"
                          >✓</span
                        >
                        <span class="text-sm text-gray-900 dark:text-white"
                          >Plan_name</span
                        >
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px"
                      >
                        <span
                          class="mr-3 text-black dark:text-white text-sm font-bold"
                          >✓</span
                        >
                        <span class="text-sm text-gray-900 dark:text-white"
                          >Email</span
                        >
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px"
                      >
                        <span
                          class="mr-3 text-black dark:text-white text-sm font-bold"
                          >✓</span
                        >
                        <span class="text-sm text-gray-900 dark:text-white"
                          >Country</span
                        >
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px"
                      >
                        <span
                          class="mr-3 text-black dark:text-white text-sm font-bold"
                          >✓</span
                        >
                        <span class="text-sm text-gray-900 dark:text-white"
                          >Status</span
                        >
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stat Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <!-- Total Revenue Card -->
              <div class="bg-white dark:bg-[#09090B] rounded-[8px] border border-gray-200 dark:border-gray-800 p-6">
                <div class="grid grid-cols-2 gap-7">
                  <div class="text-nowrap whitespace-nowrap">
                    <p class="text-sm font-normal text-[#64748B] dark:text-gray-400">Total Revenue</p>
                    <p class="text-2xl font-medium text-[#020617] dark:text-white">$245,000</p>
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
                    <p class="text-2xl font-medium text-[#020617] dark:text-white">1,245</p>
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
                    <p class="text-2xl font-medium text-[#020617] dark:text-white">48</p>
                  </div>
                  <div class="w-full h-12">
                    <canvas ref="pendingPaymentsChart"></canvas>
                  </div>
                </div>
              </div>

              <!-- Refunded Orders Card -->
              <div class="bg-white dark:bg-[#09090B] rounded-[8px] border border-gray-200 dark:border-gray-800 p-6">
                <div class="grid grid-cols-2 gap-7">
                  <div class="text-nowrap whitespace-nowrap">
                    <p class="text-sm font-normal text-[#64748B] dark:text-gray-400">Refunded Orders</p>
                    <p class="text-2xl font-medium text-[#020617] dark:text-white">$682.5</p>
                  </div>
                  <div class="w-full h-12">
                    <canvas ref="refundedOrdersChart"></canvas>
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
                          <span>Destination</span>
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
                    <tr
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
                        {{ order.orderId }}
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
                        {{ order.customerName }}
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
                        {{ order.application }}
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
                        {{ order.destination }}
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
                        {{ order.amount }}
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
                        {{ order.datePaid }}
                      </td>
                      <td class="px-2 sm:px-3 lg:px-4 py-2">
                        <span
                          :class="getStatusPillClasses(order.status)"
                          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {{ order.status }}
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
                          <button
                            class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            title="Edit"
                          >
                            <Pencil
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

<script setup>
import {
  Plus,
  Columns,
  Search,
  Eye,
  Pencil,
} from "lucide-vue-next";
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

// Set page title
useHead({
  title: "Finances - iVisa",
});

// Chart refs
const revenueChart = ref(null);
const ordersChart = ref(null);
const pendingPaymentsChart = ref(null);
const refundedOrdersChart = ref(null);

// Chart instances
let revenueChartInstance = null;
let ordersChartInstance = null;
let pendingPaymentsChartInstance = null;
let refundedOrdersChartInstance = null;

// Chart data
const getChartData = () => {
  return [20, 25, 30, 22, 28, 35, 40, 38, 42, 45, 38, 35, 30, 25, 20, 22, 28, 32, 35, 30, 25, 20, 18, 22, 25, 28, 30, 25, 20, 22];
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
  refundedOrdersChartInstance = createLineChart(refundedOrdersChart, '#8B5CF6');
};

// Initialize charts on mount
onMounted(() => {
  nextTick(() => {
    initializeCharts();
  });
});

// Cleanup on unmount
onUnmounted(() => {
  if (revenueChartInstance) revenueChartInstance.destroy();
  if (ordersChartInstance) ordersChartInstance.destroy();
  if (pendingPaymentsChartInstance) pendingPaymentsChartInstance.destroy();
  if (refundedOrdersChartInstance) refundedOrdersChartInstance.destroy();
});

// Sample orders data matching the image
const orders = ref([
  {
    id: 1,
    orderId: "ORD - 1001",
    customerName: "Ali Raza",
    application: "APP-001245",
    destination: "Thailand",
    amount: "USD 100",
    datePaid: "01/01/2024",
    status: "Approved",
    selected: false,
  },
  {
    id: 2,
    orderId: "ORD - 1002",
    customerName: "Sarah Khan",
    application: "APP-001246",
    destination: "UAE",
    amount: "USD 250",
    datePaid: "-",
    status: "In Review",
    selected: false,
  },
  {
    id: 3,
    orderId: "ORD - 1003",
    customerName: "John Smith",
    application: "APP-001247",
    destination: "Germany",
    amount: "USD 400",
    datePaid: "-",
    status: "Pending",
    selected: false,
  },
  {
    id: 4,
    orderId: "ORD - 1004",
    customerName: "Maria Garcia",
    application: "APP-001248",
    destination: "France",
    amount: "USD 150",
    datePaid: "02/01/2024",
    status: "Approved",
    selected: false,
  },
  {
    id: 5,
    orderId: "ORD - 1005",
    customerName: "Ahmed Hassan",
    application: "APP-001249",
    destination: "Japan",
    amount: "USD 300",
    datePaid: "-",
    status: "Rejected",
    selected: false,
  },
  {
    id: 6,
    orderId: "ORD - 1006",
    customerName: "Emma Wilson",
    application: "APP-001250",
    destination: "Canada",
    amount: "USD 200",
    datePaid: "03/01/2024",
    status: "Approved",
    selected: false,
  },
  {
    id: 7,
    orderId: "ORD - 1007",
    customerName: "David Lee",
    application: "APP-001251",
    destination: "Australia",
    amount: "USD 180",
    datePaid: "-",
    status: "On Hold",
    selected: false,
  },
  {
    id: 8,
    orderId: "ORD - 1008",
    customerName: "Fatima Ali",
    application: "APP-001252",
    destination: "UK",
    amount: "USD 350",
    datePaid: "04/01/2024",
    status: "Approved",
    selected: false,
  },
  {
    id: 9,
    orderId: "ORD - 1009",
    customerName: "Michael Brown",
    application: "APP-001253",
    destination: "Singapore",
    amount: "USD 80",
    datePaid: "-",
    status: "In Review",
    selected: false,
  },
  {
    id: 10,
    orderId: "ORD - 1010",
    customerName: "Aisha Patel",
    application: "APP-001254",
    destination: "India",
    amount: "USD 120",
    datePaid: "05/01/2024",
    status: "Approved",
    selected: false,
  },
]);

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);

// Dropdown states - only one can be open at a time
const statusDropdownOpen = ref(false);
const planDropdownOpen = ref(false);
const roleDropdownOpen = ref(false);
const columnsDropdownOpen = ref(false);





const toggleStatusDropdown = () => {
  // Close other dropdowns if open
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  // Toggle status dropdown
  statusDropdownOpen.value = !statusDropdownOpen.value;
};

const togglePlanDropdown = () => {
  // Close other dropdowns if open
  statusDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  // Toggle plan dropdown
  planDropdownOpen.value = !planDropdownOpen.value;
};

const toggleRoleDropdown = () => {
  // Close other dropdowns if open
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  // Toggle role dropdown
  roleDropdownOpen.value = !roleDropdownOpen.value;
};

const toggleColumnsDropdown = () => {
  // Close other dropdowns if open
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  // Toggle columns dropdown
  columnsDropdownOpen.value = !columnsDropdownOpen.value;
};


// Close dropdowns when clicking outside
onMounted(() => {
  const handleClickOutside = (event) => {
    if (!event.target.closest(".relative")) {
      statusDropdownOpen.value = false;
      planDropdownOpen.value = false;
      roleDropdownOpen.value = false;
      columnsDropdownOpen.value = false;
    }
  };
  document.addEventListener("click", handleClickOutside);

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});


const filteredOrders = computed(() => {
  if (!searchQuery.value) return orders.value;

  return orders.value.filter(
    (order) =>
      order.orderId
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      order.customerName
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      order.destination.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectedCount = computed(() => {
  return orders.value.filter((order) => order.selected).length;
});

const getStatusPillClasses = (status) => {
  switch (status) {
    case "Approved":
      return "bg-black text-white border border-black";
    case "In Review":
      return "bg-white text-black border border-black";
    case "Pending":
      return "bg-orange-500 text-white border border-orange-500";
    case "Rejected":
      return "bg-red-500 text-white border border-red-500";
    case "On Hold":
      return "bg-gray-500 text-white border border-gray-500";
    default:
      return "bg-gray-500 text-white border border-gray-500";
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
