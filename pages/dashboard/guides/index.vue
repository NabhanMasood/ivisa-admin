<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
      <!-- Page Title and Add Button -->
      <div class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4">
        <div class="flex-1 min-w-0">
          <h1 class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Guides
          </h1>
          <label class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
            style="font-weight: 400; letter-spacing: 0%">
            Manage all guides and blog posts
          </label>
        </div>
        <button
          @click="navigateToAdd"
          class="bg-black h-[36px] dark:bg-white text-white dark:text-black px-3 sm:px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 rounded-[7px] flex-shrink-0"
        >
          <div class="flex items-center justify-center w-4 h-4 border border-white dark:border-black rounded-full bg-black dark:bg-white">
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
          >Add Guide</span>
        </button>
      </div>

      <!-- Search and Filters Row -->
      <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <!-- Search and Filter Buttons -->
        <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
          <!-- Search Bar -->
          <div class="relative flex-1 w-full sm:w-[30%]">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Guides"
              @input="handleSearch"
              class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
              style="border-radius: 7px"
            />
          </div>
          <!-- Category Filter -->
          <div class="relative flex-1 w-full sm:w-[30%]">
            <select
              v-model="selectedCategory"
              @change="handleCategoryChange"
              class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black"
              style="border-radius: 7px"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
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
                  <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                  <span class="text-sm text-gray-900 dark:text-white">Title</span>
                </label>
                <label
                  class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                  <span class="text-sm text-gray-900 dark:text-white">Category</span>
                </label>
                <label
                  class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                  <span class="text-sm text-gray-900 dark:text-white">Status</span>
                </label>
                <label
                  class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                  <span class="text-sm text-gray-900 dark:text-white">Views</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fade-in">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800 dark:text-green-400">{{ successMessage }}</p>
          </div>
          <button 
            @click="successMessage = ''" 
            class="ml-auto flex-shrink-0 text-green-400 hover:text-green-600 dark:hover:text-green-300"
          >
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fade-in">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-red-800 dark:text-red-400">{{ errorMessage }}</p>
          </div>
          <button 
            @click="errorMessage = ''" 
            class="ml-auto flex-shrink-0 text-red-400 hover:text-red-600 dark:hover:text-red-300"
          >
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
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
          <p class="text-sm text-gray-600 dark:text-gray-400">Loading guides...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!isLoading && filteredGuides.length === 0"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden p-12"
        style="border-radius: 7px"
      >
        <div class="flex flex-col items-center gap-3">
          <p class="text-sm text-gray-600 dark:text-gray-400">No guides found</p>
          <button
            @click="navigateToAdd"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Add Your First Guide
          </button>
        </div>
      </div>

      <!-- Guides Table -->
      <div
        v-else
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
        style="border-radius: 7px"
      >
        <div class="overflow-x-auto">
          <table class="w-full min-w-[600px] sm:min-w-[800px]">
            <thead class="bg-[#FFFFFF] dark:bg-[#09090B] border-b dark:border-gray-800">
              <tr class="!h-[37px] bg-[#F9FAFB] dark:bg-[#18181B]">
                <th class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2 text-left align-middle">
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    class="border-gray-300"
                    style="border-radius: 7px"
                  />
                </th>
                <th class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                  Title
                </th>
                <th class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                  Category
                </th>
                <th class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                  Views
                </th>
                <th class="w-20 px-2 sm:px-3 lg:px-4 py-2"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr
                v-for="guide in filteredGuides"
                :key="guide.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <input
                    type="checkbox"
                    v-model="guide.selected"
                    class="border-gray-300"
                    style="border-radius: 7px"
                  />
                </td>
                <td class="px-2 sm:px-3 lg:px-4 py-2 text-sm text-[#475467] dark:text-white">
                  <div class="font-medium">{{ guide.title }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ guide.description?.substring(0, 60) }}...</div>
                </td>
                <td class="px-2 sm:px-3 lg:px-4 py-2 text-sm text-[#475467] dark:text-white">
                  {{ guide.category || '-' }}
                </td>
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <span
                    :class="{
                      'px-2 py-1 rounded text-xs font-medium': true,
                      'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300': isPublished(guide),
                      'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300': !isPublished(guide)
                    }"
                  >
                    {{ isPublished(guide) ? 'Published' : 'Draft' }}
                  </span>
                </td>
                <td class="px-2 sm:px-3 lg:px-4 py-2 text-sm text-[#475467] dark:text-white">
                  {{ guide.viewCount || 0 }}
                </td>
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <div class="flex items-center space-x-2">
                    <Star
                      v-if="isFeatured(guide)"
                      class="h-4 w-4 text-yellow-500 fill-yellow-500"
                      title="Featured Guide"
                    />
                    <button
                      @click="editGuide(guide)"
                      class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      title="Edit"
                    >
                      <Pencil class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      @click="deleteGuideConfirm(guide)"
                      class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      title="Delete"
                    >
                      <Trash2 class="h-4 w-4 text-gray-600 dark:text-gray-400" />
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
          {{ selectedCount }} of {{ guides.length }} row(s) selected.
        </div>

        <!-- Navigation Buttons -->
        <div class="flex items-center space-x-2">
          <button
            class="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs sm:text-sm"
            :disabled="currentPage === 1"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            @click="previousPage"
            style="border-radius: 7px"
          >
            Previous
          </button>
          <button
            class="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs sm:text-sm"
            @click="nextPage"
            style="border-radius: 7px"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "~/components/DashboardLayout.vue";
