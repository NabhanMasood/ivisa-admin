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
              {{ isEditMode ? 'Edit Country' : isViewMode ? 'View Country' : 'Add Country' }}
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
            @click="saveCountry"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 py-[30px] px-[34px]">
        <div class="space-y-6">
          <!-- Country Details Section -->
          <div >
            <h3 class="text-bse font-medium text-gray-900 dark:text-white mb-[30px]">
              Country Details
            </h3>
            <div class="flex flex-col gap-4">
              <!-- Country Name Input -->
              <div class="flex flex-col gap-2">
                <label
                  for="countryName"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Country Name
                </label>
                <input
                  id="countryName"
                  v-model="countryForm.name"
                  type="text"
                  placeholder="Enter Name"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                  style="border-radius: 7px"
                />
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

// Set page title
useHead({
  title: "Add Country - iVisa",
});

// Get route parameters
const route = useRoute();
const router = useRouter();

// Determine mode based on route parameters
const isEditMode = computed(() => route.query.mode === 'edit');
const isViewMode = computed(() => route.query.mode === 'view');
const countryId = computed(() => route.query.id);

// Form data
const countryForm = ref({
  name: "",
  code: "",
  description: "",
});

// Sample countries data (in a real app, this would come from an API)
const countriesData = [
  {
    id: 1,
    name: "United States",
    code: "US",
    description: "United States of America",
  },
  {
    id: 2,
    name: "United Kingdom",
    code: "UK",
    description: "United Kingdom",
  },
  {
    id: 3,
    name: "Canada",
    code: "CA",
    description: "Canada",
  },
  {
    id: 4,
    name: "Germany",
    code: "DE",
    description: "Federal Republic of Germany",
  },
  {
    id: 5,
    name: "France",
    code: "FR",
    description: "French Republic",
  },
];

// Load data if editing or viewing
onMounted(() => {
  if (countryId.value) {
    const country = countriesData.find(c => c.id === parseInt(countryId.value));
    if (country) {
      countryForm.value = { ...country };
    }
  }
});

const goBack = () => {
  router.push("/dashboard/countries");
};

const saveCountry = () => {
  // Validate form
  if (!countryForm.value.name.trim()) {
    alert("Please enter a country name");
    return;
  }

  // Here you would typically save to your backend
  console.log("Saving country:", countryForm.value);
  
  // For now, just show success and redirect
  alert(isEditMode.value ? "Country updated successfully!" : "Country saved successfully!");
  goBack();
};
</script>
