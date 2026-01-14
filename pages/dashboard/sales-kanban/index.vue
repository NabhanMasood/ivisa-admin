<template>
  <DashboardLayout>
    <div class="space-y-4">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Sales Board
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Track and manage incomplete visa applications
          </p>
        </div>

        <!-- Stats Summary -->
        <div class="flex gap-2 flex-wrap">
          <div class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
            <span class="font-semibold">{{ stats.new_lead }}</span> New Leads
          </div>
          <div class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
            <span class="font-semibold">{{ stats.contacted }}</span> Contacted
          </div>
          <div class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
            <span class="font-semibold">{{ stats.follow_up }}</span> Follow-up
          </div>
          <div class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
            <span class="font-semibold">{{ stats.total }}</span> Total
          </div>
        </div>
      </div>

      <!-- Filters Bar -->
      <div class="bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div class="flex flex-wrap gap-3 items-center">
          <!-- Search -->
          <div class="relative flex-1 min-w-[200px]">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search by email, name, or app number..."
              class="w-full h-9 pl-10 pr-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#18181B] text-gray-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              @input="debouncedSearch"
            />
          </div>

          <!-- Filter Dropdown Button -->
          <div class="relative">
            <button
              @click="filterDropdownOpen = !filterDropdownOpen"
              class="h-9 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#18181B] text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Filter class="h-4 w-4" />
              <span>Filters</span>
              <ChevronDown class="h-4 w-4" :class="filterDropdownOpen ? 'rotate-180' : ''" />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="filterDropdownOpen"
              class="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20"
            >
              <div class="py-1">
                <button
                  v-for="option in filterOptions"
                  :key="option.key"
                  @click="toggleFilterPanel(option.key)"
                  class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between"
                  :class="activeFilterPanels.includes(option.key) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'"
                >
                  {{ option.label }}
                  <span v-if="activeFilterPanels.includes(option.key)" class="text-xs">✓</span>
                </button>
              </div>
            </div>

            <!-- Click outside to close -->
            <div
              v-if="filterDropdownOpen"
              class="fixed inset-0 z-10"
              @click="closeFilterDropdown"
            ></div>
          </div>

          <!-- Active Filter Controls -->
          <!-- Destination Filter -->
          <select
            v-if="activeFilterPanels.includes('destination')"
            v-model="filters.destination"
            class="h-9 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#18181B] text-gray-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="loadApplications"
          >
            <option value="">All Destinations</option>
            <option v-for="dest in destinations" :key="dest" :value="dest">{{ dest }}</option>
          </select>

          <!-- Visa Type Filter -->
          <select
            v-if="activeFilterPanels.includes('visaType')"
            v-model="filters.visaType"
            class="h-9 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#18181B] text-gray-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="loadApplications"
          >
            <option value="">All Visa Types</option>
            <option v-for="type in visaTypes" :key="type" :value="type">{{ type }}</option>
          </select>

          <!-- Date Range Filter -->
          <template v-if="activeFilterPanels.includes('dateRange')">
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-gray-500 dark:text-gray-400">From</span>
              <input
                v-model="filters.dateFrom"
                type="date"
                class="h-9 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#18181B] text-gray-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                @change="loadApplications"
              />
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-gray-500 dark:text-gray-400">To</span>
              <input
                v-model="filters.dateTo"
                type="date"
                class="h-9 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#18181B] text-gray-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                @change="loadApplications"
              />
            </div>
          </template>

          <!-- Reminder Sent Toggle -->
          <button
            v-if="activeFilterPanels.includes('reminder')"
            @click="toggleReminderFilter"
            :class="[
              'h-9 px-3 rounded-md text-sm transition-colors flex items-center gap-2',
              filters.reminderSent === true
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                : filters.reminderSent === false
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                : 'bg-white dark:bg-[#18181B] text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            ]"
          >
            <Mail class="h-4 w-4" />
            <span>{{ filters.reminderSent === true ? 'Reminded' : filters.reminderSent === false ? 'Not Reminded' : 'Reminder' }}</span>
          </button>

          <!-- Clear Filters -->
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="h-9 px-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md text-sm transition-colors flex items-center gap-2"
          >
            <X class="h-4 w-4" />
            Clear
          </button>
        </div>
      </div>

      <!-- Kanban Board -->
      <div class="w-full">
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="text-center">
            <div class="inline-block w-8 h-8 border-4 border-gray-300 border-t-black dark:border-t-white rounded-full animate-spin"></div>
            <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading applications...</p>
          </div>
        </div>

        <!-- Kanban Columns -->
        <div
          v-else
          ref="kanbanContainer"
          class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:snap-none"
          style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch;"
        >
          <!-- Column for each status -->
          <div
            v-for="column in kanbanColumns"
            :key="column.value"
            :data-status="column.value"
            class="flex-shrink-0 w-[75vw] sm:w-80 snap-center sm:snap-align-none rounded-2xl border transition-colors overflow-hidden"
            :class="[
              column.bgClass,
              isDragOver === column.value ? 'ring-2 ring-blue-400' : ''
            ]"
            @dragover.prevent="onDragOver($event, column.value)"
            @dragleave="onDragLeave"
            @drop="onDrop($event, column.value)"
          >
            <!-- Column Header -->
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <span :class="column.dotColor" class="w-2.5 h-2.5 rounded-full"></span>
                  {{ column.label }}
                </h3>
                <span class="px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 rounded-full">
                  {{ getColumnCount(column.value) }}
                </span>
              </div>
            </div>

            <!-- Cards Container -->
            <div class="p-3 space-y-3 min-h-[calc(100vh-350px)] max-h-[calc(100vh-350px)] overflow-y-auto">
              <!-- Empty State -->
              <div
                v-if="getApplicationsByStatus(column.value).length === 0"
                class="flex items-center justify-center py-8 text-sm text-gray-500 dark:text-gray-400"
              >
                No applications
              </div>

              <!-- Application Cards -->
              <div
                v-for="app in getApplicationsByStatus(column.value)"
                :key="app.id"
                draggable="true"
                @dragstart="onDragStart($event, app)"
                @dragend="onDragEnd"
                class="bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-move hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all select-none"
                :style="{ opacity: draggedApplication?.id === app.id ? '0.4' : '1' }"
              >
                <!-- Card Header -->
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-semibold text-gray-900 dark:text-white">
                      {{ app.applicationNumber }}
                    </span>
                    <span
                      v-if="app.sourceType === 'inquiry'"
                      class="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                    >
                      Inquiry
                    </span>
                  </div>
                  <div class="flex items-center gap-1">
                    <!-- Hide email button for inquiries - use details page instead -->
                    <button
                      v-if="app.sourceType !== 'inquiry'"
                      @click.stop="openEmailModal(app)"
                      class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                      title="Send Email"
                    >
                      <Mail class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      @click.stop="viewApplication(app)"
                      class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                      title="View Details"
                    >
                      <Eye class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                <!-- Customer Email -->
                <div class="mb-3">
                  <p class="text-sm text-gray-900 dark:text-white truncate" :title="app.email">
                    {{ app.email }}
                  </p>
                  <p v-if="app.customerName" class="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {{ app.customerName }}
                  </p>
                  <p v-if="app.phoneNumber" class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <Phone class="h-3 w-3" />
                    {{ app.phoneNumber }}
                  </p>
                </div>

                <!-- Step Progress (hidden for inquiries) -->
                <div v-if="app.sourceType !== 'inquiry'" class="mb-3">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs text-gray-500 dark:text-gray-400">Step {{ app.currentStep }} of 5</span>
                  </div>
                  <div class="flex gap-1">
                    <div
                      v-for="step in 5"
                      :key="step"
                      class="h-1.5 flex-1 rounded-full"
                      :class="step <= app.currentStep ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'"
                    ></div>
                  </div>
                </div>

                <!-- Route Info -->
                <div class="flex items-center gap-2 mb-3">
                  <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded">
                    {{ app.nationality }}
                  </span>
                  <ArrowRight class="h-3 w-3 text-gray-400" />
                  <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded">
                    {{ app.destinationCountry }}
                  </span>
                </div>

                <!-- Visa Product & Amount -->
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[60%]" :title="app.visaProductName || app.visaType">
                    {{ app.visaProductName || app.visaType }}
                  </span>
                  <span v-if="app.totalAmount > 0" class="text-xs font-medium text-gray-900 dark:text-white">
                    USD {{ app.totalAmount.toFixed(2) }}
                  </span>
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatTimeAgo(app) }}
                  </span>
                  <div class="flex items-center gap-1">
                    <div
                      v-if="app.pendingReminderSentAt"
                      class="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                      title="Reminder Sent"
                    >
                      <Mail class="h-3 w-3 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div
                      v-if="app.couponEmailSentAt"
                      class="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                      title="Coupon Sent"
                    >
                      <Gift class="h-3 w-3 text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Email Composer Modal -->
    <div
      v-if="emailModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black bg-opacity-50"
        @click="closeEmailModal"
      ></div>

      <!-- Modal Content -->
      <div class="relative bg-white dark:bg-[#09090B] rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <!-- Modal Header -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Send Email</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                To: {{ selectedApplication?.email }}
              </p>
            </div>
            <button
              @click="closeEmailModal"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X class="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <!-- Template Quick Actions -->
        <div class="p-4 bg-gray-50 dark:bg-[#18181B] border-b border-gray-200 dark:border-gray-700">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick Templates:</p>
          <div class="flex flex-wrap gap-2 mb-3">
            <button
              @click="sendTemplate('reminder')"
              :disabled="sendingEmail"
              class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 border border-gray-200 dark:border-gray-700"
            >
              <Clock class="h-3.5 w-3.5 inline mr-1" />
              Send Reminder
            </button>
            <button
              @click="sendTemplate('help_offer')"
              :disabled="sendingEmail"
              class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 border border-gray-200 dark:border-gray-700"
            >
              <HelpCircle class="h-3.5 w-3.5 inline mr-1" />
              Offer Help
            </button>
          </div>

          <!-- Gift Coupon Button - Auto-generates a one-time use 10% discount coupon -->
          <button
            @click="sendTemplate('coupon')"
            :disabled="sendingEmail"
            class="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors disabled:opacity-50 border border-green-200 dark:border-green-800"
          >
            <Gift class="h-3.5 w-3.5 inline mr-1" />
            Send Gift Coupon (10% off, one-time use)
          </button>
        </div>

        <!-- Custom Email Form -->
        <div class="p-6 space-y-4 overflow-y-auto max-h-[50vh]">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <input
              v-model="emailSubject"
              type="text"
              placeholder="Enter email subject..."
              class="w-full h-10 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#18181B] text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea
              v-model="emailBody"
              rows="8"
              placeholder="Write your message here..."
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#18181B] text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            @click="closeEmailModal"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            @click="sendCustomEmail"
            :disabled="sendingEmail || !emailSubject || !emailBody"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send class="h-4 w-4" />
            {{ sendingEmail ? 'Sending...' : 'Send Email' }}
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  Search,
  Mail,
  Eye,
  X,
  ArrowRight,
  Gift,
  Clock,
  HelpCircle,
  Send,
  Filter,
  ChevronDown,
  Phone,
} from 'lucide-vue-next';
import { useSalesKanban, type SalesKanbanApplication, type SalesKanbanFilters } from '~/composables/useSalesKanban';

