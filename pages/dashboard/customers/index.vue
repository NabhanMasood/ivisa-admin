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
                  Customers
                </h1>
                <label
                  class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
                  style="font-weight: 400; letter-spacing: 0%"
                >
                  Here you can find all the customers
                </label>
              </div>
              <button
                @click="navigateToAddCustomer"
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
                  >Add Customer</span
                >
              </button>
            </div>
            <!-- Search and Filters Row -->
            <div
              class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4"
            >
              <!-- Search and Filter Buttons -->
              <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
                <!-- Search Bar -->
                <div class="relative flex-1 w-full sm:w-[30%]">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search Customers"
                    class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                    style="border-radius: 7px"
                  />
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
                        <span
                          class="mr-3 text-black dark:text-white text-sm font-bold"
                          >✓</span
                        >
                        <span class="text-sm text-gray-900 dark:text-white"
                          >Name</span
                        >
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px"
                      >
                        <span
                          class="mr-3 text-black dark:text-white text-sm font-bold"
                          >✓</span
                        >
                        <span class="text-sm text-gray-900 dark:text-white"
                          >Role</span
                        >
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px"
                      >
                        <span
                          class="mr-3 text-black dark:text-white text-sm font-bold"
                          >✓</span
                        >
                        <span class="text-sm text-gray-900 dark:text-white"
                          >Plan_name</span
                        >
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px"
                      >
                        <span
                          class="mr-3 text-black dark:text-white text-sm font-bold"
                          >✓</span
                        >
                        <span class="text-sm text-gray-900 dark:text-white"
                          >Email</span
                        >
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px"
                      >
                        <span
                          class="mr-3 text-black dark:text-white text-sm font-bold"
                          >✓</span
                        >
                        <span class="text-sm text-gray-900 dark:text-white"
                          >Country</span
                        >
                      </label>
                      <label
                        class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                        style="border-radius: 5px; margin: 3px"
                      >
                        <span
                          class="mr-3 text-black dark:text-white text-sm font-bold"
                          >✓</span
                        >
                        <span class="text-sm text-gray-900 dark:text-white"
                          >Status</span
                        >
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Customers Table -->
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
                          <span>Email</span>
                        </div>
                      </th>
                      <th
                        class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Phone</span>
                        </div>
                      </th>
                      <th
                        class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Total Applications</span>
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
                    <tr v-if="isLoading">
                      <td colspan="7" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        Loading customers...
                      </td>
                    </tr>
                    
                    <!-- Empty State -->
                    <tr v-else-if="!isLoading && filteredCustomers.length === 0">
                      <td colspan="7" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        {{ errorMessage || 'No customers found.' }}
                      </td>
                    </tr>
                    
                    <!-- Data Rows -->
                    <tr
                      v-for="customer in filteredCustomers"
                      :key="customer.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td class="px-2 sm:px-3 lg:px-4 py-2">
                        <input
                          type="checkbox"
                          v-model="customer.selected"
                          class="border-gray-300"
                          style="border-radius: 7px"
                        />
                      </td>
                      <td
                        class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-white"
                        style="
                          font-size: 14px;
                          font-weight: 400;
                          font-style: normal;
                          line-height: 20px;
                          font-family: 'Geist', sans-serif;
                          letter-spacing: 0;
                        "
                      >
                        {{ customer.name }}
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
                        {{ customer.email }}
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
                        {{ customer.phone }}
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
                        {{ customer.totalApplications }}
                      </td>
                      <td class="px-2 sm:px-3 lg:px-4 py-2">
                        <span
                          :class="getStatusPillClasses(customer.status)"
                          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {{ getFormattedStatus(customer.status) }}
                        </span>
                      </td>
                      <td class="px-2 sm:px-3 lg:px-4 py-2">
                        <div class="flex items-center space-x-2">
                          <button
                            @click="viewCustomer(customer)"
                            class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            title="View"
                          >
                            <Eye
                              class="h-4 w-4 text-gray-600 dark:text-gray-400"
                            />
                          </button>
                          <button
                            @click="editCustomer(customer)"
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
                {{ selectedCount }} of {{ customers.length }} row(s) selected.
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

<script setup>
import {
  Plus,
  Columns,
  Eye,
  Pencil,
} from "lucide-vue-next";
import { useCustomersApi } from "~/composables/useCustomersApi";

useHead({
  title: "Customers - iVisa",
});

const { getAllCustomers } = useCustomersApi();
const customers = ref([]);

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const columnsDropdownOpen = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const loadCustomers = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    
    const response = await getAllCustomers();
    
    if (response.success && response.data) {
      customers.value = response.data.map((customer) => ({
        ...customer,
        selected: false,
      }));
    } else {
      customers.value = [];
      errorMessage.value = response.message || "Failed to load customers";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load customers. Please try again.";
    customers.value = [];
  } finally {
    isLoading.value = false;
  }
};

const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value;

  return customers.value.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectedCount = computed(() => {
  return customers.value.filter((customer) => customer.selected).length;
});

const getStatusPillClasses = (status) => {
  const statusLower = (status || '').toLowerCase();
  switch (statusLower) {
    case "active":
      return "bg-black text-white border border-black";
    case "inactive":
      return "bg-white text-black border border-black";
    case "suspended":
      return "bg-red-500 text-white border border-red-500";
    case "pending":
      return "bg-orange-500 text-white border border-orange-500";
    default:
      return "bg-gray-500 text-white border border-gray-500";
  }
};

const getFormattedStatus = (status) => {
  if (!status) return '';
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    case "suspended":
      return "Suspended";
    case "pending":
      return "Pending";
    default:
      return status;
  }
};

const router = useRouter();

const navigateToAddCustomer = () => {
  router.push("/dashboard/customers/add");
};

const viewCustomer = (customer) => {
  router.push(`/dashboard/customers/${customer.id}`);
};

const editCustomer = (customer) => {
  router.push(`/dashboard/customers/add?id=${customer.id}&mode=edit`);
};

const toggleColumnsDropdown = () => {
  columnsDropdownOpen.value = !columnsDropdownOpen.value;
};

watch(selectAll, (newValue) => {
  customers.value.forEach((customer) => {
    customer.selected = newValue;
  });
});

onMounted(() => {
  loadCustomers();
});

onActivated(() => {
  loadCustomers();
});

</script>