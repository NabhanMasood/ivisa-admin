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
                  Nationalities
                </h1>
                <label
                  class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
                  style="font-weight: 400; letter-spacing: 0%"
                >
                  Here you can find all the Nationalities.
                </label>
              </div>
              <div class="flex items-center gap-2 sm:gap-3">
                <button
                  @click="openImportModal"
                  class="bg-white dark:bg-[#18181B] h-[36px] border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white px-3 sm:px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors flex items-center justify-center space-x-2 rounded-[7px] flex-shrink-0"
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
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <span
                    class="text-sm sm:text-base hidden sm:inline"
                    style="
                      font-size: 14px;
                      font-weight: 400;
                      font-style: normal;
                      line-height: 20px;
                      font-family: 'Geist', sans-serif;
                      letter-spacing: 0;
                    "
                    >Import CSV</span
                  >
                </button>
                <button
                  @click="navigateToAddNationality"
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
                    >Add Nationality</span
                  >
                </button>
              </div>
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
                    placeholder="Search Nationalities"
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

            <!-- Loading State -->
            <div
              v-if="isLoading"
              class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden flex items-center justify-center py-12"
              style="border-radius: 7px"
            >
              <div class="flex flex-col items-center gap-3">
                <div class="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin"></div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Loading nationalities...</p>
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

            <!-- Error State -->
            <div
              v-if="errorMessage"
              class="bg-white dark:bg-[#09090B] rounded-lg border border-red-200 dark:border-red-800 overflow-hidden p-6"
              style="border-radius: 7px"
            >
              <div class="flex flex-col items-center gap-3">
                <p class="text-sm text-red-600 dark:text-red-400 text-center">{{ errorMessage }}</p>
                <button
                  @click="loadNationalities"
                  class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>

            <!-- Nationalities Table -->
            <div
              v-if="!isLoading && !errorMessage && nationalities.length > 0"
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
                        Nationality (Passport)
                      </th>
                      <th
                        class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Destinations</span>
                        </div>
                      </th>
                      <th class="w-20 px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr
                      v-if="filteredNationalities.length === 0"
                      class="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        No nationalities found
                      </td>
                    </tr>
                    <tr
                      v-for="nationality in filteredNationalities"
                      :key="nationality.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td class="px-4 py-3">
                        <input
                          type="checkbox"
                          v-model="nationality.selected"
                          class="border-gray-300"
                          style="border-radius: 7px"
                        />
                      </td>
                      <td
                        class="px-4 py-3 text-sm text-[#475467] dark:text-white font-medium"
                      >
                        {{ nationality.name }}
                      </td>
                      <td
                        class="px-4 py-3 text-sm text-[#475467] dark:text-white"
                      >
                        {{ nationality.destinations }}
                      </td>
                     
                      <td class="px-4 py-3">
                        <div class="flex items-center space-x-2">
                          <button
                            @click="viewNationality(nationality)"
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
                            @click="editNationality(nationality)"
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
                          <button
                            @click="deleteNationalityHandler(nationality)"
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
            <div
              class="flex flex-row items-center justify-between flex-wrap gap-2 sm:gap-4 w-full"
            >
              <!-- Selection Count -->
              <div
                class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap"
              >
                {{ selectedCount }} of {{ nationalities.length }} row(s)
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

          <!-- CSV Import Modal -->
          <div
            v-if="showImportModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70"
            @click.self="closeImportModal"
          >
            <div
              class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              style="border-radius: 7px"
            >
              <!-- Modal Header -->
              <div
                class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800"
              >
                <h2
                  class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white"
                >
                  Import CSV
                </h2>
                <button
                  @click="closeImportModal"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <!-- Modal Body -->
              <div class="p-4 sm:p-6 space-y-4">
                <!-- File Upload Area -->
                <div
                  @click="triggerFileInput"
                  @dragover.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  @drop.prevent="handleFileDrop"
                  class="border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors"
                  :class="
                    isDragging
                      ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-900'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                  "
                  style="border-radius: 7px"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    accept=".csv"
                    @change="handleFileSelect"
                    class="hidden"
                  />
                  <div class="flex flex-col items-center space-y-3">
                    <svg
                      class="h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white">
                        <span class="text-black dark:text-white">Click to upload</span>
                        <span class="text-gray-500 dark:text-gray-400"> or drag and drop</span>
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        CSV file (max. 10MB)
                      </p>
                    </div>
                    <p
                      v-if="selectedFile"
                      class="text-sm text-gray-700 dark:text-gray-300 font-medium"
                    >
                      Selected: {{ selectedFile.name }}
                    </p>
                  </div>
                </div>

                <!-- Import Info -->
                <div
                  class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
                  style="border-radius: 7px"
                >
                  <p class="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Note:</strong> The CSV file should follow the standard or compact format as described in the documentation. Make sure all required fields are present and nationality names match existing countries.
                  </p>
                </div>

                <!-- Error Messages -->
                <div
                  v-if="importError"
                  class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
                  style="border-radius: 7px"
                >
                  <p class="text-sm text-red-800 dark:text-red-300">
                    {{ importError }}
                  </p>
                </div>

                <!-- Import Results -->
                <div
                  v-if="importResult"
                  class="space-y-3"
                >
                  <div
                    class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
                    style="border-radius: 7px"
                  >
                    <p class="text-sm font-medium text-green-800 dark:text-green-300 mb-2">
                      {{ importResult.message }}
                    </p>
                    <div class="text-xs text-green-700 dark:text-green-400 space-y-1">
                      <p>Total rows: {{ importResult.data.totalRows }}</p>
                      <p>Processed: {{ importResult.data.processed }}</p>
                      <p>Visa products created: {{ importResult.data.visaProductsCreated }}</p>
                      <p>Visa products reused: {{ importResult.data.visaProductsReused }}</p>
                      <p>Nationalities created: {{ importResult.data.nationalitiesCreated }}</p>
                    </div>
                  </div>

                  <!-- Errors List -->
                  <div
                    v-if="importResult.data.errors && importResult.data.errors.length > 0"
                    class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
                    style="border-radius: 7px"
                  >
                    <p class="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                      Errors ({{ importResult.data.errors.length }}):
                    </p>
                    <ul class="text-xs text-yellow-700 dark:text-yellow-400 space-y-1 max-h-32 overflow-y-auto">
                      <li
                        v-for="(error, index) in importResult.data.errors"
                        :key="index"
                      >
                        Row {{ error.row }}: {{ error.error }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Modal Footer -->
              <div
                class="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-800"
              >
                <button
                  @click="closeImportModal"
                  class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#18181B] border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors"
                  style="border-radius: 7px"
                >
                  {{ importResult ? 'Close' : 'Cancel' }}
                </button>
                <button
                  @click="handleImport"
                  :disabled="!selectedFile || isImporting"
                  class="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style="border-radius: 7px"
                >
                  <span v-if="isImporting">Importing...</span>
                  <span v-else>Upload</span>
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
  Search,
  Trash2,
} from "lucide-vue-next";
import { useNationalitiesApi } from "~/composables/useNationalitiesApi";

