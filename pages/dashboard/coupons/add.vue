<template>
  <DashboardLayout>
    <div class="flex flex-col gap-4 max-w-[796px] items-center justify-center mx-auto">
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
              {{ isEditMode ? 'Edit Coupon' : 'Add Coupon' }}
            </h1>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="goBack"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 bg-[#F1F1F1] dark:bg-[#18181B] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors"
          >
            Discard
          </button>
          <button
            @click="saveCoupon"
            :disabled="isLoading"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {{ isLoading ? (isEditMode ? 'Updating...' : 'Saving...') : (isEditMode ? 'Update' : 'Save') }}
          </button>
        </div>
      </div>

      <div class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 py-[30px] px-[34px]">
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Coupon Details
            </h3>
            <div class="flex flex-col gap-4">
              <div>
                <label
                  for="code"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Code
                </label>
                <input
                  id="code"
                  v-model="form.code"
                  type="text"
                  placeholder="e.g. SAVE10"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>
              <div>
                <label
                  for="type"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Type
                </label>
                <select
                  id="type"
                  v-model="form.type"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600"
                >
                  <option value="" disabled>Select type</option>
                  <option value="percent">%</option>
                  <option value="amount">amount</option>
                </select>
              </div>
              <div v-if="form.type === 'percent'">
                <label
                  for="percent"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Percentage
                </label>
                <input
                  id="percent"
                  v-model.number="form.percent"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  placeholder="20%"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>
              <div v-else-if="form.type === 'amount'">
                <label
                  for="amount"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Amount
                </label>
                <input
                  id="amount"
                  v-model.number="form.amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="200$"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>
              <div>
                <label
                  for="validity"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Validity
                </label>
                <input
                  id="validity"
                  v-model="form.validity"
                  type="date"
                  :min="minDate"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>
              <div>
                <label
                  for="usageLimit"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Usage Limit
                  <span class="text-gray-500 dark:text-gray-400 text-xs ml-1">(Leave empty for unlimited)</span>
                </label>
                <input
                  id="usageLimit"
                  v-model.number="form.usageLimit"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="e.g. 100 (leave empty for unlimited)"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>
              <div v-if="isEditMode">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Status
                </label>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="form.status"
                    type="checkbox"
                    :true-value="'enable'"
                    :false-value="'disable'"
                    class="sr-only peer"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                  <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                    {{ form.status === 'enable' ? 'Enabled' : 'Disabled' }}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p class="text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p class="text-sm text-green-600 dark:text-green-400">{{ successMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "~/components/DashboardLayout.vue";
import { ArrowLeft } from "lucide-vue-next";
import { useCouponsApi } from "~/composables/useCouponsApi";

const route = useRoute();
const router = useRouter();
const { createCoupon, getCouponById, updateCoupon } = useCouponsApi();

// Check if we're in edit mode
const couponId = computed(() => {
  const id = route.query.id;
  return Array.isArray(id) ? id[0] : id;
});
const isEditMode = computed(() => route.query.mode === 'edit' && !!couponId.value);

// Set minimum date to today to prevent selecting past dates
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

useHead({
  title: computed(() => isEditMode.value ? 'Edit Coupon - iVisa' : 'Add Coupon - iVisa'),
});

const form = ref({
  code: "",
  type: "",
  validity: "",
  percent: null,
  amount: null,
  usageLimit: null,
  status: 'enable',
});
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const goBack = () => {
  router.push("/dashboard/coupons");
};

// Load coupon data if in edit mode
const loadCouponData = async () => {
  if (!isEditMode.value || !couponId.value) return;
  
  try {
    isLoading.value = true;
    errorMessage.value = "";
    const response = await getCouponById(couponId.value);
    
    if (response.success && response.data) {
      const coupon = response.data;
      form.value.code = coupon.code || "";
      form.value.type = coupon.type || "";
      form.value.validity = coupon.validity ? new Date(coupon.validity).toISOString().split('T')[0] : "";
      
      if (coupon.type === 'percent') {
        form.value.percent = coupon.value || null;
        form.value.amount = null;
      } else if (coupon.type === 'amount') {
        form.value.amount = coupon.value || null;
        form.value.percent = null;
      }
      form.value.usageLimit = coupon.usageLimit ?? null;
      form.value.status = coupon.status || 'enable';
    } else {
      errorMessage.value = response.message || "Failed to load coupon data.";
    }
  } catch (err) {
    console.error('[AddCoupon] loadCouponData: error', err);
    errorMessage.value = err instanceof Error ? err.message : "Failed to load coupon data.";
  } finally {
    isLoading.value = false;
  }
};

const saveCoupon = async () => {
  try {
    errorMessage.value = "";
    successMessage.value = "";
    // Basic validation
    if (!form.value.code?.trim()) {
      errorMessage.value = "Please enter a coupon code.";
      return;
    }
    if (!form.value.type) {
      errorMessage.value = "Please select a coupon type.";
      return;
    }
    if (!form.value.validity) {
      errorMessage.value = "Please select a validity date.";
      return;
    }
    if (form.value.type === 'percent') {
      if (form.value.percent == null || isNaN(form.value.percent)) {
        errorMessage.value = "Please enter a percentage value.";
        return;
      }
      if (form.value.percent < 0 || form.value.percent > 100) {
        errorMessage.value = "Percentage must be between 0 and 100.";
        return;
      }
    }
    if (form.value.type === 'amount') {
      if (form.value.amount == null || isNaN(form.value.amount)) {
        errorMessage.value = "Please enter an amount.";
        return;
      }
      if (form.value.amount <= 0) {
        errorMessage.value = "Amount must be greater than 0.";
        return;
      }
    }
    if (form.value.usageLimit != null && form.value.usageLimit <= 0) {
      errorMessage.value = "Usage limit must be greater than 0.";
      return;
    }
    isLoading.value = true;
    const value = form.value.type === 'percent' ? form.value.percent : form.value.amount;
    const payload = {
      code: form.value.code.trim(),
      type: form.value.type,
      validity: form.value.validity,
      value: typeof value === 'number' ? value : undefined,
      usageLimit: form.value.usageLimit != null && form.value.usageLimit > 0 ? form.value.usageLimit : null,
      status: form.value.status,
    };
    
    let res;
    if (isEditMode.value && couponId.value) {
      console.debug('[AddCoupon] updateCoupon: payload', payload);
      res = await updateCoupon(couponId.value, payload);
      console.debug('[AddCoupon] updateCoupon: response', res);
      if (res?.success) {
        successMessage.value = "Coupon updated successfully.";
        setTimeout(() => {
          goBack();
        }, 800);
      } else {
        errorMessage.value = res?.message || "Failed to update coupon.";
      }
    } else {
      console.debug('[AddCoupon] createCoupon: payload', payload);
      res = await createCoupon(payload);
      console.debug('[AddCoupon] createCoupon: response', res);
      if (res?.success) {
        successMessage.value = "Coupon saved successfully.";
        setTimeout(() => {
          goBack();
        }, 800);
      } else {
        errorMessage.value = res?.message || "Failed to save coupon.";
      }
    }
  } catch (err) {
    console.error('[AddCoupon] saveCoupon: error', err);
    const message = err instanceof Error ? err.message : (isEditMode.value ? "Failed to update coupon." : "Failed to save coupon.");
    errorMessage.value = message;
    // Common backend dup key message surface
    if (message.toLowerCase().includes('duplicate')) {
      errorMessage.value = "Coupon code already exists. Please choose a different code.";
    }
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => form.value.type,
  (newType) => {
    if (newType === 'percent') {
      form.value.amount = null;
    } else if (newType === 'amount') {
      form.value.percent = null;
    }
  }
);

// Load coupon data when component mounts or when edit mode is activated
onMounted(() => {
  if (isEditMode.value) {
    loadCouponData();
  }
});

watch(() => route.query, () => {
  if (isEditMode.value) {
    loadCouponData();
  }
}, { immediate: true });
</script>

