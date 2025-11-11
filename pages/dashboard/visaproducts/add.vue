<template>
  <DashboardLayout>
    <div class="flex flex-col gap-4 max-w-[796px] items-center justify-center mx-auto">
      <!-- Page Header with Back Button -->
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
              {{ isEditMode ? 'Edit Visa Product' : isViewMode ? 'View Visa Product' : 'Add Visa Product' }}
            </h1>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="goBack"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 bg-[#F1F1F1] dark:bg-[#18181B]  dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors"
          >
            Discard
          </button>
          <button
            v-if="!isViewMode"
            @click="saveVisaProduct"
            :disabled="isLoading"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span v-if="isLoading" class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            {{ isLoading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
      >
        <p class="text-sm text-red-800 dark:text-red-200">{{ errorMessage }}</p>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
      >
        <p class="text-sm text-green-800 dark:text-green-200">{{ successMessage }}</p>
      </div>

      <!-- Form Section -->
      <div class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 py-[30px] px-[34px]" >
        <div class="space-y-6">
          <!-- Country Details Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Country Details
            </h3>
            <div class="flex flex-col gap-[18px]">
              <!-- Country Dropdown -->
              <div>
                <CustomDropdown
                  id="country"
                  label="Country"
                  v-model="visaProductForm.country"
                  :options="countryOptions"
                  placeholder="Select country"
                  search-placeholder="Search country"
                />
                <p v-if="fieldErrors.country" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fieldErrors.country }}</p>
              </div>

              <!-- Product Name Input -->
              <div>
                <label
                  for="productName"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Product Name <span class="text-red-500">*</span>
                </label>
                <input
                  id="productName"
                  v-model="visaProductForm.productName"
                  type="text"
                  placeholder="e.g. 30 Days Visa"
                  :disabled="isLoading || isViewMode"
                  :class="[
                    'w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm',
                    isViewMode ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed' : ''
                  ]"
                />
                <p v-if="fieldErrors.productName" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fieldErrors.productName }}</p>
              </div>

              <!-- Duration Input -->
              <div>
                <label
                  for="duration"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Duration (Days) <span class="text-red-500">*</span>
                </label>
                <input
                  id="duration"
                  v-model.number="visaProductForm.duration"
                  type="number"
                  placeholder="e.g. 30 Days"
                  :disabled="isLoading || isViewMode"
                  :class="[
                    'w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm',
                    isViewMode ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed' : ''
                  ]"
                />
                <p v-if="fieldErrors.duration" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fieldErrors.duration }}</p>
              </div>

              <!-- Validity Input -->
              <div>
                <label
                  for="validity"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Validity (Days) <span class="text-red-500">*</span>
                </label>
                <input
                  id="validity"
                  v-model.number="visaProductForm.validity"
                  type="number"
                  placeholder="e.g. 30 Days"
                  :disabled="isLoading || isViewMode"
                  :class="[
                    'w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm',
                    isViewMode ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed' : ''
                  ]"
                />
                <p v-if="fieldErrors.validity" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fieldErrors.validity }}</p>
              </div>

              <!-- Entry Type Dropdown -->
                <div>
                  <label
                    for="entryType"
                    class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                  >
                    Entry Type <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="entryType"
                    v-model="visaProductForm.entryType"
                    :disabled="isLoading || isViewMode"
                    :class="[
                      'w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm',
                      fieldErrors.entryType ? 'border-red-500 dark:border-red-500' : '',
                      isViewMode ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed' : ''
                    ]"
                  >
                    <option value="" disabled>Select entry type</option>
                    <option value="single">Single Entry</option>
                    <option value="multiple">Multiple Entry</option>
                  </select>
                  <p v-if="fieldErrors.entryType" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fieldErrors.entryType }}</p>
                </div>

              <!-- Government Fee Input -->
              <div>
                <label
                  for="govtFee"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Government Fee ($) <span class="text-red-500">*</span>
                </label>
                <input
                  id="govtFee"
                  v-model.number="visaProductForm.govtFee"
                  type="number"
                  placeholder="USD 200"
                  :disabled="isLoading || isViewMode"
                  :class="[
                    'w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm',
                    fieldErrors.govtFee ? 'border-red-500 dark:border-red-500' : '',
                    isViewMode ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed' : ''
                  ]"
                />
                <p v-if="fieldErrors.govtFee" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fieldErrors.govtFee }}</p>
              </div>

              <!-- Service Fee Input -->
              <div>
                <label
                  for="serviceFee"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Service Fee ($) <span class="text-red-500">*</span>
                </label>
                <input
                  id="serviceFee"
                  v-model.number="visaProductForm.serviceFee"
                  type="number"
                  placeholder="USD 200"
                  :disabled="isLoading || isViewMode"
                  :class="[
                    'w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm',
                    fieldErrors.serviceFee ? 'border-red-500 dark:border-red-500' : '',
                    isViewMode ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed' : ''
                  ]"
                />
                <p v-if="fieldErrors.serviceFee" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fieldErrors.serviceFee }}</p>
              </div>

              <!-- Total Amount Display -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Total Amount ($)
                </label>
                <div class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#2F2F31] text-[#111] dark:text-white py-1 px-3 text-sm flex items-center font-semibold">
                  {{ totalAmount || 'USD 200' }}
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Automatically calculated (Government Fee + Service Fee)
                </p>
              </div>
            </div>
          </div>

          <!-- Processing Fees Section -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                Processing Fees
              </h3>
            </div>
            
            <div class="space-y-4">
              <!-- Processing Fee Cards -->
              <div
                v-for="(fee, index) in visaProductForm.processingFees"
                :key="index"
                class="border rounded-[6px] bg-white dark:bg-[#18181B]"
                :class="[
                  'border-gray-300 dark:border-gray-700',
                  isViewMode ? 'bg-gray-50 dark:bg-gray-900' : ''
                ]"
              >
                <!-- Card Header - Clickable -->
                <button
                    @click="toggleProcessingFee(index)"
                    type="button"
                    class="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#27272A] transition-colors rounded-t-[6px]"
                    :class="{ 'rounded-b-[6px]': !expandedProcessingFees[index] }"
                  >
                    <div class="flex items-center gap-3 flex-1">
                      <svg 
                        class="w-5 h-5 transition-transform text-gray-600 dark:text-gray-400"
                        :class="{ 'rotate-180': expandedProcessingFees[index] }"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      <div class="text-left">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                          Processing Option {{ index + 1 }}
                        </h4>
                        <p v-if="fee.feeType" class="text-xs text-gray-500 dark:text-gray-400">
                          {{ fee.feeType }} - {{ fee.timeValue }} {{ fee.timeUnit }} - ${{ fee.amount }}
                        </p>
                      </div>
                    </div>
  
  <!-- Better Remove Button with trash icon and text -->
  <button
    v-if="visaProductForm.processingFees.length > 1 && !isViewMode"
    @click.stop="removeProcessingFee(index)"
    type="button"
    class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
    title="Remove processing fee"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
    <span>Remove</span>
  </button>
