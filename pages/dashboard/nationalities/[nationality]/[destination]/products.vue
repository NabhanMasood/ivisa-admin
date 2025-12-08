<template>
  <DashboardLayout>
    <div class="flex flex-col gap-4 items-center justify-center mx-auto">
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
              {{ nationalityName }} to {{ destinationName }}
            </h1>
          </div>
        </div>
        <button
          @click="loadProducts"
          :disabled="isLoading"
          class="p-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31] transition-colors border border-gray-200 dark:border-gray-800 w-[42px] h-[36px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          style="border-radius: 5px"
          title="Refresh products"
        >
          <svg
            class="h-4 w-4 text-gray-600 dark:text-gray-300"
            :class="{ 'animate-spin': isLoading }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Search Bar -->
      <div class="w-full">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="w-[20%] h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 pr-10 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black dark:focus:border-white focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
            style="border-radius: 7px"
          />
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p class="text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden flex items-center justify-center py-12 w-full"
        style="border-radius: 7px"
      >
        <div class="flex flex-col items-center gap-3">
          <div class="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin"></div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Loading products...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!isLoading && products.length === 0"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden p-12 w-full"
        style="border-radius: 7px"
      >
        <div class="flex flex-col items-center gap-3">
          <p class="text-sm text-gray-600 dark:text-gray-400">No products found for {{ nationalityName }} to {{ destinationName }}</p>
        </div>
      </div>

      <!-- Products Table -->
      <div
        v-else
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden w-full"
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
                  Name
                </th>
                <th
                  class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                >
                  Duration
                </th>
                <th
                  class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                >
                  Validity
                </th>
                <th
                  class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                >
                  Price
                </th>
                <th class="w-20 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr
                v-if="filteredProducts.length === 0"
                class="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td colspan="6" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No products match your search
                </td>
              </tr>
              <tr
                v-for="product in filteredProducts"
                :key="product.id || product.productName"
                class="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td class="px-4 py-3">
                  <input
                    type="checkbox"
                    v-model="product.selected"
                    class="border-gray-300"
                    style="border-radius: 7px"
                  />
                </td>
                <td
                  class="px-4 py-3 text-sm text-[#475467] dark:text-white font-medium"
                >
                  {{ product.productName }}
                </td>
                <td
                  class="px-4 py-3 text-sm text-[#475467] dark:text-white"
                >
                  {{ product.duration }} Days
                </td>
                <td
                  class="px-4 py-3 text-sm text-[#475467] dark:text-white"
                >
                  {{ product.validity }} Days
                </td>
                <td
                  class="px-4 py-3 text-sm text-[#475467] dark:text-white"
                >
                  USD ${{ product.totalAmount }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="editProduct(product)"
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
                      @click="deleteProduct(product)"
                      class="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Delete"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
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
          {{ selectedCount }} of {{ products.length }} row(s) selected.
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
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "~/components/DashboardLayout.vue";
import { ArrowLeft, Plus, Search } from "lucide-vue-next";
import { useNationalitiesApi } from "~/composables/useNationalitiesApi";
import { useVisaProductsApi } from "~/composables/useVisaProductsApi";

// Get route parameters
const route = useRoute();
const router = useRouter();

// Initialize API
const { getNationalityDestinationProducts } = useNationalitiesApi();
const { getVisaProductsByCountry } = useVisaProductsApi();

// Get nationality and destination from route params
const nationalityName = computed(() => {
  const nationality = route.params.nationality;
  const decoded = decodeURIComponent(nationality as string);
  // Capitalize first letter of each word
  return decoded ? decoded.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
});

const destinationName = computed(() => {
  const destination = route.params.destination;
  const decoded = decodeURIComponent(destination as string);
  // Capitalize first letter of each word
  return decoded ? decoded.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
});

// Set page title
useHead({
  title: `${nationalityName.value} to ${destinationName.value} - iVisa`,
});

// Reactive state
const products = ref<Array<{
  id?: number | string;
  productName: string;
  duration: number;
  validity: number;
  totalAmount: number | string;
  govtFee?: number | string;
  serviceFee?: number | string;
  selected: boolean;
}>>([]);
const isLoading = ref(false);
const errorMessage = ref("");
const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);

