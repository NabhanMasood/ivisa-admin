<template>
  <DashboardLayout>
    <div class="flex flex-col gap-4 max-w-[900px] mx-auto">
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
            <h1 class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Create Manual Application
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Create a visa application on behalf of a customer
            </p>
          </div>
        </div>
      </div>

      <!-- Step Indicator -->
      <div class="flex items-center justify-center gap-2 mb-4">
        <div
          v-for="step in 3"
          :key="step"
          class="flex items-center"
        >
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
              currentStep >= step
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            ]"
          >
            {{ step }}
          </div>
          <div
            v-if="step < 3"
            :class="[
              'w-12 h-0.5 mx-2',
              currentStep > step ? 'bg-black dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'
            ]"
          />
        </div>
      </div>

      <!-- Step 1: Trip Info + Customer Selection -->
      <div v-if="currentStep === 1" class="bg-white dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Step 1: Trip Information
        </h2>

        <!-- Customer Selection Section -->
        <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Customer</label>
          <div class="flex gap-4 mb-4">
            <button
              @click="customerMode = 'existing'"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                customerMode === 'existing'
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              ]"
            >
              Select Existing
            </button>
            <button
              @click="customerMode = 'new'"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                customerMode === 'new'
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              ]"
            >
              New Customer
            </button>
          </div>

          <!-- Existing Customer Dropdown -->
          <div v-if="customerMode === 'existing'" class="space-y-4">
            <div class="relative">
              <input
                v-model="customerSearch"
                type="text"
                placeholder="Search customers by name or email..."
                class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
              <div
                v-if="filteredCustomers.length > 0 && customerSearch"
                class="absolute top-full left-0 right-0 z-10 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto"
              >
                <button
                  v-for="customer in filteredCustomers"
                  :key="customer.id"
                  @click="selectCustomer(customer)"
                  class="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                >
                  <span class="font-medium text-gray-900 dark:text-white">{{ customer.name }}</span>
                  <span class="text-gray-500 dark:text-gray-400 ml-2">{{ customer.email }}</span>
                </button>
              </div>
            </div>
            <div v-if="selectedCustomer" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p class="text-sm text-green-700 dark:text-green-400">
                Selected: <strong>{{ selectedCustomer.name }}</strong> ({{ selectedCustomer.email }})
              </p>
            </div>
          </div>

          <!-- New Customer Form -->
          <div v-if="customerMode === 'new'" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Full Name *</label>
              <input
                v-model="newCustomer.fullname"
                type="text"
                placeholder="John Doe"
                class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Email *</label>
              <input
                v-model="newCustomer.email"
                type="email"
                placeholder="john@example.com"
                class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Phone</label>
              <input
                v-model="newCustomer.phone"
                type="text"
                placeholder="+1 234 567 890"
                class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Trip Details -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <!-- Nationality -->
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Nationality *</label>
            <div class="relative">
              <div class="relative">
                <input
                  v-model="nationalitySearch"
                  @focus="showNationalityDropdown = true"
                  type="text"
                  placeholder="Search nationality..."
                  class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm pl-10"
                />
                <img
                  v-if="selectedNationalityLogo"
                  :src="selectedNationalityLogo"
                  :alt="formData.nationality"
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full object-cover"
                />
                <div v-else class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600" />
              </div>
              <div
                v-if="showNationalityDropdown && filteredNationalities.length > 0"
                class="absolute top-full left-0 right-0 z-10 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto"
              >
                <button
                  v-for="country in filteredNationalities"
                  :key="country.countryName"
                  @click="selectNationality(country)"
                  class="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white flex items-center gap-2"
                >
                  <img
                    v-if="country.logoUrl"
                    :src="country.logoUrl"
                    :alt="country.countryName"
                    class="w-5 h-5 rounded-full object-cover"
                  />
                  <div v-else class="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600" />
                  {{ country.countryName }}
                </button>
              </div>
            </div>
          </div>

          <!-- Destination -->
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Destination *</label>
            <div class="relative">
              <div class="relative">
                <input
                  v-model="destinationSearch"
                  @focus="showDestinationDropdown = true"
                  type="text"
                  placeholder="Search destination..."
                  class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm pl-10"
                />
                <img
                  v-if="selectedDestinationLogo"
                  :src="selectedDestinationLogo"
                  :alt="formData.destinationCountry"
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full object-cover"
                />
                <div v-else class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600" />
              </div>
              <div
                v-if="showDestinationDropdown && filteredDestinations.length > 0"
                class="absolute top-full left-0 right-0 z-10 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto"
              >
                <button
                  v-for="country in filteredDestinations"
                  :key="country.countryName"
                  @click="selectDestination(country)"
                  class="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white flex items-center gap-2"
                >
                  <img
                    v-if="country.logoUrl"
                    :src="country.logoUrl"
                    :alt="country.countryName"
                    class="w-5 h-5 rounded-full object-cover"
                  />
                  <div v-else class="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600" />
                  {{ country.countryName }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Visa Product Selection -->
        <div class="mb-4">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Visa Product *</label>
          <div v-if="loadingProducts" class="text-sm text-gray-500 dark:text-gray-400 py-2">
            Loading products...
          </div>
          <div v-else-if="visaProducts.length === 0 && formData.nationality && formData.destinationCountry" class="text-sm text-orange-600 dark:text-orange-400 py-2">
            No visa products available for this nationality-destination combination.
          </div>
          <select
            v-else
            v-model="formData.visaProductId"
            @change="onProductSelect"
            class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="">Select a visa product</option>
            <option v-for="product in visaProducts" :key="product.id" :value="product.id">
              {{ product.productName }} - {{ formatCurrency(product.totalAmount) }}
            </option>
          </select>
        </div>

        <!-- Number of Travelers and Email -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Number of Travelers *</label>
            <input
              v-model.number="formData.numberOfTravelers"
              type="number"
              min="1"
              max="10"
              class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Contact Email *</label>
            <input
              v-model="formData.email"
              type="email"
              placeholder="contact@example.com"
              class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>
      </div>

      <!-- Step 2: Personal Details -->
      <div v-if="currentStep === 2" class="bg-white dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Step 2: Personal Details
        </h2>

        <div v-for="(traveler, index) in travelers" :key="index" class="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Traveler {{ index + 1 }}
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">First & Middle Name *</label>
              <input
                v-model="traveler.firstName"
                type="text"
                placeholder="First Middle"
                class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Last Name *</label>
              <input
                v-model="traveler.lastName"
                type="text"
                placeholder="Last Name"
                class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Date of Birth *</label>
              <div class="grid grid-cols-3 gap-2">
                <select
                  v-model="traveler.birthDay"
                  class="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="">Day</option>
                  <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
                </select>
                <select
                  v-model="traveler.birthMonth"
                  class="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="">Month</option>
                  <option v-for="m in 12" :key="m" :value="m">{{ getMonthName(m) }}</option>
                </select>
                <select
                  v-model="traveler.birthYear"
                  class="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="">Year</option>
                  <option v-for="y in birthYears" :key="y" :value="y">{{ y }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Passport Details -->
      <div v-if="currentStep === 3" class="bg-white dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Step 3: Passport Details
        </h2>

        <div v-for="(traveler, index) in travelers" :key="index" class="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Traveler {{ index + 1 }}: {{ traveler.firstName }} {{ traveler.lastName }}
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Passport Number</label>
              <input
                v-model="traveler.passportNumber"
                type="text"
                placeholder="AB1234567"
                class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Passport Expiry Date</label>
              <div class="grid grid-cols-3 gap-2">
                <select
                  v-model="traveler.expiryDay"
                  class="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="">Day</option>
                  <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
                </select>
                <select
                  v-model="traveler.expiryMonth"
                  class="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="">Month</option>
                  <option v-for="m in 12" :key="m" :value="m">{{ getMonthName(m) }}</option>
                </select>
                <select
                  v-model="traveler.expiryYear"
                  class="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="">Year</option>
                  <option v-for="y in expiryYears" :key="y" :value="y">{{ y }}</option>
                </select>
              </div>
            </div>
            <div>
              <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Residence Country</label>
              <div class="relative">
                <div class="relative">
                  <input
                    v-model="traveler.residenceSearch"
                    @focus="traveler.showResidenceDropdown = true"
                    type="text"
                    placeholder="Search country..."
                    class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm pl-10"
                  />
                  <img
                    v-if="traveler.residenceLogo"
                    :src="traveler.residenceLogo"
                    :alt="traveler.residenceCountry"
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full object-cover"
                  />
                  <div v-else class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600" />
                </div>
                <div
                  v-if="traveler.showResidenceDropdown && getFilteredResidenceCountries(traveler.residenceSearch).length > 0"
                  class="absolute top-full left-0 right-0 z-10 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                >
                  <button
                    v-for="country in getFilteredResidenceCountries(traveler.residenceSearch)"
                    :key="country.countryName"
                    @click="selectResidenceCountry(traveler, country)"
                    class="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white flex items-center gap-2"
                  >
                    <img
                      v-if="country.logoUrl"
                      :src="country.logoUrl"
                      :alt="country.countryName"
                      class="w-5 h-5 rounded-full object-cover"
                    />
                    <div v-else class="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600" />
                    {{ country.countryName }}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Has Schengen Visa?</label>
              <select
                v-model="traveler.hasSchengenVisa"
                class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              >
                <option :value="false">No</option>
                <option :value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Admin Notes -->
        <div class="mt-4">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Admin Notes (Optional)</label>
          <textarea
            v-model="formData.notes"
            placeholder="Add any notes about this application..."
            class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm min-h-[100px]"
          ></textarea>
        </div>

        <!-- Save Button inside Step 3 card -->
        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="submitApplication"
            :disabled="isSubmitting || !isFormValid"
            style="background-color: #000000; color: #ffffff;"
            class="w-full px-6 py-3 text-base font-medium rounded-[6px] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Saving...' : 'Save Application' }}
          </button>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between items-center mt-4 gap-4">
        <button
          @click="goBackStep"
          class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
        >
          <ArrowLeft class="h-4 w-4" />
          {{ currentStep === 1 ? 'Back to Applications' : 'Previous' }}
        </button>

        <button
          v-if="currentStep < 3"
          @click="nextStep"
          :disabled="!isCurrentStepValid"
          class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <!-- Error/Success Messages -->
      <div v-if="errorMessage" ref="errorMessageRef" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg shadow-sm">
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-medium text-red-800 dark:text-red-300">Error</h3>
            <p class="mt-1 text-sm text-red-700 dark:text-red-400">{{ errorMessage }}</p>
          </div>
          <button @click="errorMessage = null" class="flex-shrink-0 text-red-400 hover:text-red-600 dark:hover:text-red-300">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="successMessage" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <p class="text-sm text-green-600 dark:text-green-400">{{ successMessage }}</p>
      </div>
    </div>

    <!-- Payment Link Modal -->
    <div
      v-if="showPaymentLinkModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closePaymentModal"
    >
      <div class="bg-white dark:bg-[#09090B] rounded-xl w-full max-w-lg shadow-xl">
        <div class="p-6 border-b border-gray-200 dark:border-gray-800">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Application Created!
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ createdApplicationNumber }}
              </p>
            </div>
          </div>
        </div>

        <div class="p-6 space-y-4">
          <div class="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <div class="flex items-center gap-2 mb-2">
              <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span class="text-sm font-medium text-purple-700 dark:text-purple-300">Payment Link Generated</span>
            </div>
            <p class="text-sm text-purple-600 dark:text-purple-400 mb-3">
              Send this link to the customer to collect payment of <strong>£{{ createdTotalAmount?.toFixed(2) }}</strong>
            </p>
            <div class="flex gap-2">
              <input
                :value="paymentLinkUrl"
                readonly
                class="flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded-lg text-gray-700 dark:text-gray-300"
              />
              <button
                @click="copyPaymentLink"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2',
                  linkCopied
                    ? 'bg-green-500 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                ]"
              >
                <svg v-if="!linkCopied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ linkCopied ? 'Copied!' : 'Copy' }}
              </button>
            </div>
          </div>

          <p class="text-xs text-gray-500 dark:text-gray-400">
            Once the customer completes payment, the application will automatically move to the "Pending" column.
          </p>
        </div>

        <div class="p-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3">
          <button
            @click="closePaymentModal"
            class="px-4 py-2 text-sm font-medium rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";
