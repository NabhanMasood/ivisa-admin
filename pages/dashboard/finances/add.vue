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
              Add Finance
            </h1>
            <label class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
              style="font-weight: 400; letter-spacing: 0%">
              Add a new finance record to the system.
            </label>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Order Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Order Information</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order ID *
                </label>
                <input
                  v-model="form.orderId"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter order ID"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Customer Name *
                </label>
                <input
                  v-model="form.customerName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter customer name"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Application ID *
                </label>
                <input
                  v-model="form.application"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter application ID"
                />
              </div>
              
              <div>
                <CustomDropdown
                  id="destination"
                  label="Destination *"
                  v-model="form.destination"
                  :options="destinationOptions"
                  placeholder="Select destination"
                  search-placeholder="Search destination"
                />
              </div>
            </div>
          </div>

          <!-- Payment Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Payment Information</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount *
                </label>
                <input
                  v-model="form.amount"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter amount (e.g., USD 100)"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date Paid
                </label>
                <input
                  v-model="form.datePaid"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <CustomDropdown
                id="status"
                label="Status *"
                v-model="form.status"
                :options="statusOptions"
                placeholder="Select status"
                search-placeholder="Search status"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              @click="goBack"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-md text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors rounded-md text-sm font-medium"
            >
              Add Finance
            </button>
          </div>
        </form>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "~/components/DashboardLayout.vue";
import CustomDropdown from "~/components/ui/CustomDropdown.vue";
import { ArrowLeft } from "lucide-vue-next";

// Set page title
useHead({
  title: "Add Finance - iVisa",
});

// Form data
const form = ref({
  orderId: "",
  customerName: "",
  application: "",
  destination: "",
  amount: "",
  datePaid: "",
  status: ""
});

// Options for dropdowns
const destinationOptions = [
  "Thailand",
  "UAE",
  "Germany",
  "France",
  "Japan",
  "Canada",
  "Australia",
  "UK",
  "Singapore",
  "India"
];

const statusOptions = [
  "Approved",
  "In Review",
  "Pending",
  "Rejected"
];

// Navigation
const router = useRouter();

const goBack = () => {
  router.push("/dashboard/finances");
};

const submitForm = () => {
  // Handle form submission
  console.log("Form submitted:", form.value);
  
  // Here you would typically:
  // 1. Validate the form
  // 2. Send data to your API
  // 3. Show success message
  // 4. Redirect to finances list
  
  // For now, just redirect back
  router.push("/dashboard/finances");
};
</script>