const router = useRouter();
const {
  loading,
  getSalesKanbanApplications,
  getSalesKanbanStats,
  updateSalesStatus,
  getDestinations,
  getVisaTypes,
  sendCustomEmail: apiSendCustomEmail,
  sendTemplateEmail,
} = useSalesKanban();

// Data
const applications = ref<SalesKanbanApplication[]>([]);
const stats = ref({
  new_lead: 0,
  contacted: 0,
  follow_up: 0,
  converted: 0,
  lost: 0,
  total: 0,
});
const destinations = ref<string[]>([]);
const visaTypes = ref<string[]>([]);

// Filters
const filters = ref<SalesKanbanFilters>({
  search: '',
  destination: '',
  visaType: '',
  dateFrom: '',
  dateTo: '',
  reminderSent: undefined,
  couponSent: undefined,
});

// Filter dropdown
const filterDropdownOpen = ref(false);
const activeFilterPanels = ref<string[]>([]);

const filterOptions = [
  { key: 'destination', label: 'Destination' },
  { key: 'visaType', label: 'Visa Type' },
  { key: 'dateRange', label: 'Date Range' },
  { key: 'reminder', label: 'Reminder Status' },
];

const toggleFilterPanel = (key: string) => {
  if (activeFilterPanels.value.includes(key)) {
    activeFilterPanels.value = activeFilterPanels.value.filter(k => k !== key);
    // Clear the filter value when removing panel
    if (key === 'destination') filters.value.destination = '';
    if (key === 'visaType') filters.value.visaType = '';
    if (key === 'dateRange') {
      filters.value.dateFrom = '';
      filters.value.dateTo = '';
    }
    if (key === 'reminder') filters.value.reminderSent = undefined;
    loadApplications();
  } else {
    activeFilterPanels.value.push(key);
  }
  filterDropdownOpen.value = false;
};

