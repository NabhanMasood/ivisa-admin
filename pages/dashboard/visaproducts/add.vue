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
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "~/components/DashboardLayout.vue";
import CustomDropdown from "~/components/ui/CustomDropdown.vue";
import { ArrowLeft } from "lucide-vue-next";
import { useVisaProductsApi } from "~/composables/useVisaProductsApi";
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
const productId = computed(() => route.query.id);
const countryParam = computed(() => route.query.country); 

// Reactive state
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const fieldErrors = ref({
  country: '',
  productName: '',
  duration: '',
  validity: '',
  govtFee: '',
  serviceFee: '',
});

// Form data
const visaProductForm = ref({
  country: '',
  productName: '',
  duration: null as number | null,
  validity: null as number | null,
  govtFee: null as number | null,
  serviceFee: null as number | null,
});

// Country options (will be loaded from API)
const countryOptions = ref<string[]>([]);

// Computed: Calculate total amount
const totalAmount = computed(() => {
  const govtFee = visaProductForm.value.govtFee || 0;
  const serviceFee = visaProductForm.value.serviceFee || 0;
  return govtFee + serviceFee;
});

// Load countries from API
const loadCountries = async () => {
  try {
    const response = await getCountries();
    if (response.success && response.data) {
      countryOptions.value = response.data.map(country => country.countryName);
      
      // Pre-fill country if coming from country-specific page
      if (countryParam.value && countryOptions.value.includes(countryParam.value)) {
        visaProductForm.value.country = countryParam.value;
      }
    }
  } catch (error) {
    console.error('Failed to load countries:', error);
    // Fallback to default options
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
        visaProductForm.value = {
          country: response.data.country || '',
          productName: response.data.productName || '',
          duration: response.data.duration || null,
          validity: response.data.validity || null,
          govtFee: response.data.govtFee || null,
          serviceFee: response.data.serviceFee || null,
        };
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

// Save visa product (create or update)
const saveVisaProduct = async () => {
  // Reset messages
  errorMessage.value = '';
  successMessage.value = '';
  
  // Validate form
  if (!validateForm()) {
    errorMessage.value = 'Please fill in all required fields correctly';
    return;
  }
  
  try {
    isLoading.value = true;
    
    // Calculate total amount
    const totalAmountValue = totalAmount.value;
    
    const payload = {
      country: visaProductForm.value.country.trim(),
      productName: visaProductForm.value.productName.trim(),
      duration: visaProductForm.value.duration!,
      validity: visaProductForm.value.validity!,
      govtFee: visaProductForm.value.govtFee!,
      serviceFee: visaProductForm.value.serviceFee!,
      totalAmount: totalAmountValue,
    };
    
    if (isEditMode.value && productId.value) {
      // Update existing visa product
      const response = await updateVisaProduct(productId.value, payload);
      
      if (response.success) {
        successMessage.value = response.message || 'Visa product updated successfully!';
        setTimeout(() => {
          goBack();
        }, 1500);
      }
    } else {
      // Create new visa product
      const response = await createVisaProduct(payload);
      
      if (response.success) {
        successMessage.value = response.message || 'Visa product created successfully!';
        // Reset form
        visaProductForm.value = {
          country: countryParam.value || '',
          productName: '',
          duration: null,
          validity: null,
          govtFee: null,
          serviceFee: null,
        };
        setTimeout(() => {
          goBack();
        }, 1500);
      }
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to save visa product. Please try again.';
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

// Load data on mount
onMounted(async () => {
  await loadCountries();
  await loadVisaProductData();
});
</script>
