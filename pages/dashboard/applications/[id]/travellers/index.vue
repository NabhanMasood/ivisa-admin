<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
      <!-- Page Header -->
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
              {{ application?.applicationNumber || application?.id || 'Loading...' }} - Travelers
            </h1>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="flex justify-between items-center">
        <!-- Columns Filter Button -->
        <div class="bg-gray-100 dark:bg-gray-800 rounded-[6px] p-1 flex gap-2 w-fit">
          <NuxtLink
            :to="`/dashboard/applications/${applicationId}`"
            class="px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200"
            :class="[
              !$route.path.includes('/travellers')
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
          >
            Application Details
          </NuxtLink>
          <button
            class="px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200"
            :class="[
              $route.path.includes('/travellers')
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
          >
            Travelers
          </button>
          <NuxtLink
            :to="`/dashboard/applications/${applicationId}?tab=additional-info`"
            class="px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200"
            :class="[
              'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
          >
            Additional Info
          </NuxtLink>
          <NuxtLink
            :to="`/dashboard/applications/${applicationId}?tab=documents`"
            class="px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200"
            :class="[
              'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
          >
            Documents
          </NuxtLink>
          <NuxtLink
            :to="`/dashboard/applications/${applicationId}?tab=payment`"
            class="px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200"
            :class="[
              'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
          >
            Payment
          </NuxtLink>
        </div>
        <div class="flex justify-center gap-2.5 sm:justify-end w-full sm:w-auto">
        
          <button
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Update Status
          </button>
        </div>
      </div>

      <!-- Travelers Content -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <!-- Search and Filter Buttons -->
          <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
            <!-- Search Bar -->
            <div class="relative flex-1 w-full sm:w-[30%]">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Travelers"
                class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                style="border-radius: 7px"
              />
            </div>
          </div>
        </div>

        <!-- Travelers Table -->
        <div
          class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
          style="border-radius: 7px"
        >
          <div class="overflow-x-auto">
            <table class="w-full min-w-[600px] sm:min-w-[800px]">
              <thead
                class="bg-[#FFFFFF] dark:bg-[#09090B] border-b dark:border-gray-800"
              >
                <tr class="!h-[37px] bg-[#F9FAFB] dark:bg-[#18181B]">
                  <!-- force small row height -->
                  <th
                    class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2 text-left align-middle"
                  >
                    <input
                      type="checkbox"
                      v-model="selectAll"
                      @change="toggleSelectAll"
                      class="border-gray-300"
                      style="border-radius: 7px"
                    />
                  </th>

                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Name</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Passport</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Issue Date</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Expiry Date</span>
                    </div>
                  </th>
                  <th class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                <!-- Loading State -->
                <tr v-if="isLoadingTravelers">
                  <td colspan="6" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    Loading travelers...
                  </td>
                </tr>
                
                <!-- Empty State -->
                <tr v-else-if="!isLoadingTravelers && filteredTravelers.length === 0">
                  <td colspan="6" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    No travelers found for this application.
                  </td>
                </tr>
                
                <!-- Data Rows -->
                <tr
                  v-for="traveler in filteredTravelers"
                  :key="traveler.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td class="px-2 sm:px-3 lg:px-4 py-2">
                    <input
                      type="checkbox"
                      v-model="traveler.selected"
                      class="border-gray-300"
                      style="border-radius: 7px"
                    />
                  </td>
                  <td
                    class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-[#475467] dark:text-white cursor-pointer"
                    @click="viewTravelerDetails(traveler)"
                    style="
                      font-size: 14px;
                      font-weight: 400;
                      font-style: normal;
                      line-height: 20px;
                      font-family: 'Geist', sans-serif;
                      letter-spacing: 0;
                    "
                  >
                    {{ `${traveler.firstName || ''} ${traveler.lastName || ''}`.trim() || '-' }}
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
                    {{ traveler.passportNumber || '-' }}
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
                    {{ formatDate(traveler.passportIssueDate) }}
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
                    {{ formatDate(traveler.passportExpiryDate) }}
                  </td>
                  <td class="px-2 sm:px-3 lg:px-4 py-2">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="viewTravelerDetails(traveler)"
                        class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        title="View Details"
                      >
                        <Eye
                          class="h-4 w-4 text-gray-600 dark:text-gray-400"
                        />
                      </button>
                      <button
                        @click="editTraveler(traveler)"
                        class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        title="Edit"
                      >
                        <Pencil
                          class="h-4 w-4 text-gray-600 dark:text-gray-400"
                        />
                      </button>
                      <button
                        @click="deleteTraveler(traveler)"
                        class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        title="Delete"
                      >
                        <Trash2
                          class="h-4 w-4 text-gray-600 dark:text-gray-400"
                        />
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
            {{ selectedTravelersCount }} of {{ travelers.length }} row(s)
            selected.
          </div>

          <!-- Navigation Buttons -->
          <div class="flex items-center space-x-2">
            <button
              class="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs sm:text-sm"
              :disabled="currentPage === 1"
              :class="{
                'opacity-50 cursor-not-allowed': currentPage === 1,
              }"
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
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "~/components/DashboardLayout.vue";
import { ArrowLeft, Pencil, Trash2, Eye } from "lucide-vue-next";
import { useApplication } from "~/composables/useApplication";

