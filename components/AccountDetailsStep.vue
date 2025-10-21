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
      Account Details
    </h1>

    <!-- Form -->
    <form @submit.prevent="$emit('submit')">
      <!-- Name Field -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Name*
        </label>
        <UiInput
          :model-value="formData.name"
          @update:model-value="updateField('name', $event)"
          type="text"
          placeholder="Enter your name"
          :error="errors.name"
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
            color: '#101828'
          }"
        />
      </div>

      <!-- Email Field -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Email*
        </label>
        <UiInput
          :model-value="formData.email"
          @update:model-value="updateField('email', $event)"
          type="email"
          placeholder="Enter your email"
          :error="errors.email"
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
            color: '#101828'
          }"
        />
      </div>

      <!-- Password Field -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Password*
        </label>
        <UiInput
          :model-value="formData.password"
          @update:model-value="updateField('password', $event)"
          type="password"
          placeholder="Create a password"
          :error="errors.password"
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
            color: '#101828'
          }"
        />
      </div>

      <!-- Password Requirements -->
      <div class="space-y-2">
        <div class="flex items-center space-x-2">
          <svg 
            class="w-4 h-4" 
            :class="passwordRequirements.length ? 'text-green-500' : 'text-gray-300'"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span 
            class="text-sm"
            :class="passwordRequirements.length ? 'text-green-600' : 'text-gray-500'"
            style="font-family: 'Inter', sans-serif;"
          >
            Must be at least 8 characters
          </span>
        </div>
        <div class="flex items-center space-x-2">
          <svg 
            class="w-4 h-4" 
            :class="passwordRequirements.special ? 'text-green-500' : 'text-gray-300'"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span 
            class="text-sm"
            :class="passwordRequirements.special ? 'text-green-600' : 'text-gray-500'"
            style="font-family: 'Inter', sans-serif;"
          >
            Must contain one special character
          </span>
        </div>
      </div>

      <!-- Next Button -->
      <UiButton
        type="submit"
        variant="primary"
        size="lg"
        :disabled="isLoading || !isFormValid"
        class="w-full mt-8 hover:bg-black hover:border-black transition-colors"
        style="
          width: 100%;
          height: 44px;
          border-radius: 6px;
          border: 1px solid #06B1FF;
          opacity: 1;
          padding: 0px 0px;
          gap: 6px;
          background: #06B1FF;
          box-shadow: 0px 1px 2px 0px #1018280D;
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
              box-shadow: 0px 1px 2px 0px #1018280D;
            `
            : `
              width: 100%;
              height: 44px;
              border-radius: 6px;
              border: 1px solid #06B1FF;
              opacity: 1;
              padding: 0px 0px;
              gap: 6px;
              background: #06B1FF;
              box-shadow: 0px 1px 2px 0px #1018280D;
            `
        "
      >
        <span 
          v-if="isLoading"
          class="flex items-center justify-center"
        >
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span
            style="
              font-family: 'Inter', sans-serif;
              font-weight: 600;
              font-size: 16px;
              line-height: 24px;
              letter-spacing: 0%;
              color: #FFFFFF;
              opacity: 1;
            "
          >
            Creating...
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
            color: #FFFFFF;
            opacity: 1;
          "
        >
          Next
        </span>
      </UiButton>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  errors: {
    type: Object,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isFormValid: {
    type: Boolean,
    default: false
  },
  passwordRequirements: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['submit', 'update:form-data'])

const updateField = (field, value) => {
  emit('update:form-data', { [field]: value })
}
</script>

