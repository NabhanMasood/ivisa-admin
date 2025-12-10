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
              
              <!-- Free Visa Checkbox for the entire pair -->
              <div
                v-if="nationalityForm.name && nationalityForm.destinationCountry"
                class="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-md"
              >
                <input
                  id="free-visa-pair"
                  v-model="isFreeVisaPair"
                  type="checkbox"
                  :disabled="isViewMode"
                  class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded mt-0.5"
                />
                <label
                  for="free-visa-pair"
                  class="text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                >
                  <span class="font-medium text-orange-600 dark:text-orange-400">Free Visa</span>
                 
                </label>
              </div>
            </div>
          </div>

          <!-- Visa Products Available Section -->
          <!-- Hide this section when free visa is checked (products won't be shown to clients anyway) -->
          <div
            v-if="nationalityForm.name && nationalityForm.destinationCountry && !isFreeVisaPair"
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
                    {{ product.productName }} - ${{ isFreeVisaPair ? '0.00' : product.totalAmount }} ({{ product.duration }} days, Valid for {{ product.validity }} days)
                    <span v-if="isFreeVisaPair" class="ml-2 text-xs text-orange-600 dark:text-orange-400 font-medium">(Free Visa)</span>
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

                  <!-- Price Inputs (shown only if product is selected and NOT free visa pair) -->
                  <template v-if="customSelectedProducts.includes(product.productName) && !isFreeVisaPair && customPrices[product.productName]">
                    <div class="mt-4 grid grid-cols-3 gap-4">
                      <div class="flex flex-col gap-2">
                        <label
                          class="block text-xs font-medium text-gray-700 dark:text-gray-300"
                        >
                          Gov't Fee <span class="text-red-500">*</span>
                        </label>
                        <input
                          :id="`govt-fee-${product.productName}`"
                          v-model.number="customPrices[product.productName]!.govtFee"
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
                          v-model.number="customPrices[product.productName]!.serviceFee"
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
                  </template>
                  
                  <!-- Free Visa Info (shown when product is selected for custom pricing AND pair is marked as free visa) -->
                  <div
                    v-if="customSelectedProducts.includes(product.productName) && isFreeVisaPair"
                    class="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-md"
                  >
                    <p class="text-xs text-orange-700 dark:text-orange-300">
                      <span class="font-medium">Free Visa Pair:</span> All fees are automatically set to $0.00. All products for this nationality-destination pair will not appear on the client-side application.
                    </p>
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
const { createNationality, getNationalities, getNationalityDestinationProducts, updateNationality, deleteNationality } = useNationalitiesApi();

// Determine mode based on route parameters
const isEditMode = computed(() => route.query.mode === "edit");
const isViewMode = computed(() => route.query.mode === "view");
const nationalityId = computed(() => route.query.id);
const editNationality = computed(() => route.query.nationality as string | undefined);
const editDestination = computed(() => route.query.destination as string | undefined);

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
// Free visa for the entire nationality-destination pair
const isFreeVisaPair = ref(false);

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
      isFreeVisaPair.value = false;
    }
  }
);

// Watch nationality or destination changes - reset free visa when pair changes
watch(
  () => [nationalityForm.value.name, nationalityForm.value.destinationCountry],
  () => {
    isFreeVisaPair.value = false;
  }
);

