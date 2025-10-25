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
              {{ isEditMode ? 'Edit Embassy' : isViewMode ? 'View Embassy' : 'Add Embassy' }}
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
            @click="saveEmbassy"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 py-[30px] px-[34px]">
        <div class="space-y-6">
          <!-- Embassy Details Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Embassy Details
            </h3>
            <div class="flex flex-col gap-4">
              <!-- Destination Country Custom Dropdown -->
              <CustomDropdown
                id="destinationCountry"
                label="Destination Country"
                v-model="embassyForm.destinationCountry"
                :options="destinationCountries"
                placeholder="Select destination country"
                search-placeholder="Search destination country"
              />

              <!-- Origin Country Custom Dropdown -->
              <CustomDropdown
                id="originCountry"
                label="Origin Country Embassy Location"
                v-model="embassyForm.originCountry"
                :options="originCountries"
                placeholder="Select origin country"
                search-placeholder="Search origin country"
              />

              <!-- Embassy Name Input -->
              <div>
                <label
                  for="embassyName"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Embassy Name
                </label>
                <input
                  id="embassyName"
                  v-model="embassyForm.embassyName"
                  type="text"
                  placeholder="Enter Embassy Name"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                  />
              </div>
              <div>
                <label
                  for="address"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Address
                </label>
                <input
                  id="address"
                  v-model="embassyForm.address"
                  type="text"
                  placeholder="Enter Address"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
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
import CustomDropdown from "~/components/ui/CustomDropdown.vue";
import { ArrowLeft } from "lucide-vue-next";

// Set page title
useHead({
  title: "Add Embassy - iVisa",
});

// Get route parameters
const route = useRoute();
const router = useRouter();

// Determine mode based on route parameters
const isEditMode = computed(() => route.query.mode === 'edit');
const isViewMode = computed(() => route.query.mode === 'view');
const embassyId = computed(() => route.query.id);
const countryParam = computed(() => route.query.country);


