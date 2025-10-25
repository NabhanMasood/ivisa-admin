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
              {{ isEditMode ? 'Edit Visa Product' : isViewMode ? 'View Visa Product' : 'Add Visa Product' }}
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
            @click="saveVisaProduct"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 py-[30px] px-[34px]" >
        <div class="space-y-6">
          <!-- Country Details Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Country Details
            </h3>
            <div class="flex flex-col gap-[18px]">
              <!-- Country Dropdown -->
              <CustomDropdown
                id="country"
                label="Country"
                v-model="visaProductForm.country"
                :options="countryOptions"
                placeholder="Select country"
                search-placeholder="Search country"
              />

              <!-- Product Name Input -->
              <div>
                <label
                  for="productName"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Product Name
                </label>
                <input
                  id="productName"
                v-model="visaProductForm.productName"
                  type="text"
                  placeholder="e.g.30 Day Visa"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>

              <!-- Duration Input -->
              <div>
                <label
                  for="duration"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Duration (Days)
                </label>
                <input
                  id="duration"
                  v-model="visaProductForm.duration"
                  type="text"
                  placeholder="e.g. 30 days"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>

              <!-- Validity Input -->
              <div>
                <label
                  for="validity"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Validity (Days)
                </label>
                <input
                  id="validity"
                  v-model="visaProductForm.validity"
                  type="text"
                  placeholder="e.g. 30 days"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>

              <!-- Price Input -->
              <div>
                <label
                  for="price"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Price ($)
                </label>
                <input
                  id="price"
                  v-model="visaProductForm.price"
                  type="number"
                  placeholder="e.g. $100"
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
  title: "Add Visa Product - iVisa",
});

// Get route parameters
const route = useRoute();
const router = useRouter();

// Determine mode based on route parameters
const isEditMode = computed(() => route.query.mode === 'edit');
const isViewMode = computed(() => route.query.mode === 'view');
const productId = computed(() => route.query.id);
const countryParam = computed(() => route.query.country);
const productNameParam = computed(() => route.query.productName); 

// Sample visa products data (in a real app, this would come from an API)
const visaProducts = ref([
  {
    id: 1,
    country: "United States",
    products: [
      {
        productName: "Tourist Visa (B-2)",
        duration: "6 months",
        validity: "10 years",
        price: "160",
      },
      {
        productName: "Business Visa (B-1)",
        duration: "6 months",
        validity: "10 years",
        price: "180",
      },
      {
        productName: "Student Visa (F-1)",
        duration: "4 years",
        validity: "5 years",
        price: "200",
      },
    ],
    selected: false,
  },
  {
    id: 2,
    country: "United Kingdom",
    products: [
      {
        productName: "Tourist Visa",
        duration: "6 months",
        validity: "6 months",
        price: "100",
      },
      {
        productName: "Business Visa",
        duration: "6 months",
        validity: "2 years",
        price: "150",
      },
      {
        productName: "Student Visa",
        duration: "2 years",
        validity: "5 years",
        price: "220",
      },
    ],
    selected: false,
  },
  {
    id: 3,
    country: "Canada",
    products: [
      {
        productName: "Tourist Visa",
        duration: "6 months",
        validity: "10 years",
        price: "100",
      },
      {
        productName: "Work Visa",
        duration: "2 years",
        validity: "3 years",
        price: "250",
      },
      {
        productName: "Student Visa",
        duration: "4 years",
        validity: "5 years",
        price: "190",
      },
    ],
    selected: false,
  },
  {
    id: 4,
    country: "Germany",
    products: [
      {
        productName: "Schengen Visa",
        duration: "90 days",
        validity: "6 months",
        price: "80",
      },
      {
        productName: "Business Visa",
        duration: "90 days",
        validity: "1 year",
        price: "120",
      },
      {
        productName: "Work Visa",
        duration: "2 years",
        validity: "3 years",
        price: "260",
      },
    ],
    selected: false,
  },
  {
    id: 5,
    country: "France",
    products: [
      {
        productName: "Tourist Visa",
        duration: "30 days",
        validity: "3 months",
        price: "90",
      },
      {
        productName: "Schengen Visa",
        duration: "90 days",
        validity: "6 months",
        price: "100",
      },
      {
        productName: "Student Visa",
        duration: "2 years",
        validity: "3 years",
        price: "210",
      },
    ],
    selected: false,
  },
  {
    id: 6,
    country: "Japan",
    products: [
      {
        productName: "Business Visa",
        duration: "90 days",
        validity: "1 year",
        price: "120",
      },
      {
        productName: "Tourist Visa",
        duration: "30 days",
        validity: "3 years",
        price: "90",
      },
      {
        productName: "Work Visa",
        duration: "1 year",
        validity: "3 years",
        price: "250",
      },
    ],
    selected: false,
  },
  {
    id: 7,
    country: "Australia",
    products: [
      {
        productName: "Work Visa",
        duration: "2 years",
        validity: "3 years",
        price: "300",
      },
      {
        productName: "Tourist Visa",
        duration: "3 months",
        validity: "1 year",
        price: "140",
      },
      {
        productName: "Student Visa",
        duration: "4 years",
        validity: "5 years",
        price: "280",
      },
    ],
    selected: false,
  },
  {
    id: 8,
    country: "Singapore",
    products: [
      {
        productName: "Tourist Visa",
        duration: "30 days",
        validity: "2 years",
        price: "50",
      },
      {
        productName: "Business Visa",
        duration: "60 days",
        validity: "1 year",
        price: "90",
      },
      {
        productName: "Work Visa",
        duration: "1 year",
        validity: "2 years",
        price: "180",
      },
    ],
    selected: false,
  },
  {
    id: 9,
    country: "Thailand",
    products: [
      {
        productName: "Tourist Visa",
        duration: "30 days",
        validity: "3 months",
        price: "40",
      },
      {
        productName: "Business Visa",
        duration: "90 days",
        validity: "6 months",
        price: "80",
      },
      {
        productName: "Work Visa",
        duration: "1 year",
        validity: "1 year",
        price: "150",
      },
    ],
    selected: false,
  },
  {
    id: 10,
    country: "UAE",
    products: [
      {
        productName: "Business Visa",
        duration: "90 days",
        validity: "6 months",
        price: "250",
      },
      {
        productName: "Tourist Visa",
        duration: "30 days",
        validity: "3 months",
        price: "150",
      },
      {
        productName: "Freelancer Visa",
        duration: "2 years",
        validity: "3 years",
        price: "350",
      },
    ],
    selected: false,
  },
]); 

