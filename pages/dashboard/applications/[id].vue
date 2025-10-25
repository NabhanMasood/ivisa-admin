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
              {{ application.applicationId }} - Application Details
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
          <button
            @click="activeTab = 'travelers'"
            :class="[
              activeTab === 'travelers'
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              'px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200',
            ]"
          >
            Travelers
          </button>
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
        <div v-if="activeTab !== 'travelers' && activeTab !== 'documents'"
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
      <!-- <div
        class="bg-white h-full w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800"
      > -->
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
            <!-- Customer Information -->
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Customer Name</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                application.customerName
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
                application.email
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
                application.phone
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
                >{{ application.nationality }}</span
              >
            </div>

            <!-- Visa Application Details -->
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Destination</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                application.destination
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
                application.visaProduct
              }}</span>
            </div>
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Duration</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                application.duration
              }}</span>
            </div>
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Validity</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                application.validity
              }}</span>
            </div>
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Residence Country</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                application.residenceCountry
              }}</span>
            </div>
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Embassy</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                application.embassy
              }}</span>
            </div>
            <div
              class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Travelers</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                application.travelers
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
                application.totalPrice
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
                application.dateSubmitted
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Travelers Tab -->
      <div v-if="activeTab === 'travelers'" class="flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <!-- Search and Filter Buttons -->
          <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
            <!-- Search Bar -->
            <div class="relative flex-1 w-full sm:w-[30%]">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Travelers"
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

        <!-- Travelers Table -->
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
                      <span>Name</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Email</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Passport</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Issue Date</span>
                    </div>
                  </th>
                  <th
                    class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Expiry Date</span>
                    </div>
                  </th>
                  <th class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                <tr
                  v-for="traveler in filteredTravelers"
                  :key="traveler.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td class="px-2 sm:px-3 lg:px-4 py-2">
                    <input
                      type="checkbox"
                      v-model="traveler.selected"
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
                    {{ traveler.name }}
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
                    {{ traveler.email }}
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
                    {{ traveler.passport }}
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
                    {{ traveler.issueDate }}
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
                    {{ traveler.expiryDate }}
                  </td>
                  <td class="px-2 sm:px-3 lg:px-4 py-2">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="editTraveler(traveler)"
                        class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        title="Edit"
                      >
                        <Pencil
                          class="h-4 w-4 text-gray-600 dark:text-gray-400"
                        />
                      </button>
                      <button
                        @click="deleteTraveler(traveler)"
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
            {{ selectedTravelersCount }} of {{ travelers.length }} row(s)
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
                >Customer Name</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                application.customerName
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
                application.price
              }}</span>
            </div>
            <div class="grid grid-cols-2 gap-4 py-5">
              <span
                class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                >Stripe ID Payment</span
              >
              <span class="text-sm text-gray-900 dark:text-white">{{
                application.stripeId
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "~/components/DashboardLayout.vue";
import CustomDropdown from "~/components/ui/CustomDropdown.vue";
import { ArrowLeft, Columns, Pencil, Trash2 } from "lucide-vue-next";

// Get route parameters
const route = useRoute();
const router = useRouter();
const applicationId = computed(() => route.params.id);

// Active tab state
const activeTab = ref("details");

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
  "Paid",
  "Pending",
  "In Review",
  "Rejected"
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
const columnsDropdownOpen = ref(false);

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

const totalPages = computed(() => {
  return Math.ceil(filteredDocuments.value.length / itemsPerPage);
});

const toggleSelectAll = () => {
  documents.value.forEach((doc) => {
    doc.selected = selectAll.value;
  });
};

const editDocument = (document) => {
  console.log("Edit document:", document);
  // Add edit functionality
};

const deleteDocument = (document) => {
  console.log("Delete document:", document);
  // Add delete functionality
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const toggleColumnsDropdown = () => {
  columnsDropdownOpen.value = !columnsDropdownOpen.value;
};

// Travelers data and methods
const travelers = ref([
  {
    id: 1,
    name: "Ali Raza",
    email: "ali@gmail.com",
    passport: "AB1234567",
    issueDate: "01/01/2025",
    expiryDate: "01/01/2026",
    selected: false,
  },
  {
    id: 2,
    name: "Ali Raza",
    email: "ali@gmail.com",
    passport: "AB1234567",
    issueDate: "01/01/2025",
    expiryDate: "01/01/2026",
    selected: false,
  },
]);

const filteredTravelers = computed(() => {
  let filtered = travelers.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (traveler) =>
        traveler.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        traveler.email
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        traveler.passport
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

const selectedTravelersCount = computed(() => {
  return travelers.value.filter((traveler) => traveler.selected).length;
});

const editTraveler = (traveler) => {
  console.log("Edit traveler:", traveler);
  // Add edit functionality
};

const deleteTraveler = (traveler) => {
  console.log("Delete traveler:", traveler);
  // Add delete functionality
};

// Sample applications data
const allApplications = ref([
  {
    id: 1,
    applicationId: "APP-01245",
    customerName: "Ali Raza",
    email: "ali@gmail.com",
    phone: "+92 000 0000000",
    nationality: "Pakistan",
    destination: "Thailand",
    visaProduct: "30-Day Visa",
    duration: "60 Days",
    validity: "60 Days",
    residenceCountry: "Pakistan",
    embassy: "Lahore Thailand Embassy",
    travelers: "2",
    totalPrice: "USD 200",
    status: "Active",
    dateSubmitted: "10-02-2025",
    stripeId: "P1-298RH478902",
    createdDate: "2024-01-15",
    lastActivity: "2024-12-20",
  },
  {
    id: 2,
    applicationId: "APP-01246",
    customerName: "Sarah Khan",
    email: "sarah@gmail.com",
    phone: "+92 301 2345678",
    nationality: "Pakistan",
    destination: "UAE",
    visaProduct: "Tourist Visa",
    duration: "30 Days",
    validity: "90 Days",
    residenceCountry: "Pakistan",
    embassy: "Karachi UAE Embassy",
    travelers: "1",
    totalPrice: "USD 150",
    status: "Pending",
    dateSubmitted: "08-02-2025",
    stripeId: "P1-298RH478903",
    createdDate: "2024-01-16",
    lastActivity: "2024-12-19",
  },
  {
    id: 3,
    applicationId: "APP-01247",
    customerName: "John Smith",
    email: "john@gmail.com",
    phone: "+1 555 1234567",
    nationality: "USA",
    destination: "Germany",
    visaProduct: "Schengen Visa",
    duration: "90 Days",
    validity: "180 Days",
    residenceCountry: "USA",
    embassy: "New York German Embassy",
    travelers: "1",
    totalPrice: "USD 200",
    status: "Approved",
    dateSubmitted: "05-02-2025",
    stripeId: "P1-298RH478904",
    createdDate: "2024-01-17",
    lastActivity: "2024-12-18",
  },
  {
    id: 4,
    applicationId: "APP-01248",
    customerName: "Maria Garcia",
    email: "maria@gmail.com",
    phone: "+34 600 123456",
    nationality: "Spain",
    destination: "France",
    visaProduct: "Tourist Visa",
    duration: "30 Days",
    validity: "90 Days",
    residenceCountry: "Spain",
    embassy: "Madrid French Embassy",
    travelers: "2",
    totalPrice: "USD 180",
    status: "Active",
    dateSubmitted: "12-02-2025",
    stripeId: "P1-298RH478905",
    createdDate: "2024-01-18",
    lastActivity: "2024-12-17",
  },
  {
    id: 5,
    applicationId: "APP-01249",
    customerName: "Ahmed Hassan",
    email: "ahmed@gmail.com",
    phone: "+92 302 3456789",
    nationality: "Pakistan",
    destination: "Japan",
    visaProduct: "Business Visa",
    duration: "90 Days",
    validity: "365 Days",
    residenceCountry: "Pakistan",
    embassy: "Islamabad Japan Embassy",
    travelers: "1",
    totalPrice: "USD 300",
    status: "Pending",
    dateSubmitted: "15-02-2025",
    stripeId: "P1-298RH478906",
    createdDate: "2024-01-19",
    lastActivity: "2024-12-16",
  },
]);

// Get current application data based on ID
const application = computed(() => {
  const id = parseInt(applicationId.value);
  return (
    allApplications.value.find((a) => a.id === id) || allApplications.value[0]
  );
});

// Set page title
useHead({
  title: computed(
    () => `${application.value.applicationId} - Application Details - iVisa`
  ),
});

// Navigation
const goBack = () => {
  router.push("/dashboard/applications");
};
</script>

