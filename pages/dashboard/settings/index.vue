<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
      <!-- Page Header -->
      <div class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4">
        <div class="flex-1 min-w-0">
          <h1 class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Application Reminder Settings
          </h1>
          <label class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
            style="font-weight: 400; letter-spacing: 0%">
            Configure timing and coupon selection for pending application reminders
          </label>
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
          <p class="text-sm text-gray-600 dark:text-gray-400">Loading settings...</p>
        </div>
      </div>

      <!-- Settings Content -->
      <div v-else class="space-y-6">
      
        <!-- First Reminder Timing -->
        <div class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 p-6"
          style="border-radius: 7px">
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                First Reminder Timing
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ getSettingDescription('pending_reminder_hours') || 'Wait this many hours after email capture before sending the first reminder email to users who haven\'t completed their application' }}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-64">
                <input
                  v-model.number="pendingReminderHours"
                  type="number"
                  min="1"
                  placeholder="24"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">hours</span>
              <button
                @click="updatePendingReminderHours"
                :disabled="saving.pending_reminder_hours || !hasChanged('pending_reminder_hours')"
                class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {{ saving.pending_reminder_hours ? 'Saving...' : 'Save' }}
              </button>
            </div>
            <div v-if="errorMessages.pending_reminder_hours" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
              <p class="text-sm text-red-700 dark:text-red-300">{{ errorMessages.pending_reminder_hours }}</p>
            </div>
            <div v-if="successMessages.pending_reminder_hours" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
              <p class="text-sm text-green-700 dark:text-green-300">{{ successMessages.pending_reminder_hours }}</p>
            </div>
          </div>
        </div>

        <!-- Coupon Email Timing -->
        <div class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 p-6"
          style="border-radius: 7px">
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Coupon Email Timing
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ getSettingDescription('coupon_email_hours') || 'Wait this many hours after the first reminder before sending the coupon email' }}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-64">
                <input
                  v-model.number="couponEmailHours"
                  type="number"
                  min="1"
                  placeholder="72"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">hours</span>
              <button
                @click="updateCouponEmailHours"
                :disabled="saving.coupon_email_hours || !hasChanged('coupon_email_hours')"
                class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {{ saving.coupon_email_hours ? 'Saving...' : 'Save' }}
              </button>
            </div>
            <div v-if="errorMessages.coupon_email_hours" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
              <p class="text-sm text-red-700 dark:text-red-300">{{ errorMessages.coupon_email_hours }}</p>
            </div>
            <div v-if="successMessages.coupon_email_hours" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
              <p class="text-sm text-green-700 dark:text-green-300">{{ successMessages.coupon_email_hours }}</p>
            </div>
          </div>
        </div>

        <!-- Coupon Selection -->
        <div class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 p-6"
          style="border-radius: 7px">
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Coupon for Reminder Emails
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Select which coupon to include in reminder emails. Leave empty to disable coupon emails.
              </p>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-64">
                <select
                  v-model="selectedCouponId"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black dark:focus:border-gray-600"
                  :disabled="isLoading"
                >
                  <option value="">None (Disable Coupon Emails)</option>
                  <option
                    v-for="coupon in enabledCoupons"
                    :key="coupon.id"
                    :value="String(coupon.id)"
                  >
                    {{ coupon.code }} ({{ formatCouponValue(coupon) }})
                  </option>
                </select>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap invisible">hours</span>
              <button
                @click="updateCouponSelection"
                :disabled="saving.pending_reminder_coupon_id || !hasChanged('pending_reminder_coupon_id')"
                class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {{ saving.pending_reminder_coupon_id ? 'Saving...' : 'Save' }}
              </button>
            </div>
            <div v-if="!isLoading && coupons.length > 0 && enabledCoupons.length === 0" class="text-xs text-amber-600 dark:text-amber-400 mt-1 ml-0">
              No enabled coupons available. Enable a coupon first.
            </div>
            <div v-if="!isLoading && coupons.length === 0 && errorMessages.coupons" class="text-xs text-red-600 dark:text-red-400 mt-1 ml-0">
              {{ errorMessages.coupons }}
            </div>
            <div v-if="errorMessages.pending_reminder_coupon_id" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
              <p class="text-sm text-red-700 dark:text-red-300">{{ errorMessages.pending_reminder_coupon_id }}</p>
            </div>
            <div v-if="successMessages.pending_reminder_coupon_id" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
              <p class="text-sm text-green-700 dark:text-green-300">{{ successMessages.pending_reminder_coupon_id }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "~/components/DashboardLayout.vue";
import { useSettingsApi } from "~/composables/useSettingsApi";
import { useCouponsApi } from "~/composables/useCouponsApi";

const { getAllSettings, updateSetting } = useSettingsApi();
const { getAllCoupons } = useCouponsApi();

// State
const isLoading = ref(true);
const settings = ref([]);
const coupons = ref([]);
const saving = ref({
  pending_reminder_hours: false,
  coupon_email_hours: false,
  pending_reminder_coupon_id: false,
});
const errorMessages = ref({});
const successMessages = ref({});

// Form values
const pendingReminderHours = ref(24);
const couponEmailHours = ref(72);
const selectedCouponId = ref('');

// Original values for comparison
const originalValues = ref({
  pending_reminder_hours: '',
  coupon_email_hours: '',
  pending_reminder_coupon_id: '',
});

// Computed
const enabledCoupons = computed(() => {
  if (!Array.isArray(coupons.value) || coupons.value.length === 0) {
    return [];
  }
  // Filter for enabled coupons - handle case variations
  return coupons.value.filter(c => {
    if (!c || !c.status) return false;
    return c.status.toLowerCase() === 'enable';
  });
});

// Methods
const loadData = async () => {
  isLoading.value = true;
  errorMessages.value = {};
  successMessages.value = {};
  
  try {
    // Load settings
    const settingsResponse = await getAllSettings();
    
    // Check if settings endpoint is available
    if (!settingsResponse.success) {
      // Show the detailed error message from the API
      errorMessages.value.general = settingsResponse.message || 'Failed to load settings from backend API.';
      settings.value = [];
      // Use default values
      pendingReminderHours.value = 24;
      couponEmailHours.value = 72;
      selectedCouponId.value = '';
    } else {
      settings.value = settingsResponse.data || [];
      
      // Set form values from settings
      const pendingReminderSetting = settings.value.find(s => s.key === 'pending_reminder_hours');
      const couponEmailSetting = settings.value.find(s => s.key === 'coupon_email_hours');
      const couponIdSetting = settings.value.find(s => s.key === 'pending_reminder_coupon_id');
      
      pendingReminderHours.value = pendingReminderSetting ? parseInt(pendingReminderSetting.value) || 24 : 24;
      couponEmailHours.value = couponEmailSetting ? parseInt(couponEmailSetting.value) || 72 : 72;
      selectedCouponId.value = couponIdSetting ? couponIdSetting.value || '' : '';
    }
    
    // Load coupons separately with error handling
    try {
      const couponsResponse = await getAllCoupons();
      if (couponsResponse.success && couponsResponse.data) {
        coupons.value = Array.isArray(couponsResponse.data) ? couponsResponse.data : [];
      } else {
        coupons.value = [];
        if (couponsResponse.message) {
          console.warn('Failed to load coupons:', couponsResponse.message);
        }
      }
    } catch (couponError) {
      console.error('Error loading coupons:', couponError);
      coupons.value = [];
      errorMessages.value.coupons = couponError instanceof Error ? couponError.message : 'Failed to load coupons. Please refresh the page.';
    }
    
    // Store original values
    originalValues.value = {
      pending_reminder_hours: String(pendingReminderHours.value),
      coupon_email_hours: String(couponEmailHours.value),
      pending_reminder_coupon_id: selectedCouponId.value,
    };
  } catch (error) {
    console.error('Failed to load settings:', error);
    errorMessages.value.general = 'Failed to load settings. Please try again.';
    // Ensure coupons is at least an empty array
    if (!Array.isArray(coupons.value)) {
      coupons.value = [];
    }
  } finally {
    isLoading.value = false;
  }
};

const getSettingDescription = (key) => {
  const setting = settings.value.find(s => s.key === key);
  return setting?.description || '';
};

const hasChanged = (key) => {
  const currentValue = key === 'pending_reminder_hours' 
    ? String(pendingReminderHours.value)
    : key === 'coupon_email_hours'
    ? String(couponEmailHours.value)
    : selectedCouponId.value;
  
  return currentValue !== originalValues.value[key];
};

const updatePendingReminderHours = async () => {
  if (!hasChanged('pending_reminder_hours')) return;
  
  saving.value.pending_reminder_hours = true;
  errorMessages.value.pending_reminder_hours = '';
  successMessages.value.pending_reminder_hours = '';
  
  try {
    await updateSetting('pending_reminder_hours', String(pendingReminderHours.value));
    originalValues.value.pending_reminder_hours = String(pendingReminderHours.value);
    successMessages.value.pending_reminder_hours = 'Setting updated successfully';
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessages.value.pending_reminder_hours = '';
    }, 3000);
    
    // Reload settings to get updated description
    await loadData();
    } catch (error) {
      console.error('Failed to update setting:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update setting';
      errorMessages.value.pending_reminder_hours = errorMessage;
      if (errorMessage.includes('not found')) {
        errorMessages.value.general = 'Settings API endpoint not available. Please ensure the backend is updated.';
      }
    } finally {
      saving.value.pending_reminder_hours = false;
    }
};