</button>

                <!-- Card Content - Collapsible -->
                <div 
                  v-show="expandedProcessingFees[index]"
                  class="p-4 pt-0 space-y-4"
                >
                  <!-- Fee Type -->
                  <div>
                    <label
                      :for="`feeType-${index}`"
                      class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                    >
                      Processing Type
                    </label>
                    <input
                      :id="`feeType-${index}`"
                      v-model="fee.feeType"
                      type="text"
                      placeholder="e.g., Standard, Express, Rush"
                      :disabled="isLoading || isViewMode"
                      :class="[
                        'w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm',
                        isViewMode ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed' : ''
                      ]"
                    />
                  </div>

                  <!-- Time Value and Unit -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                      Processing Time
                    </label>
                    <div class="grid grid-cols-2 gap-4">
                      <input
                        v-model.number="fee.timeValue"
                        type="number"
                        min="1"
                        placeholder="Time"
                        :disabled="isLoading || isViewMode"
                        :class="[
                          'w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm',
                          isViewMode ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed' : ''
                        ]"
                      />
                      <select
                        v-model="fee.timeUnit"
                        :disabled="isLoading || isViewMode"
                        :class="[
                          'w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm',
                          isViewMode ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed' : ''
                        ]"
                      >
                        <option value="hours">Hours</option>
                        <option value="days">Days</option>
                      </select>
                    </div>
                  </div>

                  <!-- Amount -->
                  <div>
                    <label
                      :for="`amount-${index}`"
                      class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                    >
                      Processing Fee Amount ($)
                    </label>
                    <input
                      :id="`amount-${index}`"
                      v-model.number="fee.amount"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      :disabled="isLoading || isViewMode"
                      :class="[
                        'w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm',
                        isViewMode ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed' : ''
                      ]"
                    />
                  </div>
                </div>
              </div>

              <!-- Add Another Processing Fee Button -->
              <button
                v-if="!isViewMode"
                @click="addProcessingFee"
                type="button"
                class="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-[6px] p-4 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#18181B] transition-all flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="text-sm font-medium">Add Another Processing Option</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>


