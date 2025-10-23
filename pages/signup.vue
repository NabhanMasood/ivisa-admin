<template>
  <div class="h-screen flex flex-col lg:flex-row bg-gray-900 overflow-hidden">
    <!-- Left Column - Image Section -->
    <div class="hidden lg:flex w-[50%] relative overflow-hidden bg-gray-900">
      <img src="/images/image_2.jpg" alt="Background" class="w-full h-full object-cover object-center" />
      <div class="absolute inset-0 bg-black/20"></div>
    </div>

    <!-- Right Column - Form Section -->
    <div class="flex flex-col w-full lg:w-[50%] h-full bg-white">
      <!-- Mobile Header -->
      <div class="lg:hidden px-6 py-4 border-b border-gray-200 bg-white">
        <img src="/logo/Logo.svg" alt="VISA123" class="h-8 w-auto" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
        <h1 class="text-xl font-bold text-gray-900" style="display: none;">VISA123</h1>
      </div>

      <div class="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div class="w-full max-w-md mx-auto">
          <!-- Header Text -->
          <div class="text-left mb-6 sm:mb-8">
            <!-- Desktop Logo -->
            <div class="hidden lg:block">
              <img src="/logo/Logo.svg" alt="VISA123" class="h-10" style="margin-left: -10px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
              <h1 class="text-4xl font-bold text-gray-900" style="display: none;">VISA123</h1>
            </div>
            <h1 class="mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Create an account</h1>
            <p class="text-lg text-gray-500">Please fill in your details</p>
        </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 sm:gap-6 w-full">
            <!-- Name Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First name</label>
                <UiInput
                  v-model="firstName"
                  type="text"
                  placeholder="First name"
                  :disabled="isLoading"
                  class="w-full"
                  :input-style="{
                    borderRadius: '8px',
                    border: firstNameError ? '1px solid #EF4444' : '1px solid #D1D5DB',
                    padding: '12px 16px',
                    color: '#111827',
                    background: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  }"
                />
                <div class="h-4">
                  <p v-if="firstNameError" class="text-sm text-red-600">{{ firstNameError }}</p>
               </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                <UiInput
                  v-model="lastName"
                  type="text"
                  placeholder="Last name"
                  :disabled="isLoading"
                  class="w-full"
                  :input-style="{
                    borderRadius: '8px',
                    border: lastNameError ? '1px solid #EF4444' : '1px solid #D1D5DB',
                    padding: '12px 16px',
                    color: '#111827',
                    background: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  }"
                />
                <div class="h-4">
                  <p v-if="lastNameError" class="text-sm text-red-600">{{ lastNameError }}</p>
                </div>
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <UiInput
                v-model="email"
                type="email"
                placeholder="you@example.com"
                :disabled="isLoading"
                class="w-full"
                :input-style="{
                  borderRadius: '8px',
                  border: emailError ? '1px solid #EF4444' : '1px solid #D1D5DB',
                  padding: '12px 16px',
                  color: '#111827',
                  background: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                }"
              />
              <div class="h-4">
                <p v-if="emailError" class="text-sm text-red-600">{{ emailError }}</p>
              </div>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <UiInput
                v-model="password"
                type="password"
                placeholder="Create a strong password"
                :disabled="isLoading"
                class="w-full"
                :input-style="{
                  borderRadius: '8px',
                  border: passwordError ? '1px solid #EF4444' : '1px solid #D1D5DB',
                  padding: '12px 16px',
                  color: '#111827',
                  background: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                }"
              />
              <div class="h-4">
                <p v-if="passwordError" class="text-sm text-red-600">{{ passwordError }}</p>
        </div>
      </div>

            <!-- Submit -->
            <UiButton
              type="submit"
              variant="primary"
              size="lg"
              :disabled="isLoading || !isFormValid"
              class="w-full h-12 text-sm font-semibold"
          style="
                height: 48px;
                border-radius: 8px;
                border: 1px solid #00DC6E;
                background: #00DC6E;
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
                  : !isFormValid
                  ? `background: #9CA3AF; border-color: #9CA3AF;`
                  : `background: #00DC6E; border-color: #00DC6E;`
              "
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
                Creating account...
              </span>
              <span v-else>Sign up</span>
            </UiButton>
          </form>

          <!-- Divider -->
          <div class="mt-8">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-3 bg-white text-gray-500 font-medium">or continue with</span>
        </div>
      </div>
    </div>

          <!-- Social Login Buttons -->
          <div class="flex gap-3 mt-6">
            <button
              type="button"
              class="flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              @click="handleSocial('google')"
              :disabled="isLoading"
              style="height: 40px; padding: 8px 12px; border-radius: 8px; border: 1px solid #D1D5DB; background: #FFFFFF;"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button
              type="button"
              class="flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              @click="handleSocial('github')"
              :disabled="isLoading"
              style="height: 40px; padding: 8px 12px; border-radius: 8px; border: 1px solid #D1D5DB; background: #FFFFFF;"
            >
              <svg class="w-5 h-5" fill="#111827" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
          </div>

          <!-- Sign in link -->
          <div class="mt-8 text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
              <NuxtLink to="/login" class="text-sm font-medium text-gray-900 hover:underline transition-colors duration-200">Sign in</NuxtLink>
            </p>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Sign Up - iVisa",
  meta: [{ name: "description", content: "Create your iVisa account" }],
});

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const firstNameError = ref("");
const lastNameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const isLoading = ref(false);

const isFormValid = computed(() => {
  return (
    firstName.value && lastName.value && email.value && password.value &&
    !firstNameError.value && !lastNameError.value && !emailError.value && !passwordError.value
  );
});

const validateEmail = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

watch(firstName, (v) => {
  firstNameError.value = !v ? "First name is required" : "";
});

watch(lastName, (v) => {
  lastNameError.value = !v ? "Last name is required" : "";
});

watch(email, (v) => {
  emailError.value = v && !validateEmail(v) ? "Please enter a valid email address" : "";
});

watch(password, (v) => {
  passwordError.value = v && v.length < 8 ? "Password must be at least 8 characters" : "";
});

const handleSubmit = async () => {
  firstNameError.value = !firstName.value ? "First name is required" : "";
  lastNameError.value = !lastName.value ? "Last name is required" : "";
  emailError.value = !email.value ? "Email is required" : (!validateEmail(email.value) ? "Please enter a valid email address" : "");
  passwordError.value = !password.value ? "Password is required" : (password.value.length < 8 ? "Password must be at least 8 characters" : "");
  if (!isFormValid.value) return;

  isLoading.value = true;
  try {
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Signup successful", { firstName: firstName.value, lastName: lastName.value, email: email.value });
    await navigateTo("/dashboard/users");
  } finally {
    isLoading.value = false;
  }
};

const handleSocial = async (provider) => {
  isLoading.value = true;
  try {
    await new Promise((r) => setTimeout(r, 1000));
    console.log(`Signup with ${provider}`);
    await navigateTo("/dashboard/users");
  } finally {
    isLoading.value = false;
  }
};
</script>