// Load products for nationality-destination combination
const loadProducts = async () => {
  if (!nationalityName.value || !destinationName.value) {
    errorMessage.value = "Nationality and destination are required";
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = "";
    
    // Fetch both nationality products and latest visa products
    const [nationalityResponse, visaProductsResponse] = await Promise.all([
      getNationalityDestinationProducts(
        nationalityName.value,
        destinationName.value
      ),
      getVisaProductsByCountry(destinationName.value)
    ]);
    
    if (nationalityResponse.success && nationalityResponse.data) {
      // Get latest visa product prices
      const latestVisaProducts = visaProductsResponse.success && visaProductsResponse.data 
        ? visaProductsResponse.data 
        : [];
      
      // Create a map of latest prices by product name
      const latestPricesMap = new Map();
      latestVisaProducts.forEach((vp: any) => {
        if (vp.productName) {
          latestPricesMap.set(vp.productName, {
            totalAmount: vp.totalAmount,
            govtFee: vp.govtFee,
            serviceFee: vp.serviceFee,
          });
        }
      });
      
      // Map API data and merge with latest visa product prices
      products.value = nationalityResponse.data.map((product: any) => {
        const latestPrices = latestPricesMap.get(product.productName);
        
        // Use latest prices if available, otherwise use stored prices
        return {
          ...product,
          totalAmount: latestPrices?.totalAmount ?? product.totalAmount,
          govtFee: latestPrices?.govtFee ?? product.govtFee,
          serviceFee: latestPrices?.serviceFee ?? product.serviceFee,
          selected: false,
        };
      });
      
      // Debug: Log products to check if prices are updated
      if (process.dev) {
        console.log('📦 Loaded products with prices:', products.value.map(p => ({
          name: p.productName,
          totalAmount: p.totalAmount,
          govtFee: p.govtFee,
          serviceFee: p.serviceFee,
          id: p.id
        })));
        console.log('🔄 Products loaded at:', new Date().toISOString());
        console.log('✅ Latest visa product prices merged:', latestPricesMap.size, 'products');
      }
    } else {
      products.value = [];
      errorMessage.value = nationalityResponse.message || "Failed to load products";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load products. Please try again.";
    products.value = [];
    console.error('❌ Error loading products:', error);
  } finally {
    isLoading.value = false;
  }
};

// Computed: Filtered products based on search
const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return products.value;
  
  const query = searchQuery.value.toLowerCase();
  return products.value.filter((product) =>
    product.productName?.toLowerCase().includes(query)
  );
});

const selectedCount = computed(() => {
  return products.value.filter((product) => product.selected).length;
});

// Watch for select all changes
watch(selectAll, (newValue) => {
  products.value.forEach((product) => {
    product.selected = newValue;
  });
});

// Navigation
const goBack = () => {
  router.push(`/dashboard/nationalities/${route.params.nationality}/destinations`);
};

const navigateToAddNationality = () => {
  router.push("/dashboard/nationalities/add");
};

const editProduct = (product: { id?: number | string }) => {
  if (product.id) {
    router.push(`/dashboard/visaproducts/add?id=${product.id}&mode=edit`);
  }
};

const deleteProduct = (product: { id?: number | string; productName: string }) => {
  if (confirm(`Are you sure you want to delete "${product.productName}"?`)) {
    // TODO: Implement delete functionality
    console.log('Delete product:', product.id);
  }
};

// Load products on mount
onMounted(() => {
  loadProducts();
});

// Reload products when page becomes active (e.g., after editing a visa product)
onActivated(() => {
  loadProducts();
});

// Watch for route changes
watch(() => [route.params.nationality, route.params.destination], () => {
  loadProducts();
});
</script>