const closeFilterDropdown = () => {
  filterDropdownOpen.value = false;
};

// Drag and drop
const draggedApplication = ref<SalesKanbanApplication | null>(null);
const isDragOver = ref<string | null>(null);

// Email modal
const emailModalOpen = ref(false);
const selectedApplication = ref<SalesKanbanApplication | null>(null);
const emailSubject = ref('');
const emailBody = ref('');
const sendingEmail = ref(false);


// Kanban columns configuration
const kanbanColumns = [
  { value: 'new_lead', label: 'New Leads', dotColor: 'bg-orange-500', bgClass: 'bg-gray-50 dark:bg-[#18181B] border-gray-200 dark:border-gray-700' },
  { value: 'contacted', label: 'Contacted', dotColor: 'bg-blue-500', bgClass: 'bg-gray-50 dark:bg-[#18181B] border-gray-200 dark:border-gray-700' },
  { value: 'follow_up', label: 'Follow-up', dotColor: 'bg-purple-500', bgClass: 'bg-gray-50 dark:bg-[#18181B] border-gray-200 dark:border-gray-700' },
  { value: 'converted', label: 'Converted', dotColor: 'bg-green-500', bgClass: 'bg-gray-50 dark:bg-[#18181B] border-gray-200 dark:border-gray-700' },
  { value: 'lost', label: 'Lost', dotColor: 'bg-gray-500', bgClass: 'bg-gray-50 dark:bg-[#18181B] border-gray-200 dark:border-gray-700' },
];