<script setup lang="ts">
import DashboardLayout from "~/components/DashboardLayout.vue";
import CustomDropdown from "~/components/ui/CustomDropdown.vue";
import { ArrowLeft } from "lucide-vue-next";
import { useVisaProductsApi, type ProcessingFee } from "~/composables/useVisaProductsApi";
import { useCountriesApi } from "~/composables/useCountriesApi";

// Set page title
useHead({
  title: "Add Visa Product - iVisa",
});

// Get route parameters
const route = useRoute();
const router = useRouter();

// Initialize APIs
const { createVisaProduct, updateVisaProduct, getVisaProductById } = useVisaProductsApi();
const { getCountries } = useCountriesApi();

// Determine mode based on route parameters
const isEditMode = computed(() => route.query.mode === 'edit');
const isViewMode = computed(() => route.query.mode === 'view');

// ✅ Fixed: Handle array query params
const productId = computed(() => {
  const id = route.query.id;
  return Array.isArray(id) ? id[0] : id;
});

const countryParam = computed(() => {
  const country = route.query.country;
  return Array.isArray(country) ? country[0] : country;
});

// Reactive state
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const fieldErrors = ref({
  country: '',
  productName: '',
  duration: '',
  validity: '',
  entryType: '',
  govtFee: '',
  serviceFee: '',
});

// Processing fees expanded state
const expandedProcessingFees = ref<Record<number, boolean>>({
  0: true, // First one is expanded by default
});

// Form data
const visaProductForm = ref({
  country: '',
  productName: '',
  duration: null as number | null,
  validity: null as number | null,
  entryType: '' as string, 
  govtFee: null as number | null,
  serviceFee: null as number | null,
  processingFees: [
    {
      feeType: '',
      timeValue: 1,
      timeUnit: 'days' as 'hours' | 'days',
      amount: 0,
    },
  ] as ProcessingFee[],
});

// Country options (will be loaded from API)
const countryOptions = ref<string[]>([]);

// Computed: Calculate total amount
const totalAmount = computed(() => {
  const govtFee = Number(visaProductForm.value.govtFee) || 0;
  const serviceFee = Number(visaProductForm.value.serviceFee) || 0;
  const total = govtFee + serviceFee;
  
  // Return 0 if NaN
  return isNaN(total) ? 0 : total;
});

// Processing Fees Methods
const toggleProcessingFee = (index: number) => {
  expandedProcessingFees.value[index] = !expandedProcessingFees.value[index];
};

const addProcessingFee = () => {
  const newIndex = visaProductForm.value.processingFees.length;
  visaProductForm.value.processingFees.push({
    feeType: '',
    timeValue: 1,
    timeUnit: 'days',
    amount: 0,
  });
  // Expand the newly added card
  expandedProcessingFees.value[newIndex] = true;
};