import DashboardLayout from "@/components/DashboardLayout.vue";
import { useApplication } from "~/composables/useApplication";
import { useCustomersApi } from "~/composables/useCustomersApi";
import { useCountriesApi } from "~/composables/useCountriesApi";
import { useNationalitiesApi } from "~/composables/useNationalitiesApi";

const router = useRouter();
const { createManualApplication, loading: appLoading } = useApplication();
const { getAllCustomers } = useCustomersApi();
const { getCountries } = useCountriesApi();
const { getNationalityDestinationProducts } = useNationalitiesApi();

// State
const currentStep = ref(1);
const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);
const errorMessageRef = ref<HTMLElement | null>(null);

// Payment link modal state
const showPaymentLinkModal = ref(false);
const paymentLinkUrl = ref<string | null>(null);
const createdApplicationNumber = ref<string | null>(null);
const createdTotalAmount = ref<number | null>(null);
const linkCopied = ref(false);

// Customer selection
const customerMode = ref<'existing' | 'new'>('new');
const customerSearch = ref('');
const customers = ref<Array<{ id: number; name: string; email: string; phone: string }>>([]);
const selectedCustomer = ref<{ id: number; name: string; email: string; phone: string } | null>(null);
const newCustomer = ref({
  fullname: '',
  email: '',
  phone: '',
});