// Computed
const hasActiveFilters = computed(() => {
  return (
    filters.value.search ||
    filters.value.destination ||
    filters.value.visaType ||
    filters.value.dateFrom ||
    filters.value.dateTo ||
    filters.value.reminderSent !== undefined ||
    filters.value.couponSent !== undefined
  );
});

// Methods
const loadApplications = async () => {
  try {
    const data = await getSalesKanbanApplications(filters.value);
    applications.value = data;
  } catch (error) {
    console.error('Failed to load applications:', error);
  }
};

const loadStats = async () => {
  try {
    const data = await getSalesKanbanStats();
    stats.value = data;
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
};

const loadFilterOptions = async () => {
  try {
    destinations.value = await getDestinations();
    visaTypes.value = await getVisaTypes();
  } catch (error) {
    console.error('Failed to load filter options:', error);
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
const debouncedSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    loadApplications();
  }, 300);
};

const toggleReminderFilter = () => {
  if (filters.value.reminderSent === undefined) {
    filters.value.reminderSent = true;
  } else if (filters.value.reminderSent === true) {
    filters.value.reminderSent = false;
  } else {
    filters.value.reminderSent = undefined;
  }
  loadApplications();
};

const clearFilters = () => {
  filters.value = {
    search: '',
    destination: '',
    visaType: '',
    dateFrom: '',
    dateTo: '',
    reminderSent: undefined,
    couponSent: undefined,
  };
  activeFilterPanels.value = [];
  loadApplications();
};

