<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
      <!-- Page Title and Add Button -->
      <div class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4">
        <div class="flex-1 min-w-0">
          <h1 class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Coupons
          </h1>
          <label class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
            style="font-weight: 400; letter-spacing: 0%">
            Here you can manage all coupons
          </label>
        </div>
        <button
          @click="navigateToAdd"
          class="bg-black h-[36px] dark:bg-white text-white dark:text-black px-3 sm:px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 rounded-[7px] flex-shrink-0"
        >
          <div class="flex items-center justify-center w-4 h-4 border border-white dark:border-black rounded-full bg-black dark:bg-white">
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
          >Add Coupon</span>
        </button>
      </div>

      <!-- Search -->
      <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
          <div class="relative flex-1 w-full sm:w-[30%]">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Coupons"
              class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
              style="border-radius: 7px"
            />
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden flex items-center justify-center py-12"
        style="border-radius: 7px"
      >
        <div class="flex flex-col items-center gap-3">
          <div class="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin"></div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Loading coupons...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!isLoading && filteredCoupons.length === 0"
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden p-12"
        style="border-radius: 7px"
      >
        <div class="flex flex-col items-center gap-3">
          <p class="text-sm text-gray-600 dark:text-gray-400">No coupons found</p>
          <button
            @click="navigateToAdd"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Add Your First Coupon
          </button>
        </div>
      </div>

      <!-- Coupons Table -->
      <div
        v-else
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
        style="border-radius: 7px"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-[#FFFFFF] dark:bg-[#09090B] border-b dark:border-gray-800">
              <tr class="!h-[37px]">
                <th class="w-10 sm:w-12 px-4 py-3 text-left align-middle">
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    class="border-gray-300"
                    style="border-radius: 7px"
                  />
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white">
                  ID
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white">
                  Code
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white">
                  Type
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white">
                  Value
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white">
                  Validity
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white">
                  Usage
                </th>
                <th class="w-20 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr
                v-for="coupon in filteredCoupons"
                :key="coupon.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td class="px-4 py-3">
                  <input
                    type="checkbox"
                    v-model="coupon.selected"
                    class="border-gray-300"
                    style="border-radius: 7px"
                  />
                </td>
                <td class="px-4 py-3 text-sm text-[#475467] dark:text-white font-medium">
                  {{ coupon.id }}
                </td>
                <td class="px-4 py-3 text-sm text-[#475467] dark:text-white">
                  {{ coupon.code }}
                </td>
                <td class="px-4 py-3 text-sm text-[#475467] dark:text-white">
                  {{ coupon.type === 'percent' ? '%' : 'amount' }}
                </td>
                <td class="px-4 py-3 text-sm text-[#475467] dark:text-white">
                  {{ formatValue(coupon) }}
                </td>
                <td class="px-4 py-3 text-sm text-[#475467] dark:text-white">
                  {{ formatDate(coupon.validity) }}
                </td>
                <td class="px-4 py-3 text-sm text-[#475467] dark:text-white">
                  {{ formatUsage(coupon) }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="editCoupon(coupon)"
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
                      @click="deleteCoupon(coupon)"
                      class="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Delete"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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

      <!-- Pagination and selection count -->
      <div class="flex flex-row items-center justify-between flex-wrap gap-2 sm:gap-4 w-full">
        <div class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
          {{ selectedCount }} of {{ coupons.length }} row(s) selected.
        </div>
        <div class="flex items-center space-x-2">
          <button
            class="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs sm:text-sm"
            :disabled="currentPage === 1"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
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

<script setup lang="ts">
import DashboardLayout from "~/components/DashboardLayout.vue";
import { Plus } from "lucide-vue-next";
import { useCouponsApi } from "~/composables/useCouponsApi";

useHead({
  title: "Coupons - iVisa",
});

const router = useRouter();
const navigateToAdd = () => {
  router.push("/dashboard/coupons/add");
};

// API
const { getAllCoupons, deleteCoupon: deleteCouponApi } = useCouponsApi();

// Local state
const coupons = ref<Array<any>>([]);
const isLoading = ref(false);
const errorMessage = ref("");
const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);

const loadCoupons = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    const response = await getAllCoupons();
    if (response.success && response.data) {
      coupons.value = response.data.map((c: any) => ({
        ...c,
        selected: false,
      }));
    } else {
      coupons.value = [];
      errorMessage.value = response.message || "Failed to load coupons";
    }
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "Failed to load coupons.";
    coupons.value = [];
  } finally {
    isLoading.value = false;
  }
};

const filteredCoupons = computed(() => {
  if (!searchQuery.value) return coupons.value;
  const s = searchQuery.value.toLowerCase();
  return coupons.value.filter(
    (c) =>
      String(c.id).toLowerCase().includes(s) ||
      (c.code || "").toLowerCase().includes(s)
  );
});

const selectedCount = computed(() => {
  return coupons.value.filter((c) => c.selected).length;
});

watch(selectAll, (val) => {
  coupons.value.forEach((c) => {
    c.selected = val;
  });
});

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString();
};

const formatValue = (coupon) => {
  if (coupon.value == null || coupon.value === undefined) return "-";
  if (coupon.type === 'percent') {
    return `${coupon.value}%`;
  } else {
    return `$${coupon.value}`;
  }
};

const formatUsage = (coupon) => {
  const usageCount = coupon.usageCount ?? 0;
  const usageLimit = coupon.usageLimit;
  
  if (usageLimit == null || usageLimit === undefined) {
    return `${usageCount} / ∞`;
  }
  return `${usageCount} / ${usageLimit}`;
};

const editCoupon = (coupon) => {
  router.push(`/dashboard/coupons/add?id=${coupon.id}&mode=edit`);
};

const deleteCoupon = async (coupon) => {
  if (!confirm(`Are you sure you want to delete coupon "${coupon.code}"?`)) {
    return;
  }
  
  try {
    const response = await deleteCouponApi(coupon.id);
    if (response.success) {
      // Reload the coupons list
      await loadCoupons();
    } else {
      alert(response.message || 'Failed to delete coupon');
    }
  } catch (error) {
    console.error('[CouponsIndex] deleteCoupon: error', error);
    alert(error instanceof Error ? error.message : 'Failed to delete coupon');
  }
};

onMounted(() => {
  loadCoupons();
});

onActivated(() => {
  loadCoupons();
});
</script>