// Watch free visa pair - auto-set fees to 0 when marked as free visa
watch(
  isFreeVisaPair,
  (isFree) => {
    if (isFree) {
      // When pair is marked as free visa, set all custom prices to 0
      Object.keys(customPrices.value).forEach((productName) => {
        if (customPrices.value[productName]) {
          customPrices.value[productName].govtFee = 0;
          customPrices.value[productName].serviceFee = 0;
          customPrices.value[productName].totalAmount = 0;
        }
      });
    } else {
      // When pair is unmarked as free visa, restore original prices
      Object.keys(customPrices.value).forEach((productName) => {
        const product = availableVisaProducts.value.find(
          (p) => p.productName === productName
        );
        if (product && customPrices.value[productName]) {
          customPrices.value[productName].govtFee = product.govtFee ? Number(product.govtFee) : null;
          customPrices.value[productName].serviceFee = product.serviceFee ? Number(product.serviceFee) : null;
          customPrices.value[productName].totalAmount = product.totalAmount ? Number(product.totalAmount) : 0;
        }
      });
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

// Load existing pair data if in edit mode
const loadExistingPairData = async () => {
  if (!isEditMode.value || !editNationality.value || !editDestination.value) {
    return;
  }

  try {
    isLoading.value = true;
    
    // Pre-fill nationality and destination
    nationalityForm.value.name = editNationality.value;
    nationalityForm.value.destinationCountry = editDestination.value;
    
    // Load products for this destination
    await loadVisaProductsForDestination(editDestination.value);
    
    // Get existing nationality records for this pair
    const nationalitiesResponse = await getNationalities();
    if (nationalitiesResponse.success && nationalitiesResponse.data) {
      const matchingNationalities = nationalitiesResponse.data.filter((nat: any) => {
        const natName = (nat.nationality || '').toLowerCase().trim();
        const destName = (nat.destination || nat.destinationCountry || '').toLowerCase().trim();
        return natName === editNationality.value!.toLowerCase().trim() &&
               destName === editDestination.value!.toLowerCase().trim();
      });
      
      // Check if pair is free visa
      const hasFreeVisa = matchingNationalities.some((nat: any) => {
        return nat.isFreeVisa === true || nat.isFreeVisa === 'true' || nat.isFreeVisa === 1;
      });
      
      if (hasFreeVisa) {
        isFreeVisaPair.value = true;
      }
      
      // Get existing products for this pair
      const productsResponse = await getNationalityDestinationProducts(
        editNationality.value,
        editDestination.value,
        true // includeFreeVisas=true
      );
      
      if (productsResponse.success && productsResponse.data) {
        // Extract unique product names
        const existingProductNames = [...new Set(productsResponse.data.map((p: any) => p.productName))];
        selectedVisaProducts.value = existingProductNames;
      }
    }
  } catch (error) {
    console.error('Failed to load existing pair data:', error);
    errorMessage.value = "Failed to load existing pair data";
  } finally {
    isLoading.value = false;
  }
};

// Load dropdown options on mount
onMounted(async () => {
  isLoadingDropdowns.value = true;
  try {
    await Promise.all([loadNationalityOptions(), loadDestinationOptions()]);
    
    // If in edit mode, load existing data
    if (isEditMode.value) {
      await loadExistingPairData();
    }
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

  // Skip product selection validation if free visa is checked
  // User can mark the pair as free visa without selecting products
  if (selectedVisaProducts.value.length === 0 && !isFreeVisaPair.value) {
    errorMessage.value = "Please select at least one visa product";
    return;
  }

  // Validate custom prices if enabled (skip validation for free visa pair)
  if (customPricingEnabled.value && customSelectedProducts.value.length > 0 && !isFreeVisaPair.value) {
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

    // If free visa is checked but no products selected, use all available products
    const productsToProcess = isFreeVisaPair.value && selectedVisaProducts.value.length === 0
      ? availableVisaProducts.value.map(p => p.productName)
      : selectedVisaProducts.value;

    // Prepare products for API calls - one call per product
    // Note: If free visa is checked, only the FIRST product needs isFreeVisa=true
    // The backend will hide all products for the pair if any product is marked as free visa
    const productsToCreate = productsToProcess.map((productName, index) => {
      const product = availableVisaProducts.value.find(
        (p) => p.productName === productName
      );
      const isCustomPriced =
        customPricingEnabled.value &&
        customSelectedProducts.value.includes(productName);
      const customPrice = customPrices.value[productName];

      // If free visa pair, set fees to 0 for all products
      // Only mark the first product as isFreeVisa=true (backend treats it at pair level)
      const isFirstProduct = index === 0;
      const govtFee = isFreeVisaPair.value ? 0 : (isCustomPriced && customPrice
        ? Number(customPrice.govtFee)
        : Number(product?.govtFee || 0));
      const serviceFee = isFreeVisaPair.value ? 0 : (isCustomPriced && customPrice
        ? Number(customPrice.serviceFee)
        : Number(product?.serviceFee || 0));
      const totalAmount = isFreeVisaPair.value ? 0 : (isCustomPriced && customPrice
        ? Number(customPrice.totalAmount)
        : Number(product?.totalAmount || 0));

      return {
        nationality: nationalityForm.value.name.trim(),
        destination: nationalityForm.value.destinationCountry.trim(),
        productName: productName, // Use the productName from the map directly, not from product object
        govtFee,
        serviceFee,
        totalAmount,
        // Explicitly set isFreeVisa based on checkbox state
        // If free visa is checked: only first product gets isFreeVisa=true (backend treats it at pair level)
        // If free visa is unchecked: all products get isFreeVisa=false
        isFreeVisa: isFreeVisaPair.value && isFirstProduct ? true : false,
      };
    });

    // If in edit mode, we need to update existing records or create new ones
    if (isEditMode.value && editNationality.value && editDestination.value) {
      // Get existing nationality records for this pair
      const nationalitiesResponse = await getNationalities();
      let existingNationalities: any[] = [];
      
      if (nationalitiesResponse.success && nationalitiesResponse.data) {
        existingNationalities = nationalitiesResponse.data.filter((nat: any) => {
          const natName = (nat.nationality || '').toLowerCase().trim();
          const destName = (nat.destination || nat.destinationCountry || '').toLowerCase().trim();
          return natName === editNationality.value!.toLowerCase().trim() &&
                 destName === editDestination.value!.toLowerCase().trim();
        });
      }
      
      // Create a map of existing products by productName (only include records with valid IDs)
      const existingProductsMap = new Map();
      existingNationalities.forEach((nat: any) => {
        if (nat.productName && nat.id) {
          // Only add to map if both productName and id exist
          existingProductsMap.set(nat.productName, nat);
        }
      });
      
      // Debug logging
      if (process.dev) {
        console.log('Edit mode - existing nationalities:', {
          total: existingNationalities.length,
          withIds: existingNationalities.filter((n: any) => n.id).length,
          productsMap: Array.from(existingProductsMap.entries()).map(([name, nat]: [string, any]) => ({
            productName: name,
            id: nat.id,
            isFreeVisa: nat.isFreeVisa
          }))
        });
      }
      
      const results = [];
      let hasError = false;
      
      // Process each product
      for (const productPayload of productsToCreate) {
        try {
          const existingProduct = existingProductsMap.get(productPayload.productName);
          
          if (existingProduct && existingProduct.id) {
            // Update existing record - verify ID exists
            if (!existingProduct.id) {
              console.warn(`No ID found for product ${productPayload.productName}, creating new record instead`);
              // Create new record if ID is missing
              const response = await createNationality(productPayload);
              if (response.success) {
                results.push(response);
              } else {
                hasError = true;
                errorMessage.value = response.message || "Failed to create some nationality entries.";
              }
            } else {
              // Update existing record - include all required fields
              const updatePayload: any = {
                productName: productPayload.productName, // Include productName as it might be required
                govtFee: productPayload.govtFee,
                serviceFee: productPayload.serviceFee,
                totalAmount: productPayload.totalAmount,
                isFreeVisa: productPayload.isFreeVisa,
              };
              
              try {
                const response = await updateNationality(existingProduct.id, updatePayload);
                if (response.success) {
                  results.push(response);
                } else {
                  hasError = true;
                  errorMessage.value = response.message || "Failed to update some nationality entries.";
                }
              } catch (updateError: any) {
                // If update fails (e.g., 404 - backend doesn't support PATCH or record doesn't exist), create new record instead
                const updateErrorMessage = updateError?.message || String(updateError);
                console.warn(`Update failed for product ${productPayload.productName} (ID: ${existingProduct.id}): ${updateErrorMessage}. Creating new record instead.`);
                
                // Verify productPayload has all required fields before creating
                if (!productPayload.productName || !productPayload.nationality || !productPayload.destination) {
                  console.error(`Cannot create record - missing required fields:`, productPayload);
                  hasError = true;
                  errorMessage.value = `Missing required fields for product ${productPayload.productName || 'unknown'}`;
                  continue; // Skip this product and continue with others
                }
                
                // When creating fallback record, ensure isFreeVisa is set correctly
                const fallbackPayload = {
                  ...productPayload,
                  isFreeVisa: isFreeVisaPair.value ? false : false, // Explicitly false when checkbox is unchecked
                };
                
                try {
                  const response = await createNationality(fallbackPayload);
                  if (response.success) {
                    results.push(response);
                  } else {
                    hasError = true;
                    errorMessage.value = response.message || "Failed to create some nationality entries.";
                  }
                } catch (createError: any) {
                  hasError = true;
                  const createErrorMsg = createError instanceof Error ? createError.message : "Failed to create nationality. Please try again.";
                  console.error(`Create failed for product ${productPayload.productName}:`, createError);
                  errorMessage.value = createErrorMsg;
                }
              }
            }
          } else {
            // Create new record - verify all required fields are present
            if (!productPayload.productName || !productPayload.nationality || !productPayload.destination) {
              console.error(`Cannot create record - missing required fields:`, productPayload);
              hasError = true;
              errorMessage.value = `Missing required fields for product ${productPayload.productName || 'unknown'}`;
              continue; // Skip this product and continue with others
            }
            
            // Ensure isFreeVisa is explicitly set based on checkbox state
            const createPayload = {
              ...productPayload,
              isFreeVisa: isFreeVisaPair.value ? productPayload.isFreeVisa : false,
            };
            
            const response = await createNationality(createPayload);
            if (response.success) {
              results.push(response);
            } else {
              hasError = true;
              errorMessage.value = response.message || "Failed to create some nationality entries.";
            }
          }
        } catch (error) {
          hasError = true;
          const errorMsg = error instanceof Error ? error.message : "Failed to save nationality. Please try again.";
          console.error(`Error processing product ${productPayload.productName}:`, error);
          errorMessage.value = errorMsg;
          // Don't break - continue processing other products
        }
      }
      
      // If free visa is unchecked, delete all old records with isFreeVisa=true for this pair
      // This ensures the pair is no longer marked as free visa (backend checks if ANY record has isFreeVisa=true)
      if (!isFreeVisaPair.value) {
        const freeVisaRecords = existingNationalities.filter((nat: any) => {
          return nat.isFreeVisa === true || nat.isFreeVisa === 'true' || nat.isFreeVisa === 1;
        });
        
        if (freeVisaRecords.length > 0) {
          if (process.dev) {
            console.log(`🗑️ Deleting ${freeVisaRecords.length} old free visa records for ${editNationality.value} → ${editDestination.value}`);
          }
          
          // Delete old free visa records
          for (const freeVisaRecord of freeVisaRecords) {
            if (freeVisaRecord.id) {
              try {
                await deleteNationality(freeVisaRecord.id);
                if (process.dev) {
                  console.log(`✅ Deleted free visa record: ${freeVisaRecord.productName} (ID: ${freeVisaRecord.id})`);
                }
              } catch (deleteError) {
                console.warn(`Failed to delete free visa record ${freeVisaRecord.id}:`, deleteError);
                // Continue with other deletions even if one fails
              }
            }
          }
        }
      }
      
      // Delete products that are no longer selected (if any)
      const selectedProductNames = new Set(productsToCreate.map(p => p.productName));
      for (const existingNat of existingNationalities) {
        if (existingNat.productName && !selectedProductNames.has(existingNat.productName)) {
          // Optionally delete removed products - for now, we'll just skip them
          // You can add delete functionality here if needed
        }
      }
      
      if (!hasError && results.length > 0) {
        successMessage.value = `Successfully updated ${results.length} nationality entr${results.length > 1 ? "ies" : "y"}!`;
        
        setTimeout(() => {
          // Navigate back to products page
          const nationalitySlug = nationalityForm.value.name.toLowerCase().replace(/\s+/g, '-');
          const destinationSlug = nationalityForm.value.destinationCountry.toLowerCase().replace(/\s+/g, '-');
          router.push(`/dashboard/nationalities/${nationalitySlug}/${destinationSlug}/products`);
        }, 1500);
      }
    } else {
      // Create mode - create new nationality entries
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
        isFreeVisaPair.value = false;

        setTimeout(() => {
          goBack();
        }, 1500);
      }
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