// Countries
const countries = ref<Array<{ countryName: string; logoUrl?: string }>>([]);
const nationalitySearch = ref('');
const destinationSearch = ref('');
const showNationalityDropdown = ref(false);
const showDestinationDropdown = ref(false);
const selectedNationalityLogo = ref<string | null>(null);
const selectedDestinationLogo = ref<string | null>(null);

// Visa Products
const visaProducts = ref<Array<{ id: number; productName: string; totalAmount: number; visaType?: string }>>([]);
const loadingProducts = ref(false);
const selectedProduct = ref<any>(null);

// Form data
const formData = ref({
  nationality: '',
  destinationCountry: '',
  visaProductId: '' as number | string,
  visaType: '',
  numberOfTravelers: 1,
  email: '',
  notes: '',
});

// Travelers
interface TravelerForm {
  firstName: string;
  lastName: string;
  birthDay: number | string;
  birthMonth: number | string;
  birthYear: number | string;
  passportNumber: string;
  expiryDay: number | string;
  expiryMonth: number | string;
  expiryYear: number | string;
  residenceCountry: string;
  residenceSearch: string;
  residenceLogo: string | null;
  showResidenceDropdown: boolean;
  hasSchengenVisa: boolean;
}

const travelers = ref<TravelerForm[]>([]);

