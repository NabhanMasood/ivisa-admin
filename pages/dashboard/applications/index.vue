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
            Applications
          </h1>
          <label
            class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
            style="font-weight: 400; letter-spacing: 0%"
          >
            Here you can find all the applications
          </label>
        </div>
        <button
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
            >Add Application</span
          >
        </button>
      </div>
      <!-- Search and Filters Row -->
      <div
        class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4"
      >
        <!-- Search and View Toggle -->
        <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
          <!-- Search Bar -->
          <div class="relative flex-1 w-full sm:w-[30%]">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Applications"
              class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
              style="border-radius: 7px"
            />
          </div>
        </div>

        <!-- View Toggle and Columns Filter -->
        <div class="flex justify-center sm:justify-end w-full sm:w-auto gap-2">
          <!-- View Toggle -->
          <div class="flex bg-gray-100 dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 rounded-md p-1">
            <button
              @click="viewMode = 'table'"
              :class="[
                'px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-2',
                viewMode === 'table'
                  ? 'bg-white dark:bg-[#09090B] text-black dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              ]"
            >
              <Table2 class="h-4 w-4" />
              <span class="hidden sm:inline">Table</span>
            </button>
            <button
              @click="viewMode = 'kanban'"
              :class="[
                'px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-2',
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-[#09090B] text-black dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              ]"
            >
              <LayoutGrid class="h-4 w-4" />
              <span class="hidden sm:inline">Kanban</span>
            </button>
          </div>
          
        

          <!-- Sort Button (only show in kanban view) -->
          <div v-if="viewMode === 'kanban'" class="relative w-full sm:w-auto">
            <button
              @click="toggleSortDropdown"
              class="w-full h-[36px] sm:w-auto bg-[#FFFFFF] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31] transition-colors flex items-center justify-center space-x-2 text-sm"
              style="border-radius: 5px"
            >
              <ArrowUpDown class="h-4 w-4" />
              <span class="sm:inline">Sort</span>
            </button>

            <!-- Sort Dropdown -->
            <div
              v-if="sortDropdownOpen"
              class="absolute top-full right-0 z-10 mt-2 w-56 bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
              style="border-radius: 5px"
            >
              <!-- Sort Options -->
              <div class="py-1">
                <button
                  @click="setSortOption('date_desc')"
                  :class="[
                    'w-full text-left flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer transition-colors',
                    sortOption === 'date_desc' ? 'bg-[#E4E4E8] dark:bg-[#18181B]' : ''
                  ]"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span
                    v-if="sortOption === 'date_desc'"
                    class="mr-3 text-black dark:text-white text-sm font-bold"
                    >✓</span
                  >
                  <span
                    v-else
                    class="mr-3 text-transparent text-sm font-bold"
                    >✓</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white"
                    >Latest First</span
                  >
                </button>
                <button
                  @click="setSortOption('date_asc')"
                  :class="[
                    'w-full text-left flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer transition-colors',
                    sortOption === 'date_asc' ? 'bg-[#E4E4E8] dark:bg-[#18181B]' : ''
                  ]"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span
                    v-if="sortOption === 'date_asc'"
                    class="mr-3 text-black dark:text-white text-sm font-bold"
                    >✓</span
                  >
                  <span
                    v-else
                    class="mr-3 text-transparent text-sm font-bold"
                    >✓</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white"
                    >Oldest First</span
                  >
                </button>
                <button
                  @click="setSortOption('amount_desc')"
                  :class="[
                    'w-full text-left flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer transition-colors',
                    sortOption === 'amount_desc' ? 'bg-[#E4E4E8] dark:bg-[#18181B]' : ''
                  ]"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span
                    v-if="sortOption === 'amount_desc'"
                    class="mr-3 text-black dark:text-white text-sm font-bold"
                    >✓</span
                  >
                  <span
                    v-else
                    class="mr-3 text-transparent text-sm font-bold"
                    >✓</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white"
                    >Amount (High to Low)</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Applications Table View -->
      <div
        v-if="viewMode === 'table'"
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
                    <span>Application #</span>
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
                    <span>Destination</span>
                  </div>
                </th>
                <th
                  class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  <div class="flex items-center space-x-1">
                    <span>Visa Type</span>
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
                    <span>Status</span>
                    <span class="text-gray-500 dark:text-gray-400 text-sm"
                      >↓</span
                    >
                  </div>
                </th>
                <th class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <!-- Loading State -->
              <tr v-if="applicationLoading">
                <td colspan="8" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Loading applications...
                </td>
              </tr>
              
              <!-- Empty State -->
              <tr v-else-if="!applicationLoading && filteredApplications.length === 0">
                <td colspan="8" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {{ applicationError || 'No applications found.' }}
                </td>
              </tr>
              
              <!-- Data Rows -->
              <tr
                v-for="application in filteredApplications"
                :key="application.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <input
                    type="checkbox"
                    v-model="application.selected"
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
                  {{ getApplicationId(application) }}
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
                  {{ getCustomerName(application) }}
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
                  {{ application.destinationCountry || application.destination || '-' }}
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
                  {{ application.visaType || '-' }}
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
                  {{ formatAmount(application) }}
                </td>
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <span
                    :class="getStatusPillClasses(application.status)"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {{ getFormattedStatus(application.status) }}
                  </span>
                </td>
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="viewApplication(application)"
                      class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      title="View"
                    >
                      <Eye
                        class="h-4 w-4 text-gray-600 dark:text-gray-400"
                      />
                    </button>
                    <button
                      @click="editApplication(application)"
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

      <!-- Kanban Board View -->
      <div
        v-else
        class="w-full"
      >
        <!-- Loading State -->
        <div v-if="applicationLoading" class="flex items-center justify-center py-12">
          <div class="text-center">
            <div class="inline-block w-8 h-8 border-4 border-gray-300 border-t-black dark:border-t-white rounded-full animate-spin"></div>
            <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading applications...</p>
          </div>
        </div>

        <!-- Content -->
        <div v-else>
          <!-- Mobile Scroll Hint -->
          <div class="sm:hidden mb-2 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
            </svg>
            <span>Swipe to see all columns</span>
            <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </div>

          <!-- Kanban Columns -->
          <div
            class="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:snap-none"
            style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch;"
          >
          <!-- Column for each status -->
          <div
            v-for="status in kanbanStatuses"
            :key="status.value"
            class="flex-shrink-0 w-[85vw] sm:w-80 snap-center sm:snap-align-none bg-gray-50 dark:bg-[#18181B] rounded-2xl border border-gray-200 dark:border-gray-700 transition-colors overflow-hidden"
            :class="{ 'ring-2 ring-blue-400 bg-blue-50 dark:bg-blue-900/20': isDragOver === status.value }"
            @dragover.prevent="onDragOver($event, status.value)"
            @dragleave="onDragLeave"
            @drop="onDrop($event, status.value)"
          >
            <!-- Column Header -->
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <span
                    :class="status.color"
                    class="w-2 h-2 rounded-full"
                  ></span>
                  {{ status.label }}
                </h3>
                <span class="px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 rounded-full">
                  {{ getStatusCount(status.value) }}
                </span>
              </div>
            </div>

            <!-- Cards Container -->
            <div 
              class="p-3 space-y-3 min-h-[calc(100vh-280px)] max-h-[calc(100vh-280px)] overflow-y-auto"
              @dragover.prevent="onDragOver($event, status.value)"
              @drop="onDrop($event, status.value)"
            >
              <!-- Empty State -->
              <div
                v-if="getApplicationsByStatus(status.value).length === 0"
                class="flex items-center justify-center py-8 text-sm text-gray-500 dark:text-gray-400"
              >
                No applications
              </div>

              <!-- Application Cards -->
              <div
                v-for="application in getApplicationsByStatus(status.value)"
                :key="`${application.id}-${sortOption}`"
                draggable="true"
                @dragstart="onDragStart($event, application)"
                @dragend="onDragEnd"
                class="bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-move hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all select-none group"
                :style="{ opacity: draggedApplication?.id === application.id ? '0.4' : '1' }"
                title="Drag to change status"
              >
                <!-- Card Header -->
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {{ getApplicationId(application) }}
                    </h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                      {{ getCustomerName(application) }}
                    </p>
                  </div>
                  <div class="flex items-center gap-1 ml-2">
                    <button
                      @click.stop="viewApplication(application)"
                      class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                      title="View"
                    >
                      <Eye class="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                <!-- Card Details -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-500 dark:text-gray-400">Destination</span>
                    <span class="text-gray-900 dark:text-white font-medium">
                      {{ application.destinationCountry || application.destination || '-' }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-500 dark:text-gray-400">Visa Type</span>
                    <span class="text-gray-900 dark:text-white font-medium">
                      {{ application.visaType || '-' }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-500 dark:text-gray-400">Amount</span>
                    <span class="text-gray-900 dark:text-white font-medium">
                      {{ formatAmount(application) }}
                    </span>
                  </div>
                </div>

                <!-- Card Footer -->
                <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span v-if="application.createdAt || application.created_at || application.created">
                      {{ formatDate(application.createdAt || application.created_at || application.created || '') }}
                    </span>
                    <span v-else>-</span>
                    <span
                      :class="getStatusPillClasses(application.status)"
                      class="px-2.5 py-1 rounded-full text-[10px] font-medium"
                    >
                      {{ getFormattedStatus(application.status) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <!-- Pagination (Table View Only) -->
      <div
        v-if="viewMode === 'table'"
        class="flex flex-row items-center justify-between flex-wrap gap-2 sm:gap-4 w-full"
      >
        <!-- Selection Count -->
        <div
          class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap"
        >
          {{ selectedCount }} of {{ applications.length }} row(s)
          selected.
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

      <!-- Kanban Statistics (Kanban View Only) -->
      <div
        v-else
        class="flex flex-wrap items-center justify-between gap-3 sm:gap-4 w-full"
      >
        <div class="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          Total Applications: <span class="font-semibold">{{ filteredApplications.length }}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="status in kanbanStatuses"
            :key="status.value"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-[#18181B] border border-gray-200 dark:border-gray-700"
          >
            <span :class="status.color" class="w-2 h-2 rounded-full"></span>
            <span class="text-xs text-gray-600 dark:text-gray-400">{{ status.label }}:</span>
            <span class="text-xs font-semibold text-gray-900 dark:text-white">{{ getStatusCount(status.value) }}</span>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.animate-slide-up) {
  animation: slide-up 0.3s ease-out;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
</style>

<script setup lang="ts">
import {
  Plus,
  Columns,
  Eye,
  Pencil,
  Table2,
  LayoutGrid,
  ArrowUpDown,
} from "lucide-vue-next";
import { useApplication } from "~/composables/useApplication";

// Set page title
useHead({
  title: "Applications - iVisa",
});

const { getAllApplications, updateApplicationStatus, loading: applicationLoading, error: applicationError } = useApplication();

// Define application type
interface Application {
  id: number | string;
  applicationId?: string;
  applicationNumber?: string;
  customerName?: string;
  customer?: {
    fullname?: string;
    name?: string;
    customerName?: string;
  };
  destinationCountry?: string;
  destination?: string;
  visaType?: string;
  totalAmount?: number | string;
  price?: string;
  totalPrice?: string;
  processingFee?: string;
  status?: string;
  createdAt?: string;
  created_at?: string;
  created?: string;
  selected?: boolean;
}

const applications = ref<Application[]>([]);

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const columnsDropdownOpen = ref(false);
const viewMode = ref<'table' | 'kanban'>('kanban'); // Default to kanban view
const draggedApplication = ref<Application | null>(null);
const isDragOver = ref<string | null>(null);
const sortDropdownOpen = ref(false);
const sortOption = ref<'date_desc' | 'date_asc' | 'amount_desc'>('date_desc'); // Default to latest first

// Kanban statuses configuration
const kanbanStatuses = [
  { label: 'Pending', value: 'pending', color: 'bg-orange-500' },
  { label: 'In Process', value: 'in_process', color: 'bg-blue-500' },
  { label: 'Completed', value: 'completed', color: 'bg-green-500' },
  { label: 'Rejected', value: 'rejected', color: 'bg-red-500' },
];

// Load applications from API
const loadApplications = async () => {
  try {
    const data = await getAllApplications(searchQuery.value || undefined);
    console.log('📊 Applications loaded:', data);
    if (Array.isArray(data)) {
      applications.value = data.map((app) => ({
        ...app,
        selected: false,
      }));
      console.log('✅ Applications set:', applications.value.length, 'apps');
      console.log('📋 Sample app:', applications.value[0]);
      
      // Log all unique statuses found
      const uniqueStatuses = [...new Set(applications.value.map((app: Application) => app.status).filter((s): s is string => Boolean(s)))];
      console.log('📊 Unique statuses in DB:', uniqueStatuses);
      console.log('🗂️ Mapped to:', uniqueStatuses.map((s: string) => ({ original: s, normalized: normalizeStatus(s) })));
    } else {
      applications.value = [];
    }
  } catch (error) {
    console.error("Failed to load applications:", error);
    applications.value = [];
  }
};

// Debounce search
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    loadApplications();
  }, 300); // 300ms debounce
});

// Computed properties
const filteredApplications = computed(() => {
  // If search is handled by API, return all applications
  // Otherwise, filter client-side
  if (!searchQuery.value) return applications.value;

  return applications.value.filter(
    (application: Application) => {
      const applicationId = getApplicationId(application).toLowerCase();
      const customerName = getCustomerName(application).toLowerCase();
      const destination = (application.destinationCountry || application.destination || '').toLowerCase();
      const searchLower = searchQuery.value.toLowerCase();
      
      return (
        applicationId.includes(searchLower) ||
        customerName.includes(searchLower) ||
        destination.includes(searchLower)
      );
    }
  );
});

const selectedCount = computed(() => {
  return applications.value.filter((application: Application) => application.selected)
    .length;
});

// Helper functions to extract data from API response
const getApplicationId = (application: Application): string => {
  if (application.applicationId) return application.applicationId;
  if (application.applicationNumber) return application.applicationNumber;
  if (application.id) return `APP-${application.id}`;
  return '-';
};

const getCustomerName = (application: Application): string => {
  if (application.customerName) return application.customerName;
  if (application.customer?.fullname) return application.customer.fullname;
  if (application.customer?.name) return application.customer.name;
  if (application.customer?.customerName) return application.customer.customerName;
  return '-';
};

const formatAmount = (application: Application): string => {
  if (application.totalAmount) {
    // Format as currency if it's a number
    if (typeof application.totalAmount === 'number') {
      return `USD ${application.totalAmount.toFixed(2)}`;
    }
    // Return as is if it's already a string
    return String(application.totalAmount);
  }
  if (application.price) return application.price;
  if (application.totalPrice) return application.totalPrice;
  if (application.processingFee) return `USD ${application.processingFee}`;
  return '-';
};

// Status styling functions
const getStatusPillClasses = (status: string | undefined): string => {
  if (!status) return "bg-gray-500 text-white border border-gray-500";
  
  // Normalize to get the kanban column
  const normalized = normalizeStatus(status);
  
  switch (normalized) {
    case "pending":
      return "bg-orange-500 text-white border border-orange-500";
    case "in_process":
      return "bg-blue-500 text-white border border-blue-500";
    case "completed":
      return "bg-green-500 text-white border border-green-500";
    case "rejected":
      return "bg-red-500 text-white border border-red-500";
    default:
      return "bg-gray-500 text-white border border-gray-500";
  }
};

const getFormattedStatus = (status: string | undefined): string => {
  if (!status) return '';
  
  const statusLower = status.toLowerCase().replace(/\s+/g, '_');
  
  // Format common status values nicely
  const formattedMap: Record<string, string> = {
    'pending': 'Pending',
    'submitted': 'Submitted',
    'in_process': 'In Process',
    'in_review': 'In Review',
    'processing': 'Processing',
    'additional_info_required': 'Additional Info Required',
    'additional info required': 'Additional Info Required',
    'resubmission': 'Resubmission',
    'resubmission_required': 'Resubmission Required',
    'on_hold': 'On Hold',
    'completed': 'Completed',
    'approved': 'Approved',
    'active': 'Active',
    'rejected': 'Rejected',
    'declined': 'Declined',
    'cancelled': 'Cancelled',
  };
  
  return formattedMap[statusLower] || status.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
};

const toggleColumnsDropdown = () => {
  columnsDropdownOpen.value = !columnsDropdownOpen.value;
};

const toggleSortDropdown = () => {
  sortDropdownOpen.value = !sortDropdownOpen.value;
};

const setSortOption = (option: typeof sortOption.value) => {
  sortOption.value = option;
  sortDropdownOpen.value = false;
};

// Kanban helper functions
const normalizeStatus = (status: string): string => {
  if (!status) {
    console.log('⚠️ No status provided, defaulting to pending');
    return 'pending';
  }
  
  const statusLower = status.toLowerCase().replace(/\s+/g, '_');
  
  // Map various status formats to our 4 kanban columns:
  // - pending: New submissions, Additional Info Required
  // - in_process: Processing, In Review, Resubmission, etc.
  // - completed: Approved, Accepted, Active, Completed
  // - rejected: Rejected, Declined
  const statusMap: Record<string, string> = {
    // PENDING
    'pending': 'pending',
    'submitted': 'pending',
    'new': 'pending',
    'additional_info_required': 'pending',
    'additional info required': 'pending',
    
    // IN PROCESS
    'in_process': 'in_process',
    'in process': 'in_process',
    'inprocess': 'in_process',
    'processing': 'in_process',
    'in_review': 'in_process',
    'in review': 'in_process',
    'inreview': 'in_process',
    'review': 'in_process',
    'resubmission': 'in_process',
    'resubmission_required': 'in_process',
    'on_hold': 'in_process',
    'on hold': 'in_process',
    'onhold': 'in_process',
    'hold': 'in_process',
    'under_review': 'in_process',
    'under review': 'in_process',
    
    // COMPLETED
    'completed': 'completed',
    'approved': 'completed',
    'accept': 'completed',
    'accepted': 'completed',
    'active': 'completed',
    'done': 'completed',
    'finished': 'completed',
    'issued': 'completed',
    
    // REJECTED
    'rejected': 'rejected',
    'reject': 'rejected',
    'declined': 'rejected',
    'denied': 'rejected',
    'cancelled': 'rejected',
    'canceled': 'rejected',
  };
  
  const mapped = statusMap[statusLower] || statusLower;
  
  // Log unmapped statuses for debugging
  if (!statusMap[statusLower] && !['pending', 'in_process', 'completed', 'rejected'].includes(mapped)) {
    console.log(`⚠️ Unknown status "${status}" (normalized: "${statusLower}"), using as-is:`, mapped);
  }
  
  return mapped;
};

// Helper to get date from application (try multiple field names)
const getApplicationDate = (app: Application): Date | null => {
  const dateStr = app.createdAt || app.created_at || app.created;
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
};

// Sort function that uses current sortOption
const sortApplications = (apps: Application[]): Application[] => {
  const sorted = [...apps].sort((a: Application, b: Application) => {
    switch (sortOption.value) {
      case 'date_desc':
        // Latest first (newest dates first)
        const dateA = getApplicationDate(a);
        const dateB = getApplicationDate(b);
        
        // Handle missing dates by putting them at the end (no fallback to ID)
        if (!dateA && !dateB) return 0; // Keep original order if both missing
        if (!dateA) return 1; // a goes to end
        if (!dateB) return -1; // b goes to end
        
        return dateB.getTime() - dateA.getTime(); // Descending (newest first)
      
      case 'date_asc':
        // Oldest first
        const dateA_asc = getApplicationDate(a);
        const dateB_asc = getApplicationDate(b);
        
        // Handle missing dates by putting them at the end (no fallback to ID)
        if (!dateA_asc && !dateB_asc) return 0; // Keep original order if both missing
        if (!dateA_asc) return 1; // a goes to end
        if (!dateB_asc) return -1; // b goes to end
        
        return dateA_asc.getTime() - dateB_asc.getTime(); // Ascending (oldest first)
      
      case 'amount_desc':
        // High to low
        const amountA = parseFloat(
          String(a.totalAmount || a.price || a.totalPrice || a.processingFee || '0')
        );
        const amountB = parseFloat(
          String(b.totalAmount || b.price || b.totalPrice || b.processingFee || '0')
        );
        return amountB - amountA;
      
      default:
        return 0;
    }
  });
  
  return sorted;
};

// Create computed properties for each status - this makes it reactive
const sortedApplicationsByStatus = computed(() => {
  const result: Record<string, Application[]> = {
    pending: [],
    in_process: [],
    completed: [],
    rejected: [],
  };

  // Filter applications by status
  filteredApplications.value.forEach((app: Application) => {
    const normalizedStatus = normalizeStatus(app.status || 'pending');
    if (result[normalizedStatus]) {
      result[normalizedStatus].push(app);
    }
  });

  // Sort each status group
  Object.keys(result).forEach((status) => {
    const apps = result[status];
    if (apps) {
      result[status] = sortApplications(apps);
    }
  });

  return result;
});

const getApplicationsByStatus = (status: string): Application[] => {
  const apps = sortedApplicationsByStatus.value[status];
  return apps || [];
};

const getStatusCount = (status: string) => {
  return getApplicationsByStatus(status).length;
};

const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } catch {
    return '-';
  }
};