import { Plus, Columns, Pencil, Trash2, Star } from "lucide-vue-next";
import { useGuidesApi } from "~/composables/useGuidesApi";

useHead({
  title: "Guides - iVisa",
});

const router = useRouter();
const navigateToAdd = () => {
  router.push("/dashboard/guides/add");
};

// API
const { getAllGuides, deleteGuide: deleteGuideApi, getCategories } = useGuidesApi();

// Local state
const guides = ref<Array<any>>([]);
const categories = ref<string[]>([]);
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const searchQuery = ref("");
const selectedCategory = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const limit = ref(10);
const columnsDropdownOpen = ref(false);

const loadCategories = async () => {
  try {
    const response = await getCategories();
    if (response.success && response.data) {
      categories.value = response.data;
    }
  } catch (error) {
    console.error("Error loading categories:", error);
  }
};

const loadGuides = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    const params: any = {
      page: currentPage.value,
      limit: limit.value,
      // For admin dashboard, we want to see all guides (published and drafts)
      includeUnpublished: true,
    };
    if (selectedCategory.value) {
      params.category = selectedCategory.value;
    }
    if (searchQuery.value) {
      params.search = searchQuery.value;
    }
    const response = await getAllGuides(params);
    if (response.success && response.data) {
      guides.value = response.data.map((g: any) => {
        // Debug: Log the guide object to see all fields
        console.log('Guide object:', g);
        console.log('Guide:', g.title, 'isPublished:', g.isPublished, 'published:', g.published, 'Type:', typeof g.isPublished);
        // Normalize the guide data - handle different field names
        return {
          ...g,
          // Ensure isPublished is set - check multiple possible field names
          isPublished: g.isPublished !== undefined ? g.isPublished : (g.published !== undefined ? g.published : false),
          isFeatured: g.isFeatured !== undefined ? g.isFeatured : (g.featured !== undefined ? g.featured : false),
          selected: false,
        };
      });
    } else {
      guides.value = [];
      errorMessage.value = response.message || "Failed to load guides";
    }
  } catch (error) {
    console.error('Error loading guides:', error);
    errorMessage.value =
      error instanceof Error ? error.message : "Failed to load guides.";
    guides.value = [];
  } finally {
    isLoading.value = false;
  }
};

const filteredGuides = computed(() => {
  // Backend handles filtering, but we can do client-side filtering as fallback
  return guides.value;
});

const selectedCount = computed(() => {
  return guides.value.filter((g) => g.selected).length;
});

// Helper functions to handle boolean/string values from API
const isPublished = (guide: any): boolean => {
  if (guide.isPublished === undefined || guide.isPublished === null) {
    return false;
  }
  // Handle various formats: true, "true", 1, "1", etc.
  const value = guide.isPublished;
  if (typeof value === 'boolean') {
    return value === true;
  }
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  return false;
};

const isFeatured = (guide: any): boolean => {
  if (guide.isFeatured === undefined || guide.isFeatured === null) {
    return false;
  }
  // Handle various formats: true, "true", 1, "1", etc.
  const value = guide.isFeatured;
  if (typeof value === 'boolean') {
    return value === true;
  }
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  return false;
};

const handleSearch = debounce(() => {
  currentPage.value = 1;
  loadGuides();
}, 500);

const handleCategoryChange = () => {
  currentPage.value = 1;
  loadGuides();
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadGuides();
  }
};

const nextPage = () => {
  currentPage.value++;
  loadGuides();
};

watch(selectAll, (val) => {
  guides.value.forEach((g) => {
    g.selected = val;
  });
});

const editGuide = (guide) => {
  router.push(`/dashboard/guides/add?id=${guide.id}&mode=edit`);
};

const deleteGuideConfirm = async (guide) => {
  if (!confirm(`Are you sure you want to delete guide "${guide.title}"?`)) {
    return;
  }
  
  try {
    const response = await deleteGuideApi(guide.id);
    if (response.success) {
      successMessage.value = "Guide deleted successfully!";
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
      await loadGuides();
    } else {
      errorMessage.value = response.message || 'Failed to delete guide';
    }
  } catch (error) {
    console.error('[GuidesIndex] deleteGuide: error', error);
    errorMessage.value = error instanceof Error ? error.message : 'Failed to delete guide';
  }
};

const toggleColumnsDropdown = () => {
  columnsDropdownOpen.value = !columnsDropdownOpen.value;
};

// Debounce helper
function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Auto-dismiss error messages after 5 seconds
watch(errorMessage, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      errorMessage.value = "";
    }, 5000);
  }
});

onMounted(() => {
  loadCategories();
  loadGuides();
});

onActivated(() => {
  loadGuides();
});
</script>

