<template>
  <DashboardLayout>
    <div
      class="flex flex-col gap-4 max-w-[796px] items-center justify-center mx-auto"
    >
      <!-- Page Header with Back Button -->
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
              {{
                isEditMode
                  ? "Edit Country"
                  : isViewMode
                  ? "View Country"
                  : "Add Country"
              }}
            </h1>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="goBack"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 bg-[#F1F1F1] dark:bg-[#18181B] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors"
          >
            Discard
          </button>
          <button
            v-if="!isViewMode"
            @click="saveCountry"
            :disabled="isLoading"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span
              v-if="isLoading"
              class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            ></span>
            {{ isLoading ? "Saving..." : "Save Changes" }}
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
        <p class="text-sm text-green-800 dark:text-green-200">
          {{ successMessage }}
        </p>
      </div>

      <!-- Form Section -->
      <div
        class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 py-[30px] px-[34px]"
      >
        <div class="space-y-6">
          <!-- Country Details Section -->
          <div>
            <h3
              class="text-base font-medium text-gray-900 dark:text-white mb-[30px]"
            >
              Country Details
            </h3>
            <div class="flex flex-col gap-6">
              <!-- Logo Upload Section -->
              <div class="flex flex-col gap-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Country Logo
                  <span class="text-gray-400 text-xs">(32x32px)</span>
                </label>

                <div class="flex items-center gap-4">
                  <!-- Logo Preview -->
                  <div
                    class="w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900"
                    :class="
                      logoPreview
                        ? ''
                        : 'hover:border-gray-400 dark:hover:border-gray-600 transition-colors'
                    "
                  >
                    <img
                      v-if="logoPreview"
                      :src="logoPreview"
                      alt="Logo preview"
                      class="w-full h-full object-contain"
                    />
                    <div v-else class="text-center p-4">
                      <svg
                        class="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        32x32
                      </p>
                    </div>
                  </div>

                  <!-- Upload Controls -->
                  <div class="flex-1 flex flex-col gap-2">
                    <input
                      ref="fileInput"
                      type="file"
                      accept="image/*"
                      @change="handleFileSelect"
                      :disabled="isLoading || isViewMode"
                      class="hidden"
                    />

                    <div class="flex gap-2">
                      <button
                        v-if="!isViewMode"
                        @click="triggerFileInput"
                        :disabled="isLoading"
                        class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 bg-white dark:bg-[#18181B] border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {{ logoPreview ? "Change Logo" : "Upload Logo" }}
                      </button>

                      <button
                        v-if="logoPreview && !isViewMode"
                        @click="removeLogo"
                        :disabled="isLoading"
                        class="px-4 py-2 text-sm font-medium rounded-[6px] text-red-700 dark:text-red-400 bg-white dark:bg-[#18181B] border border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Remove
                      </button>
                    </div>

                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG or GIF (max. 1MB). Image will be resized to
                      32x32px.
                    </p>

                    <p
                      v-if="logoError"
                      class="text-xs text-red-600 dark:text-red-400"
                    >
                      {{ logoError }}
                    </p>
                  </div>
                </div>
              </div>

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
                    fieldError ? 'border-red-500 dark:border-red-500' : '',
                    isViewMode
                      ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed'
                      : '',
                  ]"
                  style="border-radius: 7px"
                />
                <p
                  v-if="fieldError"
                  class="text-xs text-red-600 dark:text-red-400 mt-1"
                >
                  {{ fieldError }}
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
import { ArrowLeft } from "lucide-vue-next";
import { useCountriesApi } from "~/composables/useCountriesApi";

// Set page title
useHead({
  title: "Add Country - iVisa",
});

// Get route parameters
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

// Initialize API
const { createCountry, updateCountry, getCountryById } = useCountriesApi();

// Determine mode based on route parameters
const isEditMode = computed(() => route.query.mode === "edit");
const isViewMode = computed(() => route.query.mode === "view");
const countryId = computed(() => {
  const id = route.query.id;
  return typeof id === "string" ? id : undefined;
});

// Reactive state
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const fieldError = ref("");
const logoError = ref("");
const logoPreview = ref("");
const logoFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// Form data
const countryForm = ref({
  name: "",
  code: "",
  description: "",
  logoUrl: "",
});

// Trigger file input click
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Handle file selection
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  logoError.value = "";

  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    logoError.value = "Please select an image file";
    return;
  }

  // Validate file size (1MB)
  if (file.size > 1024 * 1024) {
    logoError.value = "File size must be less than 1MB";
    return;
  }

  logoFile.value = file;

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    logoPreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

// Remove logo
const removeLogo = () => {
  logoFile.value = null;
  logoPreview.value = "";
  countryForm.value.logoUrl = "";
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

// Load country data if editing or viewing
const loadCountryData = async () => {
  if (countryId.value && (isEditMode.value || isViewMode.value)) {
    try {
      isLoading.value = true;
      errorMessage.value = "";

      const response = await getCountryById(countryId.value);

      if (response.success && response.data) {
        countryForm.value = {
          name: response.data.countryName || "",
          code: response.data.code || "",
          description: response.data.description || "",
          logoUrl: response.data.logoUrl || "",
        };

        // Set logo preview if exists
        if (response.data.logoUrl) {
          // Check if it's a full URL (Cloudinary) or relative path (local)
          if (response.data.logoUrl.startsWith("http")) {
            logoPreview.value = response.data.logoUrl;
          } else {
            logoPreview.value = `${config.public.NUXT_PUBLIC_API_BASE_URL}${response.data.logoUrl}`;
          }
        }
      }
    } catch (error) {
      errorMessage.value =
        error instanceof Error ? error.message : "Failed to load country data";
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
  errorMessage.value = "";
  fieldError.value = "";
  logoError.value = "";

  if (!countryForm.value.name.trim()) {
    fieldError.value = "Country name is required";
    return false;
  }

  return true;
};

// Save country (create or update)
const saveCountry = async () => {
  // Reset messages
  errorMessage.value = "";
  successMessage.value = "";
  fieldError.value = "";
  logoError.value = "";

  // Validate form
  if (!validateForm()) {
    return;
  }

  try {
    isLoading.value = true;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("countryName", countryForm.value.name.trim());

    if (logoFile.value) {
      formData.append("logo", logoFile.value);
    } else if (countryForm.value.logoUrl && !logoFile.value) {
      // Keep existing logo URL if no new file is selected
      formData.append("logoUrl", countryForm.value.logoUrl);
    }

    if (isEditMode.value && countryId.value) {
      // Update existing country
      const response = await updateCountry(countryId.value, formData);

      if (response.success) {
        successMessage.value =
          response.message || "Country updated successfully!";
        // Redirect after a short delay to show success message
        setTimeout(() => {
          goBack();
        }, 1500);
      }
    } else {
      // Create new country
      const response = await createCountry(formData);

      if (response.success) {
        successMessage.value =
          response.message || "Country created successfully!";
        // Reset form
        countryForm.value = {
          name: "",
          code: "",
          description: "",
          logoUrl: "",
        };
        removeLogo();
        // Redirect after a short delay to show success message
        setTimeout(() => {
          goBack();
        }, 1500);
      }
    }
  } catch (error) {
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Failed to save country. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

// Clear messages when form changes
watch(
  () => countryForm.value.name,
  () => {
    if (fieldError.value || errorMessage.value) {
      fieldError.value = "";
      errorMessage.value = "";
    }
  }
);
</script>
