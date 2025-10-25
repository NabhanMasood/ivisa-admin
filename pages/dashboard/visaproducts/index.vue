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
                  Visa Products
                </h1>
                <label class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
            style="font-weight: 400; letter-spacing: 0%">
            Here you can find all the Visa Products
          </label>
              </div>
              <button
                @click="navigateToAddVisaProduct"
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
                  >Add Visa Product</span
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
                    placeholder="Search Visa Products"
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

            <!-- Visa Products Table -->
            <div
              class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
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
                        Country
                      </th>
                      <th
                        class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                      >
                        Products
                      </th>
                      <th class="w-20 px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr
                      v-for="visaProduct in filteredVisaProducts"
                      :key="visaProduct.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td class="px-4 py-3">
                        <input
                          type="checkbox"
                          v-model="visaProduct.selected"
                          class="border-gray-300"
                          style="border-radius: 7px"
                        />
                      </td>
                      <td
                        class="px-4 py-3 text-sm text-[#475467] dark:text-white font-medium"
                      >
                        {{ visaProduct.country }}
                      </td>
                      <td
                        class="px-4 py-3 text-sm text-[#475467] dark:text-white"
                      >
                        {{ visaProduct.products.map(product => product.productName).join(', ') }}
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center space-x-2">
                          <button
                            @click="viewVisaProduct(visaProduct)"
                            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            title="View"
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
                          <!-- <button
                            @click="editVisaProduct(visaProduct)"
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
                          </button> -->
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
                {{ selectedCount }} of {{ visaProducts.length }} row(s) selected.
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
import DashboardLayout from "~/components/DashboardLayout.vue";
import {
  Plus,
  Columns,
  Search,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  MoreHorizontal,
  Eye,
  Pencil,
} from "lucide-vue-next";

// Set page title
useHead({
  title: "Visa Products - iVisa",
});

// Sample visa products data - showing one visa per country for the main list
const visaProducts = ref([
  {
    id: 1,
    country: "United States",
    products: [
      {
        productName: "Tourist Visa (B-2)",
        duration: "6 months",
        validity: "10 years",
        price: "$160",
      },
      {
        productName: "Business Visa (B-1)",
        duration: "6 months",
        validity: "10 years",
        price: "$180",
      },
      {
        productName: "Student Visa (F-1)",
        duration: "4 years",
        validity: "5 years",
        price: "$200",
      },
    ],
    selected: false,
  },
  {
    id: 2,
    country: "United Kingdom",
    products: [
      {
        productName: "Tourist Visa",
        duration: "6 months",
        validity: "6 months",
        price: "$100",
      },
      {
        productName: "Business Visa",
        duration: "6 months",
        validity: "2 years",
        price: "$150",
      },
      {
        productName: "Student Visa",
        duration: "2 years",
        validity: "5 years",
        price: "$220",
      },
    ],
    selected: false,
  },
  {
    id: 3,
    country: "Canada",
    products: [
      {
        productName: "Tourist Visa",
        duration: "6 months",
        validity: "10 years",
        price: "$100",
      },
      {
        productName: "Work Visa",
        duration: "2 years",
        validity: "3 years",
        price: "$250",
      },
      {
        productName: "Student Visa",
        duration: "4 years",
        validity: "5 years",
        price: "$190",
      },
    ],
    selected: false,
  },
  {
    id: 4,
    country: "Germany",
    products: [
      {
        productName: "Schengen Visa",
        duration: "90 days",
        validity: "6 months",
        price: "$80",
      },
      {
        productName: "Business Visa",
        duration: "90 days",
        validity: "1 year",
        price: "$120",
      },
      {
        productName: "Work Visa",
        duration: "2 years",
        validity: "3 years",
        price: "$260",
      },
    ],
    selected: false,
  },
  {
    id: 5,
    country: "France",
    products: [
      {
        productName: "Tourist Visa",
        duration: "30 days",
        validity: "3 months",
        price: "$90",
      },
      {
        productName: "Schengen Visa",
        duration: "90 days",
        validity: "6 months",
        price: "$100",
      },
      {
        productName: "Student Visa",
        duration: "2 years",
        validity: "3 years",
        price: "$210",
      },
    ],
    selected: false,
  },
  {
    id: 6,
    country: "Japan",
    products: [
      {
        productName: "Business Visa",
        duration: "90 days",
        validity: "1 year",
        price: "$120",
      },
      {
        productName: "Tourist Visa",
        duration: "30 days",
        validity: "3 years",
        price: "$90",
      },
      {
        productName: "Work Visa",
        duration: "1 year",
        validity: "3 years",
        price: "$250",
      },
    ],
    selected: false,
  },
  {
    id: 7,
    country: "Australia",
    products: [
      {
        productName: "Work Visa",
        duration: "2 years",
        validity: "3 years",
        price: "$300",
      },
      {
        productName: "Tourist Visa",
        duration: "3 months",
        validity: "1 year",
        price: "$140",
      },
      {
        productName: "Student Visa",
        duration: "4 years",
        validity: "5 years",
        price: "$280",
      },
    ],
    selected: false,
  },
  {
    id: 8,
    country: "Singapore",
    products: [
      {
        productName: "Tourist Visa",
        duration: "30 days",
        validity: "2 years",
        price: "$50",
      },
      {
        productName: "Business Visa",
        duration: "60 days",
        validity: "1 year",
        price: "$90",
      },
      {
        productName: "Work Visa",
        duration: "1 year",
        validity: "2 years",
        price: "$180",
      },
    ],
    selected: false,
  },
  {
    id: 9,
    country: "Thailand",
    products: [
      {
        productName: "Tourist Visa",
        duration: "30 days",
        validity: "3 months",
        price: "$40",
      },
      {
        productName: "Business Visa",
        duration: "90 days",
        validity: "6 months",
        price: "$80",
      },
      {
        productName: "Work Visa",
        duration: "1 year",
        validity: "1 year",
        price: "$150",
      },
    ],
    selected: false,
  },
  {
    id: 10,
    country: "UAE",
    products: [
      {
        productName: "Business Visa",
        duration: "90 days",
        validity: "6 months",
        price: "$250",
      },
      {
        productName: "Tourist Visa",
        duration: "30 days",
        validity: "3 months",
        price: "$150",
      },
      {
        productName: "Freelancer Visa",
        duration: "2 years",
        validity: "3 years",
        price: "$350",
      },
    ],
    selected: false,
  },
]);