const embassies = ref([
  {
    id: 1,
    destinationCountry: "United States",
    originCountries: [
      {
        name: "Pakistan",
        embassies: [
          { name: "US Embassy Islamabad", location: "Islamabad" },
          { name: "US Consulate Karachi", location: "Karachi" },
          { name: "US Consulate Lahore", location: "Lahore" },
        ],
      },
      {
        name: "India",
        embassies: [
          { name: "US Embassy New Delhi", location: "New Delhi" },
          { name: "US Consulate Mumbai", location: "Mumbai" },
          { name: "US Consulate Chennai", location: "Chennai" },
        ],
      },
      {
        name: "Bangladesh",
        embassies: [
          { name: "US Embassy Dhaka", location: "Dhaka" },
        ],
      },
    ],
    selected: false,
  },
  {
    id: 2,
    destinationCountry: "United Kingdom",
    originCountries: [
      {
        name: "Pakistan",
        embassies: [
          { name: "British High Commission Islamabad", location: "Islamabad" },
          { name: "British Deputy High Commission Karachi", location: "Karachi" },
        ],
      },
      {
        name: "India",
        embassies: [
          { name: "British High Commission New Delhi", location: "New Delhi" },
          { name: "British Deputy High Commission Mumbai", location: "Mumbai" },
        ],
      },
      {
        name: "Sri Lanka",
        embassies: [
          { name: "British High Commission Colombo", location: "Colombo" },
        ],
      },
    ],
    selected: false,
  },
  {
    id: 3,
    destinationCountry: "Canada",
    originCountries: [
      {
        name: "Pakistan",
        embassies: [
          { name: "Canadian High Commission Islamabad", location: "Islamabad" },
        ],
      },
      {
        name: "India",
        embassies: [
          { name: "Canadian High Commission New Delhi", location: "New Delhi" },
          { name: "Canadian Consulate Bangalore", location: "Bangalore" },
        ],
      },
      {
        name: "Bangladesh",
        embassies: [
          { name: "Canadian High Commission Dhaka", location: "Dhaka" },
        ],
      },
    ],
    selected: false,
  },
  {
    id: 4,
    destinationCountry: "Germany",
    originCountries: [
      {
        name: "Pakistan",
        embassies: [
          { name: "German Embassy Islamabad", location: "Islamabad" },
          { name: "German Consulate Karachi", location: "Karachi" },
        ],
      },
      {
        name: "India",
        embassies: [
          { name: "German Embassy New Delhi", location: "New Delhi" },
          { name: "German Consulate Mumbai", location: "Mumbai" },
        ],
      },
      {
        name: "Afghanistan",
        embassies: [
          { name: "German Embassy Kabul", location: "Kabul" },
        ],
      },
    ],
    selected: false,
  },
  {
    id: 5,
    destinationCountry: "France",
    originCountries: [
      {
        name: "Pakistan",
        embassies: [
          { name: "French Embassy Islamabad", location: "Islamabad" },
        ],
      },
      {
        name: "India",
        embassies: [
          { name: "French Embassy New Delhi", location: "New Delhi" },
          { name: "French Consulate Mumbai", location: "Mumbai" },
        ],
      },
      {
        name: "Bangladesh",
        embassies: [
          { name: "French Embassy Dhaka", location: "Dhaka" },
        ],
      },
    ],
    selected: false,
  },
  {
    id: 6,
    destinationCountry: "Japan",
    originCountries: [
      {
        name: "Pakistan",
        embassies: [
          { name: "Japanese Embassy Islamabad", location: "Islamabad" },
        ],
      },
      {
        name: "India",
        embassies: [
          { name: "Japanese Embassy New Delhi", location: "New Delhi" },
        ],
      },
      {
        name: "Sri Lanka",
        embassies: [
          { name: "Japanese Embassy Colombo", location: "Colombo" },
        ],
      },
    ],
    selected: false,
  },
  {
    id: 7,
    destinationCountry: "Australia",
    originCountries: [
      {
        name: "Pakistan",
        embassies: [
          { name: "Australian High Commission Islamabad", location: "Islamabad" },
        ],
      },
      {
        name: "India",
        embassies: [
          { name: "Australian High Commission New Delhi", location: "New Delhi" },
          { name: "Australian Consulate Chennai", location: "Chennai" },
        ],
      },
      {
        name: "Bangladesh",
        embassies: [
          { name: "Australian High Commission Dhaka", location: "Dhaka" },
        ],
      },
    ],
    selected: false,
  },
  {
    id: 8,
    destinationCountry: "Singapore",
    originCountries: [
      {
        name: "Pakistan",
        embassies: [
          { name: "Singapore High Commission Islamabad", location: "Islamabad" },
        ],
      },
      {
        name: "India",
        embassies: [
          { name: "Singapore High Commission New Delhi", location: "New Delhi" },
        ],
      },
      {
        name: "Sri Lanka",
        embassies: [
          { name: "Singapore High Commission Colombo", location: "Colombo" },
        ],
      },
    ],
    selected: false,
  },
  {
    id: 9,
    destinationCountry: "Thailand",
    originCountries: [
      {
        name: "Pakistan",
        embassies: [
          { name: "Royal Thai Embassy Islamabad", location: "Islamabad" },
        ],
      },
      {
        name: "India",
        embassies: [
          { name: "Royal Thai Embassy New Delhi", location: "New Delhi" },
        ],
      },
      {
        name: "Bangladesh",
        embassies: [
          { name: "Royal Thai Embassy Dhaka", location: "Dhaka" },
        ],
      },
    ],
    selected: false,
  },
  {
    id: 10,
    destinationCountry: "UAE",
    originCountries: [
      {
        name: "Pakistan",
        embassies: [
          { name: "UAE Embassy Islamabad", location: "Islamabad" },
          { name: "UAE Consulate Karachi", location: "Karachi" },
        ],
      },
      {
        name: "India",
        embassies: [
          { name: "UAE Embassy New Delhi", location: "New Delhi" },
          { name: "UAE Consulate Mumbai", location: "Mumbai" },
        ],
      },
      {
        name: "Bangladesh",
        embassies: [
          { name: "UAE Embassy Dhaka", location: "Dhaka" },
        ],
      },
    ],
    selected: false,
  },
]);

// Form data
const embassyForm = ref({
  destinationCountry: "",
  originCountry: "",
  embassyName: "",
  address: "",
});

// Country lists
const destinationCountries = [
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

const originCountries = [
  "Pakistan",
  "India",
  "Bangladesh",
  "Sri Lanka",
  "Nepal",
  "Afghanistan",
  "Iran",
  "Iraq",
  "Syria",
  "Yemen"
];

// Load data if editing or viewing
onMounted(() => {
  if (isEditMode.value && embassyId.value) {
    // Load data from query parameters for edit mode
    embassyForm.value = {
      destinationCountry: route.query.destinationCountry || "",
      originCountry: route.query.originCountry || "",
      embassyName: route.query.embassyName || "",
      address: route.query.address || "",
    };
  } else if (countryParam.value) {
    // Pre-fill destination country if coming from country-specific page
    embassyForm.value.destinationCountry = countryParam.value;
  }
});

// Navigation
const goBack = () => {
  router.push("/dashboard/embassies");
};

const saveEmbassy = () => {
  // Validate form
  if (!embassyForm.value.destinationCountry.trim()) {
    alert("Please select a destination country");
    return;
  }
  if (!embassyForm.value.originCountry.trim()) {
    alert("Please select an origin country");
    return;
  }
  if (!embassyForm.value.embassyName.trim()) {
    alert("Please enter an embassy name");
    return;
  }

  // Here you would typically save to your backend
  console.log("Saving embassy:", embassyForm.value);
  
  // For now, just show success and redirect
  alert(isEditMode.value ? "Embassy updated successfully!" : "Embassy saved successfully!");
  goBack();
};
</script>
