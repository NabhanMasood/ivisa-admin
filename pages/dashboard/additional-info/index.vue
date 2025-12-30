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
            Additional Info Forms
          </h1>
          <label
            class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
            style="font-weight: 400; letter-spacing: 0%"
          >
            Here you can find all the additional info forms
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
            @click="navigateToAddForm"
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
              >Add New</span
            >
          </button>
        </div>
      </div>

      <!-- Search and Filters Row -->
      <div
        class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4"
      >
        <!-- Search Bar -->
        <div class="relative flex-1 w-full sm:w-[40%]">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search forms..."
            class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
            style="border-radius: 7px"
          />
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
          <p class="text-sm text-gray-600 dark:text-gray-400">Loading forms...</p>
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
            @click="loadForms"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!isLoading && !errorMessage && groupedForms.length === 0"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden p-12"
        style="border-radius: 7px"
      >
        <div class="flex flex-col items-center gap-3">
          <p class="text-sm text-gray-600 dark:text-gray-400">No additional info forms found</p>
          <button
            @click="navigateToAddForm"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Add Your First Form
          </button>
        </div>
      </div>

      <!-- Forms List -->
      <div
        v-if="!isLoading && !errorMessage && groupedForms.length > 0"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
        style="border-radius: 7px"
      >
        <div class="overflow-x-auto">
          <table class="w-full min-w-[600px] sm:min-w-[800px]">
            <thead
              class="bg-[#FFFFFF] dark:bg-[#09090B] border-b dark:border-gray-800"
            >
              <tr class="!h-[37px] bg-[#F9FAFB] dark:bg-[#18181B]">
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
                  Visa Product
                </th>
                <th
                  class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Country
                </th>
                <th
                  class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Fields Count
                </th>
                <th class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <!-- Loading State -->
              <tr v-if="isLoading">
                <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Loading forms...
                </td>
              </tr>
              
              <!-- Empty State -->
              <tr v-else-if="!isLoading && filteredGroups.length === 0">
                <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {{ errorMessage || 'No forms found.' }}
                </td>
              </tr>
              
              <!-- Data Rows -->
              <tr
                v-for="group in filteredGroups"
                :key="group.visaProductId"
                class="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <input
                    type="checkbox"
                    v-model="group.selected"
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
                  {{ group.visaProductName }}
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
                  {{ group.country }}
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
                  {{ group.fields.length }} field{{ group.fields.length !== 1 ? 's' : '' }}
                </td>
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="viewForm(group)"
                      class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      title="View"
                    >
                      <Eye
                        class="h-4 w-4 text-gray-600 dark:text-gray-400"
                      />
                    </button>
                    <button
                      @click="editForm(group)"
                      class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      title="Edit"
                    >
                      <Pencil
                        class="h-4 w-4 text-gray-600 dark:text-gray-400"
                      />
                    </button>
                    <button
                      @click.stop="duplicateForm(group)"
                      :disabled="isDuplicating || isDeleting"
                      class="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Duplicate form"
                    >
                      <Copy
                        class="h-4 w-4 text-blue-600 dark:text-blue-400"
                      />
                    </button>
                    <button
                      @click.stop="deleteForm(group)"
                      :disabled="isDuplicating || isDeleting"
                      class="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Delete form"
                    >
                      <Trash2
                        class="h-4 w-4 text-red-600 dark:text-red-400"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Duplicate Form Modal -->
      <div
        v-if="showDuplicateModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="cancelDuplicate"
      >
        <div class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 p-6 max-w-md w-full mx-4" style="border-radius: 7px">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Duplicate Additional Info Form
          </h2>
          
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Select a visa product to copy the fields to. The fields from "<strong>{{ formToDuplicate?.visaProductName }}</strong>" will be copied to the selected visa product.
              </p>
              
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Visa Product <span class="text-red-500">*</span>
              </label>
              <CustomDropdown
                id="targetVisaProduct"
                v-model="targetVisaProductIdForDuplicate"
                :options="availableVisaProductsForDuplicate"
                placeholder="Select a visa product"
                search-placeholder="Search visa product..."
              />
            </div>
            
            <div v-if="errorMessage" class="text-sm text-red-600 dark:text-red-400">
              {{ errorMessage }}
            </div>
            
            <div class="flex justify-end gap-3">
              <button
                @click="cancelDuplicate"
                :disabled="isDuplicating"
                class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                @click="confirmDuplicate"
                :disabled="isDuplicating || !targetVisaProductIdForDuplicate"
                class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isDuplicating">Copying...</span>
                <span v-else>Copy Fields</span>
              </button>
            </div>
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
              Import Additional Info CSV
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
                ref="csvFileInput"
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
                  v-if="selectedImportFile"
                  class="text-sm text-gray-700 dark:text-gray-300 font-medium"
                >
                  Selected: {{ selectedImportFile.name }}
                </p>
              </div>
            </div>

            <!-- Import Info -->
            <div
              class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2"
              style="border-radius: 7px"
            >
              <p class="text-sm text-blue-800 dark:text-blue-300">
                <strong>Note:</strong> The CSV file should include columns: destination, productName, fieldType, question, and optional columns like placeholder, isRequired, displayOrder, options, etc.
              </p>
              <p class="text-sm text-amber-700 dark:text-amber-400">
                <strong>Important:</strong> Make sure the visa products referenced in your CSV (destination + productName) already exist in the system before importing.
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
                  <p>Fields created: {{ importResult.data.fieldsCreated }}</p>
                  <p>Fields updated: {{ importResult.data.fieldsUpdated }}</p>
                  <p>Products affected: {{ importResult.data.productsAffected }}</p>
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
              :disabled="!selectedImportFile || isImporting"
              class="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style="border-radius: 7px"
            >
              <span v-if="isImporting">Importing...</span>
              <span v-else>Upload</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "~/components/DashboardLayout.vue";
