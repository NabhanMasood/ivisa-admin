<template>
  <div class="w-full max-w-sm mx-auto" style="min-height: 500px;">
    <!-- Heading -->
    <h1
      class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 relative z-10 text-center mt-0"
      style="
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        line-height: 44px;
        letter-spacing: -0.02em;
        color: #101828;
        margin-top: 0px;
      "
    >
      Plan
    </h1>

    <!-- Interval Selector -->
    <div class="flex flex-col mb-6">
      <div class="flex flex-col" style="opacity: 1">
        <label class="block text-sm font-medium text-gray-700 mb-2 text-left">
          Interval
        </label>

        <div class="relative">
          <!-- Custom Dropdown Button -->
          <button
            @click="toggleDropdown"
            class="w-full h-12 px-4 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between transition-all duration-200"
            :class="isDropdownOpen ? 'border-blue-500' : 'border-gray-300 hover:border-blue-400'"
            style="
              font-family: Inter, sans-serif;
              font-weight: 400;
              font-size: 16px;
              line-height: 24px;
              letter-spacing: 0%;
              color: #667085;
              border-radius: 6px;
              box-shadow: 0px 1px 2px 0px #1018280d;
              transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            "
            :style="isDropdownOpen ? 'box-shadow: 0px 0px 0px 3px rgba(6, 177, 255, 0.1);' : ''"
          >
            <span>{{
              selectedInterval === "monthly" ? "Monthly" : "Yearly"
            }}</span>
            <svg
              width="10"
              height="5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 10 5"
              style="color: #667085"
              :class="{ 'rotate-180': isDropdownOpen }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.67"
                d="M1 1l4 3 4-3"
              ></path>
            </svg>
          </button>

          <!-- Custom Dropdown Options -->
          <div
            v-if="isDropdownOpen"
            class="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            style="
              border: 1px solid #d0d5dd;
              border-radius: 6px;
              box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1);
            "
          >
            <div
              @click="selectOption('monthly')"
              class="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 hover:border-l-4 hover:border-l-[#009eff] transition-all"
              :class="{ 'bg-gray-50': selectedInterval === 'monthly' }"
            >
              <span
                style="
                  font-family: Inter, sans-serif;
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 24px;
                  letter-spacing: 0%;
                  color: #667085;
                "
              >
                Monthly
              </span>
              <svg
                v-if="selectedInterval === 'monthly'"
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                style="color: #06b1ff"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div
              @click="selectOption('yearly')"
              class="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 hover:border-l-4 hover:border-l-[#009eff] transition-all"
              :class="{ 'bg-gray-50': selectedInterval === 'yearly' }"
            >
              <span
                style="
                  font-family: Inter, sans-serif;
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 24px;
                  letter-spacing: 0%;
                  color: #667085;
                "
              >
                Yearly
              </span>
              <svg
                v-if="selectedInterval === 'yearly'"
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                style="color: #06b1ff"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Plan Selector -->
    <div class="flex flex-col mb-6">
      <div class="flex flex-col" style="opacity: 1">
        <label class="block text-sm font-medium text-gray-700 mb-2 text-left">
          Plan
        </label>

        <div class="relative">
          <!-- Custom Dropdown Button -->
          <button
            @click="togglePlanDropdown"
            class="w-full h-12 px-4 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between transition-all duration-200"
            :class="isPlanDropdownOpen ? 'border-blue-500' : 'border-gray-300 hover:border-blue-400'"
            style="
              font-family: Inter, sans-serif;
              font-weight: 400;
              font-size: 16px;
              line-height: 24px;
              letter-spacing: 0%;
              color: #667085;
              border-radius: 6px;
              box-shadow: 0px 1px 2px 0px #1018280d;
              transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            "
            :style="isPlanDropdownOpen ? 'box-shadow: 0px 0px 0px 3px rgba(6, 177, 255, 0.1);' : ''"
          >
            <span>{{
              selectedPlan === "basic"
                ? "Basic Plan"
                : selectedPlan === "standard"
                ? "Standard Plan"
                : selectedPlan === "premium"
                ? "Premium Plan"
                : "Select Plan"
            }}</span>
            <svg
              width="10"
              height="5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 10 5"
              style="color: #667085"
              :class="{ 'rotate-180': isPlanDropdownOpen }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.67"
                d="M1 1l4 3 4-3"
              ></path>
            </svg>
          </button>

          <!-- Custom Dropdown Options -->
          <div
            v-if="isPlanDropdownOpen"
            class="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            style="
              border: 1px solid #d0d5dd;
              border-radius: 6px;
              box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1);
            "
          >
            <div
              @click="selectPlanOption('basic')"
              class="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 hover:border-l-4 hover:border-l-[#009eff] transition-all"
              :class="{ 'bg-gray-50': selectedPlan === 'basic' }"
            >
              <div class="flex flex-col">
                <span
                  style="
                    font-family: Inter, sans-serif;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 24px;
                    letter-spacing: 0%;
                    color: #667085;
                  "
                >
                  Basic Plan
                </span>
                <span
                  style="
                    font-family: Inter, sans-serif;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    letter-spacing: 0%;
                    color: #9ca3af;
                  "
                >
                  AED 500 per month
                </span>
              </div>
              <svg
                v-if="selectedPlan === 'basic'"
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                style="color: #06b1ff"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div
              @click="selectPlanOption('standard')"
              class="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 hover:border-l-4 hover:border-l-[#009eff] transition-all"
              :class="{ 'bg-gray-50': selectedPlan === 'standard' }"
            >
              <div class="flex flex-col">
                <span
                  style="
                    font-family: Inter, sans-serif;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 24px;
                    letter-spacing: 0%;
                    color: #667085;
                  "
                >
                  Standard Plan
                </span>
                <span
                  style="
                    font-family: Inter, sans-serif;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    letter-spacing: 0%;
                    color: #9ca3af;
                  "
                >
                  AED 1000 per month
                </span>
              </div>
              <svg
                v-if="selectedPlan === 'standard'"
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                style="color: #06b1ff"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div
              @click="selectPlanOption('premium')"
              class="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 hover:border-l-4 hover:border-l-[#009eff] transition-all"
              :class="{ 'bg-gray-50': selectedPlan === 'premium' }"
            >
              <div class="flex flex-col">
                <span
                  style="
                    font-family: Inter, sans-serif;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 24px;
                    letter-spacing: 0%;
                    color: #667085;
                  "
                >
                  Premium Plan
                </span>
                <span
                  style="
                    font-family: Inter, sans-serif;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    letter-spacing: 0%;
                    color: #9ca3af;
                  "
                >
                  AED 1500 per month
                </span>
              </div>
              <svg
                v-if="selectedPlan === 'premium'"
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                style="color: #06b1ff"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Next Button -->
    <UiButton
      @click="$emit('submit')"
      variant="primary"
      size="lg"
      :disabled="isLoading || !formData.selectedPlan"
      class="w-full mt-8"
      style="
        width: 100%;
        height: 44px;
        border-radius: 6px;
        border: 1px solid #06b1ff;
        opacity: 1;
        padding: 0px 0px;
        gap: 6px;
        background: #06b1ff;
        box-shadow: 0px 1px 2px 0px #1018280d;
      "
      :style="
        isLoading
          ? `
            width: 100%;
            height: 44px;
            border-radius: 6px;
            border: 1px solid #009EFF;
            opacity: 1;
            padding: 0px 0px;
            gap: 6px;
            background: #009EFF;
            box-shadow: 0px 1px 2px 0px #1018280d;
          `
          : `
            width: 100%;
            height: 44px;
            border-radius: 6px;
            border: 1px solid #06b1ff;
            opacity: 1;
            padding: 0px 0px;
            gap: 6px;
            background: #06b1ff;
            box-shadow: 0px 1px 2px 0px #1018280d;
          `
      "
    >
      <span v-if="isLoading" class="flex items-center justify-center">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span
          style="
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0%;
            color: #ffffff;
            opacity: 1;
          "
        >
          Processing...
        </span>
      </span>
      <span
        v-else
        style="
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0%;
          color: #ffffff;
          opacity: 1;
        "
      >
        Next
      </span>
    </UiButton>

    <!-- Back Link -->
    <div class="text-center mt-4">
      <button
        type="button"
        @click="$emit('go-back')"
        class="text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center mx-auto"
        style="
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0%;
        "
      >
        <img
          src="/images/Icon.svg"
          alt="Back"
          class="w-4 h-4 mr-2"
        />
        Back to Company Details
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isFormValid: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit", "update:form-data", "go-back"]);

const selectedInterval = ref("monthly");
const isDropdownOpen = ref(false);
const selectedPlan = ref("");
const isPlanDropdownOpen = ref(false);

const updateField = (field, value) => {
  emit("update:form-data", { [field]: value });
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectOption = (option) => {
  selectedInterval.value = option;
  updateField("selectedPlan", option);
  isDropdownOpen.value = false;
};

const togglePlanDropdown = () => {
  isPlanDropdownOpen.value = !isPlanDropdownOpen.value;
};

const selectPlanOption = (option) => {
  selectedPlan.value = option;
  updateField("selectedPlan", option);
  isPlanDropdownOpen.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    isDropdownOpen.value = false;
    isPlanDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