// Set page title
useHead({
  title: "Nationalities - iVisa",
});

// Initialize API
const { getNationalitiesList, getNationalities, deleteNationality: deleteNationalityApi, importNationalitiesFromCSV } = useNationalitiesApi();

// Reactive state
const nationalities = ref<Array<{
  id: string | number;
  name: string;
  destinations: number;
  visaPermits?: string;
  selected: boolean;
}>>([]);
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const isDeleting = ref(false);
const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const columnsDropdownOpen = ref(false);

// CSV Import state
const showImportModal = ref(false);
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const isImporting = ref(false);
const importError = ref("");
const importResult = ref<{
  message: string;
  data: {
    totalRows: number;
    processed: number;
    visaProductsCreated: number;
    visaProductsReused: number;
    nationalitiesCreated: number;
    errors: Array<{ row: number; error: string }>;
  };
} | null>(null);

// Load nationalities from API
const loadNationalities = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    
    const query = searchQuery.value.trim();
    
    // Get the list for display (with destinations count)
    const listResponse = await getNationalitiesList(query || undefined);
    
    if (listResponse.success && listResponse.data) {
      // Also get full nationalities to get IDs
      let nationalityIdMap: Record<string, number | string> = {};
      try {
        const fullResponse = await getNationalities();
        if (fullResponse.success && fullResponse.data) {
          // Create a map of nationality name to ID
          // Since nationalities can have multiple entries (different destinations),
          // we'll use the first ID we find for each nationality name
          fullResponse.data.forEach((nat) => {
            if (nat.nationality && nat.id && !nationalityIdMap[nat.nationality]) {
              nationalityIdMap[nat.nationality] = nat.id;
            }
          });
        }
      } catch (error) {
        console.warn('Failed to load full nationalities for IDs:', error);
      }
      
      // Map API data to include id and selected property
      nationalities.value = listResponse.data.map((item, index) => ({
        id: nationalityIdMap[item.nationality] || `nationality-${index}-${item.nationality}`,
        name: item.nationality,
        destinations: item.destinations,
        visaPermits: undefined, // API doesn't provide this
        selected: false,
      }));
    } else {
      nationalities.value = [];
      errorMessage.value = listResponse.message || "Failed to load nationalities";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load nationalities. Please try again.";
    nationalities.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Debounce search
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newQuery) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    loadNationalities();
  }, 300); // 300ms debounce
});