import CustomDropdown from "~/components/ui/CustomDropdown.vue";
import { Plus, Eye, Pencil, Copy, Trash2 } from "lucide-vue-next";
import { useVisaProductFieldsApi, type VisaProductField } from "~/composables/useVisaProductFieldsApi";
import { useVisaProductsApi } from "~/composables/useVisaProductsApi";

// Set page title
useHead({
  title: "Additional Info Forms - iVisa",
});

// Initialize APIs
const { getVisaProductFieldsByVisaProduct, batchGetFieldsByVisaProducts, deleteVisaProductField, batchDeleteVisaProductFields, createVisaProductField, importFromCSV } = useVisaProductFieldsApi();
const { getVisaProducts } = useVisaProductsApi();

// Reactive state
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const searchQuery = ref("");
const selectAll = ref(false);
const isDuplicating = ref(false);
const isDeleting = ref(false);
const showDuplicateModal = ref(false);
const formToDuplicate = ref<{ visaProductId: number | string; visaProductName: string; country: string; fields: VisaProductField[] } | null>(null);
const targetVisaProductIdForDuplicate = ref<string | number | undefined>(undefined);
const availableVisaProductsForDuplicate = ref<Array<{ value: string | number; label: string }>>([]);

// CSV Import state
const showImportModal = ref(false);
const selectedImportFile = ref<File | null>(null);
const csvFileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const isImporting = ref(false);
const importError = ref("");
const importResult = ref<{
  message: string;
  data: {
    totalRows: number;
    processed: number;
    fieldsCreated: number;
    fieldsUpdated: number;
    productsAffected: number;
    errors: Array<{ row: number; error: string }>;
  };
} | null>(null);
const forms = ref<Array<{
  visaProductId: number | string;
  visaProductName: string;
  country: string;
  fields: VisaProductField[];
  selected: boolean;
}>>([]);

// Grouped forms by visa product
const groupedForms = computed(() => {
  return forms.value;
});

// Filtered groups based on search
const filteredGroups = computed(() => {
  if (!searchQuery.value) return groupedForms.value;

  const query = searchQuery.value.toLowerCase();
  return groupedForms.value.filter(group =>
    group.visaProductName.toLowerCase().includes(query) ||
    group.country.toLowerCase().includes(query)
  );
});

// Selected count
const selectedCount = computed(() => {
  return forms.value.filter((form) => form.selected).length;
});

// Load forms
const loadForms = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    // Get all visa products
    const visaProductsResponse = await getVisaProducts();
    
    if (!visaProductsResponse.success || !visaProductsResponse.data) {
      forms.value = [];
      return;
    }

    // Extract visa product IDs
    const visaProductIds = visaProductsResponse.data
      .filter(product => product.id !== null && product.id !== undefined)
      .map(product => product.id!);

    if (visaProductIds.length === 0) {
      forms.value = [];
      return;
    }

    // Batch fetch all fields for all visa products in one call
    let fieldsByProductId: Record<string | number, VisaProductField[]> = {};
    
    try {
      const batchResponse = await batchGetFieldsByVisaProducts(visaProductIds);
      if (batchResponse.success && batchResponse.data) {
        fieldsByProductId = batchResponse.data;
      }
    } catch (batchError) {
      // Fallback to individual calls if batch endpoint doesn't exist or fails
      console.warn('Batch fetch failed, falling back to individual calls:', batchError);
      for (const productId of visaProductIds) {
        try {
          const fieldsResponse = await getVisaProductFieldsByVisaProduct(productId);
          if (fieldsResponse.success && fieldsResponse.data && fieldsResponse.data.length > 0) {
            fieldsByProductId[productId] = fieldsResponse.data;
          }
        } catch (error) {
          console.error(`Failed to load fields for product ${productId}:`, error);
        }
      }
    }

    // Build forms data from visa products and their fields
    const formsData: Array<{
      visaProductId: number | string;
      visaProductName: string;
      country: string;
      fields: VisaProductField[];
      selected: boolean;
    }> = [];

    for (const product of visaProductsResponse.data) {
      if (product.id) {
        const productFields = fieldsByProductId[product.id] || [];
        if (productFields.length > 0) {
          formsData.push({
            visaProductId: product.id,
            visaProductName: product.productName,
            country: product.country,
            fields: productFields.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)),
            selected: false,
          });
        }
      }
    }

    forms.value = formsData;
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load forms. Please try again.";
    forms.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Navigation