// Drag and drop handlers
const onDragStart = (event: DragEvent, application: Application) => {
  console.log('🎯 Drag started for application:', application.id);
  draggedApplication.value = application;
  
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    // Set data for compatibility
    event.dataTransfer.setData('text/plain', application.id.toString());
  }
};

const onDragEnd = (event: DragEvent) => {
  console.log('🏁 Drag ended');
  draggedApplication.value = null;
  isDragOver.value = null;
};

const onDragOver = (event: DragEvent, targetStatus: string) => {
  event.preventDefault();
  event.stopPropagation();
  
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
  
  // Update visual feedback
  if (isDragOver.value !== targetStatus) {
    isDragOver.value = targetStatus;
  }
};

const onDragLeave = (event: DragEvent) => {
  // Only clear if leaving the column completely
  const target = event.currentTarget as HTMLElement;
  const relatedTarget = event.relatedTarget as HTMLElement;
  
  if (!target.contains(relatedTarget)) {
    isDragOver.value = null;
  }
};

const onDrop = async (event: DragEvent, targetStatus: string) => {
  event.preventDefault();
  event.stopPropagation();
  
  console.log('📦 Drop event triggered for status:', targetStatus);
  
  isDragOver.value = null;
  
  if (!draggedApplication.value) {
    console.log('⚠️ No dragged application found');
    return;
  }
  
  const application = draggedApplication.value;
  const currentStatus = normalizeStatus(application.status || 'pending');
  
  console.log('📊 Current status:', currentStatus, '-> Target status:', targetStatus);
  
  // Don't update if status is the same
  if (currentStatus === targetStatus) {
    console.log('ℹ️ Status unchanged, no update needed');
    draggedApplication.value = null;
    return;
  }
  
  try {
    console.log('🔄 Updating application status...');
    
    // Update status via API
    await updateApplicationStatus(application.id, targetStatus);
    
    // Update local state
    const index = applications.value.findIndex((app: Application) => app.id === application.id);
    if (index !== -1 && applications.value[index]) {
      applications.value[index].status = targetStatus;
      console.log('✅ Application status updated successfully');
      
      // Show success message
      const statusLabel = kanbanStatuses.find(s => s.value === targetStatus)?.label || targetStatus;
      showSuccessToast(`Application moved to ${statusLabel}`);
    }
  } catch (error) {
    console.error('❌ Failed to update application status:', error);
    showErrorToast('Failed to update application status. Please try again.');
  } finally {
    draggedApplication.value = null;
  }
};

// Toast notification functions
const showSuccessToast = (message: string) => {
  // Create a simple toast notification
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-up';
  toast.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

const showErrorToast = (message: string) => {
  // Create a simple error toast notification
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-up';
  toast.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

// Navigation functions
const router = useRouter();

const viewApplication = (application: Application) => {
  router.push(`/dashboard/applications/${application.id}`);
};

const editApplication = (application: Application) => {
  router.push(`/dashboard/applications/add?id=${application.id}&mode=edit`);
};

// Watch for select all changes
watch(selectAll, (newValue) => {
  applications.value.forEach((application: Application) => {
    application.selected = newValue;
  });
});

// Close dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    columnsDropdownOpen.value = false;
    sortDropdownOpen.value = false;
  }
};

// Load applications on mount
onMounted(() => {
  loadApplications();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

onActivated(() => {
  loadApplications();
});
</script>
