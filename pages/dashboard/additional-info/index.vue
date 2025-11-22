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
                      @click="duplicateForm(group)"
                      :disabled="isDuplicating || isDeleting"
                      class="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Duplicate form"
                    >
                      <Copy
                        class="h-4 w-4 text-blue-600 dark:text-blue-400"
                      />
                    </button>
                    <button
                      @click="deleteForm(group)"
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
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "~/components/DashboardLayout.vue";
import { Plus, Eye, Pencil, Copy, Trash2 } from "lucide-vue-next";
import { useVisaProductFieldsApi, type VisaProductField } from "~/composables/useVisaProductFieldsApi";
import { useVisaProductsApi } from "~/composables/useVisaProductsApi";

// Set page title
useHead({
  title: "Additional Info Forms - iVisa",
});

// Initialize APIs
const { getVisaProductFieldsByVisaProduct } = useVisaProductFieldsApi();
const { getVisaProducts, duplicateVisaProduct: duplicateVisaProductApi, deleteVisaProduct: deleteVisaProductApi } = useVisaProductsApi();

// Reactive state
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const searchQuery = ref("");
const selectAll = ref(false);
const isDuplicating = ref(false);
const isDeleting = ref(false);
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

    // Get fields for each visa product
    const formsData: Array<{
      visaProductId: number | string;
      visaProductName: string;
      country: string;
      fields: VisaProductField[];
      selected: boolean;
    }> = [];

    for (const product of visaProductsResponse.data) {
      if (product.id) {
        try {
          const fieldsResponse = await getVisaProductFieldsByVisaProduct(product.id);
          
          if (fieldsResponse.success && fieldsResponse.data && fieldsResponse.data.length > 0) {
            formsData.push({
              visaProductId: product.id,
              visaProductName: product.productName,
              country: product.country,
              fields: fieldsResponse.data.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)),
              selected: false,
            });
          }
        } catch (error) {
          console.error(`Failed to load fields for product ${product.id}:`, error);
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

// Duplicate form (visa product)
const duplicateForm = async (group: { visaProductId: number | string; visaProductName: string; country: string; fields: VisaProductField[] }) => {
  if (!group.visaProductId) {
    errorMessage.value = "Cannot duplicate form: visa product ID is missing";
    return;
  }

  if (!confirm(`Are you sure you want to duplicate the form "${group.visaProductName}"?`)) {
    return;
  }

  try {
    isDuplicating.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    const response = await duplicateVisaProductApi(group.visaProductId);

    if (response.success) {
      successMessage.value = response.message || "Form duplicated successfully";
      // Reload forms to show the new duplicate
      await loadForms();
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
    } else {
      errorMessage.value = response.message || "Failed to duplicate form";
    }
  } catch (error) {
    console.error("Failed to duplicate form:", error);
    errorMessage.value = error instanceof Error ? error.message : "Failed to duplicate form. Please try again.";
  } finally {
    isDuplicating.value = false;
  }
};

// Delete form (visa product)
const deleteForm = async (group: { visaProductId: number | string; visaProductName: string; country: string; fields: VisaProductField[] }) => {
  if (!group.visaProductId) {
    errorMessage.value = "Cannot delete form: visa product ID is missing";
    return;
  }

  if (!confirm(`Are you sure you want to delete the form "${group.visaProductName}"? This action cannot be undone.`)) {
    return;
  }

  try {
    isDeleting.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    const response = await deleteVisaProductApi(group.visaProductId);

    if (response.success) {
      successMessage.value = response.message || "Form deleted successfully";
      // Remove the form from the list
      forms.value = forms.value.filter(f => f.visaProductId !== group.visaProductId);
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
    } else {
      // Handle case where deletion is blocked due to existing applications
      errorMessage.value = response.message || "Failed to delete form";
      if (response.message && response.message.includes('applications')) {
        // Show error for longer when blocked by applications
        setTimeout(() => {
          errorMessage.value = "";
        }, 10000); // Show for 10 seconds
      }
    }
  } catch (error) {
    console.error("Failed to delete form:", error);
    const errorMsg = error instanceof Error ? error.message : "Failed to delete form. Please try again.";
    errorMessage.value = errorMsg;
    
    // If error mentions applications, show for longer
    if (errorMsg.includes('applications') || errorMsg.includes('application')) {
      setTimeout(() => {
        errorMessage.value = "";
      }, 10000);
    }
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