// Computed
const filteredCustomers = computed(() => {
  if (!customerSearch.value) return [];
  const search = customerSearch.value.toLowerCase();
  return customers.value.filter(
    c => c.name?.toLowerCase().includes(search) || c.email?.toLowerCase().includes(search)
  ).slice(0, 10);
});

const filteredNationalities = computed(() => {
  if (!nationalitySearch.value) return countries.value;
  const search = nationalitySearch.value.toLowerCase();
  return countries.value.filter(c => c.countryName.toLowerCase().includes(search));
});

const filteredDestinations = computed(() => {
  if (!destinationSearch.value) return countries.value;
  const search = destinationSearch.value.toLowerCase();
  return countries.value.filter(c => c.countryName.toLowerCase().includes(search));
});

const getFilteredResidenceCountries = (search: string) => {
  if (!search) return countries.value;
  const s = search.toLowerCase();
  return countries.value.filter(c => c.countryName.toLowerCase().includes(s));
};

const birthYears = computed(() => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear - 1; y >= currentYear - 100; y--) {
    years.push(y);
  }
  return years;
});

const expiryYears = computed(() => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y <= currentYear + 20; y++) {
    years.push(y);
  }
  return years;
});

const isCurrentStepValid = computed(() => {
  if (currentStep.value === 1) {
    const hasCustomer = customerMode.value === 'existing'
      ? !!selectedCustomer.value
      : !!(newCustomer.value.fullname && newCustomer.value.email);
    return hasCustomer &&
      !!formData.value.nationality &&
      !!formData.value.destinationCountry &&
      !!formData.value.visaProductId &&
      formData.value.numberOfTravelers >= 1 &&
      !!formData.value.email;
  }
  if (currentStep.value === 2) {
    return travelers.value.every(t =>
      t.firstName && t.lastName && t.birthDay && t.birthMonth && t.birthYear
    );
  }
  return true;
});

