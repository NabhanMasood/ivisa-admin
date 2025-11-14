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
              {{ traveler?.firstName || '' }} {{ traveler?.lastName || '' }} - Traveller Details
            </h1>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="bg-gray-100 dark:bg-gray-800 rounded-[6px] p-1 inline-flex">
        <button
          @click="activeTab = 'details'"
          :class="[
            activeTab === 'details'
              ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            'px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200'
          ]"
        >
          Traveller Details
        </button>
        <button
          @click="activeTab = 'history'"
          :class="[
            activeTab === 'history'
              ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            'px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200'
          ]"
        >
          Traveller History
        </button>
      </div>

      <!-- Tab Content -->
      <div class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800">
        
        <!-- Traveller Details Tab -->
        <div v-if="activeTab === 'details'" class="p-6">
          <div class="space-y-6">
            <div class="flex-1 min-w-0">
              <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                Traveller Details
              </h1>
              <label
                class="text-[#475467] dark:text-white text-[14px] sm:text-base leading-[12px] sm:leading-6"
                style="font-weight: 400; letter-spacing: 0%"
              >
                Here you can see the traveller details.
              </label>
            </div>
            <div class="flex flex-col overflow-hidden">
              <div v-if="isLoadingTraveler" class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                Loading traveller details...
              </div>
              <template v-else-if="traveler">
                <!-- Personal Information -->
                <div
                  class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
                >
                  <span
                    class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                    >First Name</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white">{{
                    traveler.firstName || '-'
                  }}</span>
                </div>
                <div
                  class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
                >
                  <span
                    class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                    >Last Name</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white">{{
                    traveler.lastName || '-'
                  }}</span>
                </div>
      
                <div
                  class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
                >
                  <span
                    class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                    >Date of Birth</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white">{{
                    formatDate(traveler.dateOfBirth || traveler.dob)
                  }}</span>
                </div>
        
             

                <!-- Passport Information -->
                <div
                  class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
                >
                  <span
                    class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                    >Passport Nationality</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white">{{
                    traveler.passportNationality || traveler.nationality || '-'
                  }}</span>
                </div>
                <div
                  class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
                >
                  <span
                    class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                    >Passport Number</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white">{{
                    traveler.passportNumber || '-'
                  }}</span>
                </div>
            
                <div
                  class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
                >
                  <span
                    class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                    >Passport Expiry Date</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white">{{
                    formatDate(traveler.passportExpiryDate)
                  }}</span>
                </div>

                <!-- Residence Information -->
                <div
                  class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
                >
                  <span
                    class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                    >Residence Country</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white">{{
                    traveler.residenceCountry || '-'
                  }}</span>
                </div>
                <div
                  class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
                >
                  <span
                    class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                    >Has Schengen Visa</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white">{{
                    traveler.hasSchengenVisa ? 'Yes' : 'No'
                  }}</span>
                </div>

                <!-- Additional Information -->
                <div
                  v-if="traveler.createdAt"
                  class="grid grid-cols-2 gap-4 pt-5"
                >
                  <span
                    class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                    >Created At</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white">{{
                    formatDate(traveler.createdAt)
                  }}</span>
                </div>
              </template>
              <div v-else class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                {{ errorMessage || 'Traveller not found' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Traveller History Tab -->
        <div v-if="activeTab === 'history'" class="p-6">
          <div class="space-y-6">
            <div class="flex-1 min-w-0">
              <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                Traveller History
              </h1>
              <label
                class="text-[#475467] dark:text-white text-[14px] sm:text-base leading-[12px] sm:leading-6"
                style="font-weight: 400; letter-spacing: 0%"
              >
                Here you can see the traveller history.
              </label>
            </div>
            <div class="flex flex-col">
              <div v-if="isLoadingTraveler" class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                Loading traveller history...
              </div>
              <template v-else-if="traveler">
                <div class="space-y-4">
                  <div class="bg-gray-50 dark:bg-[#18181B] rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <p class="text-sm font-medium text-gray-900 dark:text-white mb-4">
                      Do you have a valid visa or residence permit from the Schengen Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand, Ireland, or Switzerland?
                    </p>
                    <div class="mt-4">
                      <span class="text-sm font-medium text-[#020617] dark:text-gray-400 mr-2">Response:</span>
                      <span class="text-sm text-gray-900 dark:text-white">
                        {{ formatVisaResponse(getVisaResponseValue(traveler)) }}
                      </span>
                    </div>
                  </div>
                </div>
              </template>
              <div v-else class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                {{ errorMessage || 'Traveller not found' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "~/components/DashboardLayout.vue";
import { ArrowLeft } from "lucide-vue-next";
import { useApplication } from "~/composables/useApplication";

// Get route parameters
const route = useRoute();
const router = useRouter();
const applicationId = computed(() => route.params.id);
const travellerId = computed(() => route.params.travellerId);

// Use application composable
const { getApplication, getApplicationTravelers } = useApplication();

// Tab management
const activeTab = ref('details');

// Traveller data
const traveler = ref(null);
const isLoadingTraveler = ref(false);
const errorMessage = ref("");

// Application data (for header navigation)
const application = ref(null);

// Load application details (for header)
const loadApplication = async () => {
  if (!applicationId.value) return;
  
  try {
    const data = await getApplication(applicationId.value);
    application.value = data;
  } catch (error) {
    console.error("Error loading application:", error);
  }
};

// Load traveller details
const loadTraveler = async () => {
  if (!applicationId.value || !travellerId.value) return;
  
  try {
    isLoadingTraveler.value = true;
    errorMessage.value = "";
    
    // Fetch travelers for the application
    const data = await getApplicationTravelers(applicationId.value);
    
    // Find the specific traveller
    const travelers = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
    const foundTraveler = travelers.find((t) => t.id === Number(travellerId.value) || t.id === travellerId.value);
    
    if (foundTraveler) {
      traveler.value = foundTraveler;
    } else {
      errorMessage.value = "Traveller not found";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load traveller details";
    console.error("Error loading traveller:", error);
  } finally {
    isLoadingTraveler.value = false;
  }
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

// Helper function to get visa response value from traveler object
const getVisaResponseValue = (traveler) => {
  if (!traveler) return null;
  
  // The field name from the database is 'hasSchengenVisa'
  return traveler.hasSchengenVisa;
};

// Helper function to format visa/residence permit response
const formatVisaResponse = (response) => {
  if (response === null || response === undefined) return 'Not provided';
  
  if (typeof response === 'boolean') {
    return response ? 'Yes' : 'No';
  }
  
  if (typeof response === 'string') {
    const lowerResponse = response.toLowerCase().trim();
    if (lowerResponse === 'true' || lowerResponse === 'yes' || lowerResponse === '1') {
      return 'Yes';
    }
    if (lowerResponse === 'false' || lowerResponse === 'no' || lowerResponse === '0') {
      return 'No';
    }
    return response;
  }
  
  return 'Not provided';
};

// Edit traveller
const editTraveler = () => {
  console.log("Edit traveller:", traveler.value);
  // Add edit functionality
};

// Set page title
useHead({
  title: computed(
    () => `${traveler.value?.firstName || ''} ${traveler.value?.lastName || ''} - Traveller Details - iVisa`
  ),
});

// Load data on mount
onMounted(() => {
  loadApplication();
  loadTraveler();
});

// Navigation
const goBack = () => {
  router.push(`/dashboard/applications/${applicationId.value}/travellers`);
};
</script>

