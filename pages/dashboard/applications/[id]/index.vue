<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
      <!-- Page Header -->
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
              {{ application?.applicationNumber || application?.id || 'Loading...' }} - Application Details
            </h1>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="flex justify-between items-center">
        <!-- Columns Filter Button -->
        <div class="bg-gray-100 dark:bg-gray-800 rounded-[6px] p-1 flex gap-2 w-fit">
          <button
            @click="activeTab = 'details'"
            :class="[
              activeTab === 'details'
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              'px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200',
            ]"
          >
            Application Details
          </button>
          <NuxtLink
            :to="`/dashboard/applications/${applicationId}/travellers`"
            class="px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200"
            :class="[
              $route.path.includes('/travellers')
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
          >
            Travelers
          </NuxtLink>
          <button
            @click="activeTab = 'documents'"
            :class="[
              activeTab === 'documents'
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              'px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200',
            ]"
          >
            Documents
          </button>
          <button
            @click="activeTab = 'payment'"
            :class="[
              activeTab === 'payment'
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              'px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200',
            ]"
          >
            Payment
          </button>
        </div>
        <div v-if="activeTab !== 'documents'"
            class="flex justify-center gap-2.5 sm:justify-end w-full sm:w-auto"
          >
            <button
              class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 border bg-white dark:bg-[#18181B] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors"
            >
              Refund
            </button>
            <button
              class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 border bg-white dark:bg-[#18181B] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors"
            >
              Download Docs
            </button>
            <button
              class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Update Status
            </button>
          </div>
      </div>

      <!-- Tab Content -->
      <!-- Application Details Tab -->
      <div
        v-if="activeTab === 'details'"
        class="p-6 bg-white h-full w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800"
      >
        <div class="space-y-6">
          <div class="flex-1 min-w-0">
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
              Application Details
            </h1>
            <label
              class="text-[#475467] dark:text-white text-[14px] sm:text-base leading-[12px] sm:leading-6"
              style="font-weight: 400; letter-spacing: 0%"
            >
              Here you can see the application details.
            </label>
          </div>
          <div class="flex flex-col overflow-hidden">
            <div v-if="isLoadingApplication" class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Loading application details...
            </div>
            <template v-else-if="application">
              <!-- Customer Information -->
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Customer Name</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.customer?.fullname || application.customer?.customerName || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Email</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.customer?.email || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Phone</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.customer?.phoneNumber || application.phoneNumber || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Nationality</span
                >
                <span
                  class="text-sm text-gray-900 dark:text-white"
                  >{{ application.nationality || '-' }}</span
                >
              </div>

              <!-- Visa Application Details -->
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Application Number</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.applicationNumber || `APP-${String(application.id).padStart(5, '0')}` || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Destination</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.destinationCountry || application.destination || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Visa Product</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.visaProduct?.name || application.visaProduct || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Visa Type</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.visaType || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Processing Type</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.processingType || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Number of Travelers</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.numberOfTravelers || application.travelers?.length || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Total Price</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  formatApplicationPrice(application)
                }}</span>
              </div>

              <!-- Status and Date -->
              <div
                class="mx-4 flex flex-col gap-2 py-5 dark:border-gray-700"
              >
                <CustomDropdown
                  id="application-status"
                  label="Status"
                  v-model="applicationStatus"
                  :options="applicationStatusOptions"
                  placeholder="Select status"
                  search-placeholder="Search status"
                />
              </div>
              <div class="grid grid-cols-2 gap-4 pt-5">
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Date Submitted</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  formatDate(application.createdAt || application.dateSubmitted)
                }}</span>
              </div>
            </template>
            <div v-else class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              {{ errorMessage || 'Application not found' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Documents Tab -->
      <div v-if="activeTab === 'documents'" class="flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <!-- Search and Filter Buttons -->
          <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
            <!-- Search Bar -->
            <div class="relative flex-1 w-full sm:w-[30%]">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Applications"
                class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                style="border-radius: 7px"
              />
            </div>
          </div>

          <!-- Columns Filter Button -->
          <div
            class="flex justify-center gap-2.5 sm:justify-end w-full sm:w-auto"
          >
            <button
              class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 border bg-white dark:bg-[#18181B] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors"
            >
              Refund
            </button>
            <button
              class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 border bg-white dark:bg-[#18181B] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors"
            >
              Download Docs
            </button>
            <button
              class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Update Status
            </button>
          </div>
        </div>

        <!-- Applications Table -->
        <div
          class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
          style="border-radius: 7px"
        >
          <div class="overflow-x-auto">
            <table class="w-full min-w-[600px] sm:min-w-[800px]">
              <thead
                class="bg-[#FFFFFF] dark:bg-[#09090B] border-b dark:border-gray-800"
              >
                <tr class="!h-[37px] bg-[#F9FAFB] dark:bg-[#18181B]">
                  <!-- force small row height -->
                  <th
                    class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2 text-left align-middle"
                  >
                    <input
                      type="checkbox"
                      v-model="selectAll"
                      class="border-gray-300"
                      style="border-radius: 7px"
                    />
                  </th>

                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Traveler</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Document type</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Document file</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Date Uploaded</span>
                    </div>
                  </th>
                  <th class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                <tr
                  v-for="document in filteredDocuments"
                  :key="document.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td class="px-2 sm:px-3 lg:px-4 py-2">
                    <input
                      type="checkbox"
                      v-model="document.selected"
                      class="border-gray-300"
                      style="border-radius: 7px"
                    />
                  </td>
                  <td
                    class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-[#475467] dark:text-white"
                    style="
                      font-size: 14px;
                      font-weight: 400;
                      font-style: normal;
                      line-height: 20px;
                      font-family: 'Geist', sans-serif;
                      letter-spacing: 0;
                    "
                  >
                    {{ document.traveler }}
                  </td>
                  <td
                    class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-[#475467] dark:text-white"
                    style="
                      font-size: 14px;
                      font-weight: 400;
                      font-style: normal;
                      line-height: 20px;
                      font-family: 'Geist', sans-serif;
                      letter-spacing: 0;
                    "
                  >
                    {{ document.documentType }}
                  </td>
                  <td class="px-2 sm:px-3 lg:px-4 py-2">
                    <div class="flex items-center space-x-2">
                      <button
                        class="px-3 py-1 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-[12px] text-sm hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                      >
                        Documentation
                      </button>
                      <span class="text-sm text-gray-500 dark:text-gray-400">{{
                        document.fileName
                      }}</span>
                    </div>
                  </td>
                  <td
                    class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-[#475467] dark:text-white"
                    style="
                      font-size: 14px;
                      font-weight: 400;
                      font-style: normal;
                      line-height: 20px;
                      font-family: 'Geist', sans-serif;
                      letter-spacing: 0;
                    "
                  >
                    {{ document.dateUploaded }}
                  </td>
                  <td class="px-2 sm:px-3 lg:px-4 py-2">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="editDocument(document)"
                        class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        title="Edit"
                      >
                        <Pencil
                          class="h-4 w-4 text-gray-600 dark:text-gray-400"
                        />
                      </button>
                      <button
                        @click="deleteDocument(document)"
                        class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        title="Delete"
                      >
                        <Trash2
                          class="h-4 w-4 text-gray-600 dark:text-gray-400"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination -->
        <div
          class="flex flex-row items-center justify-between flex-wrap gap-2 sm:gap-4 w-full"
        >
          <!-- Selection Count -->
          <div
            class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap"
          >
            {{ selectedDocumentsCount }} of {{ documents.length }} row(s)
            selected.
          </div>

          <!-- Navigation Buttons -->
          <div class="flex items-center space-x-2">
            <button
              class="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs sm:text-sm"
              :disabled="currentPage === 1"
              :class="{
                'opacity-50 cursor-not-allowed': currentPage === 1,
              }"
              style="border-radius: 7px"
            >
              Previous
            </button>

            <button
              class="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs sm:text-sm"
              style="border-radius: 7px"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <!-- Payment Tab -->
      <div
        v-if="activeTab === 'payment'"
        class="p-6 bg-white h-full w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800"
      >
        <div class="space-y-6">
          <div class="flex-1 min-w-0">
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
              Payment
            </h1>
            <label
              class="text-[#475467] dark:text-white text-[14px] sm:text-base leading-[12px] sm:leading-6"
              style="font-weight: 400; letter-spacing: 0%"
            >
              Update the details here.
            </label>
          </div>

          <!-- Payment Details -->
          <div class="flex flex-col">
            <div v-if="isLoadingPayment" class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Loading payment information...
            </div>
            <template v-else-if="payment">
              <div
                class="mx-4 flex flex-col gap-2 py-5 dark:border-gray-700"
              >
                <CustomDropdown
                  id="payment-status"
                  label="Status"
                  v-model="paymentStatus"
                  :options="paymentStatusOptions"
                  placeholder="Select status"
                  search-placeholder="Search status"
                />
              </div>

              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Payment Gateway</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  payment.paymentGateway || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Payment Status</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  payment.status || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Transaction ID</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  payment.transactionId || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Payment Intent ID</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  payment.paymentIntentId || '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Amount</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  payment.amount ? `${payment.currency || 'PKR'} ${payment.amount}` : '-'
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Payment Method</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  payment.paymentMethod || '-'
                }}</span>
              </div>
              <div
                v-if="payment.cardholderName"
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Cardholder Name</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  payment.cardholderName
                }}</span>
              </div>
              <div
                v-if="payment.cardLast4"
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Card Last 4 Digits</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  `****${payment.cardLast4}`
                }}</span>
              </div>
              <div
                v-if="payment.cardBrand"
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Card Brand</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  payment.cardBrand
                }}</span>
              </div>
              <div
                v-if="payment.paidAt"
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Paid At</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  formatDate(payment.paidAt)
                }}</span>
              </div>
              <div
                v-if="payment.failedAt"
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Failed At</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  formatDate(payment.failedAt)
                }}</span>
              </div>
              <div
                v-if="payment.failureReason"
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Failure Reason</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  payment.failureReason
                }}</span>
              </div>
              <div class="grid grid-cols-2 gap-4 pt-5">
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Created At</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  formatDate(payment.createdAt)
                }}</span>
              </div>
            </template>
            <div v-else class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              {{ paymentErrorMessage || 'Payment information not available' }}
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
import { ArrowLeft, Pencil, Trash2 } from "lucide-vue-next";
import { useApplication } from "~/composables/useApplication";

