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
              {{ isEditMode ? 'Edit Customer' : 'Add Customer' }}
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
            @click="saveCustomer"
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
          <!-- Customer Details Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Customer Details
            </h3>
            <div class="flex flex-col gap-4">
              <!-- Full Name Input -->
              <div>
                <label
                  for="fullname"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Full Name
                </label>
                <input
                  id="fullname"
                  v-model="customerForm.fullname"
                  type="text"
                  placeholder="Enter full name"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>

              <!-- Email Input -->
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  v-model="customerForm.email"
                  type="email"
                  placeholder="Enter email address"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>

              <!-- Phone Input -->
              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  v-model="customerForm.phone"
                  type="tel"
                  placeholder="Enter phone number"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>

              <!-- Residence Country Text Input -->
              <div>
                <label
                  for="residenceCountry"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Residence Country
                </label>
                <input
                  id="residenceCountry"
                  v-model="customerForm.residenceCountry"
                  type="text"
                  placeholder="Enter residence country"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
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
import { useCustomersApi } from "~/composables/useCustomersApi";

useHead({
  title: "Add Customer - iVisa",
});

const route = useRoute();
const router = useRouter();

const isEditMode = computed(() => route.query.mode === 'edit');
const customerId = computed(() => route.query.id);

const { createCustomer } = useCustomersApi();

const customerForm = ref({
  fullname: "",
  email: "",
  phone: "",
  residenceCountry: "",
});

const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const saveCustomer = async () => {
  if (!customerForm.value.fullname) {
    errorMessage.value = "Please enter full name";
    return;
  }
  if (!customerForm.value.email) {
    errorMessage.value = "Please enter email";
    return;
  }
  if (!customerForm.value.phone) {
    errorMessage.value = "Please enter phone number";
    return;
  }
  if (!customerForm.value.residenceCountry) {
    errorMessage.value = "Please enter residence country";
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    const response = await createCustomer({
      fullname: customerForm.value.fullname,
      email: customerForm.value.email,
      phone: customerForm.value.phone,
      residenceCountry: customerForm.value.residenceCountry,
    });

    if (response.success) {
      successMessage.value = isEditMode.value ? "Customer updated successfully!" : "Customer saved successfully!";
      setTimeout(() => {
        goBack();
      }, 1000);
    } else {
      errorMessage.value = response.message || "Failed to save customer";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to save customer. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.push("/dashboard/customers");
};

</script>