const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);

// Dropdown state
const statusDropdownOpen = ref(false);
const planDropdownOpen = ref(false);
const roleDropdownOpen = ref(false);
const columnsDropdownOpen = ref(false);

// Notifications data
const notifications = ref([
  {
    id: 1,
    title: "Your order is placed",
    message: "Amet minim mollit non deser unt ullamco e...",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 2,
    title: "Congratulations Darlene 🎉",
    message: "Won the monthly best seller badge",
    time: "11 am",
    unread: true,
  },
  {
    id: 3,
    title: "Joaquina Weisenborn",
    message: "Requesting access permission",
    time: "12 pm",
    unread: true,
    hasActions: true,
  },
  {
    id: 4,
    title: "Brooklyn Simmons",
    message: "Added you to Top Secret Project...",
    time: "1 pm",
    unread: true,
  },
]);

// Computed properties
const sidebarClasses = computed(() => {
  if (sidebarCollapsed.value) {
    return "w-64 lg:w-16 -translate-x-full lg:translate-x-0";
  } else {
    return "w-64 lg:w-64 translate-x-0";
  }
});

const filteredVisaProducts = computed(() => {
  if (!searchQuery.value) return visaProducts.value;

  return visaProducts.value.filter((visaProduct) =>
    visaProduct.productName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    visaProduct.country.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectedCount = computed(() => {
  return visaProducts.value.filter((visaProduct) => visaProduct.selected).length;
});

// Methods
const router = useRouter();

const navigateToAddVisaProduct = () => {
  router.push("/dashboard/visaproducts/add");
};

const viewVisaProduct = (visaProduct) => {
  // Navigate to country-specific visa products page
  const countrySlug = visaProduct.country.toLowerCase().replace(/\s+/g, '-');
  router.push(`/dashboard/visaproducts/country/${countrySlug}`);
};

const editVisaProduct = (visaProduct) => {
  router.push(`/dashboard/visaproducts/add?id=${visaProduct.id}&mode=edit`);
};

// Dropdown toggle functions
const toggleStatusDropdown = () => {
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  statusDropdownOpen.value = !statusDropdownOpen.value;
};

const togglePlanDropdown = () => {
  statusDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  planDropdownOpen.value = !planDropdownOpen.value;
};

const toggleRoleDropdown = () => {
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  roleDropdownOpen.value = !roleDropdownOpen.value;
};

const toggleColumnsDropdown = () => {
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = !columnsDropdownOpen.value;
};



// Watch for select all changes
watch(selectAll, (newValue) => {
  visaProducts.value.forEach((visaProduct) => {
    visaProduct.selected = newValue;
  });
});

// Component mounted
</script>
