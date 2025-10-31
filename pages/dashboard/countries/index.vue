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
                  Countries
                </h1>
                <label
                  class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
                  style="font-weight: 400; letter-spacing: 0%"
                >
                  Here you can find all the Countries.
                </label>
              </div>
              <button
                @click="navigateToAddCountry"
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
                  >Add Country</span
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
                    placeholder="Search Countries"
                    class="w-full h-[36px] border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                    style="border-radius: 7px"
                  />
                </div>
              </div>
            </div>

            <!-- Loading State -->
            <div
              v-if="isLoading"
              class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden flex items-center justify-center py-12"
              style="border-radius: 7px"
            >
              <div class="flex flex-col items-center gap-3">
                <div class="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin"></div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Loading countries...</p>
              </div>
            </div>

            <!-- Error State -->
            <div
              v-else-if="errorMessage"
              class="bg-white dark:bg-[#09090B] rounded-lg border border-red-200 dark:border-red-800 overflow-hidden p-6"
              style="border-radius: 7px"
            >
              <div class="flex flex-col items-center gap-3">
                <p class="text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
                <button
                  @click="loadCountries"
                  class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>

            <!-- Empty State -->
            <div
              v-else-if="!isLoading && countries.length === 0"
              class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden p-12"
              style="border-radius: 7px"
            >
              <div class="flex flex-col items-center gap-3">
                <p class="text-sm text-gray-600 dark:text-gray-400">No countries found</p>
                <button
                  @click="navigateToAddCountry"
                  class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Add Your First Country
                </button>
              </div>
            </div>

            <!-- Countries Table -->
            <div
              v-else
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
                        Country
                      </th>
                      <th
                        class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                      >
                        Date Added
                      </th>
                      <th class="w-20 px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr
                      v-for="country in filteredCountries"
                      :key="country.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td class="px-4 py-3">
                        <input
                          type="checkbox"
                          v-model="country.selected"
                          class="border-gray-300"
                          style="border-radius: 7px"
                        />
                      </td>
                      <td
                        class="px-4 py-3 text-sm text-[#475467] dark:text-white font-medium"
                      >
                        {{ country.countryName }}
                      </td>
                      <td
                        class="px-4 py-3 text-sm text-[#475467] dark:text-white"
                      >
                        {{ country.createdAt || 'N/A' }}
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center space-x-2">
                          <button
                            @click="viewCountry(country)"
                            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            title="View"
                          >
                            <svg
                              class="h-4 w-4"
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
                            @click="editCountry(country)"
                            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            title="Edit"
                          >
                            <svg
                              class="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              ></path>
                            </svg>
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
                {{ selectedCount }} of {{ countries.length }} row(s) selected.
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
import DashboardLayout from "~/components/DashboardLayout.vue";
import { Plus } from "lucide-vue-next";
import { useCountriesApi, type Country } from "~/composables/useCountriesApi";

// Set page title
useHead({
  title: "Countries - iVisa",
});

// Initialize API
const { getCountries } = useCountriesApi();

// Reactive state
const countries = ref<Array<Country & { selected: boolean }>>([]);
const isLoading = ref(false);
const errorMessage = ref("");
const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);

// Load countries from API
const loadCountries = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    
    const response = await getCountries();
    
    if (response.success && response.data) {
      // Map API data to include selected property
      countries.value = response.data.map((country) => ({
        ...country,
        selected: false,
      }));
    } else {
      countries.value = [];
      errorMessage.value = response.message || "Failed to load countries";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load countries. Please try again.";
    countries.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Computed properties
const filteredCountries = computed(() => {
  if (!searchQuery.value) return countries.value;

  return countries.value.filter((country) =>
    country.countryName?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectedCount = computed(() => {
  return countries.value.filter((country) => country.selected).length;
});

// Methods
const router = useRouter();

const navigateToAddCountry = () => {
  router.push("/dashboard/countries/add");
};

const viewCountry = (country: Country) => {
  router.push(`/dashboard/countries/add?id=${country.id}&mode=view`);
};

const editCountry = (country: Country) => {
  router.push(`/dashboard/countries/add?id=${country.id}&mode=edit`);
};

// Watch for select all changes
watch(selectAll, (newValue) => {
  countries.value.forEach((country) => {
    country.selected = newValue;
  });
});

// Load countries on mount
onMounted(() => {
  loadCountries();
});

// Refresh countries list when page becomes active (useful when returning from edit page)
onActivated(() => {
  loadCountries();
});
</script>
