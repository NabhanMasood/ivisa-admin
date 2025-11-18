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
              {{ application?.applicationNumber || application?.id || 'Loading...' }} - Travellers
            </h1>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="flex justify-between items-center">
        <!-- Columns Filter Button -->
        <div class="bg-gray-100 dark:bg-gray-800 rounded-[6px] p-1 flex gap-2 w-fit">
          <NuxtLink
            :to="`/dashboard/applications/${applicationId}`"
            class="px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200"
            :class="[
              !$route.path.includes('/travellers')
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
          >
            Application Details
          </NuxtLink>
          <button
            class="px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200"
            :class="[
              $route.path.includes('/travellers')
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
          >
            Travelers
          </button>
          <NuxtLink
            :to="`/dashboard/applications/${applicationId}?tab=additional-info`"
            class="px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200"
            :class="[
              'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
          >
            Additional Info
          </NuxtLink>
          <NuxtLink
            :to="`/dashboard/applications/${applicationId}?tab=documents`"
            class="px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200"
            :class="[
              'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
          >
            Documents
          </NuxtLink>
          <NuxtLink
            :to="`/dashboard/applications/${applicationId}?tab=payment`"
            class="px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200"
            :class="[
              'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
          >
            Payment
          </NuxtLink>
        </div>
        <div class="flex justify-center gap-2.5 sm:justify-end w-full sm:w-auto">
        
          <button
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Update Status
          </button>
        </div>
      </div>

      <!-- Travelers Content -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <!-- Search and Filter Buttons -->
          <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
            <!-- Search Bar -->
            <div class="relative flex-1 w-full sm:w-[30%]">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Travelers"
                class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                style="border-radius: 7px"
              />
            </div>
          </div>
        </div>

        <!-- Travelers Table -->
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
                      @change="toggleSelectAll"
                      class="border-gray-300"
                      style="border-radius: 7px"
                    />
                  </th>

                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Name</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Passport</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Issue Date</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Expiry Date</span>
                    </div>
                  </th>
                  <th class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                <!-- Loading State -->
                <tr v-if="isLoadingTravelers">
                  <td colspan="6" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    Loading travelers...
                  </td>
                </tr>
                
                <!-- Empty State -->
                <tr v-else-if="!isLoadingTravelers && filteredTravelers.length === 0">
                  <td colspan="6" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    No travelers found for this application.
                  </td>
                </tr>
                
                <!-- Data Rows -->
                <tr
                  v-for="traveler in filteredTravelers"
                  :key="traveler.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td class="px-2 sm:px-3 lg:px-4 py-2">
                    <input
                      type="checkbox"
                      v-model="traveler.selected"
                      class="border-gray-300"
                      style="border-radius: 7px"
                    />
                  </td>
                  <td
                    class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-[#475467] dark:text-white cursor-pointer"
                    @click="viewTravelerDetails(traveler)"
                    style="
                      font-size: 14px;
                      font-weight: 400;
                      font-style: normal;
                      line-height: 20px;
                      font-family: 'Geist', sans-serif;
                      letter-spacing: 0;
                    "
                  >
                    {{ `${traveler.firstName || ''} ${traveler.lastName || ''}`.trim() || '-' }}
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
                    {{ traveler.passportNumber || '-' }}
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
                    {{ formatDate(traveler.passportIssueDate) }}
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
                    {{ formatDate(traveler.passportExpiryDate) }}
                  </td>
                  <td class="px-2 sm:px-3 lg:px-4 py-2">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="viewTravelerDetails(traveler)"
                        class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        title="View Details"
                      >
                        <Eye
                          class="h-4 w-4 text-gray-600 dark:text-gray-400"
                        />
                      </button>
                      <button
                        @click="editTraveler(traveler)"
                        class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        title="Edit"
                      >
                        <Pencil
                          class="h-4 w-4 text-gray-600 dark:text-gray-400"
                        />
                      </button>
                      <button
                        @click="deleteTraveler(traveler)"
                        class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        title="Delete"
                      >
                        <Trash2
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
            {{ selectedTravelersCount }} of {{ travelers.length }} row(s)
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
              @click="previousPage"
              style="border-radius: 7px"
            >
              Previous
            </button>

            <button
              class="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs sm:text-sm"
              @click="nextPage"
              style="border-radius: 7px"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "~/components/DashboardLayout.vue";
import { ArrowLeft, Pencil, Trash2, Eye } from "lucide-vue-next";
import { useApplication } from "~/composables/useApplication";

// Get route parameters
const route = useRoute();
const router = useRouter();
const applicationId = computed(() => route.params.id);

// Use application composable
const { getApplication, getApplicationTravelers } = useApplication();

// Application data (for header)
const application = ref(null);
const isLoadingApplication = ref(false);

// Travelers data
const travelers = ref([]);
const isLoadingTravelers = ref(false);

// Search and pagination
const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;

// Load application details (for header)
const loadApplication = async () => {
  if (!applicationId.value) return;
  
  try {
    isLoadingApplication.value = true;
    const data = await getApplication(applicationId.value);
    application.value = data;
  } catch (error) {
    console.error("Error loading application:", error);
  } finally {
    isLoadingApplication.value = false;
  }
};

// Load travelers
const loadTravelers = async () => {
  if (!applicationId.value) return;
  
  try {
    isLoadingTravelers.value = true;
    
    // First, try to fetch from API
    const data = await getApplicationTravelers(applicationId.value);
    
    if (data) {
      travelers.value = Array.isArray(data) ? data.map((t) => ({
        ...t,
        selected: false,
      })) : (Array.isArray(data.data) ? data.data.map((t) => ({
        ...t,
        selected: false,
      })) : []);
    } else {
      travelers.value = [];
    }
  } catch (error) {
    console.error("Error loading travelers:", error);
    // If API fails, check if travelers are in application object as fallback
    if (application.value?.travelers && Array.isArray(application.value.travelers)) {
      travelers.value = application.value.travelers.map((t) => ({
        ...t,
        selected: false,
      }));
    } else {
      travelers.value = [];
    }
  } finally {
    isLoadingTravelers.value = false;
  }
};

// Filtered travelers
const filteredTravelers = computed(() => {
  let filtered = travelers.value;

  if (searchQuery.value) {
    const search = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (traveler) =>
        `${traveler.firstName || ''} ${traveler.lastName || ''}`.toLowerCase().includes(search) ||
        (traveler.email || '').toLowerCase().includes(search) ||
        (traveler.passportNumber || '').toLowerCase().includes(search)
    );
  }

  return filtered;
});

const selectedTravelersCount = computed(() => {
  return travelers.value.filter((traveler) => traveler.selected).length;
});

const toggleSelectAll = () => {
  travelers.value.forEach((traveler) => {
    traveler.selected = selectAll.value;
  });
};

const viewTravelerDetails = (traveler) => {
  router.push(`/dashboard/applications/${applicationId.value}/travellers/${traveler.id}`);
};

const editTraveler = (traveler) => {
  console.log("Edit traveler:", traveler);
  // Add edit functionality
};

const deleteTraveler = (traveler) => {
  console.log("Delete traveler:", traveler);
  // Add delete functionality
};

// Format date helper
const formatDate = (date) => {
  if (!date) return '-';
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '-';
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return date.toString();
  }
};

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredTravelers.value.length / itemsPerPage);
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Set page title
useHead({
  title: computed(
    () => `${application.value?.applicationNumber || application.value?.id || 'Application'} - Travellers - iVisa`
  ),
});

// Load data on mount
onMounted(() => {
  loadApplication();
  loadTravelers();
});

// Navigation
const goBack = () => {
  router.push(`/dashboard/applications/${applicationId.value}`);
};
</script>

