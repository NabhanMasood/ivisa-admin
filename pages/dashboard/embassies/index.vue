<template>
  <DashboardLayout>
          <div class="space-y-8 sm:space-y-4">
            <!-- Page Title and Add Button -->
            <div class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4">
              <div class="flex-1 min-w-0">
                <h1 class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  Embassies
                </h1>
                <label class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
                  style="font-weight: 400; letter-spacing: 0%">
                  Here you can find all the Embassies.
                </label>
              </div>
              <button
                @click="navigateToAddEmbassy"
                class="bg-black h-[36px] dark:bg-white text-white dark:text-black px-3 sm:px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 rounded-[7px] flex-shrink-0">
                <div
                  class="flex items-center justify-center w-4 h-4 border border-white dark:border-black rounded-full bg-black dark:bg-white">
                  <Plus class="h-4 w-4 text-white dark:text-black" />
                </div>
                <span class="text-sm sm:text-base" style="
                    font-size: 14px;
                    font-weight: 400;
                    font-style: normal;
                    line-height: 20px;
                    font-family: 'Geist', sans-serif;
                    letter-spacing: 0;
                  ">Add Embassy</span>
              </button>
            </div>
            <!-- Search and Filters Row -->
            <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
              <!-- Search and Filter Buttons -->
              <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
                <!-- Search Bar -->
                <div class="relative flex-1 w-full sm:w-[30%]">
                  <input v-model="searchQuery" type="text" placeholder="Search Embassies"
                    class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                    style="border-radius: 7px" />
                </div>

                <!-- Buttons Row (Status, Plan, Role) -->
                <!-- <div class="flex flex-row gap-2 w-full sm:w-auto">
                  <div class="relative flex-1">
                    <button @click="toggleStatusDropdown"
                      class="w-full h-[36px] sm:w-auto bg-[#FFFFFF] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31] transition-colors flex items-center justify-center space-x-2 text-sm"
                      style="border-radius: 5px">
                      <div
                        class="w-4 h-4 rounded-full border border-black dark:border-white bg-white dark:bg-[#18181B] flex items-center justify-center">
                        <Plus class="h-3 w-3 text-black dark:text-white" />
                      </div>
                      <span class="sm:inline">Status</span>
                    </button>

                    <div v-if="statusDropdownOpen"
                      class="absolute top-full left-0 z-10 mt-2 w-52 bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
                      style="border-radius: 5px">
              
                      <div class="p-1 border-b border-gray-200 dark:border-[#27272B]">
                        <div class="relative">
                          <Search class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input type="text" placeholder="Status"
                            class="w-full h-8 pl-[33px] text-sm border-none dark:border-gray-600 bg-white dark:bg-[#09090B] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#09090B]"
                            style="border-radius: 5px" />
                        </div>
                      </div>

                      <div class="py-1">
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Active</span>
                        </label>
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Inactive</span>
                        </label>
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Pending</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="relative flex-1">
                    <button @click="togglePlanDropdown"
                      class="w-full h-[36px] sm:w-auto bg-[#FFFFFF] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31] transition-colors flex items-center justify-center space-x-2 text-sm"
                      style="border-radius: 5px">
                      <div
                        class="w-4 h-4 rounded-full border border-black dark:border-white bg-white dark:bg-[#18181B] flex items-center justify-center">
                        <Plus class="h-3 w-3 text-black dark:text-white" />
                      </div>
                      <span class="sm:inline">Plan</span>
                    </button>

                    <div v-if="planDropdownOpen"
                      class="absolute top-full left-0 z-10 mt-2 w-52 bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
                      style="border-radius: 5px">
                      <div class="p-1 border-b border-gray-200 dark:border-[#27272B]">
                        <div class="relative">
                          <Search class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input type="text" placeholder="Plan"
                            class="w-full h-8 pl-[33px] text-sm border-none dark:border-gray-600 bg-white dark:bg-[#09090B] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#09090B]"
                            style="border-radius: 5px" />
                        </div>
                      </div>

                      <div class="py-1">
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Basic</span>
                        </label>
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Team</span>
                        </label>
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Enterprise</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="relative flex-1">
                    <button @click="toggleRoleDropdown"
                      class="w-full h-[36px] sm:w-auto bg-[#FFFFFF] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31] transition-colors flex items-center justify-center space-x-2 text-sm"
                      style="border-radius: 5px">
                      <div
                        class="w-4 h-4 rounded-full border border-black dark:border-white bg-white dark:bg-[#18181B] flex items-center justify-center">
                        <Plus class="h-3 w-3 text-black dark:text-white" />
                      </div>
                      <span class="sm:inline">Role</span>
                    </button>

                    <div v-if="roleDropdownOpen"
                      class="absolute top-full left-0 z-10 mt-2 w-52 bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
                      style="border-radius: 5px">
                      <div class="p-1 border-b border-gray-200 dark:border-[#27272B]">
                        <div class="relative">
                          <Search class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input type="text" placeholder="Role"
                            class="w-full h-8 pl-[33px] text-sm border-none dark:border-gray-600 bg-white dark:bg-[#09090B] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#09090B]"
                            style="border-radius: 5px" />
                        </div>
                      </div>

                      <div class="py-1 overflow-y-auto">
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Construction Foreman</span>
                        </label>
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Project Manager</span>
                        </label>
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Surveyor</span>
                        </label>
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Architect</span>
                        </label>
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Subcontractor</span>
                        </label>
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Electrician</span>
                        </label>
                        <label
                          class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                          style="border-radius: 5px; margin: 3px">
                          <input type="checkbox"
                            class="mr-3 border-gray-300 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
                            style="background-color: #242428 !important" />
                          <span class="text-sm text-gray-900 dark:text-white">Estimator</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>

              <!-- Columns Filter Button -->
              <div class="flex justify-center sm:justify-end w-full sm:w-auto">
                <div class="relative w-full sm:w-auto">
                  <button @click="toggleColumnsDropdown"
                    class="w-full h-[36px] sm:w-auto bg-[#FFFFFF] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31] transition-colors flex items-center justify-center space-x-2 text-sm"
                    style="border-radius: 5px">
                    <Columns class="h-4 w-4" />
                    <span class="sm:inline">Columns</span>
                  </button>

                  <!-- Columns Dropdown -->
                  <div v-if="columnsDropdownOpen"
                    class="absolute top-full right-0 z-10 mt-2 w-48 bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
                    style="border-radius: 5px">
                    <!-- Column Options -->
                    <div class="py-1">
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px">
                        <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                        <span class="text-sm text-gray-900 dark:text-white">Name</span>
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px">
                        <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                        <span class="text-sm text-gray-900 dark:text-white">Role</span>
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px">
                        <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                        <span class="text-sm text-gray-900 dark:text-white">Plan_name</span>
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px">
                        <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                        <span class="text-sm text-gray-900 dark:text-white">Email</span>
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px">
                        <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                        <span class="text-sm text-gray-900 dark:text-white">Country</span>
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px">
                        <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                        <span class="text-sm text-gray-900 dark:text-white">Status</span>
                      </label>
                    </div>
                  </div>
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
              style="border-radius: 7px">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-[#FFFFFF] dark:bg-[#09090B] border-b dark:border-gray-800">
                    <tr class="!h-[37px]">
                      <th class="w-10 sm:w-12 px-4 py-3 text-left align-middle">
                        <input type="checkbox" v-model="selectAll" class="border-gray-300" style="border-radius: 7px" />
                      </th>
                      <th class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white">
                        Destination Country
                      </th>
                      <th class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white">
                        <div class="flex items-center space-x-1">
                          <span>Origin Countries</span>
                        </div>
                      </th>
                      <th class="w-20 px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr v-for="embassy in filteredEmbassies" :key="embassy.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td class="px-4 py-3">
                        <input type="checkbox" v-model="embassy.selected" class="border-gray-300"
                          style="border-radius: 7px" />
                      </td>
                      <td class="px-4 py-3 text-sm text-[#475467] dark:text-white font-medium">
                        {{ embassy.destinationCountry }}
                      </td>
                      <td class="px-4 py-3 text-sm text-[#475467] dark:text-white">
                        {{ embassy.originCountriesCount }}
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center space-x-2">
                          <button
                            @click="viewEmbassy(embassy.destinationCountry)"
                            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            title="View">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                              </path>
                            </svg>
                          </button>
                          <button
                            @click="deleteEmbassyHandler(embassy)"
                            :disabled="isDeleting"
                            class="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete"
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
            <div class="flex flex-row items-center justify-between flex-wrap gap-2 sm:gap-4 w-full">
              <!-- Selection Count -->
              <div class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ selectedCount }} of {{ embassies.length }} row(s) selected.
              </div>

              <!-- Navigation Buttons -->
              <div class="flex items-center space-x-2">
                <button
                  class="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs sm:text-sm"
                  :disabled="currentPage === 1" :class="{
                    'opacity-50 cursor-not-allowed': currentPage === 1,
                  }" style="border-radius: 7px">
                  Previous
                </button>

                <button
                  class="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs sm:text-sm"
                  style="border-radius: 7px">
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
  Trash2,
} from "lucide-vue-next";
import { useEmbassiesApi } from "~/composables/useEmbassiesApi";

