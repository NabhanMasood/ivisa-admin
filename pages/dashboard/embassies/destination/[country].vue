<template>
  <DashboardLayout>
    <!-- Render destination country page (origin countries list) -->
    <div v-if="!isOriginRoute" class="space-y-8 sm:space-y-4">
      <!-- Page Title and Add Button -->
      <div class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4">
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
            Embassies - {{ countryName }}
            </h1>
            <label class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
                  style="font-weight: 400; letter-spacing: 0%">
                  Here you can find all the Embassies.
                </label>
          </div>
        </div>
        <button
          @click="navigateToAddEmbassy"
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
            >Add Embassy</span
          >
        </button>
      </div>

      <!-- Search and Filters Row -->
      <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <!-- Search and Filter Buttons -->
        <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
          <!-- Search Bar -->
          <div class="relative flex-1 w-full sm:w-[30%]">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search ..."
              class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
              style="border-radius: 7px"
            />
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-green-200 dark:border-green-800 overflow-hidden p-4"
        style="border-radius: 7px"
      >
        <p class="text-sm text-green-600 dark:text-green-400">{{ successMessage }}</p>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-red-200 dark:border-red-800 overflow-hidden p-6"
        style="border-radius: 7px"
      >
        <div class="flex flex-col items-center gap-3">
          <p class="text-sm text-red-600 dark:text-red-400 text-center">{{ errorMessage }}</p>
          <button
            @click="loadEmbassies"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>

      <!-- Embassies Table -->
      <div
        v-if="!isLoading && !errorMessage && embassies.length > 0"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
        style="border-radius: 7px"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead
              class="bg-[#FFFFFF] dark:bg-[#09090B] border-b dark:border-gray-800"
            >
              <tr class="!h-[37px]">
                <th class="w-10 sm:w-12 px-4 py-3 text-left align-middle">
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    class="border-gray-300"
                    style="border-radius: 7px"
                  />
                </th>
                <th
                  class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                >
                  Origin Country
                </th>
                <th
                  class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                >
                Origin Countries
                </th>
                <th class="w-20 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr
                v-for="item in filteredEmbassies"
                :key="item.originCountry"
                class="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td class="px-4 py-3">
                  <input
                    type="checkbox"
                    v-model="item.selected"
                    class="border-gray-300"
                    style="border-radius: 7px"
                  />
                </td>
                <td
                  class="px-4 py-3 text-sm text-[#475467] dark:text-white font-medium"
                >
                  {{ item.originCountry }}
                </td>
                <td
                  class="px-4 py-3 text-sm text-[#475467] dark:text-white"
                >
                  {{ item.embassiesCount }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center space-x-2">
                    <button
                      @click.stop.prevent="viewEmbassy(item.originCountry)"
                      class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer relative z-10"
                      title="View"
                      type="button"
                      style="pointer-events: auto;"
                    >
                      <svg
                        class="h-4 w-4 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      @click.stop.prevent="deleteEmbassyHandler(item)"
                      :disabled="isDeleting"
                      class="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete"
                      type="button"
                    >
                      <Trash2 class="h-4 w-4" />
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
          {{ selectedCount }} of {{ embassies.length }} row(s) selected.
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
    <!-- Render child routes (origin country embassies) -->
    <NuxtPage v-if="isOriginRoute" />
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "~/components/DashboardLayout.vue";
import { ArrowLeft, Plus, Trash2 } from "lucide-vue-next";
import { useEmbassiesApi } from "~/composables/useEmbassiesApi";

// Get route parameters
const route = useRoute();
const router = useRouter();

// Check if this is an origin route (child route) - if so, don't render this component
const isOriginRoute = computed(() => {
  return route.path.includes('/origin/');
});


// Get country from route params
const countryName = computed(() => {
  const country = route.params.country;
  return country ? decodeURIComponent(String(country)) : '';
});

// Set page title
useHead({
  title: `${countryName.value} Embassies - iVisa`,
});

// API composable
const { getEmbassiesByDestination, getEmbassiesByDestinationAndOrigin, deleteEmbassy: deleteEmbassyApi } = useEmbassiesApi();

// Embassies data (loaded from API)
const embassies = ref([]);

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const isDeleting = ref(false);

// Load embassies from API
const loadEmbassies = async () => {
  if (!countryName.value) return;
  
  try {
    isLoading.value = true;
    errorMessage.value = "";
    
    const response = await getEmbassiesByDestination(countryName.value);
    
    if (response.success && response.data) {
      // Map API data to include selected property
      embassies.value = response.data.map((item) => ({
        originCountry: item.originCountry,
        embassiesCount: item.embassiesCount,
        selected: false,
      }));
    } else {
      embassies.value = [];
      errorMessage.value = response.message || "Failed to load embassies";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load embassies. Please try again.";
    embassies.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Computed properties
const filteredEmbassies = computed(() => {
  if (!searchQuery.value) return embassies.value;

  return embassies.value.filter((item) =>
    item.originCountry?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectedCount = computed(() => {
  return embassies.value.filter((item) => item.selected).length;
});

// Methods
const goBack = () => {
  router.push("/dashboard/embassies");
};

const navigateToAddEmbassy = () => {
  router.push(`/dashboard/embassies/add?country=${encodeURIComponent(countryName.value)}`);
};

const viewEmbassy = (originCountry) => {
  if (!originCountry || !countryName.value) {
    return;
  }
  
  const destination = encodeURIComponent(countryName.value);
  const origin = encodeURIComponent(originCountry);
  const path = `/dashboard/embassies/destination/${destination}/origin/${origin}`;
  window.location.href = path;
};

// Delete embassies for an origin country within a destination
const deleteEmbassyHandler = async (item) => {
  if (!item.originCountry || !countryName.value) {
    errorMessage.value = "Cannot delete embassies: origin country or destination country is missing";
    return;
  }

  if (!confirm(`Are you sure you want to delete all embassies for "${item.originCountry}" in "${countryName.value}"? This will delete ${item.embassiesCount} embassy entries. This action cannot be undone.`)) {
    return;
  }

  try {
    isDeleting.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    // First, fetch all embassy records for this destination and origin to get their IDs
    const embassiesResponse = await getEmbassiesByDestinationAndOrigin(
      countryName.value,
      item.originCountry
    );
    
    if (!embassiesResponse.success || !embassiesResponse.data) {
      errorMessage.value = "Failed to fetch embassy details";
      return;
    }

    // Extract embassy IDs
    const embassyIds = embassiesResponse.data
      .filter(emb => emb.id)
      .map(emb => emb.id);

    if (embassyIds.length === 0) {
      errorMessage.value = "No embassies found to delete";
      return;
    }

    // Delete each embassy by ID
    let successCount = 0;
    let failCount = 0;
    
    for (const embassyId of embassyIds) {
      try {
        const deleteResponse = await deleteEmbassyApi(embassyId);
        if (deleteResponse.success) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (err) {
        console.error(`Failed to delete embassy ${embassyId}:`, err);
        failCount++;
      }
    }

    if (failCount === 0) {
      successMessage.value = `Successfully deleted ${successCount} embassies`;
      // Remove the embassy from the list
      embassies.value = embassies.value.filter(e => e.originCountry !== item.originCountry);
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
    } else if (successCount > 0) {
      errorMessage.value = `Deleted ${successCount} embassies, but ${failCount} failed to delete`;
    } else {
      errorMessage.value = `Failed to delete embassies`;
    }
  } catch (error) {
    console.error("Failed to delete embassies:", error);
    const errorMsg = error instanceof Error ? error.message : "Failed to delete embassies. Please try again.";
    errorMessage.value = errorMsg;
  } finally {
    isDeleting.value = false;
  }
};



// Watch for select all changes
watch(selectAll, (newValue) => {
  embassies.value.forEach((item) => {
    item.selected = newValue;
  });
});

// Load embassies on mount (only if not an origin route)
onMounted(() => {
  if (!isOriginRoute.value && countryName.value) {
    loadEmbassies();
  }
});

// Refresh embassies list when page becomes active (only if not an origin route)
onActivated(() => {
  if (!isOriginRoute.value && countryName.value) {
    loadEmbassies();
  }
});
</script>