const router = useRouter();

const navigateToAddForm = () => {
  router.push("/dashboard/additional-info/add");
};

const viewForm = (group: { visaProductId: number | string; visaProductName: string; country: string; fields: VisaProductField[] }) => {
  router.push(`/dashboard/additional-info/${group.visaProductId}`);
};

const editForm = (group: { visaProductId: number | string; visaProductName: string; country: string; fields: VisaProductField[] }) => {
  router.push(`/dashboard/additional-info/add?mode=edit&visaProductId=${group.visaProductId}`);
};

// Duplicate form (only fields, not visa product)
const duplicateForm = async (group: { visaProductId: number | string; visaProductName: string; country: string; fields: VisaProductField[] }) => {
  // Prevent multiple simultaneous duplicate operations
  if (isDuplicating.value || isDeleting.value) {
    return;
  }

  if (!group.visaProductId) {
    errorMessage.value = "Cannot duplicate form: visa product ID is missing";
    return;
  }

  // Load available visa products for selection
  try {
    const visaProductsResponse = await getVisaProducts();
    if (visaProductsResponse.success && visaProductsResponse.data) {
      // Filter out the current visa product from the list
      availableVisaProductsForDuplicate.value = visaProductsResponse.data
        .filter(product => product.id && product.id !== group.visaProductId)
        .map(product => ({
          value: product.id!,
          label: `${product.productName} (${product.country})`,
        }));
      
      if (availableVisaProductsForDuplicate.value.length === 0) {
        errorMessage.value = "No other visa products available to copy fields to. Please create a visa product first.";
        return;
      }
    } else {
      errorMessage.value = "Failed to load visa products";
      return;
    }
  } catch (error) {
    console.error("Failed to load visa products:", error);
    errorMessage.value = "Failed to load visa products. Please try again.";
    return;
  }

  // Set up the duplicate modal
  formToDuplicate.value = group;
  targetVisaProductIdForDuplicate.value = undefined;
  showDuplicateModal.value = true;
};

// Confirm duplicate - copy fields to selected visa product
const confirmDuplicate = async () => {
  if (!formToDuplicate.value || !formToDuplicate.value.visaProductId) {
    errorMessage.value = "Cannot duplicate form: form data is missing";
    showDuplicateModal.value = false;
    return;
  }

  if (!targetVisaProductIdForDuplicate.value) {
    errorMessage.value = "Please select a visa product to copy the fields to";
    return;
  }

  if (targetVisaProductIdForDuplicate.value === formToDuplicate.value.visaProductId) {
    errorMessage.value = "Please select a different visa product";
    return;
  }

  // Set flag immediately to prevent multiple calls
  isDuplicating.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    // Copy all fields to the target visa product
    const fieldsToCopy = formToDuplicate.value.fields;
    let successCount = 0;
    let failCount = 0;

    for (const field of fieldsToCopy) {
      try {
        const createData = {
          visaProductId: Number(targetVisaProductIdForDuplicate.value),
          fieldType: field.fieldType,
          question: field.question,
          isRequired: field.isRequired || false,
          displayOrder: field.displayOrder || 0,
          isActive: field.isActive !== undefined ? field.isActive : true,
          options: field.options,
          minLength: field.minLength,
          maxLength: field.maxLength,
          allowedFileTypes: field.allowedFileTypes,
          maxFileSize: field.maxFileSize,
        };

        await createVisaProductField(createData);
        successCount++;
      } catch (error) {
        console.error(`Failed to copy field "${field.question}":`, error);
        failCount++;
      }
    }

    if (failCount === 0) {
      successMessage.value = `Successfully copied ${successCount} field(s) to the selected visa product`;
      showDuplicateModal.value = false;
      formToDuplicate.value = null;
      targetVisaProductIdForDuplicate.value = undefined;
      
      // Reload forms to show the updated list
      await loadForms();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
    } else {
      errorMessage.value = `Copied ${successCount} field(s) successfully, but ${failCount} field(s) failed. Please try again.`;
      // Still reload to show what was created
      await loadForms();
    }
  } catch (error) {
    console.error("Failed to duplicate form:", error);
    errorMessage.value = error instanceof Error ? error.message : "Failed to duplicate form. Please try again.";
  } finally {
    isDuplicating.value = false;
  }
};