// Set page title
useHead({
  title: "Embassies - iVisa",
});

// API composable
const { getAllEmbassies, getEmbassiesByDestination, getEmbassiesByDestinationAndOrigin, deleteEmbassy: deleteEmbassyApi } = useEmbassiesApi();

// Embassies data (loaded from API)
const embassies = ref([]);

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const statusDropdownOpen = ref(false);
const planDropdownOpen = ref(false);
const roleDropdownOpen = ref(false);
const columnsDropdownOpen = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const isDeleting = ref(false);

// Load embassies from API
const loadEmbassies = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    
    const response = await getAllEmbassies();
    
    if (response.success && response.data) {
      // Map API data to include selected property
      embassies.value = response.data.map((embassy, index) => ({
        id: index + 1, // Use index as ID since API doesn't provide one
        destinationCountry: embassy.destinationCountry,
        originCountriesCount: embassy.originCountriesCount,
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

  return embassies.value.filter((embassy) =>
    embassy.destinationCountry
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
});

const selectedCount = computed(() => {
  return embassies.value.filter((embassy) => embassy.selected).length;
});

// Methods
const router = useRouter();

const navigateToAddEmbassy = () => {
  router.push("/dashboard/embassies/add");
};

const viewEmbassy = (destinationCountry) => {
  // Navigate to country-specific embassies page
  router.push(`/dashboard/embassies/destination/${encodeURIComponent(destinationCountry)}`);
};

// Delete embassies for a destination country
const deleteEmbassyHandler = async (embassy) => {
  if (!embassy.destinationCountry) {
    errorMessage.value = "Cannot delete embassies: destination country is missing";
    return;
  }

  if (!confirm(`Are you sure you want to delete all embassies for "${embassy.destinationCountry}"? This will delete ${embassy.originCountriesCount} origin country entries. This action cannot be undone.`)) {
    return;
  }

  try {
    isDeleting.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    // First, fetch all origin countries for this destination
    const originsResponse = await getEmbassiesByDestination(embassy.destinationCountry);
    
    if (!originsResponse.success || !originsResponse.data) {
      errorMessage.value = "Failed to fetch embassy details";
      return;
    }

    // Collect all embassy IDs by fetching embassies for each origin country
    const embassyIds = [];
    for (const origin of originsResponse.data) {
      const embassiesResponse = await getEmbassiesByDestinationAndOrigin(
        embassy.destinationCountry,
        origin.originCountry
      );
      
      if (embassiesResponse.success && embassiesResponse.data) {
        embassiesResponse.data.forEach(emb => {
          if (emb.id) {
            embassyIds.push(emb.id);
          }
        });
      }
    }

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
      embassies.value = embassies.value.filter(e => e.destinationCountry !== embassy.destinationCountry);
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


const toggleStatusDropdown = () => {
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  statusDropdownOpen.value = !statusDropdownOpen.value;
};

const togglePlanDropdown = () => {
  statusDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  planDropdownOpen.value = !planDropdownOpen.value;
};

const toggleRoleDropdown = () => {
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  roleDropdownOpen.value = !roleDropdownOpen.value;
};

const toggleColumnsDropdown = () => {
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = !columnsDropdownOpen.value;
};

// Watch for select all changes
watch(selectAll, (newValue) => {
  embassies.value.forEach((embassy) => {
    embassy.selected = newValue;
  });
});

// Load embassies on mount
onMounted(() => {
  loadEmbassies();
});

// Refresh embassies list when page becomes active (useful when returning from edit page)
onActivated(() => {
  loadEmbassies();
});

</script>
