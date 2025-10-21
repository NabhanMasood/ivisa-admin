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
      Company Details
    </h1>

    <!-- Form -->
    <form @submit.prevent="$emit('submit')" class="space-y-6">
      <!-- Company Name Field -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Company Name*
        </label>
        <UiInput
          :model-value="formData.companyName"
          @update:model-value="updateField('companyName', $event)"
          type="text"
          placeholder="Enter your name"
          :error="errors.companyName"
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

      <!-- Company Logo Upload -->
      <div class="flex flex-col">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Company Logo
        </label>
        <span class="text-sm text-gray-500 font-normal mb-2">
          This will be displayed on your profile.
        </span>
        <div
          class="border-2 rounded-lg p-8 text-center cursor-pointer transition-all duration-200"
          :class="isUploadFocused ? 'border-blue-500' : 'border-gray-300 hover:border-blue-400'"
          style="
            border-radius: 12px;
            background-color: white;
            transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          "
          :style="isUploadFocused ? 'box-shadow: 0px 0px 0px 3px rgba(6, 177, 255, 0.1);' : ''"
          @click="triggerFileUpload"
          @focus="isUploadFocused = true"
          @blur="isUploadFocused = false"
          tabindex="0"
        >
          <div class="flex flex-col items-center space-y-4">
            <!-- Upload Icon -->
            <div
              class=" flex items-center justify-center"
              style="width: 48px; height: 48px; border-radius: 10px; border: 2px solid #EAECF0;"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                style="color: black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
            </div>

            <!-- Upload Text -->
            <div>
              <p class="text-sm font-medium text-gray-900 mb-1">
                <span style="font-weight: 600; color: #06b1ff"
                  >Click to upload</span
                ><span style="font-weight: 400; color: #667085">
                  or drag and drop</span
                >
              </p>
              <p class="text-xs text-gray-500">
                SVG, PNG, JPG or GIF (max. 800×400px)
              </p>
            </div>
          </div>
        </div>

        <!-- Hidden File Input -->
        <input
          ref="fileInput"
          type="file"
          accept=".svg,.png,.jpg,.jpeg,.gif"
          @change="handleFileUpload"
          class="hidden"
        />
      </div>

      <!-- Next Button -->
      <UiButton
        type="submit"
        variant="primary"
        size="lg"
        :disabled="isLoading || !isFormValid"
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
            Saving...
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
          Back to Account Details
        </button>
      </div>
    </form>
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

const fileInput = ref(null);
const isUploadFocused = ref(false);

const updateField = (field, value) => {
  emit("update:form-data", { [field]: value });
};

const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Handle file upload logic here
    console.log("File selected:", file.name);
    updateField("companyLogo", file);
  }
};
</script>