// Cancel duplicate
const cancelDuplicate = () => {
  showDuplicateModal.value = false;
  formToDuplicate.value = null;
  targetVisaProductIdForDuplicate.value = undefined;
  availableVisaProductsForDuplicate.value = [];
};

// Delete form (only fields, not visa product)
const deleteForm = async (group: { visaProductId: number | string; visaProductName: string; country: string; fields: VisaProductField[] }) => {
  // Prevent multiple simultaneous delete operations
  if (isDeleting.value || isDuplicating.value) {
    return;
  }

  if (!group.visaProductId) {
    errorMessage.value = "Cannot delete form: visa product ID is missing";
    return;
  }

  if (!confirm(`Are you sure you want to delete the additional info form "${group.visaProductName}"? This will delete all ${group.fields.length} field(s) but keep the visa product. This action cannot be undone.`)) {
    return;
  }

  // Set flag immediately to prevent multiple calls
  isDeleting.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    // Filter out fields without IDs (shouldn't happen, but just in case)
    const fieldsToDelete = group.fields.filter(field => field.id);

    if (fieldsToDelete.length === 0) {
      // No fields to delete, just remove from list
      forms.value = forms.value.filter(f => f.visaProductId !== group.visaProductId);
      successMessage.value = "Additional info form deleted successfully";
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
      return;
    }

    // Get all field IDs to delete
    const fieldIds = fieldsToDelete.map(field => field.id!);

    // Use bulk delete endpoint - single request
    const result = await batchDeleteVisaProductFields(fieldIds);


    if (result.success) {
      successMessage.value = `Additional info form deleted successfully (${result.data?.removedCount || fieldIds.length} field(s) removed)`;
      // Small delay to ensure backend has processed deletions
      await new Promise(resolve => setTimeout(resolve, 300));
      // Reload forms to verify deletion and get fresh data from backend
      await loadForms();
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
    } else {
      errorMessage.value = result.message || "Failed to delete form. Please try again.";
      // Still reload to show current state
      await new Promise(resolve => setTimeout(resolve, 300));
      await loadForms();
    }
  } catch (error) {
    console.error("Failed to delete form:", error);
    errorMessage.value = error instanceof Error ? error.message : "Failed to delete form. Please try again.";
    // Reload to show current state even if there was an error
    await new Promise(resolve => setTimeout(resolve, 300));
    await loadForms();
  } finally {
    isDeleting.value = false;
  }
};

// CSV Import functions
const openImportModal = () => {
  showImportModal.value = true;
  selectedImportFile.value = null;
  importError.value = "";
  importResult.value = null;
};

const closeImportModal = () => {
  showImportModal.value = false;
  selectedImportFile.value = null;
  importError.value = "";
  importResult.value = null;
  isDragging.value = false;
  
  // Reload forms if import was successful
  if (importResult.value && importResult.value.data.fieldsCreated > 0) {
    loadForms();
  }
};

const triggerFileInput = () => {
  csvFileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      selectedImportFile.value = file;
      importError.value = "";
    } else {
      importError.value = "Please select a valid CSV file";
      selectedImportFile.value = null;
    }
  }
};

const handleFileDrop = (event: DragEvent) => {
  isDragging.value = false;
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0];
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      selectedImportFile.value = file;
      importError.value = "";
    } else {
      importError.value = "Please drop a valid CSV file";
      selectedImportFile.value = null;
    }
  }
};

const handleImport = async () => {
  if (!selectedImportFile.value) {
    importError.value = "Please select a CSV file";
    return;
  }

  try {
    isImporting.value = true;
    importError.value = "";
    importResult.value = null;

    const response = await importFromCSV(selectedImportFile.value);

    if (response.success && response.data) {
      importResult.value = {
        message: response.message || "Import completed successfully",
        data: response.data,
      };

      // Reload forms after successful import
      await loadForms();

      // Clear success message after 5 seconds
      setTimeout(() => {
        if (!importResult.value) return;
        
        // Only auto-close if there are no errors
        if (!importResult.value.data.errors || importResult.value.data.errors.length === 0) {
          closeImportModal();
        }
      }, 5000);
    } else {
      importError.value = response.message || "Failed to import CSV file";
    }
  } catch (error) {
    console.error("Failed to import CSV:", error);
    importError.value = error instanceof Error ? error.message : "Failed to import CSV file. Please try again.";
  } finally {
    isImporting.value = false;
  }
};

// Watch for select all changes
watch(selectAll, (newValue) => {
  forms.value.forEach((form) => {
    form.selected = newValue;
  });
});

// Load forms on mount
onMounted(() => {
  loadForms();
});

// Refresh forms when page becomes active
onActivated(() => {
  loadForms();
});
</script>