// Get route parameters
const route = useRoute();
const router = useRouter();
const applicationId = computed(() => route.params.id);

// Use application composable
const { getApplication, getApplicationTravelers } = useApplication();

// Application data (for header)
const application = ref(null);
const isLoadingApplication = ref(false);

// Travelers data
const travelers = ref([]);
const isLoadingTravelers = ref(false);

// Search and pagination
const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;

// Load application details (for header)
const loadApplication = async () => {
  if (!applicationId.value) return;
  
  try {
    isLoadingApplication.value = true;
    const data = await getApplication(applicationId.value);
    application.value = data;
  } catch (error) {
    console.error("Error loading application:", error);
  } finally {
    isLoadingApplication.value = false;
  }
};

// Load travelers
const loadTravelers = async () => {
  if (!applicationId.value) return;
  
  try {
    isLoadingTravelers.value = true;
    
    // First, try to fetch from API
    const data = await getApplicationTravelers(applicationId.value);
    
    if (data) {
      const rawTravelers = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);
      
      console.log('📋 Raw travelers from API:', rawTravelers.map(t => ({ 
        id: t.id, 
        firstName: t.firstName, 
        lastName: t.lastName,
        email: t.email 
      })));
      
      // Check if we need to add the first traveler (customer traveler)
      // According to backend: when numberOfTravelers > 1, first traveler is the customer traveler
      const numberOfTravelers = application.value?.numberOfTravelers || 0;
      const customer = application.value?.customer;
      const expectedTravelerCount = numberOfTravelers;
      
      console.log('📊 Traveler count check:', {
        numberOfTravelers,
        rawTravelersCount: rawTravelers.length,
        expectedCount: expectedTravelerCount,
        customerId: customer?.id,
        customerEmail: customer?.email
      });
      
      // Check if we need to add the first traveler (customer traveler)
      const appTravelers = application.value?.travelers || [];
      const firstAppTraveler = appTravelers[0]; // First traveler is customer traveler
      
      // Check if first traveler (customer traveler) already exists in rawTravelers
      let customerTravelerExists = false;
      if (firstAppTraveler?.id) {
        customerTravelerExists = rawTravelers.some(t => t.id === firstAppTraveler.id);
      }
      if (!customerTravelerExists && customer?.email) {
        customerTravelerExists = rawTravelers.some(t => 
          t.email && customer.email && t.email.toLowerCase() === customer.email.toLowerCase()
        );
      }
      if (!customerTravelerExists && firstAppTraveler) {
        // Check by name match as last resort
        const firstTravelerName = `${firstAppTraveler.firstName || ''} ${firstAppTraveler.lastName || ''}`.trim().toLowerCase();
        customerTravelerExists = rawTravelers.some(t => {
          const travelerName = `${t.firstName || ''} ${t.lastName || ''}`.trim().toLowerCase();
          return travelerName && firstTravelerName && travelerName === firstTravelerName;
        });
      }
      
      // Only add if we have fewer travelers than expected AND customer traveler doesn't exist
      if (rawTravelers.length < expectedTravelerCount && customer && !customerTravelerExists) {
        console.log('⚠️ First traveler (customer traveler) is missing, adding it...');
        
        // Create customer traveler entry - prefer data from application.travelers if available
        const customerTraveler = {
          id: firstAppTraveler?.id || null, // Use ID from application traveler if available
          firstName: firstAppTraveler?.firstName || customer.fullname?.split(' ')[0] || customer.customerName?.split(' ')[0] || '',
          lastName: firstAppTraveler?.lastName || customer.fullname?.split(' ').slice(1).join(' ') || customer.customerName?.split(' ').slice(1).join(' ') || '',
          email: firstAppTraveler?.email || customer.email,
          // Add other traveler fields from application traveler or customer
          passportNumber: firstAppTraveler?.passportNumber || customer.passportNumber,
          passportExpiryDate: firstAppTraveler?.passportExpiryDate || customer.passportExpiryDate,
          passportIssueDate: firstAppTraveler?.passportIssueDate || customer.passportIssueDate,
          residenceCountry: firstAppTraveler?.residenceCountry || customer.residenceCountry,
          dateOfBirth: firstAppTraveler?.dateOfBirth || customer.dateOfBirth,
          _isCustomerTraveler: true
        };
        
        console.log('✅ Adding customer traveler to travelers list:', {
          ...customerTraveler,
          name: `${customerTraveler.firstName} ${customerTraveler.lastName}`.trim()
        });
        rawTravelers.unshift(customerTraveler); // Add at the beginning
      } else if (customerTravelerExists) {
        console.log('✅ Customer traveler already exists in travelers list, skipping addition');
      }
      
      // Remove duplicates before processing (by ID, then by name)
      const seenIds = new Set();
      const seenNames = new Set();
      const uniqueTravelers = rawTravelers.filter(t => {
        const travelerId = t.id;
        const travelerName = `${t.firstName || ''} ${t.lastName || ''}`.trim().toLowerCase();
        
        // Check for duplicate by ID
        if (travelerId && seenIds.has(travelerId)) {
          console.log(`⚠️ Removing duplicate traveler by ID: ${travelerId}`, t);
          return false;
        }
        if (travelerId) seenIds.add(travelerId);
        
        // Check for duplicate by name (if no ID or ID is null)
        if (!travelerId && travelerName && seenNames.has(travelerName)) {
          console.log(`⚠️ Removing duplicate traveler by name: ${travelerName}`, t);
          return false;
        }
        if (travelerName) seenNames.add(travelerName);
        
        return true;
      });
      
      console.log('📋 Travelers after deduplication:', uniqueTravelers.length, 'of', rawTravelers.length);
      
      // Filter out any customer entries that might have been included
      // Be very lenient - include all entries unless they're clearly customers
      // Assign temporary IDs to travelers with null IDs
      travelers.value = uniqueTravelers.map((t, index) => {
        // If traveler has no ID, assign a temporary one
        if (!t.id || t.id === null || t.id === undefined) {
          const tempId = `temp-traveler-${index}`;
          console.log(`⚠️ Traveler has no ID, assigning temporary ID: ${tempId}`, t);
          return { ...t, id: tempId, _isTempId: true };
        }
        return t;
      }).filter(t => {
        // Check if it's clearly customer data (has customer fields but NO traveler fields)
        const hasCustomerFields = t.fullname || t.customerName || (t.name && !t.firstName && !t.lastName);
        const hasTravelerFields = t.firstName || t.lastName || t.passportNumber || t.dateOfBirth || t.email;
        
        // Only exclude if it has customer fields but NO traveler fields at all
        // BUT: if it's marked as customer traveler, include it
        if (t._isCustomerTraveler) {
          console.log('✅ Including customer traveler:', { id: t.id, firstName: t.firstName, lastName: t.lastName });
          return true;
        }
        
        if (hasCustomerFields && !hasTravelerFields) {
          console.log('⚠️ Filtering out customer entry from travelers (has customer fields but no traveler fields):', {
            id: t.id,
            fullname: t.fullname,
            customerName: t.customerName,
            name: t.name
          });
          return false;
        }
        
        // Include all other entries - they're travelers
        console.log('✅ Including traveler:', { id: t.id, firstName: t.firstName, lastName: t.lastName, isTempId: t._isTempId });
        return true;
      });
      
      console.log('📋 Loaded travelers (filtered):', travelers.value.map(t => ({ 
        id: t.id, 
        name: `${t.firstName || ''} ${t.lastName || ''}`.trim(),
        isCustomerTraveler: t._isCustomerTraveler
      })));
    } else {
      travelers.value = [];
    }
  } catch (error) {
    console.error("Error loading travelers:", error);
    // If API fails, check if travelers are in application object as fallback
    if (application.value?.travelers && Array.isArray(application.value.travelers)) {
      // Filter out customers from fallback data too
      const validTravelers = application.value.travelers.filter(t => {
        if (!t.id || t.id === null || t.id === undefined) return false;
        if (!t.firstName && !t.lastName) {
          if (t.fullname || t.customerName || t.name) {
            return false; // This is a customer, not a traveler
          }
        }
        return true;
      });
      
      travelers.value = validTravelers.map((t) => ({
        ...t,
        selected: false,
      }));
    } else {
      travelers.value = [];
    }
  } finally {
    isLoadingTravelers.value = false;
  }
};

