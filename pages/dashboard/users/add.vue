<template>
  <DashboardLayout>
    <div class="flex flex-col gap-4 max-w-[796px] items-center justify-center mx-auto">
      <!-- Page Header with Back Button -->
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
              {{ isEditMode ? 'Edit User' : 'Add User' }}
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
            @click="saveUser"
            :disabled="isLoading"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {{ isLoading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 py-[30px] px-[34px]">
        <div class="space-y-6">
          <!-- User Credentials Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              User Credentials
            </h3>
            <div class="flex flex-col gap-4">
              <!-- Email Input -->
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="userForm.email"
                  type="email"
                  placeholder="Enter email address"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>

              <!-- Password Input -->
              <div>
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Password <span class="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  v-model="userForm.password"
                  type="password"
                  placeholder="Enter password"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {{ isEditMode ? 'Leave blank to keep current password' : 'Minimum 8 characters' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Permissions Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Access Permissions
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Select which sections this user can access in the dashboard
            </p>
            
            <div class="space-y-3">
              <!-- Select All Checkbox -->
              <div class="flex items-center p-3 bg-gray-50 dark:bg-[#18181B] rounded-lg border border-gray-200 dark:border-gray-700">
                <input
                  id="selectAll"
                  type="checkbox"
                  v-model="selectAllPermissions"
                  @change="toggleAllPermissions"
                  class="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2"
                  style="border-radius: 4px"
                />
                <label
                  for="selectAll"
                  class="ml-3 text-sm font-semibold text-gray-900 dark:text-white cursor-pointer"
                >
                  Select All Permissions
                </label>
              </div>

              <!-- Countries Permission -->
              <div class="flex items-center p-3 bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#18181B] transition-colors">
                <input
                  id="countries"
                  type="checkbox"
                  v-model="userForm.permissions.countries"
                  class="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2"
                  style="border-radius: 4px"
                />
                <label
                  for="countries"
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  Countries
                </label>
              </div>

              <!-- Visa Products Permission -->
              <div class="flex items-center p-3 bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#18181B] transition-colors">
                <input
                  id="visaProducts"
                  type="checkbox"
                  v-model="userForm.permissions.visaProducts"
                  class="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2"
                  style="border-radius: 4px"
                />
                <label
                  for="visaProducts"
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  Visa Products
                </label>
              </div>

              <!-- Nationalities Permission -->
              <div class="flex items-center p-3 bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#18181B] transition-colors">
                <input
                  id="nationalities"
                  type="checkbox"
                  v-model="userForm.permissions.nationalities"
                  class="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2"
                  style="border-radius: 4px"
                />
                <label
                  for="nationalities"
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  Nationalities
                </label>
              </div>

              <!-- Embassies Permission -->
              <div class="flex items-center p-3 bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#18181B] transition-colors">
                <input
                  id="embassies"
                  type="checkbox"
                  v-model="userForm.permissions.embassies"
                  class="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2"
                  style="border-radius: 4px"
                />
                <label
                  for="embassies"
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  Embassies
                </label>
              </div>

              <!-- Coupons Permission -->
              <div class="flex items-center p-3 bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#18181B] transition-colors">
                <input
                  id="coupons"
                  type="checkbox"
                  v-model="userForm.permissions.coupons"
                  class="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2"
                  style="border-radius: 4px"
                />
                <label
                  for="coupons"
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  Coupons
                </label>
              </div>

              <!-- Additional Info Permission -->
              <div class="flex items-center p-3 bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#18181B] transition-colors">
                <input
                  id="additionalInfo"
                  type="checkbox"
                  v-model="userForm.permissions.additionalInfo"
                  class="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2"
                  style="border-radius: 4px"
                />
                <label
                  for="additionalInfo"
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  Additional Info
                </label>
              </div>

              <!-- Customers Permission -->
              <div class="flex items-center p-3 bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#18181B] transition-colors">
                <input
                  id="customers"
                  type="checkbox"
                  v-model="userForm.permissions.customers"
                  class="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2"
                  style="border-radius: 4px"
                />
                <label
                  for="customers"
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  Customers
                </label>
              </div>

              <!-- Applications Permission -->
              <div class="flex items-center p-3 bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#18181B] transition-colors">
                <input
                  id="applications"
                  type="checkbox"
                  v-model="userForm.permissions.applications"
                  class="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2"
                  style="border-radius: 4px"
                />
                <label
                  for="applications"
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  Applications
                </label>
              </div>

              <!-- Finances Permission -->
              <div class="flex items-center p-3 bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#18181B] transition-colors">
                <input
                  id="finances"
                  type="checkbox"
                  v-model="userForm.permissions.finances"
                  class="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2"
                  style="border-radius: 4px"
                />
                <label
                  for="finances"
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  Finances
                </label>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fade-in">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800 dark:text-red-400">{{ errorMessage }}</p>
              </div>
              <button 
                @click="errorMessage = ''" 
                class="ml-auto flex-shrink-0 text-red-400 hover:text-red-600 dark:hover:text-red-300"
              >
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fade-in">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-800 dark:text-green-400">{{ successMessage }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "~/components/DashboardLayout.vue";
import { ArrowLeft } from "lucide-vue-next";
import { useUsersApi } from "~/composables/useUsersApi";

useHead({
  title: "Add User - iVisa",
});

const route = useRoute();
const router = useRouter();

const isEditMode = computed(() => route.query.mode === 'edit');
const userId = computed(() => route.query.id ? Number(route.query.id) : null);

const { createUser, updateUser, getUserById } = useUsersApi();

const userForm = ref({
  email: "",
  password: "",
  permissions: {
    countries: false,
    visaProducts: false,
    nationalities: false,
    embassies: false,
    coupons: false,
    additionalInfo: false,
    customers: false,
    applications: false,
    finances: false,
  },
});

const selectAllPermissions = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

// Auto-dismiss error messages after 5 seconds
watch(errorMessage, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      errorMessage.value = "";
    }, 5000);
  }
});

const toggleAllPermissions = () => {
  const value = selectAllPermissions.value;
  userForm.value.permissions = {
    countries: value,
    visaProducts: value,
    nationalities: value,
    embassies: value,
    coupons: value,
    additionalInfo: value,
    customers: value,
    applications: value,
    finances: value,
  };
};

// Watch for changes in individual permissions to update selectAll
watch(
  () => userForm.value.permissions,
  (newPermissions) => {
    const allChecked = Object.values(newPermissions).every((value) => value === true);
    selectAllPermissions.value = allChecked;
  },
  { deep: true }
);

const loadUser = async () => {
  if (!isEditMode.value || !userId.value) return;

  try {
    isLoading.value = true;
    const response = await getUserById(userId.value);
    
    if (response.success && response.data) {
      userForm.value.email = response.data.email;
      userForm.value.permissions = response.data.permissions || {
        countries: false,
        visaProducts: false,
        nationalities: false,
        embassies: false,
        coupons: false,
        additionalInfo: false,
        customers: false,
        applications: false,
        finances: false,
      };
      // Don't populate password on edit
      userForm.value.password = "";
    } else {
      errorMessage.value = response.message || "Failed to load user";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load user";
  } finally {
    isLoading.value = false;
  }
};

const saveUser = async () => {
  // Validation
  if (!userForm.value.email) {
    errorMessage.value = "Please enter email address";
    return;
  }

  if (!isEditMode.value && !userForm.value.password) {
    errorMessage.value = "Please enter password";
    return;
  }

  if (!isEditMode.value && userForm.value.password.length < 8) {
    errorMessage.value = "Password must be at least 8 characters";
    return;
  }

  // Check if at least one permission is selected
  const hasPermissions = Object.values(userForm.value.permissions).some((value) => value === true);
  if (!hasPermissions) {
    errorMessage.value = "Please select at least one permission";
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    let response;
    if (isEditMode.value && userId.value) {
      // Update existing user
      const updateData = {
        email: userForm.value.email,
        permissions: userForm.value.permissions,
      };
      
      // Only include password if it's been changed
      if (userForm.value.password) {
        updateData.password = userForm.value.password;
      }
      
      response = await updateUser(userId.value, updateData);
    } else {
      // Create new user
      response = await createUser({
        email: userForm.value.email,
        password: userForm.value.password,
        permissions: userForm.value.permissions,
      });
    }

    console.log('Full response:', response);
    console.log('Response success:', response.success);
    console.log('Response message:', response.message);
    
    if (response.success) {
      successMessage.value = isEditMode.value ? "User updated successfully!" : "User created successfully!";
      setTimeout(() => {
        goBack();
      }, 1000);
    } else {
      errorMessage.value = response.message || "Failed to save user";
      console.error('Save user failed:', response.message);
    }
  } catch (error) {
    console.error('Save user error:', error);
    errorMessage.value = error instanceof Error ? error.message : "Failed to save user. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.push("/dashboard/users");
};

onMounted(() => {
  if (isEditMode.value) {
    loadUser();
  }
});
</script>