const getApplicationsByStatus = (status: string) => {
  return applications.value.filter((app) => app.salesStatus === status);
};

const getColumnCount = (status: string) => {
  return getApplicationsByStatus(status).length;
};

const formatTimeAgo = (app: SalesKanbanApplication) => {
  const days = app.abandonedDaysAgo;
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
};

// Drag and drop handlers
const onDragStart = (event: DragEvent, app: SalesKanbanApplication) => {
  draggedApplication.value = app;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(app.id));
  }
};

const onDragEnd = () => {
  draggedApplication.value = null;
  isDragOver.value = null;
};

const onDragOver = (event: DragEvent, status: string) => {
  event.preventDefault();
  isDragOver.value = status;
};

const onDragLeave = () => {
  isDragOver.value = null;
};

const onDrop = async (event: DragEvent, targetStatus: string) => {
  event.preventDefault();
  isDragOver.value = null;

  if (!draggedApplication.value) return;
  if (draggedApplication.value.salesStatus === targetStatus) return;

  const app = draggedApplication.value;
  const oldStatus = app.salesStatus;

  try {
    // Optimistic update
    app.salesStatus = targetStatus;

    await updateSalesStatus(app.id, targetStatus);
    showToast(`Moved to ${targetStatus.replace('_', ' ')}`, 'success');

    // Refresh stats
    loadStats();
  } catch (error) {
    // Revert on error
    app.salesStatus = oldStatus;
    showToast('Failed to update status', 'error');
  }

  draggedApplication.value = null;
};

// View application (route to inquiry page for inquiries)
const viewApplication = (app: SalesKanbanApplication) => {
  if (app.sourceType === 'inquiry') {
    router.push(`/dashboard/inquiries/${app.id}`);
  } else {
    router.push(`/dashboard/applications/${app.id}`);
  }
};

// Email modal handlers
const openEmailModal = (app: SalesKanbanApplication) => {
  selectedApplication.value = app;
  emailSubject.value = `Regarding Your ${app.destinationCountry} Visa Application`;
  emailBody.value = '';
  emailModalOpen.value = true;
};

const closeEmailModal = () => {
  emailModalOpen.value = false;
  selectedApplication.value = null;
  emailSubject.value = '';
  emailBody.value = '';
};

const sendCustomEmail = async () => {
  if (!selectedApplication.value || !emailSubject.value || !emailBody.value) return;

  sendingEmail.value = true;
  try {
    await apiSendCustomEmail(selectedApplication.value.id, emailSubject.value, emailBody.value);
    showToast('Email sent successfully', 'success');
    closeEmailModal();
    loadApplications();
    loadStats();
  } catch (error) {
    showToast('Failed to send email', 'error');
  } finally {
    sendingEmail.value = false;
  }
};

const sendTemplate = async (templateType: 'reminder' | 'coupon' | 'help_offer') => {
  if (!selectedApplication.value) return;

  sendingEmail.value = true;
  try {
    // For coupon template, the backend auto-generates a one-time use coupon
    await sendTemplateEmail(selectedApplication.value.id, templateType, undefined);
    const message = templateType === 'coupon'
      ? 'Gift coupon email sent successfully (10% off, one-time use)'
      : `${templateType.replace('_', ' ')} email sent successfully`;
    showToast(message, 'success');
    closeEmailModal();
    loadApplications();
    loadStats();
  } catch (error) {
    showToast('Failed to send email', 'error');
  } finally {
    sendingEmail.value = false;
  }
};

// Toast notification
const showToast = (message: string, type: 'success' | 'error') => {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2`;
  toast.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      ${
        type === 'success'
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
      }
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

// Lifecycle
onMounted(async () => {
  await Promise.all([loadApplications(), loadStats(), loadFilterOptions()]);
});
</script>
