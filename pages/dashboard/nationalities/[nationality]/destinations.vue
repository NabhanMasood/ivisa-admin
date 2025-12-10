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
              {{ nationalityName }}
            </h1>
          </div>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="w-full">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search destinations"
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
          <p class="text-sm text-gray-600 dark:text-gray-400">Loading destinations...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!isLoading && destinations.length === 0"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden p-12 w-full"
        style="border-radius: 7px"
      >
        <div class="flex flex-col items-center gap-3">
          <p class="text-sm text-gray-600 dark:text-gray-400">No destinations found for {{ nationalityName }}</p>
        </div>
      </div>

      <!-- Destinations Table -->
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
                <th
                  class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                >
                  Destination Country
                </th>
                <th
                  class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                >
                  Visa Products
                </th>
                <th class="w-20 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr
                v-if="filteredDestinations.length === 0"
                class="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td colspan="3" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No destinations match your search
                </td>
              </tr>
              <tr
                v-for="destination in filteredDestinations"
                :key="destination.destination"
                class="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td
                  class="px-4 py-3 text-sm text-[#475467] dark:text-white font-medium"
                >
                  <div class="flex items-center gap-2">
                    <span
                      v-if="destination.isFreeVisa"
                      class="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"
                      title="Free Visa - All products for this pair are hidden from client"
                    ></span>
                    {{ destination.destination }}
                  </div>
                </td>
                <td
                  class="px-4 py-3 text-sm text-[#475467] dark:text-white"
                >
                  {{ destination.products }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="viewDestinationProducts(destination.destination)"
                      class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="View Products"
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "~/components/DashboardLayout.vue";
import { ArrowLeft, Search } from "lucide-vue-next";
import { useNationalitiesApi } from "~/composables/useNationalitiesApi";

// Get route parameters
const route = useRoute();
const router = useRouter();

// Initialize API
const { getNationalityDestinations, getNationalityDestinationProducts, getNationalities } = useNationalitiesApi();

// Get nationality name from route params
const nationalityName = computed(() => {
  const nationality = route.params.nationality;
  const decoded = decodeURIComponent(nationality as string);
  // Capitalize first letter
  return decoded ? decoded.charAt(0).toUpperCase() + decoded.slice(1) : '';
});

// Set page title
useHead({
  title: `${nationalityName.value} Destinations - iVisa`,
});

// Reactive state
const destinations = ref<Array<{
  destination: string;
  products: number;
  isFreeVisa?: boolean;
}>>([]);
const allDestinations = ref<Array<{
  destination: string;
  products: number;
  isFreeVisa?: boolean;
}>>([]);
const isLoading = ref(false);
const errorMessage = ref("");
const searchQuery = ref("");

// Load destinations for nationality
const loadDestinations = async () => {
  if (!nationalityName.value) {
    errorMessage.value = "Nationality name is required";
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = "";
    
    const response = await getNationalityDestinations(nationalityName.value);
    
    if (response.success && response.data) {
      // Get all nationalities to check free visa status
      let allNationalities: any[] = [];
      try {
        const nationalitiesResponse = await getNationalities();
        if (nationalitiesResponse.success && nationalitiesResponse.data) {
          allNationalities = nationalitiesResponse.data;
        }
      } catch (error) {
        console.warn('Failed to load nationalities for free visa check:', error);
      }
      
      // Check free visa status and recalculate product count for each destination
      const destinationsWithFreeVisa = await Promise.all(
        response.data.map(async (dest) => {
          // Check if any nationality record for this pair has isFreeVisa=true
          // Note: API uses 'destination' field, not 'destinationCountry'
          const matchingNationalities = allNationalities.filter((nat: any) => {
            const natName = (nat.nationality || '').toLowerCase().trim();
            const destName = (nat.destination || nat.destinationCountry || '').toLowerCase().trim();
            const currentNatName = nationalityName.value.toLowerCase().trim();
            const currentDestName = dest.destination.toLowerCase().trim();
            
            return natName === currentNatName && destName === currentDestName;
          });
          
          // If any nationality record for this pair has isFreeVisa=true, the pair is free visa
          const isFreeVisa = matchingNationalities.some((nat: any) => {
            return nat.isFreeVisa === true || nat.isFreeVisa === 'true' || nat.isFreeVisa === 1;
          });
          
          // Recalculate actual product count by fetching products (include free visas for admin view)
          let actualProductCount = dest.products; // Fallback to API count
          try {
            const productsResponse = await getNationalityDestinationProducts(
              nationalityName.value,
              dest.destination,
              true // includeFreeVisas=true for admin panel
            );
            
            if (productsResponse.success && productsResponse.data) {
              // Count unique products (by productName to avoid duplicates)
              const uniqueProducts = new Set(productsResponse.data.map((p: any) => p.productName));
              actualProductCount = uniqueProducts.size;
            }
          } catch (error) {
            console.warn(`Failed to fetch products for ${dest.destination}:`, error);
            // Keep the original count from API
          }
          
          // Debug logging
          if (process.dev) {
            console.log(`🔍 Checking ${nationalityName.value} → ${dest.destination}:`, {
              apiProductCount: dest.products,
              actualProductCount,
              matchingCount: matchingNationalities.length,
              isFreeVisa,
            });
          }
          
          return {
            ...dest,
            products: actualProductCount,
            isFreeVisa,
          };
        })
      );
      
      allDestinations.value = destinationsWithFreeVisa;
      destinations.value = destinationsWithFreeVisa;
    } else {
      allDestinations.value = [];
      destinations.value = [];
      errorMessage.value = response.message || "Failed to load destinations";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load destinations. Please try again.";
    destinations.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Computed: Filter destinations based on search
const filteredDestinations = computed(() => {
  if (!searchQuery.value.trim()) return destinations.value;
  
  const query = searchQuery.value.toLowerCase();
  return destinations.value.filter((dest) =>
    dest.destination?.toLowerCase().includes(query)
  );
});

// Navigation
const goBack = () => {
  router.push("/dashboard/nationalities");
};

const viewDestinationProducts = (destination: string) => {
  // Navigate to nationality-destination products page
  const nationalitySlug = nationalityName.value.toLowerCase().replace(/\s+/g, '-');
  const destinationSlug = destination.toLowerCase().replace(/\s+/g, '-');
  router.push(`/dashboard/nationalities/${nationalitySlug}/${destinationSlug}/products`);
};

// Load destinations on mount
onMounted(() => {
  loadDestinations();
});

// Watch for route changes
watch(() => route.params.nationality, () => {
  loadDestinations();
});
</script>

