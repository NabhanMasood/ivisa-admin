<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
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
              Additional Info Form
            </h1>
            <label
              class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
              style="font-weight: 400; letter-spacing: 0%"
            >
              {{ visaProductName }}
            </label>
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
          <p class="text-sm text-gray-600 dark:text-gray-400">Loading form fields...</p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-if="errorMessage"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-red-200 dark:border-red-800 overflow-hidden p-6"
        style="border-radius: 7px"
      >
        <div class="flex flex-col items-center gap-3">
          <p class="text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
          <button
            @click="loadFields"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!isLoading && !errorMessage && fields.length === 0"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden p-12"
        style="border-radius: 7px"
      >
        <div class="flex flex-col items-center gap-3">
          <p class="text-sm text-gray-600 dark:text-gray-400">No fields found for this visa product</p>
        </div>
      </div>

      <!-- Fields List -->
      <div
        v-if="!isLoading && !errorMessage && fields.length > 0"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
        style="border-radius: 7px"
      >
        <div class="divide-y divide-gray-200 dark:divide-gray-800">
          <div
            v-for="field in fields"
            :key="field.id"
            class="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-base font-medium text-gray-900 dark:text-white">
                    {{ field.question }}
                  </span>
                  <span
                    v-if="field.isRequired"
                    class="px-2 py-0.5 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded"
                  >
                    Required
                  </span>
                  <span
                    class="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded capitalize"
                  >
                    {{ field.fieldType }}
                  </span>
                  <span
                    v-if="!field.isActive"
                    class="px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                  >
                    Inactive
                  </span>
                </div>
                
                <!-- Field Details -->
                <div class="mt-3 space-y-2">
                  <div v-if="field.displayOrder !== undefined" class="text-sm text-gray-600 dark:text-gray-400">
                    <span class="font-medium">Display Order:</span> {{ field.displayOrder }}
                  </div>
                  
                  <div v-if="field.fieldType === 'dropdown' && field.options && field.options.length > 0" class="text-sm text-gray-600 dark:text-gray-400">
                    <span class="font-medium">Options:</span>
                    <div class="mt-1 flex flex-wrap gap-2">
                      <span
                        v-for="(option, index) in field.options"
                        :key="index"
                        class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                      >
                        {{ option }}
                      </span>
                    </div>
                  </div>
                  
                  <div v-if="(field.fieldType === 'text' || field.fieldType === 'number' || field.fieldType === 'textarea') && (field.minLength || field.maxLength)" class="text-sm text-gray-600 dark:text-gray-400">
                    <span class="font-medium">Length:</span> 
                    {{ field.minLength || 0 }} - {{ field.maxLength || '∞' }} characters
                  </div>
                  
                  <div v-if="field.fieldType === 'upload'" class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div v-if="field.allowedFileTypes && field.allowedFileTypes.length > 0">
                      <span class="font-medium">Allowed File Types:</span>
                      <div class="mt-1 flex flex-wrap gap-2">
                        <span
                          v-for="(type, index) in field.allowedFileTypes"
                          :key="index"
                          class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                        >
                          {{ type }}
                        </span>
                      </div>
                    </div>
                    <div v-if="field.maxFileSize">
                      <span class="font-medium">Max File Size:</span> {{ Math.round(field.maxFileSize / 1024 / 1024) }}MB
                    </div>
                  </div>
                </div>
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
import { useVisaProductFieldsApi, type VisaProductField } from "~/composables/useVisaProductFieldsApi";
import { useVisaProductsApi } from "~/composables/useVisaProductsApi";

// Set page title
useHead({
  title: "View Additional Info Form - iVisa",
});

const route = useRoute();
const router = useRouter();

// Get visa product ID from route
const visaProductId = computed(() => {
  const id = route.params.visaProductId;
  return typeof id === 'string' ? id : String(id);
});

// Initialize APIs
const { getVisaProductFieldsByVisaProduct } = useVisaProductFieldsApi();
const { getVisaProductById } = useVisaProductsApi();

// Reactive state
const isLoading = ref(false);
const errorMessage = ref("");
const fields = ref<VisaProductField[]>([]);
const visaProductName = ref("");

// Load fields for the visa product
const loadFields = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    // Load visa product name
    try {
      const productResponse = await getVisaProductById(visaProductId.value);
      if (productResponse.success && productResponse.data) {
        visaProductName.value = `${productResponse.data.productName} (${productResponse.data.country})`;
      }
    } catch (error) {
      console.error('Failed to load visa product:', error);
    }

    // Load fields
    const fieldsResponse = await getVisaProductFieldsByVisaProduct(visaProductId.value);
    
    if (fieldsResponse.success && fieldsResponse.data) {
      fields.value = fieldsResponse.data.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    } else {
      fields.value = [];
      errorMessage.value = fieldsResponse.message || "No fields found";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load fields. Please try again.";
    fields.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Navigation
const goBack = () => {
  router.push("/dashboard/additional-info");
};


// Load data on mount
onMounted(() => {
  loadFields();
});
</script>