const removeProcessingFee = (index: number) => {
  if (visaProductForm.value.processingFees.length > 1) {
    visaProductForm.value.processingFees.splice(index, 1);
    // Clean up expanded state
    delete expandedProcessingFees.value[index];
    // Re-index the expanded states
    const newExpanded: Record<number, boolean> = {};
    Object.keys(expandedProcessingFees.value).forEach((key) => {
      const numKey = parseInt(key);
      if (numKey < index) {
        newExpanded[numKey] = expandedProcessingFees.value[numKey];
      } else if (numKey > index) {
        newExpanded[numKey - 1] = expandedProcessingFees.value[numKey];
      }
    });
    expandedProcessingFees.value = newExpanded;
  }
};

// Load countries from API
const loadCountries = async () => {
  try {
    const response = await getCountries();
    if (response.success && response.data) {
      countryOptions.value = response.data.map(country => country.countryName);
      
      // ✅ Fixed: Pre-fill country if coming from country-specific page
      if (countryParam.value && countryOptions.value.includes(countryParam.value as string)) {
        visaProductForm.value.country = countryParam.value as string;
      }
    }
  } catch (error) {
    console.error('Failed to load countries:', error);
    countryOptions.value = [
      "United States",
      "United Kingdom",
      "Canada",
      "Germany",
      "France",
      "Japan",
      "Australia",
      "Singapore",
      "Thailand",
      "UAE"
    ];
  }
};

// Load visa product data if editing or viewing
const loadVisaProductData = async () => {
  if (productId.value && (isEditMode.value || isViewMode.value)) {
    try {
      isLoading.value = true;
      errorMessage.value = '';
      
      const response = await getVisaProductById(productId.value);
      
      if (response.success && response.data) {
        const processingFeesData = response.data.processingFees && response.data.processingFees.length > 0
          ? response.data.processingFees
          : [
              {
                feeType: '',
                timeValue: 1,
                timeUnit: 'days' as 'hours' | 'days',
                amount: 0,
              },
            ];
        
        visaProductForm.value = {
          country: response.data.country || '',
          productName: response.data.productName || '',
          duration: response.data.duration || null,
          validity: response.data.validity || null,
          entryType: response.data.entryType || '',
          govtFee: response.data.govtFee || null,
          serviceFee: response.data.serviceFee || null,
          processingFees: processingFeesData,
        };
        
        // Initialize expanded states for all processing fees
        expandedProcessingFees.value = {};
        processingFeesData.forEach((_, index) => {
          expandedProcessingFees.value[index] = index === 0; // Only first one expanded
        });
      }
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Failed to load visa product data';
    } finally {
      isLoading.value = false;
    }
  }
};

// Navigation
const goBack = () => {
  router.push("/dashboard/visaproducts");
};

// Form validation
const validateForm = (): boolean => {
  fieldErrors.value = {
    country: '',
    productName: '',
    duration: '',
    validity: '',
    entryType: '',
    govtFee: '',
    serviceFee: '',
  };
  
  let isValid = true;
  
  if (!visaProductForm.value.country.trim()) {
    fieldErrors.value.country = 'Country is required';
    isValid = false;
  }
  
  if (!visaProductForm.value.productName.trim()) {
    fieldErrors.value.productName = 'Product name is required';
    isValid = false;
  }
  
  if (!visaProductForm.value.duration || visaProductForm.value.duration <= 0) {
    fieldErrors.value.duration = 'Duration is required and must be greater than 0';
    isValid = false;
  }
  
  if (!visaProductForm.value.validity || visaProductForm.value.validity <= 0) {
    fieldErrors.value.validity = 'Validity is required and must be greater than 0';
    isValid = false;
  }
  
  if (!visaProductForm.value.entryType || !visaProductForm.value.entryType.trim()) {
    fieldErrors.value.entryType = 'Entry type is required';
    isValid = false;
  }
  
  if (!visaProductForm.value.govtFee || visaProductForm.value.govtFee < 0) {
    fieldErrors.value.govtFee = 'Government fee is required and must be 0 or greater';
    isValid = false;
  }
  
  if (!visaProductForm.value.serviceFee || visaProductForm.value.serviceFee < 0) {
    fieldErrors.value.serviceFee = 'Service fee is required and must be 0 or greater';
    isValid = false;
  }
  
  return isValid;
};

