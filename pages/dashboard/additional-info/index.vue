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
const { getVisaProductFieldsByVisaProduct, batchGetFieldsByVisaProducts, deleteVisaProductField, createVisaProductField } = useVisaProductFieldsApi();
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

    // Delete all fields for this visa product sequentially to avoid race conditions
    const deleteResults = [];
    console.log(`🗑️ Deleting ${fieldsToDelete.length} field(s) for visa product ${group.visaProductId}`);
    
    for (const field of fieldsToDelete) {
      try {
        console.log(`🗑️ Deleting field ${field.id}: ${field.question}`);
        const result = await deleteVisaProductField(field.id!);
        deleteResults.push(result);
        console.log(`✅ Field ${field.id} deleted successfully`);
      } catch (error) {
        console.error(`❌ Failed to delete field ${field.id}:`, error);
        deleteResults.push({ success: false, message: error instanceof Error ? error.message : 'Failed to delete field' });
      }
    }
    
    console.log(`📊 Deletion results: ${deleteResults.filter(r => r.success).length} succeeded, ${deleteResults.filter(r => !r.success).length} failed`);

    const failed = deleteResults.filter(r => !r.success);

    if (failed.length === 0) {
      successMessage.value = "Additional info form deleted successfully";
      // Small delay to ensure backend has processed deletions
      await new Promise(resolve => setTimeout(resolve, 500));
      // Reload forms to verify deletion and get fresh data from backend
      await loadForms();
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
    } else {
      errorMessage.value = `Failed to delete ${failed.length} of ${fieldsToDelete.length} field(s). Please try again.`;
      // Still reload to show current state
      await new Promise(resolve => setTimeout(resolve, 500));
      await loadForms();
    }
  } catch (error) {
    console.error("Failed to delete form:", error);
    errorMessage.value = error instanceof Error ? error.message : "Failed to delete form. Please try again.";
    // Reload to show current state even if there was an error
    await new Promise(resolve => setTimeout(resolve, 500));
    await loadForms();
  } finally {
    isDeleting.value = false;
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

