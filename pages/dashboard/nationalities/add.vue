<template>
  <DashboardLayout>
    <div
      class="flex flex-col gap-4 max-w-[796px] items-center justify-center mx-auto"
    >
      <!-- Page Header with Back Button -->
      <div
        class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4"
      >
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
              {{
                isEditMode
                  ? "Edit Nationality"
                  : isViewMode
                  ? "View Nationality"
                  : "Add Nationality"
              }}
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
            v-if="!isViewMode"
            @click="saveNationality"
            :disabled="isLoading"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span
              v-if="isLoading"
              class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            ></span>
            {{ isLoading ? "Saving..." : "Save Changes" }}
          </button>
        </div>
      </div>

      <!-- Error/Success Messages -->
      <div
        v-if="errorMessage"
        class="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
      >
        <p class="text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
      </div>
      <div
        v-if="successMessage"
        class="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
      >
        <p class="text-sm text-green-600 dark:text-green-400">
          {{ successMessage }}
        </p>
      </div>

      <!-- Form Section -->
      <div
        class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 py-[30px] px-[34px]"
      >
        <div class="space-y-6">
          <!-- Nationality Details Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Nationality Details
            </h3>
            <div class="flex flex-col gap-4">
              <!-- Nationality Dropdown -->
              <CustomDropdown
                id="countryName"
                label="Nationality (Passport Country)"
                v-model="nationalityForm.name"
                :options="nationalityOptions"
                placeholder="Select Country"
                search-placeholder="Search nationality"
                :disabled="isLoadingDropdowns"
              />

              <!-- Destination Country Dropdown -->
              <CustomDropdown
                id="destinationCountry"
                label="Destination Country"
                v-model="nationalityForm.destinationCountry"
                :options="destinationOptions"
                placeholder="Select Country"
                search-placeholder="Search destination country"
                :disabled="isLoadingDropdowns"
              />
            </div>
          </div>

          <!-- Visa Products Available Section -->
          <div
            v-if="nationalityForm.name && nationalityForm.destinationCountry"
            class="mt-6"
          >
            <h3
              class="text-base font-medium text-gray-900 dark:text-white mb-1"
            >
              Visa Products Available
            </h3>
            <p
              class="text-xs font-normal text-[#64748B] dark:text-gray-400 mb-6"
            >
              Select which visa products nationals of this country can apply
              for.
            </p>

            <!-- Loading State for Visa Products -->
            <div
              v-if="isLoadingProducts"
              class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <div
                class="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin"
              ></div>
              Loading visa products...
            </div>

            <!-- Select Visa Product Section -->
            <div v-else class="flex flex-col gap-2">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                Select Visa Product
              </h4>
              <div
                v-if="availableVisaProducts.length === 0"
                class="text-sm text-gray-500 dark:text-gray-400"
              >
                No visa products available for this destination
              </div>
              <div v-else class="space-y-3">
                <div
                  v-for="product in availableVisaProducts"
                  :key="product.productName"
                  class="flex items-center"
                >
                  <input
                    :id="`visa-product-${product.productName}`"
                    v-model="selectedVisaProducts"
                    :value="product.productName"
                    type="checkbox"
                    :disabled="isViewMode"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    :for="`visa-product-${product.productName}`"
                    class="ml-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {{ product.productName }} - ${{ product.totalAmount }} ({{ product.duration }} days, Valid for {{ product.validity }} days)
                  </label>
                </div>
              </div>
            </div>

            <!-- Set Custom Prices Section -->
            <div
              v-if="selectedVisaProducts.length > 0"
              class="mt-6 flex flex-col gap-2"
            >
              <div class="" style="flex-direction: column; gap: 20px">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                  Set Custom Prices
                </h4>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="customPricingEnabled"
                    type="checkbox"
                    :disabled="isViewMode"
                    class="sr-only peer"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                </label>
              </div>

              <div v-if="customPricingEnabled" class="space-y-4">
                <div
                  v-for="product in productsForCustomPricing"
                  :key="`custom-${product.productName}`"
                  class=""
                >
                  <div class="flex items-center mb-4">
                    <input
                      :id="`custom-visa-product-${product.productName}`"
                      v-model="customSelectedProducts"
                      :value="product.productName"
                      type="checkbox"
                      :disabled="isViewMode"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      :for="`custom-visa-product-${product.productName}`"
                      class="ml-3 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {{ product.productName }}
                    </label>
                  </div>

                  <!-- Price Inputs (shown only if product is selected) -->
                  <div
                    v-if="customSelectedProducts.includes(product.productName)"
                    class="mt-4 grid grid-cols-3 gap-4"
                  >
                    <div class="flex flex-col gap-2">
                      <label
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300"
                      >
                        Gov't Fee <span class="text-red-500">*</span>
                      </label>
                      <input
                        :id="`govt-fee-${product.productName}`"
                        v-model.number="customPrices[product.productName].govtFee"
                        type="number"
                        placeholder="e.g. 50"
                        :disabled="isLoading || isViewMode"
                        class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                      />
                    </div>

                    <div class="flex flex-col gap-2">
                      <label
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300"
                      >
                        Service Fee <span class="text-red-500">*</span>
                      </label>
                      <input
                        :id="`service-fee-${product.productName}`"
                        v-model.number="customPrices[product.productName].serviceFee"
                        type="number"
                        placeholder="e.g. 100"
                        :disabled="isLoading || isViewMode"
                        class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                      />
                    </div>

                    <div class="flex flex-col gap-2">
                      <label
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300"
                      >
                        Total Fee
                      </label>
                      <div
                        class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#2F2F31] text-[#111] dark:text-white py-1 px-3 text-sm flex items-center font-semibold"
                      >
                        ${{ getCustomTotal(product.productName) || "0" }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "~/components/DashboardLayout.vue";
import CustomDropdown from "~/components/ui/CustomDropdown.vue";
import { ArrowLeft } from "lucide-vue-next";
import { useNationalitiesApi } from "~/composables/useNationalitiesApi";
import { useVisaProductsApi } from "~/composables/useVisaProductsApi";
import { useCountriesApi } from "~/composables/useCountriesApi";

// Set page title
useHead({
  title: "Add Nationality - iVisa",
});

// Get route parameters
const route = useRoute();
const router = useRouter();

// Initialize APIs
const { getCountries } = useCountriesApi();
const { getVisaProducts, getVisaProductsByCountry } = useVisaProductsApi();
const { createNationality } = useNationalitiesApi();

// Determine mode based on route parameters
const isEditMode = computed(() => route.query.mode === "edit");
const isViewMode = computed(() => route.query.mode === "view");
const nationalityId = computed(() => route.query.id);

// Form data
const nationalityForm = ref({
  name: "",
  destinationCountry: "",
});

// Options for dropdowns (loaded from APIs)
const nationalityOptions = ref<string[]>([]);
const destinationOptions = ref<string[]>([]);
const isLoadingDropdowns = ref(false);
const isLoadingProducts = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

// Visa products data
const availableVisaProducts = ref<
  Array<{
    id?: number | string;
    productName: string;
    duration: number;
    validity: number;
    totalAmount: number;
    govtFee?: number;
    serviceFee?: number;
  }>
>([]);

// Selected visa products
const selectedVisaProducts = ref<string[]>([]);
const customSelectedProducts = ref<string[]>([]);
const customPricingEnabled = ref(false);

// Custom prices for selected products
const customPrices = ref<
  Record<
    string,
    {
      govtFee: number | null;
      serviceFee: number | null;
      totalAmount: number;
    }
  >
>({});

// Load countries for nationality dropdown (from countries API)
const loadNationalityOptions = async () => {
  try {
    const response = await getCountries();
    if (response.success && response.data) {
      nationalityOptions.value = response.data.map(
        (country) => country.countryName
      );
    }
  } catch (error) {
    console.error("Failed to load countries:", error);
    errorMessage.value = "Failed to load nationalities";
  }
};

const loadDestinationOptions = async () => {
  try {
    const response = await getVisaProducts(); // ✅ Get ALL products
    if (response.success && response.data) {
      // Extract unique country names from visa products
      const uniqueCountries = [...new Set(response.data.map((product) => product.country))];
      destinationOptions.value = uniqueCountries.sort();
    }
  } catch (error) {
    console.error("Failed to load destination countries:", error);
    errorMessage.value = "Failed to load destinations";
  }
};

// Load visa products when destination is selected
const loadVisaProductsForDestination = async (destination: string) => {
  if (!destination) {
    availableVisaProducts.value = [];
    selectedVisaProducts.value = [];
    customSelectedProducts.value = [];
    customPrices.value = {};
    return;
  }

  try {
    isLoadingProducts.value = true;
    const response = await getVisaProductsByCountry(destination);

    if (response.success && response.data) {
      availableVisaProducts.value = response.data.map((product) => ({
        id: product.id,
        productName: product.productName,
        duration: product.duration,
        validity: product.validity,
        totalAmount: product.totalAmount,
        govtFee: product.govtFee,
        serviceFee: product.serviceFee,
      }));

      // Reset selections when products change
      selectedVisaProducts.value = [];
      customSelectedProducts.value = [];
      customPrices.value = {};
    } else {
      availableVisaProducts.value = [];
      errorMessage.value = response.message || "Failed to load visa products";
    }
  } catch (error) {
    console.error("Failed to load visa products:", error);
    availableVisaProducts.value = [];
    errorMessage.value = "Failed to load visa products";
  } finally {
    isLoadingProducts.value = false;
  }
};

// Computed: Products selected for custom pricing
const productsForCustomPricing = computed(() => {
  return availableVisaProducts.value.filter((product) =>
    selectedVisaProducts.value.includes(product.productName)
  );
});

// Computed: Calculate total amount for custom prices
const getCustomTotal = (productName: string) => {
  const price = customPrices.value[productName];
  if (!price) return 0;
  const govtFee = Number(price.govtFee) || 0;
  const serviceFee = Number(price.serviceFee) || 0;
  return govtFee + serviceFee;
};

// Watch custom prices to auto-calculate total
watch(
  () => [customPrices.value],
  () => {
    Object.keys(customPrices.value).forEach((productName) => {
      const price = customPrices.value[productName];
      if (price) {
        price.totalAmount = getCustomTotal(productName);
      }
    });
  },
  { deep: true }
);

// Watch destination country changes
watch(
  () => nationalityForm.value.destinationCountry,
  (newDestination) => {
    if (newDestination) {
      loadVisaProductsForDestination(newDestination);
    } else {
      availableVisaProducts.value = [];
      selectedVisaProducts.value = [];
      customSelectedProducts.value = [];
      customPrices.value = {};
    }
  }
);

// Watch custom selected products to initialize custom prices
watch(
  customSelectedProducts,
  (newSelected, oldSelected) => {
    // Add new products to customPrices
    newSelected.forEach((productName) => {
      if (!customPrices.value[productName]) {
        const product = availableVisaProducts.value.find(
          (p) => p.productName === productName
        );
        customPrices.value[productName] = {
          govtFee: product?.govtFee ? Number(product.govtFee) : null,
          serviceFee: product?.serviceFee ? Number(product.serviceFee) : null,
          totalAmount: product?.totalAmount ? Number(product.totalAmount) : 0,
        };
      }
    });

    // Remove unselected products from customPrices
    oldSelected?.forEach((productName) => {
      if (!newSelected.includes(productName)) {
        delete customPrices.value[productName];
      }
    });
  },
  { deep: true }
);

// Load dropdown options on mount
onMounted(async () => {
  isLoadingDropdowns.value = true;
  try {
    await Promise.all([loadNationalityOptions(), loadDestinationOptions()]);
  } finally {
    isLoadingDropdowns.value = false;
  }
});

// Navigation
const goBack = () => {
  router.push("/dashboard/nationalities");
};

const saveNationality = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  // Validate form
  if (!nationalityForm.value.name.trim()) {
    errorMessage.value = "Please select a nationality (Passport Country)";
    return;
  }

  if (!nationalityForm.value.destinationCountry.trim()) {
    errorMessage.value = "Please select a destination country";
    return;
  }

  if (selectedVisaProducts.value.length === 0) {
    errorMessage.value = "Please select at least one visa product";
    return;
  }

  // Validate custom prices if enabled
  if (customPricingEnabled.value && customSelectedProducts.value.length > 0) {
    for (const productName of customSelectedProducts.value) {
      const price = customPrices.value[productName];
      if (!price || price.govtFee === null || price.serviceFee === null) {
        errorMessage.value = `Please fill all custom price fields for selected products`;
        return;
      }
    }
  }

  try {
    isLoading.value = true;

    // Prepare products for API calls - one call per product
    const productsToCreate = selectedVisaProducts.value.map((productName) => {
      const product = availableVisaProducts.value.find(
        (p) => p.productName === productName
      );
      const isCustomPriced =
        customPricingEnabled.value &&
        customSelectedProducts.value.includes(productName);
      const customPrice = customPrices.value[productName];

      return {
        nationality: nationalityForm.value.name.trim(),
        destination: nationalityForm.value.destinationCountry.trim(),
        productName: product?.productName || "",
        govtFee: isCustomPriced && customPrice
          ? Number(customPrice.govtFee)
          : Number(product?.govtFee || 0),
        serviceFee: isCustomPriced && customPrice
          ? Number(customPrice.serviceFee)
          : Number(product?.serviceFee || 0),
        totalAmount: isCustomPriced && customPrice
          ? Number(customPrice.totalAmount)
          : Number(product?.totalAmount || 0),
      };
    });

    // Make multiple API calls - one for each product
    const results = [];
    let hasError = false;

    for (const productPayload of productsToCreate) {
      try {
        const response = await createNationality(productPayload);
        if (response.success) {
          results.push(response);
        } else {
          hasError = true;
          errorMessage.value =
            response.message || "Failed to create some nationality entries.";
        }
      } catch (error) {
        hasError = true;
        errorMessage.value =
          error instanceof Error
            ? error.message
            : "Failed to create nationality. Please try again.";
        break;
      }
    }

    if (!hasError && results.length > 0) {
      successMessage.value = `Successfully created ${results.length} nationality entr${results.length > 1 ? "ies" : "y"}!`;

      // Reset form
      nationalityForm.value = {
        name: "",
        destinationCountry: "",
      };
      selectedVisaProducts.value = [];
      customSelectedProducts.value = [];
      customPrices.value = {};
      customPricingEnabled.value = false;

      setTimeout(() => {
        goBack();
      }, 1500);
    }
  } catch (error) {
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Failed to save nationality. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>