const saveVisaProduct = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  
  if (!validateForm()) {
    errorMessage.value = 'Please fill in all required fields correctly';
    return;
  }
  
  try {
    isLoading.value = true;
    
    // Calculate total with explicit number conversion
    const govtFee = Number(visaProductForm.value.govtFee!) || 0;
    const serviceFee = Number(visaProductForm.value.serviceFee!) || 0;
    const totalAmountValue = govtFee + serviceFee;
    
    console.log('💰 Fee calculation:', {
      govtFee,
      serviceFee,
      total: totalAmountValue,
      isNaN: isNaN(totalAmountValue)
    });
    
    // Filter out empty processing fees and ensure ALL values are numbers
    const validProcessingFees = visaProductForm.value.processingFees
      .filter(fee => fee.feeType.trim() && fee.timeValue > 0 && fee.amount >= 0)
      .map(fee => ({
        ...(fee.id ? { id: Number(fee.id) } : {}), // Include ID only if it exists (for edit mode)
        feeType: fee.feeType.trim(),
        timeValue: Number(fee.timeValue),
        timeUnit: fee.timeUnit,
        amount: Number(fee.amount)
      }));
    
    // Ensure ALL numeric fields are actually numbers, not strings
    const payload = {
      country: visaProductForm.value.country.trim(),
      productName: visaProductForm.value.productName.trim(),
      duration: Number(visaProductForm.value.duration!),
      validity: Number(visaProductForm.value.validity!),
      entryType: visaProductForm.value.entryType.trim(), 
      govtFee: govtFee,
      serviceFee: serviceFee,
      totalAmount: totalAmountValue,
      processingFees: validProcessingFees.length > 0 ? validProcessingFees : undefined,
    };
    
    console.log('📤 Payload being sent:', payload);
    console.log('📤 Type check - govtFee:', typeof payload.govtFee, payload.govtFee);
    console.log('📤 Type check - serviceFee:', typeof payload.serviceFee, payload.serviceFee);
    console.log('📤 Type check - totalAmount:', typeof payload.totalAmount, payload.totalAmount);
    console.log('📤 Processing fees:', payload.processingFees);
    
    if (isEditMode.value && productId.value) {
      const response = await updateVisaProduct(productId.value, payload);
      
      if (response.success) {
        successMessage.value = response.message || 'Visa product updated successfully!';
        setTimeout(() => {
          goBack();
        }, 1500);
      }
    } else {
      const response = await createVisaProduct(payload);
      
      if (response.success) {
        successMessage.value = response.message || 'Visa product created successfully!';
        // Reset form
        visaProductForm.value = {
          country: (countryParam.value as string) || '',
          productName: '',
          duration: null,
          validity: null,
          entryType: '', 
          govtFee: null,
          serviceFee: null,
          processingFees: [
            {
              feeType: '',
              timeValue: 1,
              timeUnit: 'days',
              amount: 0,
            },
          ],
        };
        setTimeout(() => {
          goBack();
        }, 1500);
      }
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to save visa product. Please try again.';
    console.error('❌ Save error:', error);
  } finally {
    isLoading.value = false;
  }
};

// Clear field errors when user starts typing
watch(() => visaProductForm.value.country, () => {
  if (fieldErrors.value.country) fieldErrors.value.country = '';
});

watch(() => visaProductForm.value.productName, () => {
  if (fieldErrors.value.productName) fieldErrors.value.productName = '';
});

watch(() => visaProductForm.value.duration, () => {
  if (fieldErrors.value.duration) fieldErrors.value.duration = '';
});

watch(() => visaProductForm.value.validity, () => {
  if (fieldErrors.value.validity) fieldErrors.value.validity = '';
});

watch(() => visaProductForm.value.govtFee, () => {
  if (fieldErrors.value.govtFee) fieldErrors.value.govtFee = '';
});

watch(() => visaProductForm.value.serviceFee, () => {
  if (fieldErrors.value.serviceFee) fieldErrors.value.serviceFee = '';
});

watch(() => visaProductForm.value.entryType, () => {
  if (fieldErrors.value.entryType) fieldErrors.value.entryType = '';
});

// Load data on mount
onMounted(async () => {
  await loadCountries();
  await loadVisaProductData();
});
</script>