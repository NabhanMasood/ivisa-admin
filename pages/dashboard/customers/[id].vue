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
              {{ customer.name }} - Customer Details
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
                <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                  <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Customer Name</span>
                  <span class="text-sm text-gray-900 dark:text-white">{{ customer.name }}</span>
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
                  <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Residence Country</span>
                  <span class="text-sm text-gray-900 dark:text-white">{{ customer.nationality }}</span>
                </div>
                <div class="grid grid-cols-2 gap-4 pt-5 ">
                  <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Created Date</span>
                  <span class="text-sm text-gray-900 dark:text-white">{{ customer.registrationDate }}</span>
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
                        {{ application.applicationId }}
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
                        {{ application.destination }}
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
                        {{ application.visaProduct }}
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
                        {{ application.price }}
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
                <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                  <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Total Orders</span>
                  <span class="text-sm text-gray-900 dark:text-white">{{ customer.totalApplications }}</span>
                </div>
                <div class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700">
                  <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Total Spent</span>
                  <span class="text-sm text-gray-900 dark:text-white">{{ customer.totalSpent }}</span>
                </div>
                <div class="grid grid-cols-2 gap-4 py-5 ">
                  <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400">Last Payment</span>
                  <span class="text-sm text-gray-900 dark:text-white">{{ customer.lastActivity }}</span>
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

// Get route parameters
const route = useRoute();
const router = useRouter();
const customerId = computed(() => route.params.id);

// Active tab state
const activeTab = ref('details');

// Sample customers data (same as in index page)
const allCustomers = ref([
  {
    id: 1,
    name: "Ali Raza",
    email: "ali.raza@email.com",
    phone: "+92 300 1234567",
    totalApplications: 5,
    status: "Active",
    nationality: "Pakistan",
    country: "Pakistan",
    registrationDate: "2024-01-15",
    lastActivity: "2024-12-20",
    totalSpent: "USD 1,200",
    billingAddress: "123 Main Street, Karachi, Pakistan",
    paymentMethod: "Credit Card",
    cardNumber: "**** **** **** 1234",
    expiryDate: "12/25",
    billingStatus: "Active"
  },
  {
    id: 2,
    name: "Sarah Khan",
    email: "sarah.khan@email.com",
    phone: "+92 301 2345678",
    totalApplications: 3,
    status: "Active",
    nationality: "Pakistan",
    country: "Pakistan",
    registrationDate: "2024-02-10",
    lastActivity: "2024-12-18",
    totalSpent: "USD 800",
    billingAddress: "456 Park Avenue, Lahore, Pakistan",
    paymentMethod: "Debit Card",
    cardNumber: "**** **** **** 5678",
    expiryDate: "08/26",
    billingStatus: "Active"
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 555 1234567",
    totalApplications: 8,
    status: "Inactive",
    nationality: "USA",
    country: "USA",
    registrationDate: "2024-01-05",
    lastActivity: "2024-11-15",
    totalSpent: "USD 2,400",
    billingAddress: "789 Oak Street, New York, USA",
    paymentMethod: "Credit Card",
    cardNumber: "**** **** **** 9012",
    expiryDate: "03/27",
    billingStatus: "Inactive"
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+34 600 123456",
    totalApplications: 2,
    status: "Active",
    nationality: "Spain",
    country: "Spain",
    registrationDate: "2024-03-20",
    lastActivity: "2024-12-19",
    totalSpent: "USD 600",
    billingAddress: "321 Pine Street, Madrid, Spain",
    paymentMethod: "PayPal",
    cardNumber: "N/A",
    expiryDate: "N/A",
    billingStatus: "Active"
  },
  {
    id: 5,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    phone: "+92 302 3456789",
    totalApplications: 7,
    status: "Active",
    nationality: "Pakistan",
    country: "Pakistan",
    registrationDate: "2024-02-28",
    lastActivity: "2024-12-21",
    totalSpent: "USD 1,800",
    billingAddress: "654 Elm Street, Islamabad, Pakistan",
    paymentMethod: "Credit Card",
    cardNumber: "**** **** **** 3456",
    expiryDate: "11/25",
    billingStatus: "Active"
  }
]);

// Get current customer data based on ID
const customer = computed(() => {
  const id = parseInt(customerId.value);
  return allCustomers.value.find(c => c.id === id) || allCustomers.value[0];
});

// Set page title
useHead({
  title: computed(() => `${customer.value.name} - Customer Details - iVisa`),
});

// Applications data and functionality
const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);

// Customer applications data
const customerApplications = ref([
  {
    id: 1,
    applicationId: "APP-01245",
    destination: "UAE",
    visaProduct: "30-Day Visa",
    price: "USD 100",
    status: "Approved",
    selected: false,
  },
  {
    id: 2,
    applicationId: "APP-01246",
    destination: "Thailand",
    visaProduct: "Tourist Visa",
    price: "USD 150",
    status: "In Review",
    selected: false,
  },
  {
    id: 3,
    applicationId: "APP-01247",
    destination: "Germany",
    visaProduct: "Schengen Visa",
    price: "USD 200",
    status: "Pending",
    selected: false,
  },
  {
    id: 4,
    applicationId: "APP-01248",
    destination: "France",
    visaProduct: "Tourist Visa",
    price: "USD 180",
    status: "Approved",
    selected: false,
  },
  {
    id: 5,
    applicationId: "APP-01249",
    destination: "Japan",
    visaProduct: "Business Visa",
    price: "USD 300",
    status: "In Review",
    selected: false,
  },
]);


// Computed properties for applications
const filteredCustomerApplications = computed(() => {
  if (!searchQuery.value) return customerApplications.value;

  return customerApplications.value.filter(
    (application) =>
      application.applicationId
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      application.destination
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      application.visaProduct
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
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

// Watch for select all changes
watch(selectAll, (newValue) => {
  customerApplications.value.forEach((application) => {
    application.selected = newValue;
  });
});

// Navigation
const goBack = () => {
  router.push("/dashboard/customers");
};
</script>