// Form data
const visaProductForm = ref({
  country: visaProducts?.value?.find(product => product.id === parseInt(productId.value))?.country || "",
  productName: visaProducts?.value?.find(product => product.id === parseInt(productId.value))?.products.find(product => product.productName === productNameParam.value)?.productName || "",
  duration: visaProducts?.value?.find(product => product.id === parseInt(productId.value))?.products.find(product => product.productName === productNameParam.value)?.duration || "",
  validity: visaProducts?.value?.find(product => product.id === parseInt(productId.value))?.products.find(product => product.productName === productNameParam.value)?.validity || "",
  price: visaProducts?.value?.find(product => product.id === parseInt(productId.value))?.products.find(product => product.productName === productNameParam.value)?.price || "",
});

// Country options
const countryOptions = [
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


// // Load data if editing or viewing
// onMounted(() => {
//   if (productId.value) {
//     const product = visaProducts.value.find(product => product.id === parseInt(productId.value));
//     if (product) {
//       visaProductForm.value = { ...product.products[0], country: product.country || "" };
//     }
//   } else if (countryParam.value) {
//     // Pre-fill country if coming from country-specific page
//     visaProductForm.value.country = countryParam.value;
//   }
// });

// Navigation
const goBack = () => {
  router.push("/dashboard/visaproducts");
};

const saveVisaProduct = () => {
  // Validate form
  if (!visaProductForm.value.country.trim()) {
    alert("Please select a country");
    return;
  }
  if (!visaProductForm.value.productName.trim()) {
    alert("Please enter a product name");
    return;
  }
  if (!visaProductForm.value.duration.trim()) {
    alert("Please enter duration");
    return;
  }
  if (!visaProductForm.value.validity.trim()) {
    alert("Please enter validity");
    return;
  }
  if (!visaProductForm.value.price.trim()) {
    alert("Please enter price");
    return;
  }

  // Here you would typically save to your backend
  console.log("Saving visa product:", visaProductForm.value);
  
  // For now, just show success and redirect
  alert(isEditMode.value ? "Visa product updated successfully!" : "Visa product saved successfully!");
  goBack();
};
</script>
