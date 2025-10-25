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
              {{ order.orderId }}
            </h1>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 justify-end">
        <button
          class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 border bg-white dark:bg-[#18181B] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors"
        >
          Download Docs
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Update Status
        </button>
      </div>

      <!-- Order Details Card -->
      <div
        class="bg-white dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 p-6"
      >
        <div class="space-y-6">
          <div class="flex-1 min-w-0">
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
              Order Details
            </h1>
            <label
              class="text-[#475467] dark:text-white text-[14px] sm:text-base leading-[12px] sm:leading-6"
              style="font-weight: 400; letter-spacing: 0%"
            >
              Here you can see the order details.
            </label>
          </div>

          <div class="flex flex-col">
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Customer Name</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                order.customerName
              }}</span>
            </div>
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Application</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                order.application
              }}</span>
            </div>
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Destination</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                order.destination
              }}</span>
            </div>
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Visa Product</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                order.visaProduct
              }}</span>
            </div>
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Travelers</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                order.travelers
              }}</span>
            </div>
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Total Amount</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                order.amount
              }}</span>
            </div>
            <div
              class="mx-4 flex flex-col gap-2 py-5  dark:border-gray-700"
            >
              <CustomDropdown
                id="finance-status"
                label="Status"
                v-model="financeStatus"
                :options="financeStatusOptions"
                placeholder="Select status"
                search-placeholder="Search status"
              />
            </div>
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Stripe Payment ID</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                order.stripeId
              }}</span>
            </div>
            <div class="grid grid-cols-2 gap-4 py-5">
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Date Paid</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                order.datePaid
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "~/components/DashboardLayout.vue";
import CustomDropdown from "~/components/ui/CustomDropdown.vue";
import { ArrowLeft, Download } from "lucide-vue-next";

// Get route parameters
const route = useRoute();
const router = useRouter();

// Get order ID from route params
const orderId = computed(() => route.params.id);

// Status dropdown
const financeStatus = ref("Paid");

// Status options
const financeStatusOptions = [
  "Paid",
  "Pending",
  "In Review",
  "Rejected"
];

// Sample orders data
const allOrders = ref([
  {
    id: 1,
    orderId: "ORD-1001",
    customerName: "Ali Raza",
    application: "APP-01245",
    destination: "Thailand",
    visaProduct: "30-Day Visa",
    travelers: "2",
    amount: "USD 300",
    status: "Paid",
    stripeId: "P1-ABN78GFYBEIA",
    datePaid: "01/01/2025",
  },
  {
    id: 2,
    orderId: "ORD-1002",
    customerName: "Sarah Khan",
    application: "APP-01246",
    destination: "UAE",
    visaProduct: "60-Day Visa",
    travelers: "1",
    amount: "USD 250",
    status: "Pending",
    stripeId: "P2-ABN78GFYBEIB",
    datePaid: "-",
  },
  {
    id: 3,
    orderId: "ORD-1003",
    customerName: "John Smith",
    application: "APP-01247",
    destination: "Germany",
    visaProduct: "90-Day Visa",
    travelers: "3",
    amount: "USD 400",
    status: "In Review",
    stripeId: "P3-ABN78GFYBEIC",
    datePaid: "-",
  },
  {
    id: 4,
    orderId: "ORD-1004",
    customerName: "Maria Garcia",
    application: "APP-01248",
    destination: "France",
    visaProduct: "30-Day Visa",
    travelers: "1",
    amount: "USD 150",
    status: "Paid",
    stripeId: "P4-ABN78GFYBEID",
    datePaid: "02/01/2025",
  },
  {
    id: 5,
    orderId: "ORD-1005",
    customerName: "Ahmed Hassan",
    application: "APP-01249",
    destination: "Japan",
    visaProduct: "15-Day Visa",
    travelers: "2",
    amount: "USD 300",
    status: "Paid",
    stripeId: "P5-ABN78GFYBEIE",
    datePaid: "03/01/2025",
  },
]);

// Find the specific order
const order = computed(() => {
  const id = parseInt(orderId.value);
  return allOrders.value.find((o) => o.id === id) || allOrders.value[0];
});

// Set page title
useHead({
  title: computed(() => `${order.value.orderId} - Order Details - iVisa`),
});

// Navigation
const goBack = () => {
  router.push("/dashboard/finances");
};
</script>