const updateCouponEmailHours = async () => {
  if (!hasChanged('coupon_email_hours')) return;
  
  saving.value.coupon_email_hours = true;
  errorMessages.value.coupon_email_hours = '';
  successMessages.value.coupon_email_hours = '';
  
  try {
    await updateSetting('coupon_email_hours', String(couponEmailHours.value));
    originalValues.value.coupon_email_hours = String(couponEmailHours.value);
    successMessages.value.coupon_email_hours = 'Setting updated successfully';
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessages.value.coupon_email_hours = '';
    }, 3000);
    
    // Reload settings to get updated description
    await loadData();
  } catch (error) {
    console.error('Failed to update setting:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update setting';
    errorMessages.value.coupon_email_hours = errorMessage;
    if (errorMessage.includes('not found')) {
      errorMessages.value.general = 'Settings API endpoint not available. Please ensure the backend is updated.';
    }
  } finally {
    saving.value.coupon_email_hours = false;
  }
};

const updateCouponSelection = async () => {
  if (!hasChanged('pending_reminder_coupon_id')) return;
  
  saving.value.pending_reminder_coupon_id = true;
  errorMessages.value.pending_reminder_coupon_id = '';
  successMessages.value.pending_reminder_coupon_id = '';
  
  try {
    await updateSetting('pending_reminder_coupon_id', selectedCouponId.value || '');
    originalValues.value.pending_reminder_coupon_id = selectedCouponId.value;
    successMessages.value.pending_reminder_coupon_id = 'Setting updated successfully';
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessages.value.pending_reminder_coupon_id = '';
    }, 3000);
    
    // Reload settings to get updated description
    await loadData();
  } catch (error) {
    console.error('Failed to update setting:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update setting';
    errorMessages.value.pending_reminder_coupon_id = errorMessage;
    if (errorMessage.includes('not found')) {
      errorMessages.value.general = 'Settings API endpoint not available. Please ensure the backend is updated.';
    }
  } finally {
    saving.value.pending_reminder_coupon_id = false;
  }
};

const formatCouponValue = (coupon) => {
  if (!coupon) return '';
  if (coupon.type === 'percent') {
    return `${coupon.value || 0}% off`;
  } else {
    return `$${coupon.value || 0} off`;
  }
};

// Debug: Log API configuration
onMounted(() => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  console.log('[Settings Page] API Base URL:', apiBase);
  console.log('[Settings Page] Will call:', `${apiBase}/settings`);
  loadData();
});
</script>

