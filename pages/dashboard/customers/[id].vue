<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
      <!-- Page Header -->
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
            <h1 class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
              {{ customer?.customerName || 'Loading...' }} - Customer Details
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
          Customer Details
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
          Customer History
        </button>
        <button
          @click="activeTab = 'applications'"
          :class="[
            activeTab === 'applications'
              ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            'px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200'
          ]"
        >
          Applications
        </button>
        <button
          @click="activeTab = 'billing'"
          :class="[
            activeTab === 'billing'
              ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            'px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200'
          ]"
        >
          Billing Info
        </button>
      </div>

      <!-- Tab Content -->
      <div class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800">
        
        <!-- Customer Details Tab -->
        <div v-if="activeTab === 'details'" class="p-6">
          <div class="space-y-6">
            <div class="flex-1 min-w-0">
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
              Customer Details
            </h1>
            <label class="text-[#475467] dark:text-white text-[14px] sm:text-base leading-[12px] sm:leading-6"
              style="font-weight: 400; letter-spacing: 0%">
              Here you can see the customer details.
            </label>
          </div>
              <div class="flex flex-col">
                <div v-if="isLoading" class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Loading customer details...
                </div>
                <template v-else-if="customer">
                  <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">First/Middle Name</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ getFirstName(customer.fullname || customer.customerName) }}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Last Name</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ getLastName(customer.fullname || customer.customerName) }}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Email</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ customer.email }}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Phone</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ customer.phone }}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Date of Birth</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ formatDate(customer.dateOfBirth) }}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Nationality</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ customer.nationality || '-' }}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Passport Number</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ customer.passportNumber || '-' }}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Passport Expiration Date</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ formatDate(customer.passportExpiryDate) }}</span>
                  </div>
                
                  <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Residence Country</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ customer.residenceCountry || '-' }}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 pt-5">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Created Date</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ customer.createdDate }}</span>
                  </div>
                </template>
                <div v-else class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {{ errorMessage || 'Customer not found' }}
                </div>
            </div>
          </div>
        </div>

        <!-- Customer History Tab -->
        <div v-if="activeTab === 'history'" class="p-6">
          <div class="space-y-6">
            <div class="flex-1 min-w-0">
              <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                Customer History
              </h1>
              <label class="text-[#475467] dark:text-white text-[14px] sm:text-base leading-[12px] sm:leading-6"
                style="font-weight: 400; letter-spacing: 0%">
                Here you can see the customer history.
              </label>
            </div>
            <div class="flex flex-col">
              <div v-if="isLoading" class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                Loading customer history...
              </div>
              <template v-else-if="customer">
                <div class="space-y-4">
                  <div class="bg-gray-50 dark:bg-[#18181B] rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <p class="text-sm font-medium text-gray-900 dark:text-white mb-4">
                      Do you have a valid visa or residence permit from the Schengen Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand, Ireland, or Switzerland?
                    </p>
                    <div class="mt-4">
                      <span class="text-sm font-medium text-[#020617] dark:text-gray-400 mr-2">Response:</span>
                      <span class="text-sm text-gray-900 dark:text-white">
                        {{ formatVisaResponse(getVisaResponseValue(customer)) }}
                      </span>
                    </div>
                  </div>
                </div>
              </template>
              <div v-else class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                {{ errorMessage || 'Customer not found' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Applications Tab -->
        <div v-if="activeTab === 'applications'" class="p-6">
          <div class="space-y-6">
            <div class="flex-1 min-w-0">
              <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                Applications
              </h1>
              <label class="text-[#475467] dark:text-white text-[14px] sm:text-base leading-[12px] sm:leading-6"
                style="font-weight: 400; letter-spacing: 0%">
                Here you can see all applications for this customer.
              </label>
            </div>

            <!-- Search Bar -->
            <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
              <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
                <div class="relative flex-1 w-full sm:w-[30%]">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search Applications"
                    class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                    style="border-radius: 7px"
                  />
                </div>
              </div>
            </div>

            <!-- Applications Table -->
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
                        <div class="flex items-center space-x-1">
                          <span>Application #</span>
                        </div>
                      </th>
                      <th
                        class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Destination</span>
                        </div>
                      </th>
                      <th
                        class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Visa Product</span>
                        </div>
                      </th>
                      <th
                        class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Price</span>
                        </div>
                      </th>
                      <th
                        class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Status</span>
                        </div>
                      </th>
                      <th class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    <!-- Loading State -->
                    <tr v-if="isLoadingApplications">
                      <td colspan="7" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        Loading applications...
                      </td>
                    </tr>
                    
                    <!-- Empty State -->
                    <tr v-else-if="!isLoadingApplications && filteredCustomerApplications.length === 0">
                      <td colspan="7" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        No applications found for this customer.
                      </td>
                    </tr>
                    
                    <!-- Data Rows -->
                    <tr
                      v-for="application in filteredCustomerApplications"
                      :key="application.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td class="px-2 sm:px-3 lg:px-4 py-2">
                        <input
                          type="checkbox"
                          v-model="application.selected"
                          class="border-gray-300"
                          style="border-radius: 7px"
                        />
                      </td>
                      <td
                        class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-white font-semibold"
                        style="
                          font-size: 14px;
                          font-weight: 600;
                          font-style: normal;
                          line-height: 20px;
                          font-family: 'Geist', sans-serif;
                          letter-spacing: 0;
                        "
                      >
                        {{ application.applicationNumber || `APP-${String(application.id).padStart(5, '0')}` }}
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
                        {{ application.destination || '-' }}
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
                        {{ application.visaProduct || '-' }}
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
                        {{ application.price || '-' }}
                      </td>
                      <td class="px-2 sm:px-3 lg:px-4 py-2">
                        <span
                          :class="getStatusPillClasses(application.status)"
                          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {{ application.status }}
                        </span>
                      </td>
                      <td class="px-2 sm:px-3 lg:px-4 py-2">
                        <div class="flex items-center space-x-2">
                          <button
                            class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            title="View"
                          >
                            <Eye
                              class="h-4 w-4 text-gray-600 dark:text-gray-400"
                            />
                          </button>
                          <button
                            class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            title="Edit"
                          >
                            <Pencil
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
                {{ selectedApplicationsCount }} of {{ customerApplications.length }} row(s) selected.
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
        </div>

        <!-- Billing Info Tab -->
        <div v-if="activeTab === 'billing'" class="p-6">
          <div class="space-y-6">
            <div class="flex-1 min-w-0">
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
              Billing Info
            </h1>
            <label class="text-[#475467] dark:text-white text-[14px] sm:text-base leading-[12px] sm:leading-6"
              style="font-weight: 400; letter-spacing: 0%">
              Here you can see the billing information.
            </label>
          </div>
              <div class="flex flex-col">
                <div v-if="isLoadingBilling" class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Loading billing information...
                </div>
                <template v-else-if="billingInfo">
                  <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Total Orders</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ billingInfo.totalOrders }}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Total Spent</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ billingInfo.totalSpent ? `USD ${billingInfo.totalSpent}` : 'USD 0.00' }}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 py-5">
                    <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Last Payment</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ billingInfo.lastPayment || '-' }}</span>
                  </div>
                </template>
                <div v-else class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Billing information not available
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
import { ArrowLeft, Eye, Pencil } from "lucide-vue-next";
import { useCustomersApi } from "~/composables/useCustomersApi";