// Get route parameters
const route = useRoute();
const router = useRouter();
const applicationId = computed(() => route.params.id);

// Use application composable
const { getApplication, getApplicationPayment } = useApplication();

// Active tab state
const activeTab = ref("details");

// Application data
const application = ref(null);
const isLoadingApplication = ref(false);
const errorMessage = ref("");

// Payment data
const payment = ref(null);
const isLoadingPayment = ref(false);
const paymentErrorMessage = ref("");

// Status dropdowns
const applicationStatus = ref("active");
const paymentStatus = ref("Paid");

// Status options
const applicationStatusOptions = [
  "active",
  "pending", 
  "approved",
  "rejected"
];

const paymentStatusOptions = [
  "pending",
  "processing",
  "completed",
  "failed",
  "refunded"
];

// Documents data and methods
const documents = ref([
  {
    id: 1,
    traveler: "Ali Raza",
    documentType: "PDF",
    fileName: "ali.passport.pdf",
    dateUploaded: "01/01/2025",
    selected: false,
  },
  {
    id: 2,
    traveler: "Ali Raza",
    documentType: "PDF",
    fileName: "ali.visa.pdf",
    dateUploaded: "01/01/2025",
    selected: false,
  },
]);

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredDocuments = computed(() => {
  let filtered = documents.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (doc) =>
        doc.traveler.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        doc.documentType
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

const selectedDocumentsCount = computed(() => {
  return documents.value.filter((doc) => doc.selected).length;
});

const editDocument = (document) => {
  console.log("Edit document:", document);
  // Add edit functionality
};

const deleteDocument = (document) => {
  console.log("Delete document:", document);
  // Add delete functionality
};

// Load application details
const loadApplication = async () => {
  if (!applicationId.value) return;
  
  try {
    isLoadingApplication.value = true;
    errorMessage.value = "";
    
    const data = await getApplication(applicationId.value);
    application.value = data;
    
    // Set status from application
    if (data.status) {
      applicationStatus.value = data.status.toLowerCase();
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load application details";
    console.error("Error loading application:", error);
  } finally {
    isLoadingApplication.value = false;
  }
};

// Load payment
const loadPayment = async () => {
  if (!applicationId.value) return;
  
  try {
    isLoadingPayment.value = true;
    paymentErrorMessage.value = "";
    
    const data = await getApplicationPayment(applicationId.value);
    payment.value = data;
    
    // Set payment status
    if (data.status) {
      paymentStatus.value = data.status.toLowerCase();
    }
  } catch (error) {
    paymentErrorMessage.value = error instanceof Error ? error.message : "Failed to load payment information";
    console.error("Error loading payment:", error);
    payment.value = null;
  } finally {
    isLoadingPayment.value = false;
  }
};

// Format date helper
const formatDate = (date) => {
  if (!date) return '-';
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '-';
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return date.toString();
  }
};

// Format application price helper
const formatApplicationPrice = (app) => {
  if (!app) return '-';
  
  // Try totalAmount first (from visa application table)
  if (app.totalAmount) {
    if (typeof app.totalAmount === 'number') {
      return `${app.currency || 'USD'} ${app.totalAmount.toFixed(2)}`;
    }
    return app.totalAmount;
  }
  
  // Fallback to other price fields
  if (app.totalPrice) {
    if (typeof app.totalPrice === 'number') {
      return `${app.currency || 'USD'} ${app.totalPrice.toFixed(2)}`;
    }
    return app.totalPrice;
  }
  
  if (app.price) {
    return app.price;
  }
  
  if (app.processingFee) {
    return `USD ${app.processingFee}`;
  }
  
  return '-';
};

// Watch for tab changes to load data
watch(activeTab, (newTab) => {
  if (newTab === 'payment' && !payment.value) {
    loadPayment();
  }
});

// Set page title
useHead({
  title: computed(
    () => `${application.value?.applicationNumber || application.value?.id || 'Application'} - Application Details - iVisa`
  ),
});

// Load application on mount
onMounted(() => {
  loadApplication();
});

// Navigation
const goBack = () => {
  router.push("/dashboard/applications");
};
</script>

