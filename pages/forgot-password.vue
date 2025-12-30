<template>
  <div class="h-screen flex flex-col lg:flex-row bg-gray-900 overflow-hidden">
    <!-- Left Column - Image Section -->
    <div class="hidden lg:flex w-[50%] relative overflow-hidden bg-gray-900">
      <img
        src="/images/image_2.jpg"
        alt="Background"
        class="w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-black/20"></div>
    </div>

    <!-- Right Column - Form Sections -->
    <div class="flex flex-col w-full lg:w-[50%] h-full bg-white">
      <!-- Mobile Header -->
      <div class="lg:hidden px-6 py-4 border-b border-gray-200 bg-white">
        <img src="/logo/logoname.svg" alt="VISA123" class="h-8 w-auto" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
        <h1 class="text-xl font-bold text-gray-900" style="display: none;">VISA123</h1>
      </div>

      <div class="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div class="w-full max-w-md mx-auto">
          <!-- Header Text -->
          <div class="text-left mb-6 sm:mb-8">
            <!-- Desktop Logo -->
            <div class="hidden lg:block">
              <img
                src="/logo/logoname.svg"
                alt="VISA123"
                class="h-10"
                style="margin-left: -11px"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
              />
              <h1 class="text-4xl font-bold text-gray-900" style="display: none;">VISA123</h1>
            </div>

            <h1 class="mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-4">
              Forgot Password
            </h1>
            <p class="text-lg text-gray-500">Reset your password</p>
          </div>

          <!-- Success Message -->
          <div
            v-if="isEmailSent"
            class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-800">
                  Reset link sent successfully!
                </p>
                <p class="text-sm text-green-700">
                  Check your email for the password reset link.
                </p>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="handleSubmit" class="space-y-6 w-full">
            <!-- Email Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Email*</label
              >
              <UiInput
                v-model="email"
                type="email"
                placeholder="Enter your email"
                :disabled="isLoading"
                class="w-full"
                :input-style="{
                  borderRadius: '8px',
                  border: emailError
                    ? '1px solid #EF4444'
                    : '1px solid #D1D5DB',
                  padding: '12px 16px',
                  color: '#111827',
                  background: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  transition:
                    'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                }"
              />
              <div class="h-5 mt-1">
                <p v-if="emailError" class="text-sm text-red-600">
                  {{ emailError }}
                </p>
              </div>
            </div>

            <!-- Submit Button -->
            <UiButton
              type="submit"
              variant="primary"
              size="lg"
              :disabled="isLoading || !email"
              class="w-full h-12 text-sm font-semibold"
              style="
                height: 48px;
                border-radius: 8px;
                border: 1px solid #00dc6e;
                background: #00dc6e;
                color: #ffffff;
                font-family: 'Inter', sans-serif;
                font-weight: 600;
                font-size: 14px;
                line-height: 20px;
                transition: all 0.2s ease-in-out;
              "
              :style="
                isLoading
                  ? `background: #16A34A; border-color: #16A34A;`
                  : !email
                  ? `background: #9CA3AF; border-color: #9CA3AF;`
                  : `background: #00DC6E; border-color: #00DC6E;`
              "
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                Sending...
              </span>
              <span v-else>Send Reset Link</span>
            </UiButton>
          </form>

          <!-- Back to Login -->
          <div class="mt-8 text-center">
            <p class="text-sm text-gray-600">
              Remember your password?
              <NuxtLink
                to="/login"
                class="text-sm font-medium text-gray-900 hover:underline transition-colors duration-200"
              >
                Sign in
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
useHead({
  title: "Forgot Password - iVisa",
  meta: [{ name: "description", content: "Reset your ivisa account password" }],
});

// Reactive data
const email = ref("");
const emailError = ref("");
const isLoading = ref(false);
const isEmailSent = ref(false);

// Form validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Handle form submission
const handleSubmit = async () => {
  // Reset errors
  emailError.value = "";

  // Validate email
  if (!email.value) {
    emailError.value = "Email is required";
    return;
  }

  if (!validateEmail(email.value)) {
    emailError.value = "Please enter a valid email address";
    return;
  }

  // Simulate API call
  isLoading.value = true;

  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success
    isEmailSent.value = true;

    // Reset form
    email.value = "";
  } catch (error) {
    emailError.value = "Something went wrong. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