const route = useRoute();
const router = useRouter();
const customerId = computed(() => route.params.id);

const { getCustomerById, getCustomerBilling, getCustomerApplications } = useCustomersApi();

const activeTab = ref('details');
const customer = ref(null);
const billingInfo = ref(null);
const customerApplications = ref([]);
const customerHistory = ref([]);
const isLoading = ref(false);
const isLoadingBilling = ref(false);
const isLoadingApplications = ref(false);
const isLoadingHistory = ref(false);
const errorMessage = ref("");

const loadCustomerDetails = async () => {
  if (!customerId.value) return;
  
  try {
    isLoading.value = true;
    errorMessage.value = "";
    
    const response = await getCustomerById(customerId.value);
    
    if (response.success && response.data) {
      customer.value = response.data;
    } else {
      errorMessage.value = response.message || "Failed to load customer details";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load customer details. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const loadBillingInfo = async () => {
  if (!customerId.value) return;
  
  try {
    isLoadingBilling.value = true;
    const response = await getCustomerBilling(customerId.value);
    
    if (response.success && response.data) {
      billingInfo.value = response.data;
    }
  } catch (error) {
    // Handle error silently
  } finally {
    isLoadingBilling.value = false;
  }
};

const loadApplications = async () => {
  if (!customerId.value) return;
  
  try {
    isLoadingApplications.value = true;
    const response = await getCustomerApplications(customerId.value);
    
    if (response.success && response.data) {
      customerApplications.value = response.data.map((app) => ({
        ...app,
        selected: false,
      }));
    }
  } catch (error) {
    // Handle error silently
  } finally {
    isLoadingApplications.value = false;
  }
};

const loadCustomerHistory = async () => {
  if (!customerId.value) return;
  
  try {
    isLoadingHistory.value = true;
    // TODO: Implement getCustomerHistory API call when available
    // const response = await getCustomerHistory(customerId.value);
    // if (response.success && response.data) {
    //   customerHistory.value = response.data;
    // }
    customerHistory.value = [];
  } catch (error) {
    // Handle error silently
  } finally {
    isLoadingHistory.value = false;
  }
};

watch(activeTab, (newTab) => {
  if (newTab === 'billing' && !billingInfo.value) {
    loadBillingInfo();
  }
  if (newTab === 'applications' && customerApplications.value.length === 0) {
    loadApplications();
  }
  if (newTab === 'history' && customerHistory.value.length === 0) {
    loadCustomerHistory();
  }
});

useHead({
  title: computed(() => customer.value ? `${customer.value.customerName || 'Customer'} - Customer Details - iVisa` : 'Customer Details - iVisa'),
});

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);

// Computed properties for applications
const filteredCustomerApplications = computed(() => {
  if (!searchQuery.value) return customerApplications.value;

  const search = searchQuery.value.toLowerCase();
  return customerApplications.value.filter(
    (application) =>
      (application.applicationNumber || '').toLowerCase().includes(search) ||
      (application.destination || '').toLowerCase().includes(search) ||
      (application.visaProduct || '').toLowerCase().includes(search)
  );
});

const selectedApplicationsCount = computed(() => {
  return customerApplications.value.filter((application) => application.selected)
    .length;
});

const getStatusPillClasses = (status) => {
  switch (status) {
    case "Approved":
      return "bg-black text-white border border-black";
    case "In Review":
      return "bg-white text-black border border-black";
    case "Pending":
      return "bg-orange-500 text-white border border-orange-500";
    case "Active":
      return "bg-green-500 text-white border border-green-500";
    case "Inactive":
      return "bg-gray-500 text-white border border-gray-500";
    default:
      return "bg-gray-500 text-white border border-gray-500";
  }
};

watch(selectAll, (newValue) => {
  customerApplications.value.forEach((application) => {
    application.selected = newValue;
  });
});

onMounted(() => {
  loadCustomerDetails();
});

onActivated(() => {
  loadCustomerDetails();
});

const goBack = () => {
  router.push("/dashboard/customers");
};

// Helper function to get first/middle name
const getFirstName = (fullName) => {
  if (!fullName) return '-';
  const nameParts = fullName.trim().split(/\s+/);
  if (nameParts.length <= 1) return fullName;
  // Return all parts except the last one (which is the last name)
  return nameParts.slice(0, -1).join(' ');
};

// Helper function to get last name
const getLastName = (fullName) => {
  if (!fullName) return '-';
  const nameParts = fullName.trim().split(/\s+/);
  if (nameParts.length <= 1) return '-';
  // Return the last part
  return nameParts[nameParts.length - 1];
};

// Helper function to format date
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

// Helper function to get visa response value from customer object
const getVisaResponseValue = (customer) => {
  if (!customer) return null;
  
  // The field name from the database is 'hasSchengenVisa'
  return customer.hasSchengenVisa;
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
</script>