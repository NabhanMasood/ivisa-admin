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
              {{ isEditMode ? 'Edit Country' : isViewMode ? 'View Country' : 'Add Country' }}
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
            @click="saveCountry"
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
      <div class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 py-[30px] px-[34px]">
        <div class="space-y-6">
          <!-- Country Details Section -->
          <div >
            <h3 class="text-bse font-medium text-gray-900 dark:text-white mb-[30px]">
              Country Details
            </h3>
            <div class="flex flex-col gap-4">
              <!-- Country Name Input -->
              <div class="flex flex-col gap-2">
                <label
                  for="countryName"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Country Name <span class="text-red-500">*</span>
                </label>
                <input
                  id="countryName"
                  v-model="countryForm.name"
                  type="text"
                  placeholder="Enter Name"
                  :disabled="isLoading || isViewMode"
                  :class="[
                    'w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm',
                    errorMessage ? 'border-red-500 dark:border-red-500' : '',
                    isViewMode ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed' : ''
                  ]"
                  style="border-radius: 7px"
                />
                <p v-if="fieldError" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fieldError }}</p>
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
import { ArrowLeft } from "lucide-vue-next";
import { useCountriesApi } from "~/composables/useCountriesApi";

// Set page title
useHead({
  title: "Add Country - iVisa",
});

// Get route parameters
const route = useRoute();
const router = useRouter();

// Initialize API
const { createCountry, updateCountry, getCountryById } = useCountriesApi();

// Determine mode based on route parameters
const isEditMode = computed(() => route.query.mode === 'edit');
const isViewMode = computed(() => route.query.mode === 'view');
const countryId = computed(() => route.query.id);

// Reactive state
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const fieldError = ref('');

// Form data
const countryForm = ref({
  name: "",
  code: "",
  description: "",
});

// Load country data if editing or viewing
const loadCountryData = async () => {
  if (countryId.value && (isEditMode.value || isViewMode.value)) {
    try {
      isLoading.value = true;
      errorMessage.value = '';
      
      const response = await getCountryById(countryId.value);
      
      if (response.success && response.data) {
        countryForm.value = {
          name: response.data.countryName || '',
          code: response.data.code || '',
          description: response.data.description || '',
        };
      }
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Failed to load country data';
    } finally {
      isLoading.value = false;
    }
  }
};

// Load data on mount
onMounted(() => {
  loadCountryData();
});

// Navigation
const goBack = () => {
  router.push("/dashboard/countries");
};

// Form validation
const validateForm = (): boolean => {
  errorMessage.value = '';
  fieldError.value = '';
  
  if (!countryForm.value.name.trim()) {
    fieldError.value = 'Country name is required';
    return false;
  }
  
  return true;
};

// Save country (create or update)
const saveCountry = async () => {
  // Reset messages
  errorMessage.value = '';
  successMessage.value = '';
  fieldError.value = '';
  
  // Validate form
  if (!validateForm()) {
    return;
  }
  
  try {
    isLoading.value = true;
    
    if (isEditMode.value && countryId.value) {
      // Update existing country
      const response = await updateCountry(countryId.value, {
        countryName: countryForm.value.name.trim(),
        code: countryForm.value.code || undefined,
        description: countryForm.value.description || undefined,
      });
      
      if (response.success) {
        successMessage.value = response.message || 'Country updated successfully!';
        // Redirect after a short delay to show success message
        setTimeout(() => {
          goBack();
        }, 1500);
      }
    } else {
      // Create new country
      const response = await createCountry({
        countryName: countryForm.value.name.trim(),
      });
      
      if (response.success) {
        successMessage.value = response.message || 'Country created successfully!';
        // Reset form
        countryForm.value = {
          name: "",
          code: "",
          description: "",
        };
        // Redirect after a short delay to show success message
        setTimeout(() => {
          goBack();
        }, 1500);
      }
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to save country. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

// Clear messages when form changes
watch(() => countryForm.value.name, () => {
  if (fieldError.value || errorMessage.value) {
    fieldError.value = '';
    errorMessage.value = '';
  }
});
</script>