// Computed properties
const filteredNationalities = computed(() => {
  // API already filters by search query, so return all nationalities
  return nationalities.value;
});

const selectedCount = computed(() => {
  return nationalities.value.filter((nationality) => nationality.selected).length;
});

// Methods
const router = useRouter();

const navigateToAddNationality = () => {
  router.push("/dashboard/nationalities/add");
};

const viewNationality = (nationality: { name: string }) => {
  router.push(`/dashboard/nationalities/${encodeURIComponent(nationality.name)}/destinations`);
};

const editNationality = (nationality) => {
  router.push(`/dashboard/nationalities/add?id=${nationality.id}&mode=edit`);
};

// Delete nationality
const deleteNationalityHandler = async (nationality: { id: string | number; name: string; destinations: number }) => {
  if (!nationality.name) {
    errorMessage.value = "Cannot delete nationality: name is missing";
    return;
  }

  // Check if we have a valid numeric ID
  const nationalityId = nationality.id;
  const isNumericId = typeof nationalityId === 'number' || (typeof nationalityId === 'string' && /^\d+$/.test(nationalityId));
  
  if (!isNumericId) {
    errorMessage.value = `Cannot delete "${nationality.name}": Valid ID not available. The nationality may need to be refreshed.`;
    // Try to reload to get proper IDs
    setTimeout(() => {
      loadNationalities();
    }, 2000);
    return;
  }

  if (!confirm(`Are you sure you want to delete "${nationality.name}"? This action cannot be undone.`)) {
    return;
  }

  try {
    isDeleting.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    // Use the numeric ID for deletion
    const response = await deleteNationalityApi(nationalityId);

    if (response.success) {
      successMessage.value = response.message || "Nationality deleted successfully";
      // Remove the nationality from the list
      nationalities.value = nationalities.value.filter(n => n.name !== nationality.name);
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
    } else {
      errorMessage.value = response.message || "Failed to delete nationality";
    }
  } catch (error) {
    console.error("Failed to delete nationality:", error);
    const errorMsg = error instanceof Error ? error.message : "Failed to delete nationality. Please try again.";
    errorMessage.value = errorMsg;
    
    // If it's a validation error about ID, try to reload to get proper IDs
    if (errorMsg.includes('numeric') || errorMsg.includes('Validation')) {
      setTimeout(() => {
        loadNationalities();
      }, 2000);
    }
  } finally {
    isDeleting.value = false;
  }
};

const toggleColumnsDropdown = () => {
  columnsDropdownOpen.value = !columnsDropdownOpen.value;
};

// Watch for select all changes
watch(selectAll, (newValue) => {
  nationalities.value.forEach((nationality) => {
    nationality.selected = newValue;
  });
});

// Load nationalities on mount
onMounted(() => {
  loadNationalities();
});

// Refresh nationalities list when page becomes active
onActivated(() => {
  loadNationalities();
});

// CSV Import functions
const openImportModal = () => {
  showImportModal.value = true;
  importError.value = "";
  importResult.value = null;
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const closeImportModal = () => {
  showImportModal.value = false;
  importError.value = "";
  importResult.value = null;
  selectedFile.value = null;
  isDragging.value = false;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      importError.value = 'Please select a CSV file';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      importError.value = 'File size must be less than 10MB';
      return;
    }
    selectedFile.value = file;
    importError.value = "";
    importResult.value = null;
  }
};

const handleFileDrop = (event: DragEvent) => {
  isDragging.value = false;
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0];
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      importError.value = 'Please select a CSV file';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      importError.value = 'File size must be less than 10MB';
      return;
    }
    selectedFile.value = file;
    importError.value = "";
    importResult.value = null;
  }
};

const handleImport = async () => {
  if (!selectedFile.value) {
    importError.value = 'Please select a CSV file';
    return;
  }

  try {
    isImporting.value = true;
    importError.value = "";
    importResult.value = null;

    const response = await importNationalitiesFromCSV(selectedFile.value);

    if (response.success && response.data) {
      importResult.value = {
        message: response.message || 'CSV imported successfully',
        data: response.data,
      };
      
      // Reload nationalities list after successful import
      setTimeout(() => {
        loadNationalities();
      }, 1000);
    } else {
      importError.value = response.message || 'Failed to import CSV';
    }
  } catch (error) {
    console.error('CSV import error:', error);
    importError.value = error instanceof Error ? error.message : 'Failed to import CSV. Please try again.';
  } finally {
    isImporting.value = false;
  }
};
</script>
