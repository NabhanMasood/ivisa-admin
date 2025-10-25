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
              {{ isEditMode ? 'Edit Nationality' : isViewMode ? 'View Nationality' : 'Add Nationality' }}
            </h1>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="goBack"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 bg-[#F1F1F1] dark:bg-[#18181B]  dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors"
          >
            Discard
          </button>
          <button
            @click="saveNationality"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 py-[30px] px-[34px]">
        <div class="space-y-6">
          <!-- Nationality Details Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Nationality Details
            </h3>
            <div class="space-y-4">
              <!-- Nationality Dropdown -->
              <CustomDropdown
                id="countryName"
                label="Nationality (Passport Country)"
                v-model="nationalityForm.name"
                :options="nationalityOptions"
                placeholder="Select nationality"
                search-placeholder="Search nationality"
              />
              
              <!-- Destination Country Dropdown -->
              <CustomDropdown
                id="destinationCountry"
                label="Destination Country"
                v-model="nationalityForm.destinationCountry"
                :options="destinationOptions"
                placeholder="Select destination country"
                search-placeholder="Search destination country"
              />
            </div>
          </div>

          <!-- Visa Products Available Section -->
          <div v-if="nationalityForm.name && nationalityForm.destinationCountry" class="mt-6">
            <h3 class="text-base font-medium text-gray-900 dark:text-white mb-1">
              Visa Products Available
            </h3>
            <p class="text-xs font-normal text-[#64748B] dark:text-gray-400 mb-6">
              Select which visa products nationals of this country can apply for.
            </p>
            
            <!-- Select Visa Product Section -->
            <div class="flex flex-col gap-2">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">Select Visa Product</h4>
              <div class="space-y-3">
                <div v-for="product in availableVisaProducts" :key="product.id" class="flex items-center">
                  <input
                    :id="`visa-product-${product.id}`"
                    v-model="selectedVisaProducts"
                    :value="product.id"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label :for="`visa-product-${product.id}`" class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                    {{ product.name }} - ${{ product.price }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Set Custom Prices Section -->
            <div class="mt-6 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">Set Custom Prices</h4>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="customPricingEnabled"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div v-if="customPricingEnabled" class="space-y-3">
                <div v-for="product in availableVisaProducts" :key="`custom-${product.id}`" class="flex items-center">
                  <input
                    :id="`custom-visa-product-${product.id}`"
                    v-model="customSelectedProducts"
                    :value="product.id"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label :for="`custom-visa-product-${product.id}`" class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                    {{ product.name }} - ${{ product.price }}
                  </label>
                </div>
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
import CustomDropdown from "~/components/ui/CustomDropdown.vue";
import { ArrowLeft } from "lucide-vue-next";

// Set page title
useHead({
  title: "Add Nationality - iVisa",
});

// Get route parameters
const route = useRoute();
const router = useRouter();

// Determine mode based on route parameters
const isEditMode = computed(() => route.query.mode === 'edit');
const isViewMode = computed(() => route.query.mode === 'view');
const nationalityId = computed(() => route.query.id);

// Form data
const nationalityForm = ref({
  name: "",
  destinationCountry: "",
});

// Options for dropdowns
const nationalityOptions = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Japan",
  "Australia",
  "Singapore",
  "Thailand",
  "UAE"
];

const destinationOptions = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Japan",
  "Australia",
  "Singapore",
  "Thailand",
  "UAE"
];

// Visa products data
const availableVisaProducts = ref([
  { id: 1, name: "30 - Day Visa", price: 100 },
  { id: 2, name: "60 - Day Visa", price: 150 },
  { id: 3, name: "90 - Day Visa", price: 200 },
]);

// Selected visa products
const selectedVisaProducts = ref([]);
const customSelectedProducts = ref([]);
const customPricingEnabled = ref(false);

// Sample nationalities data (in a real app, this would come from an API)
const nationalitiesData = [
  {
    id: 1,
    name: "Pakistani",
    code: "PK",
    description: "Citizens of Pakistan",
  },
  {
    id: 2,
    name: "Indian",
    code: "IN",
    description: "Citizens of India",
  },
  {
    id: 3,
    name: "Bangladeshi",
    code: "BD",
    description: "Citizens of Bangladesh",
  },
  {
    id: 4,
    name: "Sri Lankan",
    code: "LK",
    description: "Citizens of Sri Lanka",
  },
  {
    id: 5,
    name: "Nepalese",
    code: "NP",
    description: "Citizens of Nepal",
  },
];

// Load data if editing or viewing
onMounted(() => {
  if (nationalityId.value) {
    const nationality = nationalitiesData.find(n => n.id === parseInt(nationalityId.value));
    if (nationality) {
      nationalityForm.value = { ...nationality };
    }
  }
});

// Navigation
const goBack = () => {
  router.push("/dashboard/nationalities");
};

const saveNationality = () => {
  // Validate form
  if (!nationalityForm.value.name.trim()) {
    alert("Please enter a nationality name");
    return;
  }

  if (!nationalityForm.value.destinationCountry.trim()) {
    alert("Please select a destination country");
    return;
  }

  // Prepare data with visa products
  const nationalityData = {
    ...nationalityForm.value,
    selectedVisaProducts: selectedVisaProducts.value,
    customPricingEnabled: customPricingEnabled.value,
    customSelectedProducts: customSelectedProducts.value,
  };

  // Here you would typically save to your backend
  console.log("Saving nationality:", nationalityData);
  
  // For now, just show success and redirect
  alert(isEditMode.value ? "Nationality updated successfully!" : "Nationality saved successfully!");
  goBack();
};
</script>
