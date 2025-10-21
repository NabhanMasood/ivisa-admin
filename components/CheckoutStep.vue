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
      Checkout
    </h1>

    <!-- Selected Plan Summary -->
    <div
      class="rounded-xl opacity-100 w-full"
      style="
        height: 145px;
        border: 1px solid var(--Colors-Border-border-brand-solid_alt, #06b1ff);
        border-radius: 12px; /* radius-xl */
        box-shadow: 0px 1px 2px 0px #1018280d;
        background: var(--Colors-Background-bg-primary, #ffffff);
      "
    >
      <div class="flex flex-col">
        <div>
          <h3
            class="text-lg font-semibold text-gray-900 mb-1"
            style="padding: 20px 0px 0px 20px"
          >
            Standard Plan
          </h3>
          <p class="text-gray-600" style="padding: 0px 0px 0px 20px">
            AED 1000 Per Month
          </p>
        </div>
        <hr style="margin: 10px 0px" />
        <div class="flex justify-end">
          <button
            @click="$emit('change-plan')"
            class="flex items-center space-x-1 hover:opacity-80 transition-opacity"
            style="
              height: 20px;
              opacity: 1;
              font-family: 'Inter', sans-serif;
              font-weight: 600;
              font-size: 14px;
              line-height: 20px;
              letter-spacing: 0%;
              padding: 3% 5% 0% 0%;
              color: var(
                --Component-colors-Components-Buttons-Tertiary-color-button-tertiary-color-fg,
                #009eff
              );
              background: transparent;
            "
          >
            <span>Change Plan</span>
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Payment Form -->
    <form @submit.prevent="$emit('submit')" style="margin-top: 20px;">
      <!-- Card Name -->
      <div class="mb-1">
        <label class="block text-sm font-medium text-gray-700 mb-2" style="
          font-family: Inter, sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0%;
          color: #344054;
        ">
          Card Name*
        </label>
        <UiInput
          :model-value="formData.billingInfo.cardName"
          @update:model-value="updateBillingField('cardName', $event)"
          type="text"
          placeholder="Enter your name"
          :error="errors.cardName"
          :disabled="isLoading"
          class="w-full"
          :input-style="{
            width: '100%',
            height: '44px',
            borderRadius: '6px',
            border: '1px solid #D0D5DD',
            opacity: 1,
            gap: '8px',
            padding: '10px 14px',
            background: '#FFFFFF',
            boxShadow: '0px 1px 2px 0px #1018280D',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0%',
            color: '#101828',
          }"
        />
      </div>

      <!-- Card Number -->
      <div class="mb-1">
        <label class="block text-sm font-medium text-gray-700 mb-1" style="
          font-family: Inter, sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0%;
          color: #344054;
        ">
          Card Number*
        </label>
        <UiInput
          :model-value="formData.billingInfo.cardNumber"
          @update:model-value="updateBillingField('cardNumber', $event)"
          type="text"
          placeholder="Enter your Card Number"
          :error="errors.cardNumber"
          :disabled="isLoading"
          class="w-full"
          :input-style="{
            width: '100%',
            height: '44px',
            borderRadius: '6px',
            border: '1px solid #D0D5DD',
            opacity: 1,
            gap: '8px',
            padding: '10px 14px',
            background: '#FFFFFF',
            boxShadow: '0px 1px 2px 0px #1018280D',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0%',
            color: '#101828',
          }"
        />
      </div>
      <!-- Expiry -->
      <div class="1">
        <label class="block text-sm font-medium text-gray-700 mb-1" style="
          font-family: Inter, sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0%;
          color: #344054;
        ">
          Expiry*
        </label>
        <UiInput
          :model-value="formData.billingInfo.expiry"
          @update:model-value="updateBillingField('expiry', $event)"
          type="text"
          placeholder="Enter Expiry"
          :error="errors.expiry"
          :disabled="isLoading"
          class="w-full"
          :input-style="{
            width: '100%',
            height: '44px',
            borderRadius: '6px',
            border: '1px solid #D0D5DD',
            opacity: 1,
            gap: '8px',
            padding: '10px 14px',
            background: '#FFFFFF',
            boxShadow: '0px 1px 2px 0px #1018280D',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0%',
            color: '#101828',
          }"
        />
      </div>
      <!-- CSV -->
      <div class="mb-1">
        <label class="block text-sm font-medium text-gray-700 mb-1" style="
          font-family: Inter, sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0%;
          color: #344054;
        ">
          CSV*
        </label>
        <UiInput
          :model-value="formData.billingInfo.csv"
          @update:model-value="updateBillingField('csv', $event)"
          type="text"
          placeholder="Enter CSV"
          :error="errors.csv"
          :disabled="isLoading"
          class="w-full"
          :input-style="{
            width: '100%',
            height: '44px',
            borderRadius: '6px',
            border: '1px solid #D0D5DD',
            opacity: 1,
            gap: '8px',
            padding: '10px 14px',
            background: '#FFFFFF',
            boxShadow: '0px 1px 2px 0px #1018280D',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0%',
            color: '#101828',
          }"
        />
      </div>
      <!-- Next Button -->
      <UiButton
        type="submit"
        variant="primary"
        size="lg"
        :disabled="isLoading || !isFormValid"
        class="w-full mt-2"
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
    </form>

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
        Back to Plan
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

const emit = defineEmits(["submit", "update:form-data", "go-back", "change-plan"]);

const updateBillingField = (field, value) => {
  const billingInfo = { ...props.formData.billingInfo, [field]: value };
  emit("update:form-data", { billingInfo });
};
</script>