// Filtered travelers
const filteredTravelers = computed(() => {
  let filtered = travelers.value;

  if (searchQuery.value) {
    const search = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (traveler) =>
        `${traveler.firstName || ''} ${traveler.lastName || ''}`.toLowerCase().includes(search) ||
        (traveler.email || '').toLowerCase().includes(search) ||
        (traveler.passportNumber || '').toLowerCase().includes(search)
    );
  }

  return filtered;
});

const selectedTravelersCount = computed(() => {
  return travelers.value.filter((traveler) => traveler.selected).length;
});

const toggleSelectAll = () => {
  travelers.value.forEach((traveler) => {
    traveler.selected = selectAll.value;
  });
};

const viewTravelerDetails = (traveler) => {
  router.push(`/dashboard/applications/${applicationId.value}/travellers/${traveler.id}`);
};

const editTraveler = (traveler) => {
  console.log("Edit traveler:", traveler);
  // Add edit functionality
};

const deleteTraveler = (traveler) => {
  console.log("Delete traveler:", traveler);
  // Add delete functionality
};

// Format date helper
const formatDate = (date) => {
  if (!date) return '-';
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '-';
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return date.toString();
  }
};

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredTravelers.value.length / itemsPerPage);
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Set page title
useHead({
  title: computed(
    () => `${application.value?.applicationNumber || application.value?.id || 'Application'} - Travelers - iVisa`
  ),
});

// Load data on mount
onMounted(() => {
  loadApplication();
  loadTravelers();
});

// Navigation
const goBack = () => {
  router.push(`/dashboard/applications/${applicationId.value}`);
};
</script>

