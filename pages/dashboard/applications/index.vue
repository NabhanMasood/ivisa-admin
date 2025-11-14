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
        <!-- Search and Filter Buttons -->
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

      <!-- Applications Table -->
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

      <!-- Pagination -->
      <div
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
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import {
  Plus,
  Columns,
  Eye,
  Pencil,
} from "lucide-vue-next";
import { useApplication } from "~/composables/useApplication";

// Set page title
useHead({
  title: "Applications - iVisa",
});

const { getAllApplications, loading: applicationLoading, error: applicationError } = useApplication();
const applications = ref([]);

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const columnsDropdownOpen = ref(false);

// Load applications from API
const loadApplications = async () => {
  try {
    const data = await getAllApplications(searchQuery.value || undefined);
    if (Array.isArray(data)) {
      applications.value = data.map((app) => ({
        ...app,
        selected: false,
      }));
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
    (application) => {
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
  return applications.value.filter((application) => application.selected)
    .length;
});

// Helper functions to extract data from API response
const getApplicationId = (application) => {
  if (application.applicationId) return application.applicationId;
  if (application.applicationNumber) return application.applicationNumber;
  if (application.id) return `APP-${application.id}`;
  return '-';
};

const getCustomerName = (application) => {
  if (application.customerName) return application.customerName;
  if (application.customer?.fullname) return application.customer.fullname;
  if (application.customer?.name) return application.customer.name;
  if (application.customer?.customerName) return application.customer.customerName;
  return '-';
};

const formatAmount = (application) => {
  if (application.totalAmount) {
    // Format as currency if it's a number
    if (typeof application.totalAmount === 'number') {
      return `USD ${application.totalAmount.toFixed(2)}`;
    }
    // Return as is if it's already a string
    return application.totalAmount;
  }
  if (application.price) return application.price;
  if (application.totalPrice) return application.totalPrice;
  if (application.processingFee) return `USD ${application.processingFee}`;
  return '-';
};

// Status styling functions
const getStatusPillClasses = (status) => {
  if (!status) return "bg-gray-500 text-white border border-gray-500";
  
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case "approved":
      return "bg-black text-white border border-black";
    case "in review":
    case "in_review":
      return "bg-white text-black border border-black";
    case "pending":
      return "bg-orange-500 text-white border border-orange-500";
    case "rejected":
      return "bg-red-500 text-white border border-red-500";
    case "on hold":
    case "on_hold":
      return "bg-gray-500 text-white border border-gray-500";
    case "active":
      return "bg-black text-white border border-black";
    default:
      return "bg-gray-500 text-white border border-gray-500";
  }
};

const getFormattedStatus = (status) => {
  if (!status) return '';
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case "approved":
      return "Approved";
    case "in review":
    case "in_review":
      return "In Review";
    case "pending":
      return "Pending";
    case "rejected":
      return "Rejected";
    case "on hold":
    case "on_hold":
      return "On Hold";
    case "active":
      return "Active";
    default:
      return status;
  }
};

const toggleColumnsDropdown = () => {
  columnsDropdownOpen.value = !columnsDropdownOpen.value;
};

// Navigation functions
const router = useRouter();

const viewApplication = (application) => {
  router.push(`/dashboard/applications/${application.id}`);
};

const editApplication = (application) => {
  router.push(`/dashboard/applications/add?id=${application.id}&mode=edit`);
};

// Watch for select all changes
watch(selectAll, (newValue) => {
  applications.value.forEach((application) => {
    application.selected = newValue;
  });
});

// Load applications on mount
onMounted(() => {
  loadApplications();
});

onActivated(() => {
  loadApplications();
});
</script>
