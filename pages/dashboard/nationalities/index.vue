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
                  Nationalities
                </h1>
                <label
                  class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
                  style="font-weight: 400; letter-spacing: 0%"
                >
                  Here you can find all the Nationalities.
                </label>
              </div>
              <button
                @click="navigateToAddNationality"
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
                  >Add Nationality</span
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
                    placeholder="Search Nationalities"
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

            <!-- Nationalities Table -->
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
                        Nationality (Passport)
                      </th>
                      <th
                        class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Destinations</span>
                        </div>
                      </th>
                      <th
                        class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Available Visa Permits</span>
                        </div>
                      </th>
                      <th class="w-20 px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr
                      v-for="nationality in filteredNationalities"
                      :key="nationality.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td class="px-4 py-3">
                        <input
                          type="checkbox"
                          v-model="nationality.selected"
                          class="border-gray-300"
                          style="border-radius: 7px"
                        />
                      </td>
                      <td
                        class="px-4 py-3 text-sm text-[#475467] dark:text-white font-medium"
                      >
                        {{ nationality.name }}
                      </td>
                      <td
                        class="px-4 py-3 text-sm text-[#475467] dark:text-white"
                      >
                        {{ nationality.destinations }}
                      </td>
                      <td
                        class="px-4 py-3 text-sm text-[#475467] dark:text-white"
                      >
                        {{ nationality.visaPermits }}
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center space-x-2">
                          <button
                            @click="viewNationality(nationality)"
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
                          <button
                            @click="editNationality(nationality)"
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
                {{ selectedCount }} of {{ nationalities.length }} row(s)
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
  Search,
} from "lucide-vue-next";

// Set page title
useHead({
  title: "Nationalities - iVisa",
});

// Sample nationalities data
const nationalities = ref([
  {
    id: 1,
    name: "Pakistani",
    destinations: "USA, UK, Canada",
    visaPermits: "Tourist, Business, Student",
    selected: false,
  },
  {
    id: 2,
    name: "Indian",
    destinations: "USA, UK, Australia",
    visaPermits: "Tourist, Work, Student",
    selected: false,
  },
  {
    id: 3,
    name: "Bangladeshi",
    destinations: "UK, Canada, Germany",
    visaPermits: "Tourist, Business, Work",
    selected: false,
  },
  {
    id: 4,
    name: "Sri Lankan",
    destinations: "USA, UK, Australia",
    visaPermits: "Tourist, Student, Work",
    selected: false,
  },
  {
    id: 5,
    name: "Nepalese",
    destinations: "USA, UK, Canada",
    visaPermits: "Tourist, Business, Student",
    selected: false,
  },
  {
    id: 6,
    name: "Afghan",
    destinations: "USA, UK, Germany",
    visaPermits: "Tourist, Work, Student",
    selected: false,
  },
  {
    id: 7,
    name: "Iranian",
    destinations: "UK, Canada, Australia",
    visaPermits: "Tourist, Business, Student",
    selected: false,
  },
  {
    id: 8,
    name: "Iraqi",
    destinations: "USA, UK, Canada",
    visaPermits: "Tourist, Work, Student",
    selected: false,
  },
  {
    id: 9,
    name: "Syrian",
    destinations: "UK, Canada, Germany",
    visaPermits: "Tourist, Work, Student",
    selected: false,
  },
  {
    id: 10,
    name: "Yemeni",
    destinations: "USA, UK, Australia",
    visaPermits: "Tourist, Business, Student",
    selected: false,
  },
]);

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const statusDropdownOpen = ref(false);
const planDropdownOpen = ref(false);
const roleDropdownOpen = ref(false);
const columnsDropdownOpen = ref(false);

// Computed properties
const filteredNationalities = computed(() => {
  if (!searchQuery.value) return nationalities.value;

  return nationalities.value.filter((nationality) =>
    nationality.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectedCount = computed(() => {
  return nationalities.value.filter((nationality) => nationality.selected).length;
});

// Methods
const router = useRouter();

const navigateToAddNationality = () => {
  router.push("/dashboard/nationalities/add");
};

const viewNationality = (nationality) => {
  router.push(`/dashboard/nationalities/add?id=${nationality.id}&mode=view`);
};

const editNationality = (nationality) => {
  router.push(`/dashboard/nationalities/add?id=${nationality.id}&mode=edit`);
};

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
  nationalities.value.forEach((nationality) => {
    nationality.selected = newValue;
  });
});

</script>