const isFormValid = computed(() => {
  return isCurrentStepValid.value;
});

// Methods
const goBack = () => {
  router.push('/dashboard/applications');
};

const copyPaymentLink = async () => {
  if (paymentLinkUrl.value) {
    try {
      await navigator.clipboard.writeText(paymentLinkUrl.value);
      linkCopied.value = true;
      setTimeout(() => {
        linkCopied.value = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
};

const closePaymentModal = () => {
  showPaymentLinkModal.value = false;
  router.push('/dashboard/applications');
};

const goBackStep = () => {
  if (currentStep.value === 1) {
    router.push('/dashboard/applications');
  } else {
    currentStep.value--;
  }
};

const selectCustomer = (customer: { id: number; name: string; email: string; phone: string }) => {
  selectedCustomer.value = customer;
  customerSearch.value = customer.name;
  formData.value.email = customer.email;
};

const selectNationality = (country: { countryName: string; logoUrl?: string }) => {
  formData.value.nationality = country.countryName;
  nationalitySearch.value = country.countryName;
  selectedNationalityLogo.value = country.logoUrl || null;
  showNationalityDropdown.value = false;
  fetchVisaProducts();
};

const selectDestination = (country: { countryName: string; logoUrl?: string }) => {
  formData.value.destinationCountry = country.countryName;
  destinationSearch.value = country.countryName;
  selectedDestinationLogo.value = country.logoUrl || null;
  showDestinationDropdown.value = false;
  fetchVisaProducts();
};

const selectResidenceCountry = (traveler: TravelerForm, country: { countryName: string; logoUrl?: string }) => {
  traveler.residenceCountry = country.countryName;
  traveler.residenceSearch = country.countryName;
  traveler.residenceLogo = country.logoUrl || null;
  traveler.showResidenceDropdown = false;
};

const fetchVisaProducts = async () => {
  if (!formData.value.nationality || !formData.value.destinationCountry) return;

  loadingProducts.value = true;
  visaProducts.value = [];
  formData.value.visaProductId = '';

  try {
    const result = await getNationalityDestinationProducts(
      formData.value.nationality,
      formData.value.destinationCountry
    );
    if (result.success && result.data) {
      visaProducts.value = result.data.map((p: any) => ({
        id: p.id || p.productId,
        productName: p.productName,
        totalAmount: Number(p.totalAmount),
        visaType: p.visaType || `${p.validity || 90}-single`,
      }));
    }
  } catch (err) {
    console.error('Failed to fetch visa products:', err);
  } finally {
    loadingProducts.value = false;
  }
};

const onProductSelect = () => {
  const product = visaProducts.value.find(p => p.id === Number(formData.value.visaProductId));
  if (product) {
    selectedProduct.value = product;
    formData.value.visaType = product.visaType || `90-single`;
  }
};

const initializeTravelers = () => {
  const count = formData.value.numberOfTravelers;
  while (travelers.value.length < count) {
    travelers.value.push({
      firstName: '',
      lastName: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      passportNumber: '',
      expiryDay: '',
      expiryMonth: '',
      expiryYear: '',
      residenceCountry: '',
      residenceSearch: '',
      residenceLogo: null,
      showResidenceDropdown: false,
      hasSchengenVisa: false,
    });
  }
  while (travelers.value.length > count) {
    travelers.value.pop();
  }
};

const nextStep = () => {
  if (currentStep.value === 1) {
    initializeTravelers();
  }
  currentStep.value++;
};

const getMonthName = (month: number) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month - 1];
};

const formatCurrency = (amount: number | string) => {
  const num = Number(amount);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
};

const formatDateOfBirth = (traveler: TravelerForm): string => {
  if (!traveler.birthYear || !traveler.birthMonth || !traveler.birthDay) return '';
  const year = String(traveler.birthYear);
  const month = String(traveler.birthMonth).padStart(2, '0');
  const day = String(traveler.birthDay).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatExpiryDate = (traveler: TravelerForm): string | undefined => {
  if (!traveler.expiryYear || !traveler.expiryMonth || !traveler.expiryDay) return undefined;
  const year = String(traveler.expiryYear);
  const month = String(traveler.expiryMonth).padStart(2, '0');
  const day = String(traveler.expiryDay).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const submitApplication = async () => {
  isSubmitting.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  try {
    const applicationData = {
      nationality: formData.value.nationality,
      destinationCountry: formData.value.destinationCountry,
      visaProductId: Number(formData.value.visaProductId),
      visaType: formData.value.visaType,
      numberOfTravelers: formData.value.numberOfTravelers,
      email: formData.value.email,
      customer: customerMode.value === 'existing' && selectedCustomer.value
        ? { customerId: selectedCustomer.value.id }
        : {
            fullname: newCustomer.value.fullname,
            email: newCustomer.value.email,
            phone: newCustomer.value.phone,
          },
      travelers: travelers.value.map(t => ({
        firstName: t.firstName,
        lastName: t.lastName,
        dateOfBirth: formatDateOfBirth(t),
        passportNumber: t.passportNumber || undefined,
        passportExpiryDate: formatExpiryDate(t),
        residenceCountry: t.residenceCountry || undefined,
        hasSchengenVisa: t.hasSchengenVisa,
      })),
      notes: formData.value.notes || undefined,
    };

    const result = await createManualApplication(applicationData);

    // Check if payment link was generated
    if (result.paymentUrl) {
      createdApplicationNumber.value = result.applicationNumber;
      paymentLinkUrl.value = result.paymentUrl;
      createdTotalAmount.value = result.totalAmount || 0;
      showPaymentLinkModal.value = true;
      linkCopied.value = false;
    } else {
      successMessage.value = `Application ${result.applicationNumber} created successfully!`;
      // Redirect after short delay
      setTimeout(() => {
        router.push('/dashboard/applications');
      }, 1500);
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Failed to create application';
    // Scroll to error message after it renders
    await nextTick();
    if (errorMessageRef.value) {
      errorMessageRef.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  } finally {
    isSubmitting.value = false;
  }
};

// Load initial data
onMounted(async () => {
  try {
    // Load customers
    const customersResult = await getAllCustomers();
    if (customersResult.success && customersResult.data) {
      customers.value = customersResult.data;
    }

    // Load countries
    const countriesResult = await getCountries();
    if (countriesResult.success && countriesResult.data) {
      countries.value = countriesResult.data;
    }
  } catch (err) {
    console.error('Failed to load initial data:', err);
  }
});

// Watch for traveler count changes
watch(() => formData.value.numberOfTravelers, initializeTravelers);

// Close dropdowns on outside click
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    showNationalityDropdown.value = false;
    showDestinationDropdown.value = false;
    travelers.value.forEach(t => t.showResidenceDropdown = false);
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
</script>
