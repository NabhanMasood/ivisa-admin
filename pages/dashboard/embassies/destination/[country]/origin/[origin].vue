<template>
    <div class="space-y-8 sm:space-y-4" :key="`${destinationCountry}-${originCountry}`">
      <!-- Page Title and Add Button -->
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
            Embassies - {{ destinationCountry || 'Loading...' }} in {{ originCountry || 'Loading...' }}
            </h1>
            <label class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
                  style="font-weight: 400; letter-spacing: 0%">
                  Here you can find all the Embassies.
                </label>
          </div>
        </div>
        <button
          @click="navigateToAddEmbassy"
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
            >Add Embassy</span
          >
        </button>
      </div>

      <!-- Search and Filters Row -->
      <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <!-- Search and Filter Buttons -->
        <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
          <!-- Search Bar -->
          <div class="relative flex-1 w-full sm:w-[30%]">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search ..."
              class="w-[50%] h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
              style="border-radius: 7px"
            />
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-green-200 dark:border-green-800 overflow-hidden p-4"
        style="border-radius: 7px"
      >
        <p class="text-sm text-green-600 dark:text-green-400">{{ successMessage }}</p>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-red-200 dark:border-red-800 overflow-hidden p-6"
        style="border-radius: 7px"
      >
        <div class="flex flex-col items-center gap-3">
          <p class="text-sm text-red-600 dark:text-red-400 text-center">{{ errorMessage }}</p>
          <button
            @click="loadEmbassies"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>

      <!-- Embassies Table -->
      <div
        v-if="!isLoading && !errorMessage"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
        style="border-radius: 7px"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-[#FFFFFF] dark:bg-[#09090B] border-b dark:border-gray-800">
                    <tr class="!h-[37px]">
                      <th class="w-10 sm:w-12 px-4 py-3 text-left align-middle">
                        <input type="checkbox" v-model="selectAll" class="border-gray-300" style="border-radius: 7px" />
                      </th>
                      <th class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white">
                        Embassy Name
                      </th>
                      <th class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white">
                        <div class="flex items-center space-x-1">
                          <span>Location</span>
                        </div>
                      </th>
                      <th class="w-20 px-4 py-3"></th>
                    </tr>
                  </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <!-- Loading State -->
              <tr v-if="isLoading">
                <td colspan="4" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Loading embassies...
                </td>
              </tr>
              
              <!-- Empty State -->
              <tr v-if="!isLoading && !errorMessage && filteredEmbassies.length === 0">
                <td colspan="4" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No embassies found for this origin country.
                </td>
              </tr>
              
              <!-- Data Rows -->
              <tr
                v-for="embassy in filteredEmbassies"
                :key="embassy.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td class="px-4 py-3">
                  <input
                    type="checkbox"
                    v-model="embassy.selected"
                    class="border-gray-300"
                    style="border-radius: 7px"
                  />
                </td>
                <td
                  class="px-4 py-3 text-sm text-[#475467] dark:text-white font-medium"
                >
                  {{ embassy.embassyName }}
                </td>
                <td class="px-4 py-3 text-sm text-[#475467] dark:text-white">
                  {{ embassy.location }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="editEmbassy(embassy)"
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
                    <button
                      @click="deleteEmbassyHandler(embassy)"
                      :disabled="isDeleting"
                      class="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete"
                    >
                      <Trash2 class="h-4 w-4" />
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
          {{ selectedCount }} of {{ filteredEmbassies.length }} row(s) selected.
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
</template>

<script setup>
import { ArrowLeft, Plus, Trash2 } from "lucide-vue-next";
import { useEmbassiesApi } from "~/composables/useEmbassiesApi";

const route = useRoute();
const router = useRouter();

const destinationCountry = computed(() => {
  const country = route.params.country;
  return country ? decodeURIComponent(String(country)) : '';
});

const originCountry = computed(() => {
  const origin = route.params.origin;
  return origin ? decodeURIComponent(String(origin)) : '';
});

const { getEmbassiesByDestinationAndOrigin, deleteEmbassy: deleteEmbassyApi } = useEmbassiesApi();
const embassies = ref([]);

useHead({
  title: `${destinationCountry.value} Embassies - iVisa`,
});

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const isDeleting = ref(false);

const loadEmbassies = async () => {
  if (!destinationCountry.value || !originCountry.value) {
    return;
  }
  
  try {
    isLoading.value = true;
    errorMessage.value = "";
    
    const response = await getEmbassiesByDestinationAndOrigin(
      destinationCountry.value,
      originCountry.value
    );
    
    if (response.success && response.data) {
      embassies.value = response.data.map((embassy) => ({
        ...embassy,
        selected: false,
      }));
    } else {
      embassies.value = [];
      errorMessage.value = response.message || "Failed to load embassies";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load embassies. Please try again.";
    embassies.value = [];
  } finally {
    isLoading.value = false;
  }
};

const filteredEmbassies = computed(() => {
  if (!searchQuery.value) return embassies.value;

  const search = searchQuery.value.toLowerCase();
  return embassies.value.filter((embassy) =>
    embassy.embassyName?.toLowerCase().includes(search) ||
    embassy.location?.toLowerCase().includes(search)
  );
});


const selectedCount = computed(() => {
  return embassies.value.filter((embassy) => embassy?.selected).length;
});

const goBack = () => {
  router.push("/dashboard/embassies");
};

const navigateToAddEmbassy = () => {
  router.push(`/dashboard/embassies/add?country=${encodeURIComponent(destinationCountry.value)}`);
};

const editEmbassy = (embassy) => {
  router.push(
    `/dashboard/embassies/add?id=${embassy.id}&mode=edit&destinationCountry=${encodeURIComponent(embassy.destinationCountry)}&originCountry=${encodeURIComponent(embassy.originCountry)}&embassyName=${encodeURIComponent(embassy.embassyName)}&address=${encodeURIComponent(embassy.location)}`
  );
};

// Delete individual embassy
const deleteEmbassyHandler = async (embassy) => {
  if (!embassy.id) {
    errorMessage.value = "Cannot delete embassy: ID is missing";
    return;
  }

  if (!confirm(`Are you sure you want to delete "${embassy.embassyName}"? This action cannot be undone.`)) {
    return;
  }

  try {
    isDeleting.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    const response = await deleteEmbassyApi(embassy.id);

    if (response.success) {
      successMessage.value = response.message || "Embassy deleted successfully";
      // Remove the embassy from the list
      embassies.value = embassies.value.filter(e => e.id !== embassy.id);
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
    } else {
      errorMessage.value = response.message || "Failed to delete embassy";
    }
  } catch (error) {
    console.error("Failed to delete embassy:", error);
    const errorMsg = error instanceof Error ? error.message : "Failed to delete embassy. Please try again.";
    errorMessage.value = errorMsg;
  } finally {
    isDeleting.value = false;
  }
};

watch(selectAll, (newValue) => {
  embassies.value.forEach((embassy) => {
    embassy.selected = newValue;
  });
});

onMounted(() => {
  loadEmbassies();
});

onActivated(() => {
  loadEmbassies();
});

watch(() => route.params, () => {
  if (destinationCountry.value && originCountry.value) {
    loadEmbassies();
  }
}, { deep: true });

watch(() => [destinationCountry.value, originCountry.value], ([newDest, newOrigin], [oldDest, oldOrigin]) => {
  if (newDest && newOrigin && (newDest !== oldDest || newOrigin !== oldOrigin)) {
    loadEmbassies();
  }
});
</script>
