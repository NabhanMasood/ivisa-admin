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
              {{
                application?.applicationNumber ||
                application?.id ||
                "Loading..."
              }}
              - Application Details
            </h1>
          </div>
        </div>
      </div>


<!-- ✅ ADD: After page header, before tab navigation -->
<div v-if="hasActiveResubmissionRequests" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
  <div class="flex items-start gap-3">
    <div class="flex-shrink-0 text-2xl">⚠️</div>
    <div class="flex-1">
      <h3 class="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
        Additional Information Required
      </h3>
      <p class="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
        {{ activeResubmissionRequestsCount }} resubmission request(s) pending
      </p>
      <div class="mt-3 space-y-2">
        <div v-for="request in activeResubmissionRequests.filter(r => !r.fulfilledAt)" :key="request.id"
          class="text-sm bg-white dark:bg-gray-800 rounded p-2 border border-yellow-200 dark:border-yellow-700">
          <div class="font-medium text-gray-900 dark:text-white">
            {{ request.target === 'application' ? '📄 Application' : `👤 ${getTravelerNameById(request.travelerId)}` }}
          </div>
          <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">
            {{ request.fieldIds.length }} field(s) requested
            <span v-if="request.note" class="block mt-1 italic">Note: {{ request.note }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      <!-- Tab Navigation -->
      <div class="flex justify-between items-center">
        <!-- Columns Filter Button -->
        <div
          class="bg-gray-100 dark:bg-gray-800 rounded-[6px] p-1 flex gap-2 w-fit"
        >
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
            @click="activeTab = 'additional-info'"
            :class="[
              activeTab === 'additional-info'
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              'px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200 relative',
            ]"
          >
            Additional Info
            <span v-if="activeResubmissionRequestsCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ activeResubmissionRequestsCount }}
            </span>
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
        <div v-if="activeTab !== 'documents' && activeTab !== 'additional-info'"
            class="flex justify-center gap-2.5 sm:justify-end w-full sm:w-auto"
          >
            <button
              @click="openStatusUpdateModal"
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
            <div
              v-if="isLoadingApplication"
              class="py-8 text-center text-sm text-gray-500 dark:text-gray-400"
            >
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
                  application.customer?.fullname ||
                  application.customer?.customerName ||
                  "-"
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
                  application.customer?.email || "-"
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
                  application.customer?.phoneNumber ||
                  application.phoneNumber ||
                  "-"
                }}</span>
              </div>
              <div
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Nationality</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.nationality || "-"
                }}</span>
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
                  application.applicationNumber ||
                  `APP-${String(application.id).padStart(5, "0")}` ||
                  "-"
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
                  application.destinationCountry ||
                  application.destination ||
                  "-"
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
                  application.visaType || "-"
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
                  application.processingType || "-"
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
                  application.numberOfTravelers ||
                  application.travelers?.length ||
                  "-"
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
              <div class="mx-4 flex flex-col gap-2 py-5 dark:border-gray-700">
                <CustomDropdown
                  id="application-status"
                  label="Status"
                v-model="applicationStatus"
                :options="applicationStatusOptions"
                placeholder="Select status"
                search-placeholder="Search status"
                disabled
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

      <!-- Additional Info Tab -->
      <div v-if="activeTab === 'additional-info'" class="flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <!-- Columns Filter Button -->
          <div
            class="flex justify-center gap-2.5 sm:justify-end w-full sm:w-auto"
          >
            <button
              @click="openBulkResubmitModal"
              class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Request Additional Info
            </button>
          </div>
        </div>

        <!-- Traveler Tabs -->
        <div v-if="isLoadingTravelers || isLoadingApplication" class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
          <div class="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
        <div v-else-if="allPeople.length === 0" class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
          <div class="text-sm text-gray-500 dark:text-gray-400">No people found for this application.</div>
        </div>
        <div v-else class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden" style="border-radius: 7px">
          <!-- People Name Tabs -->
          <div class="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-1 flex gap-2 overflow-x-auto">
           <button
            v-for="person in allPeople"
            :key="person.id"
            @click="selectedTravelerId = person.id"
            :class="[
              selectedTravelerId === person.id
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              'px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200 whitespace-nowrap relative',  /* ADD relative */
            ]"
          >
              {{ person.name }}
              <span 
                v-if="getPersonPendingRequestsCount(person) > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ getPersonPendingRequestsCount(person) }}
              </span>
            </button>
          </div>

          <!-- Additional Info Content for Selected Person -->
          <div class="p-6">
            <div v-if="selectedTraveler || selectedPersonType === 'customer'" class="space-y-6">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Additional Information for {{ selectedPersonName }}
              </h2>
              
              <!-- Loading state for fields -->
              <div v-if="isLoadingFields" class="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Loading field definitions...
              </div>
              
              
              <!-- Additional Info Fields -->
              <div v-else-if="additionalInfoFields.length > 0" class="space-y-4">
                <div
                  v-for="field in additionalInfoFields"
                  :key="field.fieldId"
                  :class="[
                    'grid grid-cols-2 gap-4 py-3 border-b border-gray-200 dark:border-gray-700',
                    isFieldRequested(field.fieldId) ? 'bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-l-yellow-500 pl-4' : ''
                  ]"
                >
                  <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400 flex items-center gap-2">
                    {{ field.question }}
                    <span v-if="isFieldRequested(field.fieldId)"
                      class="text-xs px-2 py-0.5 bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 rounded whitespace-nowrap">
                      Resubmission Requested
                    </span>
                  </span>
                  <div class="text-sm text-gray-900 dark:text-white">
                    <!-- File Upload Display -->
                    <div v-if="field.isFile" class="flex items-center gap-2">
                      <a
                        :href="getFileUrl(field.value.filePath)"
                        target="_blank"
                        class="px-3 py-1 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-[12px] text-sm hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors inline-flex items-center gap-2"
                      >
                        <span>{{ field.value.fileName }}</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                          ({{ formatFileSize(field.value.fileSize) }})
                        </span>
                      </a>
                    </div>
                    <!-- Regular Value Display -->
                    <span v-else>{{ field.value || '-' }}</span>
                    <div v-if="field.submittedAt" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Submitted: {{ formatDate(field.submittedAt) }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty state -->
              <div v-else class="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                No additional information found for {{ selectedPersonName }}.
              </div>
            </div>
            <div v-else class="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
              Please select a person to view their additional information.
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
              placeholder="Search Documents"
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
              @click="openStatusUpdateModal"
              class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Update Status
            </button>
            <button
              class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors hidden"
            />
            <button
              class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors hidden"
            />
            <button
              class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors hidden"
            />
          </div>
        </div>

        <!-- Traveler Tabs -->
        <div v-if="isLoadingTravelers || isLoadingApplication" class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
          <div class="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
        <div v-else-if="allPeople.length === 0" class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
          <div class="text-sm text-gray-500 dark:text-gray-400">No people found for this application.</div>
        </div>
        <div v-else class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden" style="border-radius: 7px">
          <!-- People Name Tabs -->
          <div class="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-1 flex gap-2 overflow-x-auto">
            <button
              v-for="person in allPeople"
              :key="person.id"
              @click="selectedTravelerIdForDocuments = person.id"
              :class="[
                selectedTravelerIdForDocuments === person.id
                  ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
                'px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200 whitespace-nowrap',
              ]"
            >
              {{ person.name }}
            </button>
          </div>

          <!-- Documents Table for Selected Traveler -->
          <div class="overflow-x-auto">
            <table class="w-full min-w-[600px] sm:min-w-[800px]">
              <thead
                class="bg-[#FFFFFF] dark:bg-[#09090B] border-b dark:border-gray-800"
              >
                <tr class="!h-[37px] bg-[#F9FAFB] dark:bg-[#18181B]">
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
                v-for="document in filteredDocumentsForSelectedTraveler"
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
                    {{ document.documentType }}
                  </td>
                  <td class="px-2 sm:px-3 lg:px-4 py-2">
                    <div class="flex items-center space-x-2">
                      <a
                        v-if="document.isAdditionalInfo"
                        :href="getFileUrl(document.filePath)"
                        target="_blank"
                        class="px-3 py-1 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-[12px] text-sm hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                      >
                        {{ document.fieldName || 'Document' }}
                    </a>
                    <button
                      v-else
                      class="px-3 py-1 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-[12px] text-sm hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                    >
                        Documentation
                      </button>
                      <span class="text-sm text-gray-500 dark:text-gray-400">{{
                        document.fileName
                      }}</span>
                      <span v-if="document.fileSize" class="text-xs text-gray-400 dark:text-gray-500">
                        ({{ formatFileSize(document.fileSize) }})
                      </span>
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
                        v-if="document.isAdditionalInfo && typeof document.fieldId !== 'undefined'"
                        @click="openResubmitModal(document)"
                        class="px-2 py-1 text-xs font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        title="Request resubmission for this document"
                      >
                        Request Resubmission
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredDocumentsForSelectedTraveler.length === 0">
                  <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    No documents found for this traveler.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

          <!-- Pagination -->
          <div
            class="flex flex-row items-center justify-between flex-wrap gap-2 sm:gap-4 w-full p-4 border-t border-gray-200 dark:border-gray-700"
          >
            <!-- Selection Count -->
            <div
              class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap"
            >
              {{ selectedDocumentsCount }} of {{ documentsForSelectedTraveler.length }} row(s) selected.
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
              v-if="isLoadingPayment"
              class="py-8 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              Loading payment information...
            </div>
            <template v-else-if="payment">
              <div class="mx-4 flex flex-col gap-2 py-5 dark:border-gray-700">
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
                  payment.paymentGateway || "-"
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
                  payment.status || "-"
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
                  payment.transactionId || "-"
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
                  payment.amount
                    ? `${payment.currency || "PKR"} ${payment.amount}`
                    : "-"
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
                  payment.paymentMethod || "-"
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
            <div
              v-else
              class="py-8 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              {{ paymentErrorMessage || "Payment information not available" }}
            </div>
          </div> <!-- Closes: <div class="flex flex-col"> -->
        </div> <!-- Closes: <div class="space-y-6"> -->
      </div> <!-- Closes: Payment tab <div v-if="activeTab === 'payment'"> -->
      
    </div> <!-- Closes: Main container <div class="space-y-8 sm:space-y-4"> -->

    <!-- Resubmission Modal -->
    <div v-if="showResubmitModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-800 rounded-xl p-5 w-full max-w-lg">
        <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-3">Request Resubmission</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">This will request the client to re-upload the selected document(s).</p>
        <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">Admin note to client</label>
        <textarea v-model="resubmitNote" rows="3" class="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-sm p-2" style="border-radius: 7px" placeholder="Optional note"></textarea>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="showResubmitModal = false" class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-[6px]">Cancel</button>
          <button @click="submitResubmissionRequest" class="px-3 py-2 text-sm rounded-[6px] text-white bg-black dark:bg-white dark:text-black">Send Request</button>
        </div>
      </div>
    </div>
    <!-- ✅ ADD: Bulk resubmission modal (before closing DashboardLayout) -->
    <div v-if="showBulkResubmitModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Request Additional Information</h3>
        
        <!-- Application Fields -->
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-medium">📄 Application Fields ({{ bulkRequestSelection.application.fieldIds.length }} existing, {{ bulkRequestSelection.application.newFields.length }} new)</h4>
            <button 
              @click="addNewApplicationField"
              class="px-3 py-1 text-xs font-medium rounded-[6px] text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              + Add New Field
            </button>
          </div>
          
          <!-- Existing Fields -->
          <div class="space-y-2 max-h-48 overflow-y-auto mb-3">
            <div v-for="field in getApplicationFields()" :key="field.id" class="flex items-start gap-2">
              <input type="checkbox" :id="`app-field-${field.id}`" :value="field.id" v-model="bulkRequestSelection.application.fieldIds" />
              <label :for="`app-field-${field.id}`" class="text-sm cursor-pointer">{{ field.question }}</label>
            </div>
          </div>
          
          <!-- New Custom Fields -->
          <div v-if="bulkRequestSelection.application.newFields.length > 0" class="space-y-3 mb-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <div v-for="(newField, index) in bulkRequestSelection.application.newFields" :key="index" class="space-y-2 p-2 bg-white dark:bg-gray-800 rounded border border-yellow-300 dark:border-yellow-600">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-yellow-800 dark:text-yellow-300">New Custom Field {{ index + 1 }}</span>
                <button 
                  @click="removeNewApplicationField(index)"
                  class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs"
                >
                  Remove
                </button>
              </div>
              <input 
                v-model="newField.question" 
                type="text" 
                placeholder="Field question (e.g., Please provide additional passport copy)"
                class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded"
              />
              <div class="grid grid-cols-2 gap-2">
                <select v-model="newField.fieldType" class="px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded">
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="textarea">Textarea</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="upload">Upload</option>
                </select>
                <label class="flex items-center gap-2 text-xs">
                  <input type="checkbox" v-model="newField.isRequired" />
                  Required
                </label>
              </div>
              <div v-if="newField.fieldType === 'upload'" class="space-y-1">
                <input 
                  v-model="newField.allowedFileTypes" 
                  type="text" 
                  placeholder="Allowed file types (e.g., pdf,jpg,png)"
                  class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded"
                />
              </div>
              <div v-if="newField.fieldType === 'dropdown'" class="space-y-1">
                <input 
                  v-model="newField.options" 
                  type="text" 
                  placeholder="Options (comma-separated)"
                  class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded"
                />
              </div>
            </div>
          </div>
          
          <textarea v-if="bulkRequestSelection.application.fieldIds.length > 0 || bulkRequestSelection.application.newFields.length > 0" 
            v-model="bulkRequestSelection.application.note" rows="2"
            class="w-full mt-3 border border-gray-300 dark:border-gray-700 p-2 rounded text-sm" placeholder="Optional note..."></textarea>
        </div>

        <!-- Traveler Fields -->
        <div v-for="traveler in validTravelersForModal" :key="traveler.id" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-medium">👤 {{ traveler.firstName }} {{ traveler.lastName }} ({{ getBulkTravelerSelection(traveler.id).fieldIds.length }} existing, {{ getBulkTravelerSelection(traveler.id).newFields.length }} new)</h4>
            <button 
              @click="addNewTravelerField(traveler.id)"
              class="px-3 py-1 text-xs font-medium rounded-[6px] text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              + Add New Field
            </button>
          </div>
          
          <!-- Existing Fields -->
          <div class="space-y-2 max-h-48 overflow-y-auto mb-3">
            <div v-for="field in getTravelerFields(traveler.id)" :key="field.id" class="flex items-start gap-2">
              <input type="checkbox" :id="`t-${traveler.id}-field-${field.id}`" :value="field.id" 
                v-model="getBulkTravelerSelection(traveler.id).fieldIds" />
              <label :for="`t-${traveler.id}-field-${field.id}`" class="text-sm cursor-pointer">{{ field.question }}</label>
            </div>
          </div>
          
          <!-- New Custom Fields -->
          <div v-if="getBulkTravelerSelection(traveler.id).newFields.length > 0" class="space-y-3 mb-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <div v-for="(newField, index) in getBulkTravelerSelection(traveler.id).newFields" :key="index" class="space-y-2 p-2 bg-white dark:bg-gray-800 rounded border border-yellow-300 dark:border-yellow-600">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-yellow-800 dark:text-yellow-300">New Custom Field {{ index + 1 }}</span>
                <button 
                  @click="removeNewTravelerField(traveler.id, index)"
                  class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs"
                >
                  Remove
                </button>
              </div>
              <input 
                v-model="newField.question" 
                type="text" 
                placeholder="Field question (e.g., Please provide additional passport copy)"
                class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded"
              />
              <div class="grid grid-cols-2 gap-2">
                <select v-model="newField.fieldType" class="px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded">
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="textarea">Textarea</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="upload">Upload</option>
                </select>
                <label class="flex items-center gap-2 text-xs">
                  <input type="checkbox" v-model="newField.isRequired" />
                  Required
                </label>
              </div>
              <div v-if="newField.fieldType === 'upload'" class="space-y-1">
                <input 
                  v-model="newField.allowedFileTypes" 
                  type="text" 
                  placeholder="Allowed file types (e.g., pdf,jpg,png)"
                  class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded"
                />
              </div>
              <div v-if="newField.fieldType === 'dropdown'" class="space-y-1">
                <input 
                  v-model="newField.options" 
                  type="text" 
                  placeholder="Options (comma-separated)"
                  class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded"
                />
              </div>
            </div>
          </div>
          
          <textarea v-if="getBulkTravelerSelection(traveler.id).fieldIds.length > 0 || getBulkTravelerSelection(traveler.id).newFields.length > 0" 
            v-model="getBulkTravelerSelection(traveler.id).note" rows="2"
            class="w-full mt-3 border border-gray-300 dark:border-gray-700 p-2 rounded text-sm" 
            placeholder="Optional note..."></textarea>
        </div>

        <!-- Summary -->
        <div v-if="bulkRequestTotalCount > 0" class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
          <strong>Summary:</strong> {{ bulkRequestTotalCount }} field(s) across {{ bulkRequestTargetCount }} target(s)
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3">
          <button @click="closeBulkResubmitModal" class="px-4 py-2 text-sm border rounded-[6px]">Cancel</button>
          <button @click="submitBulkResubmissionRequest" :disabled="bulkRequestTotalCount === 0"
            class="px-4 py-2 text-sm rounded-[6px] text-white bg-black dark:bg-white dark:text-black disabled:opacity-50">
            Send Request(s) ({{ bulkRequestTotalCount }})
          </button>
        </div>
      </div>
    </div>
    <!-- Status Update Modal -->
    <div v-if="showStatusUpdateModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Application Status</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Select a new status for this application.</p>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
          <CustomDropdown
            id="status-update-modal"
            v-model="statusUpdateValue"
            :options="applicationStatusOptions"
            placeholder="Select status"
            search-placeholder="Search status"
          />
        </div>
        <div v-if="statusUpdateError" class="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
          <p class="text-sm text-red-700 dark:text-red-300">{{ statusUpdateError }}</p>
        </div>
        <div class="flex justify-end gap-3">
          <button 
            @click="closeStatusUpdateModal" 
            class="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-[6px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="submitStatusUpdate" 
            :disabled="!statusUpdateValue || statusUpdateValue === applicationStatus"
            class="px-4 py-2 text-sm rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update Status
          </button>
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
import { useVisaProductFieldsApi } from "~/composables/useVisaProductFieldsApi";

// Get route parameters
const route = useRoute();
const router = useRouter();
const applicationId = computed(() => route.params.id);

// Use application composable
const { getApplication, getApplicationPayment, getApplicationTravelers, requestResubmission, updateApplicationStatus } = useApplication();

// Use visa product fields API
const { getVisaProductFieldsByVisaProduct, getResponsesByApplication, getFieldsWithResponsesByApplication } = useVisaProductFieldsApi();

// Active tab state - initialize from query parameter or default to 'details'
const activeTab = ref("details");

// Application data
const application = ref(null);
const isLoadingApplication = ref(false);
const errorMessage = ref("");

// Travelers data
const travelers = ref([]);
const isLoadingTravelers = ref(false);
const selectedTravelerId = ref(null);
const selectedTravelerIdForDocuments = ref(null);

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
  "rejected",
  "completed"
];

const paymentStatusOptions = [
  "pending",
  "processing",
  "completed",
  "failed",
  "refunded",
];

// Documents data and methods
const documents = ref([
  {
    id: 1,
    travelerId: 1,
    traveler: "Ali Raza",
    documentType: "PDF",
    fileName: "ali.passport.pdf",
    dateUploaded: "01/01/2025",
    selected: false,
  },
  {
    id: 2,
    travelerId: 1,
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

// All people in application (customer + travelers)
const allPeople = computed(() => {
  const people = [];
  
  // Add customer (application filler) 
  if (application.value?.customer) {
    const customer = application.value.customer;
    const customerName = customer.fullname || customer.customerName || customer.name || 'Application Filler';
    
    console.log('👤 Customer:', { id: customer.id, name: customerName });
    
    people.push({
      id: `customer-${customer.id || 'filler'}`,
      name: customerName,
      type: 'customer',
      data: customer
    });
  }
  
  // ✅ FILTER: Only add travelers that have a valid ID
  // This removes the duplicate customer entry that has no ID
  const validTravelers = travelers.value.filter(t => t.id !== null && t.id !== undefined);
  
  console.log('🚶 Travelers array (filtered):', validTravelers);
  
  validTravelers.forEach((traveler, index) => {
    const travelerName = `${traveler.firstName || ''} ${traveler.lastName || ''}`.trim() || `Traveler ${index + 2}`;
    
    console.log(`  Traveler ${index}:`, { id: traveler.id, name: travelerName });
    
    people.push({
      id: traveler.id,
      name: travelerName,
      type: 'traveler',
      data: traveler
    });
  });
  
  console.log('📋 Final allPeople:', people);
  
  return people;
});

// Selected traveler computed
const selectedTraveler = computed(() => {
  if (!selectedTravelerId.value) return null;
  const person = allPeople.value.find(p => p.id === selectedTravelerId.value);
  return person ? person.data : null;
});

// Selected person name
const selectedPersonName = computed(() => {
  if (!selectedTravelerId.value) return '';
  const person = allPeople.value.find(p => p.id === selectedTravelerId.value);
  return person ? person.name : '';
});

// Selected person type
const selectedPersonType = computed(() => {
  if (!selectedTravelerId.value) return null;
  const person = allPeople.value.find(p => p.id === selectedTravelerId.value);
  return person ? person.type : null;
});

const validTravelersForModal = computed(() => {
  return travelers.value.filter(t => t.id !== null && t.id !== undefined)
})
// Additional info fields state
const isLoadingFields = ref(false);
const fieldDefinitions = ref([]);

// Normalize responses helper: supports array or object; returns object keyed by fieldId
const normalizeResponses = (raw) => {
  if (!raw) return {};
  if (Array.isArray(raw)) {
    const normalized = {};
    raw.forEach((item, index) => {
      const fieldId = item?.fieldId ?? String(index);
      if (!fieldId && fieldId !== 0) return;
      if (item && typeof item === 'object' && 'filePath' in item) {
        normalized[fieldId] = {
          filePath: item.filePath,
          fileName: item.fileName,
          fileSize: item.fileSize,
          submittedAt: item.submittedAt,
        };
      } else {
        normalized[fieldId] = {
          value: item?.value,
          submittedAt: item?.submittedAt,
        };
      }
    });
    return normalized;
  }
  // Already an object
  return raw;
};

// Load application-level additional info responses and attach to application.fieldResponses
const loadApplicationResponses = async () => {
  if (!applicationId.value) return;
  try {
    // Prefer the combined endpoint so we also receive admin-only fields and editability
    const merged = await getFieldsWithResponsesByApplication(applicationId.value);
    const data = merged?.data;
    const list = Array.isArray(data?.fields) ? data.fields : (Array.isArray(data) ? data : []);

    // Update field definitions from combined payload for consistent ordering and to include admin fields
    if (Array.isArray(list)) {
      fieldDefinitions.value = list
        .map((f) => ({
          id: f?.id ?? f?.fieldId,
          question: f?.question,
          fieldType: f?.fieldType,
          displayOrder: f?.displayOrder ?? 999,
        }))
        .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
    }

    // Synthesize application-level responses from the combined list
    const synthesized = {};
    (list || []).forEach((f) => {
      const fid = f?.id ?? f?.fieldId;
      const r = f?.response;
      if (fid == null || !r) return;
      if (r && typeof r === 'object' && 'filePath' in r) {
        synthesized[fid] = {
          filePath: r.filePath,
          fileName: r.fileName,
          fileSize: r.fileSize,
          submittedAt: r.submittedAt,
        };
      } else if (r && (r.value !== undefined || r.submittedAt)) {
        synthesized[fid] = { value: r.value, submittedAt: r.submittedAt };
      }
    });

    application.value = application.value || {};
    const existing = application.value.fieldResponses || {};
    application.value.fieldResponses = {
      travelers: existing.travelers || [],
      application: synthesized,
    };

    try {
      console.log('🟢 Loaded fields-with-responses (combined) and synthesized application responses', {
        fieldsCount: Array.isArray(list) ? list.length : 0,
        responseKeys: Object.keys(synthesized),
      });
    } catch {}
  } catch (e) {
    try {
      console.log('🔴 Failed to load application-level responses', e);
    } catch {}
  }
};

// Additional info fields for selected person
const additionalInfoFields = computed(() => {
  if (!selectedTravelerId.value) return [];
  
  const fields = [];
  
  // Determine if selected person is customer or traveler
  const selectedPerson = allPeople.value.find(p => p.id === selectedTravelerId.value);
  if (!selectedPerson) return [];
  
  console.log('=== ADDITIONAL INFO DEBUG START ===');
  console.log('Selected Person Type:', selectedPerson.type);
  console.log('Selected Person ID:', selectedPerson.id);
  
  let personData = null;
  
  if (selectedPerson.type === 'customer') {
    // Get application-level field responses from application entity
    console.log('CUSTOMER: Raw application.value.fieldResponses:', JSON.stringify(application.value?.fieldResponses, null, 2));
    if (application.value?.fieldResponses) {
      const fieldResponses = application.value.fieldResponses;
      console.log('CUSTOMER: fieldResponses.application:', JSON.stringify(fieldResponses.application, null, 2));
      console.log('CUSTOMER: fieldResponses (direct):', JSON.stringify(fieldResponses, null, 2));
      
      const rawData = fieldResponses.application || fieldResponses || {};
      
      // CRITICAL: If it's an array, convert it to an object keyed by fieldId
      if (Array.isArray(rawData)) {
        console.log('CUSTOMER: Converting array to object keyed by fieldId');
        personData = {};
        rawData.forEach((item, index) => {
          const fieldId = item.fieldId || String(index);
          // Extract the response data (value or file info)
          if (item.filePath) {
            personData[fieldId] = {
              filePath: item.filePath,
              fileName: item.fileName,
              fileSize: item.fileSize,
              submittedAt: item.submittedAt
            };
          } else {
            personData[fieldId] = {
              value: item.value,
              submittedAt: item.submittedAt
            };
          }
        });
        console.log('CUSTOMER: Converted personData:', JSON.stringify(personData, null, 2));
      } else {
        personData = rawData;
        console.log('CUSTOMER: Final personData (object):', JSON.stringify(personData, null, 2));
      }
    }
  } else {
    // Get traveler-level field responses from traveler entity
    // The fieldResponses are stored directly on the traveler entity
    console.log('TRAVELER: Raw selectedPerson.data.fieldResponses:', JSON.stringify(selectedPerson.data?.fieldResponses, null, 2));
    if (selectedPerson.data?.fieldResponses) {
      personData = selectedPerson.data.fieldResponses;
      console.log('TRAVELER: Final personData:', JSON.stringify(personData, null, 2));
    }
  }
  
  if (!personData || Object.keys(personData).length === 0) {
    console.log('No personData found, returning empty array');
    return [];
  }
  
  console.log('Field Definitions Count:', fieldDefinitions.value.length);
  console.log('Field Definitions:', fieldDefinitions.value.map(f => ({ id: f.id, question: f.question, displayOrder: f.displayOrder })));
  console.log('PersonData Keys:', Object.keys(personData));
  console.log('PersonData:', JSON.stringify(personData, null, 2));
  
  // CRITICAL: Iterate over fieldDefinitions FIRST (sorted by displayOrder)
  // This ensures fields are displayed in the correct order and matched correctly
  // 
  // How this handles new fields:
  // - New fields added to fieldDefinitions will be processed, but won't have responses
  //   in old applications, so they won't be displayed (correct behavior)
  // - Old responses are matched by fieldId, so they'll still work even if field order changes
  // - Orphaned responses (from deleted fields) are shown at the end
  // - Order is always determined by displayOrder in fieldDefinitions, ensuring consistency
  fieldDefinitions.value.forEach((fieldDef, index) => {
    console.log(`\n--- Processing Field Definition ${index + 1} ---`);
    console.log('FieldDef ID:', fieldDef.id, 'Type:', typeof fieldDef.id);
    console.log('FieldDef Question:', fieldDef.question);
    console.log('FieldDef DisplayOrder:', fieldDef.displayOrder);
    // Try to find matching response by checking all possible key formats
    const fieldIdNum = Number(fieldDef.id);
    const fieldIdStr = String(fieldDef.id);
    
    console.log('Looking for response with ID:', fieldDef.id, 'as number:', fieldIdNum, 'as string:', fieldIdStr);
    
    // Check multiple key formats: number, string, and try all keys
    let fieldData = personData[fieldDef.id] || personData[fieldIdStr] || personData[fieldIdNum];
    console.log('Direct lookup result:', fieldData ? 'FOUND' : 'NOT FOUND');
    
    // If still not found, search through all keys for a match
    if (!fieldData) {
      console.log('Searching through all keys...');
      const matchingKey = Object.keys(personData).find(key => {
        const keyNum = Number(key);
        const keyStr = String(key);
        const matches = (keyNum === fieldDef.id) || 
               (keyStr === fieldIdStr) || 
               (keyNum === fieldIdNum) ||
               (String(keyNum) === String(fieldDef.id));
        if (matches) {
          console.log(`  Found match! Key: "${key}" (num: ${keyNum}, str: "${keyStr}") matches fieldDef.id: ${fieldDef.id}`);
        }
        return matches;
      });
      if (matchingKey) {
        fieldData = personData[matchingKey];
        console.log('Matched via key search:', matchingKey);
      } else {
        console.log('  No match found in keys:', Object.keys(personData));
      }
    }
    
    // Only add field if there's a response for it
    if (fieldData) {
      const isFile = fieldData.filePath !== undefined;
      const value = isFile ? fieldData : (fieldData.value !== undefined ? fieldData.value : fieldData);
      console.log('Adding field with value:', isFile ? `FILE: ${fieldData.fileName}` : value);
      fields.push({
        fieldId: fieldDef.id,
        question: fieldDef.question,
        value: value,
        isFile: isFile,
        submittedAt: fieldData.submittedAt,
        fieldType: fieldDef.fieldType,
        displayOrder: fieldDef.displayOrder !== undefined && fieldDef.displayOrder !== null 
          ? fieldDef.displayOrder 
          : 999
      });
    } else {
      console.log('No response data found for this field definition');
    }
  });
  
  console.log('\n--- Checking for orphaned responses ---');
  console.log('Fields matched so far:', fields.length);
  
  // Also include any responses that don't have matching field definitions (orphaned responses)
  Object.keys(personData).forEach(fieldId => {
    const fieldData = personData[fieldId];
    const numericFieldId = Number(fieldId);
    
    // Check if this field is already included in fields array
    const alreadyIncluded = fields.some(f => {
      const fId = Number(f.fieldId) || f.fieldId;
      return fId === numericFieldId || 
             fId === fieldId || 
             String(fId) === String(fieldId) ||
             Number(String(fId)) === numericFieldId;
    });
    
    if (!alreadyIncluded) {
      console.log(`Orphaned response found: Field ID "${fieldId}" (numeric: ${numericFieldId})`);
      // Field definition not found, still show the data with field ID as label
      const isFile = fieldData.filePath !== undefined;
      fields.push({
        fieldId: numericFieldId || fieldId,
        question: `Field ${fieldId}`,
        value: isFile ? fieldData : (fieldData.value !== undefined ? fieldData.value : fieldData),
        isFile: isFile,
        submittedAt: fieldData.submittedAt,
        fieldType: 'unknown',
        displayOrder: 999
      });
    }
  });
  
  console.log('\n--- Before Sorting ---');
  console.log('Fields array:', fields.map(f => ({ 
    fieldId: f.fieldId, 
    question: f.question, 
    displayOrder: f.displayOrder,
    value: f.isFile ? `FILE: ${f.value.fileName}` : f.value
  })));
  
  // Sort by display order first, then by fieldId as secondary sort for stability
  const sortedFields = fields.sort((a, b) => {
    // Primary sort: displayOrder
    const aOrder = a.displayOrder !== undefined && a.displayOrder !== null ? a.displayOrder : 999;
    const bOrder = b.displayOrder !== undefined && b.displayOrder !== null ? b.displayOrder : 999;
    
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }
    
    // Secondary sort: fieldId (to ensure consistent ordering when displayOrder is the same)
    const aId = Number(a.fieldId) || a.fieldId;
    const bId = Number(b.fieldId) || b.fieldId;
    return aId - bId;
  });
  
  console.log('\n--- After Sorting ---');
  console.log('Sorted fields array:', sortedFields.map(f => ({ 
    fieldId: f.fieldId, 
    question: f.question, 
    displayOrder: f.displayOrder,
    value: f.isFile ? `FILE: ${f.value.fileName}` : f.value
  })));
  console.log('=== ADDITIONAL INFO DEBUG END ===\n');
  
  return sortedFields;
});

// Documents for selected traveler (including files from additional info)
const documentsForSelectedTraveler = computed(() => {
  if (!selectedTravelerIdForDocuments.value) return [];
  
  const docs = [];
  const selectedPerson = allPeople.value.find(p => p.id === selectedTravelerIdForDocuments.value);
  if (!selectedPerson) return [];
  
  // Get documents from the static documents array (if any)
  if (selectedPerson.type === 'traveler') {
    docs.push(...documents.value.filter(doc => doc.travelerId === selectedTravelerIdForDocuments.value));
  }
  
  // Get files from field responses
  let personData = null;
  
  if (selectedPerson.type === 'customer') {
    // Get application-level field responses from application entity
    if (application.value?.fieldResponses) {
      const fieldResponses = application.value.fieldResponses;
      const rawData = fieldResponses.application || fieldResponses || {};
      
      // CRITICAL: If it's an array, convert it to an object keyed by fieldId
      if (Array.isArray(rawData)) {
        personData = {};
        rawData.forEach((item, index) => {
          const fieldId = item.fieldId || String(index);
          // Extract the response data (value or file info)
          if (item.filePath) {
            personData[fieldId] = {
              filePath: item.filePath,
              fileName: item.fileName,
              fileSize: item.fileSize,
              submittedAt: item.submittedAt
            };
          } else {
            personData[fieldId] = {
              value: item.value,
              submittedAt: item.submittedAt
            };
          }
        });
      } else {
        personData = rawData;
      }
    }
  } else if (selectedPerson.type === 'traveler') {
    // Get traveler-level field responses from traveler entity
    // The fieldResponses are stored directly on the traveler entity
    if (selectedPerson.data?.fieldResponses) {
      personData = selectedPerson.data.fieldResponses;
    }
  }
  
  if (personData) {
    Object.keys(personData).forEach(fieldId => {
      const fieldData = personData[fieldId];
      if (fieldData.filePath) {
        // Try to find field definition by matching both string and number IDs
        const fieldDef = fieldDefinitions.value.find(f => 
          f.id === Number(fieldId) || String(f.id) === String(fieldId)
        );
        const fieldName = fieldDef?.question || `Field ${fieldId}`;
        
        docs.push({
          id: `additional-info-${selectedPerson.id}-${fieldId}`,
          travelerId: selectedPerson.id,
          documentType: fieldDef?.fieldType === 'upload' ? 'Upload' : 'Document',
          fileName: fieldData.fileName || 'Unknown file',
          filePath: fieldData.filePath,
          fileSize: fieldData.fileSize,
          dateUploaded: fieldData.submittedAt ? formatDate(fieldData.submittedAt) : '-',
          fieldName: fieldName,
          fieldId: Number(fieldId),
          selected: false,
          isAdditionalInfo: true
        });
      }
    });
  }
  
  return docs;
});

const filteredDocumentsForSelectedTraveler = computed(() => {
  let filtered = documentsForSelectedTraveler.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (doc) =>
        doc.documentType
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

const selectedDocumentsCount = computed(() => {
  return documentsForSelectedTraveler.value.filter((doc) => doc.selected).length;
});


const hasActiveResubmissionRequests = computed(() => {
  return activeResubmissionRequests.value.some(req => !req.fulfilledAt)
})

const activeResubmissionRequestsCount = computed(() => {
  return activeResubmissionRequests.value.filter(req => !req.fulfilledAt).length
})

const activeRequestsForSelectedPerson = computed(() => {
  if (!selectedTravelerId.value) return []
  const person = allPeople.value.find(p => p.id === selectedTravelerId.value)
  if (!person) return []
  
  if (person.type === 'customer') {
    return activeResubmissionRequests.value.filter(
      req => !req.fulfilledAt && req.target === 'application'
    )
  } else {
    return activeResubmissionRequests.value.filter(
      req => !req.fulfilledAt && req.target === 'traveler' && req.travelerId === person.id
    )
  }
})

// ✅ ADD: After computed properties
const getTravelerNameById = (travelerId) => {
   if (!travelerId) return 'Application' 
  const person = allPeople.value.find(p => p.id === travelerId)
  return person ? person.name : `Traveler ${travelerId}`
}

const getApplicationFields = () => {
  // Return all fields that don't have a travelerId (application-level fields)
  // Since we're getting fields from the combined endpoint, all fields without travelerId are application fields
  return fieldDefinitions.value.filter(f => !f.travelerId)
}

const getTravelerFields = (travelerId) => {
  return fieldDefinitions.value.filter(f => !f.travelerId)
}

const getBulkTravelerSelection = (travelerId) => {
  let existing = bulkRequestSelection.value.travelers.find(t => t.travelerId === travelerId)
  if (!existing) {
    existing = { travelerId, fieldIds: [], newFields: [], note: '' }
    bulkRequestSelection.value.travelers.push(existing)
  }
  return existing
}

// Add new custom field for application
const addNewApplicationField = () => {
  bulkRequestSelection.value.application.newFields.push({
    fieldType: 'text',
    question: '',
    isRequired: false,
    allowedFileTypes: '',
    options: ''
  })
}

// Remove new custom field for application
const removeNewApplicationField = (index) => {
  bulkRequestSelection.value.application.newFields.splice(index, 1)
}

// Add new custom field for traveler
const addNewTravelerField = (travelerId) => {
  const selection = getBulkTravelerSelection(travelerId)
  selection.newFields.push({
    fieldType: 'text',
    question: '',
    isRequired: false,
    allowedFileTypes: '',
    options: ''
  })
}

// Remove new custom field for traveler
const removeNewTravelerField = (travelerId, index) => {
  const selection = getBulkTravelerSelection(travelerId)
  selection.newFields.splice(index, 1)
}

// ✅ ADD: After helper functions
const loadActiveResubmissionRequests = async () => {
  if (!applicationId.value) return
  try {
    const { getActiveResubmissionRequests } = useApplication()
    const response = await getActiveResubmissionRequests(Number(applicationId.value))
    activeResubmissionRequests.value = response?.data || []
  } catch (error) {
    console.error('Error loading resubmission requests:', error)
    activeResubmissionRequests.value = []
  }
}

const openBulkResubmitModal = () => {
  bulkRequestSelection.value = {
    application: { fieldIds: [], newFields: [], note: '' },
    travelers: []
  }
  showBulkResubmitModal.value = true
}

const closeBulkResubmitModal = () => {
  showBulkResubmitModal.value = false
}

const submitBulkResubmissionRequest = async () => {
  try {
    const requests = []
    
    // Process application-level request
    const appFieldIds = bulkRequestSelection.value.application.fieldIds || []
    const appNewFields = (bulkRequestSelection.value.application.newFields || [])
      .filter(f => f.question && f.question.trim())
      .map(f => ({
        fieldType: f.fieldType,
        question: f.question.trim(),
        isRequired: f.isRequired || false,
        ...(f.fieldType === 'upload' && f.allowedFileTypes ? {
          allowedFileTypes: f.allowedFileTypes.split(',').map(t => t.trim()).filter(t => t)
        } : {}),
        ...(f.fieldType === 'dropdown' && f.options ? {
          options: f.options.split(',').map(o => o.trim()).filter(o => o)
        } : {})
      }))
    
    if (appFieldIds.length > 0 || appNewFields.length > 0) {
      requests.push({
        target: 'application',
        ...(appFieldIds.length > 0 ? { fieldIds: appFieldIds } : {}),
        ...(appNewFields.length > 0 ? { newFields: appNewFields } : {}),
        note: bulkRequestSelection.value.application.note || null
      })
    }
    
    // Process traveler-level requests
    bulkRequestSelection.value.travelers.forEach(t => {
      const fieldIds = t.fieldIds || []
      const newFields = (t.newFields || [])
        .filter(f => f.question && f.question.trim())
        .map(f => ({
          fieldType: f.fieldType,
          question: f.question.trim(),
          isRequired: f.isRequired || false,
          ...(f.fieldType === 'upload' && f.allowedFileTypes ? {
            allowedFileTypes: f.allowedFileTypes.split(',').map(t => t.trim()).filter(t => t)
          } : {}),
          ...(f.fieldType === 'dropdown' && f.options ? {
            options: f.options.split(',').map(o => o.trim()).filter(o => o)
          } : {})
        }))
      
      if (fieldIds.length > 0 || newFields.length > 0) {
        requests.push({
          target: 'traveler',
          travelerId: t.travelerId,
          ...(fieldIds.length > 0 ? { fieldIds } : {}),
          ...(newFields.length > 0 ? { newFields } : {}),
          note: t.note || null
        })
      }
    })
    
    if (requests.length === 0) {
      alert('Please select at least one existing field or create at least one new field.')
      return
    }
    
    await requestResubmission(Number(applicationId.value), requests)
    showBulkResubmitModal.value = false
    alert(`${requests.length} request(s) sent successfully.`)
    await loadActiveResubmissionRequests()
    await loadApplication()
  } catch (error) {
    alert('Failed to submit request(s).')
  }
}

const isFieldRequested = (fieldId) => {
  const requests = activeRequestsForSelectedPerson.value
  // Handle both positive (product fields) and negative (admin-created fields) IDs
  const numericFieldId = Number(fieldId)
  return requests.some(req => (req.fieldIds || []).includes(numericFieldId))
}

const getPersonPendingRequestsCount = (person) => {
  if (!person) return 0
  if (person.type === 'customer') {
    const requests = activeResubmissionRequests.value.filter(
      req => !req.fulfilledAt && req.target === 'application'
    )
    return requests.reduce((sum, req) => {
      const fieldIdsCount = (req.fieldIds || []).length
      const newFieldsCount = (req.newFields || []).length
      return sum + fieldIdsCount + newFieldsCount
    }, 0)
  } else {
    const requests = activeResubmissionRequests.value.filter(
      req => !req.fulfilledAt && req.target === 'traveler' && req.travelerId === person.id
    )
    return requests.reduce((sum, req) => {
      const fieldIdsCount = (req.fieldIds || []).length
      const newFieldsCount = (req.newFields || []).length
      return sum + fieldIdsCount + newFieldsCount
    }, 0)
  }
}

const bulkRequestTotalCount = computed(() => {
  let count = (bulkRequestSelection.value.application.fieldIds?.length || 0) + 
              (bulkRequestSelection.value.application.newFields?.length || 0)
  bulkRequestSelection.value.travelers.forEach(t => {
    count += (t.fieldIds?.length || 0) + (t.newFields?.length || 0)
  })
  return count
})

const bulkRequestTargetCount = computed(() => {
  let count = 0
  const appHasFields = (bulkRequestSelection.value.application.fieldIds?.length || 0) > 0 || 
                       (bulkRequestSelection.value.application.newFields?.length || 0) > 0
  if (appHasFields) count++
  bulkRequestSelection.value.travelers.forEach(t => {
    const hasFields = (t.fieldIds?.length || 0) > 0 || (t.newFields?.length || 0) > 0
    if (hasFields) count++
  })
  return count
})


// Resubmission modal state and handlers
const showResubmitModal = ref(false);
const resubmitNote = ref('');
const singleDocumentForResubmission = ref(null); // Store single document when clicking button

const activeResubmissionRequests = ref([])
const showResubmissionDetails = ref(false)
const showBulkResubmitModal = ref(false)
const bulkRequestSelection = ref({
  application: { fieldIds: [], newFields: [], note: '' },
  travelers: [] // Array of { travelerId, fieldIds, newFields, note }
})

// Status update modal state
const showStatusUpdateModal = ref(false);
const statusUpdateValue = ref('');
const statusUpdateError = ref('');
const isUpdatingStatus = ref(false);

const openResubmitModal = (doc) => {
  if (doc && doc.isAdditionalInfo && typeof doc.fieldId !== 'undefined') {
    // Single document resubmission from the button
    // Store the document directly instead of trying to find it in the list
    singleDocumentForResubmission.value = doc;
    
    // Clear current selections
    documentsForSelectedTraveler.value.forEach(d => (d.selected = false));
    
    // Try to find and select the document in the list (for visual feedback)
    const setAndOpen = () => {
      const match = documentsForSelectedTraveler.value.find(d => {
        // Match by fieldId and travelerId (more reliable than id)
        return d.fieldId === doc.fieldId && 
               d.travelerId === doc.travelerId &&
               d.isAdditionalInfo === true;
      });
      if (match) {
        match.selected = true;
      }
      
      // Open modal
      showResubmitModal.value = true;
    };
    
    // If we need to switch travelers, do that first
    if (selectedTravelerIdForDocuments.value !== doc.travelerId) {
      selectedTravelerIdForDocuments.value = doc.travelerId;
      nextTick(() => setAndOpen());
    } else {
      setAndOpen();
    }
    return;
  }
  
  // Multiple document selection (from checkboxes)
  singleDocumentForResubmission.value = null; // Clear single document selection
  if (!selectedTravelerIdForDocuments.value) {
    alert('Please select a traveler first.');
    return;
  }
  if (selectedDocumentsCount.value === 0) {
    alert('Please select at least one document to request resubmission.');
    return;
  }
  showResubmitModal.value = true;
};

// Allow selecting multiple documents AND multiple travelers
const submitResubmissionRequest = async () => {
  try {
    // Group selected documents by traveler/application
    const requests = []

    // If we have a single document from button click, use it directly
    if (singleDocumentForResubmission.value) {
      const doc = singleDocumentForResubmission.value;
      const fieldId = Number(doc.fieldId);
      
      if (!isNaN(fieldId)) {
        // Check if travelerId is a customer ID (starts with "customer-") or a numeric traveler ID
        const isCustomerId = doc.travelerId && String(doc.travelerId).startsWith('customer-');
        const isNumericTravelerId = doc.travelerId && !isNaN(Number(doc.travelerId)) && !isCustomerId;
        
        if (isNumericTravelerId) {
          // Traveler-level document (numeric traveler ID)
          requests.push({
            target: 'traveler',
            travelerId: Number(doc.travelerId),
            fieldIds: [fieldId],
            note: resubmitNote.value || 'Please re-upload the selected documents.'
          });
        } else {
          // Application-level document (customer ID or no travelerId)
          requests.push({
            target: 'application',
            fieldIds: [fieldId],
            note: resubmitNote.value || 'Please re-upload the selected documents.'
          });
        }
      }
    } else {
      // Multiple document selection (from checkboxes)
      // Check application-level docs (customer IDs or no travelerId)
      const appDocs = documentsForSelectedTraveler.value.filter(d => {
        if (!d.selected || !d.isAdditionalInfo) return false;
        // Application-level: no travelerId OR customer ID (starts with "customer-")
        if (!d.travelerId) return true;
        return String(d.travelerId).startsWith('customer-');
      });
      
      if (appDocs.length > 0) {
        requests.push({
          target: 'application',
          fieldIds: appDocs.map(d => Number(d.fieldId)).filter(id => !isNaN(id)),
          note: resubmitNote.value || 'Please re-upload the selected documents.'
        })
      }

      // Check each traveler's docs (only numeric traveler IDs)
      for (const traveler of travelers.value) {
        const travelerDocs = documentsForSelectedTraveler.value.filter(
          d => d.selected && 
               d.isAdditionalInfo && 
               d.travelerId === traveler.id &&
               !String(d.travelerId).startsWith('customer-') // Exclude customer IDs
        )
        
        if (travelerDocs.length > 0) {
          requests.push({
            target: 'traveler',
            travelerId: traveler.id,
            fieldIds: travelerDocs.map(d => Number(d.fieldId)).filter(id => !isNaN(id)),
            note: resubmitNote.value || 'Please re-upload the selected documents.'
          })
        }
      }
    }

    if (requests.length === 0) {
      alert('Please select at least one document to request resubmission.')
      return
    }

    console.log('🔵 Requesting resubmission:', requests)

    await requestResubmission(Number(applicationId.value), requests)

    showResubmitModal.value = false
    documentsForSelectedTraveler.value.forEach(d => d.selected = false)
    singleDocumentForResubmission.value = null // Clear single document selection
    resubmitNote.value = ''
    
    if (requests.length === 1) {
      alert('Resubmission requested successfully.')
    } else {
      alert(`${requests.length} resubmission requests sent successfully.`)
    }
    
    // Reload application
    await loadApplication()
  } catch (e) {
    const msg = (e && typeof e === 'object' && 'message' in e) ? e.message : null
    alert(msg || 'Failed to request resubmission.')
  }
}


const editDocument = (document) => {
  console.log("Edit document:", document);
  // Add edit functionality
};

const deleteDocument = (document) => {
  console.log("Delete document:", document);
  // Add delete functionality
};

// Load travelers
const loadTravelers = async () => {
  if (!applicationId.value) return;
  
  try {
    isLoadingTravelers.value = true;
    
    const data = await getApplicationTravelers(applicationId.value);
    
    if (data) {
      travelers.value = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);
      
      // Set first person as selected by default
      nextTick(() => {
        if (allPeople.value.length > 0) {
          if (!selectedTravelerId.value) {
            selectedTravelerId.value = allPeople.value[0].id;
          }
          if (!selectedTravelerIdForDocuments.value) {
            selectedTravelerIdForDocuments.value = allPeople.value[0].id;
          }
        }
      });
    } else {
      travelers.value = [];
    }
  } catch (error) {
    console.error("Error loading travelers:", error);
    travelers.value = [];
  } finally {
    isLoadingTravelers.value = false;
  }
};

// Load field definitions
const loadFieldDefinitions = async () => {
  if (!application.value?.visaProductId) return;
  
  try {
    isLoadingFields.value = true;
    const response = await getVisaProductFieldsByVisaProduct(application.value.visaProductId);
    
    if (response.success && response.data) {
      // Sort field definitions by displayOrder to ensure consistent ordering
      fieldDefinitions.value = response.data.sort((a, b) => {
        const aOrder = a.displayOrder !== undefined && a.displayOrder !== null ? a.displayOrder : 999;
        const bOrder = b.displayOrder !== undefined && b.displayOrder !== null ? b.displayOrder : 999;
        return aOrder - bOrder;
      });
    }
  } catch (error) {
    console.error("Error loading field definitions:", error);
    fieldDefinitions.value = [];
  } finally {
    isLoadingFields.value = false;
  }
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
    
    // Load field definitions if visa product ID is available
    if (data.visaProductId) {
      await loadFieldDefinitions();
      await loadActiveResubmissionRequests()

    }
    
    // Set first person as selected by default (will be set after travelers load)
    nextTick(() => {
      if (allPeople.value.length > 0) {
        if (!selectedTravelerId.value) {
          selectedTravelerId.value = allPeople.value[0].id;
        }
        if (!selectedTravelerIdForDocuments.value) {
          selectedTravelerIdForDocuments.value = allPeople.value[0].id;
        }
      }
    });
  } catch (error) {
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Failed to load application details";
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
    paymentErrorMessage.value =
      error instanceof Error
        ? error.message
        : "Failed to load payment information";
    console.error("Error loading payment:", error);
    payment.value = null;
  } finally {
    isLoadingPayment.value = false;
  }
};

// Format date helper
const formatDate = (date) => {
  if (!date) return "-";
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "-";
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return date.toString();
  }
};

// Format application price helper
const formatApplicationPrice = (app) => {
  if (!app) return "-";

  // Try totalAmount first (from visa application table)
  if (app.totalAmount) {
    if (typeof app.totalAmount === "number") {
      return `${app.currency || "USD"} ${app.totalAmount.toFixed(2)}`;
    }
    return app.totalAmount;
  }

  // Fallback to other price fields
  if (app.totalPrice) {
    if (typeof app.totalPrice === "number") {
      return `${app.currency || "USD"} ${app.totalPrice.toFixed(2)}`;
    }
    return app.totalPrice;
  }

  if (app.price) {
    return app.price;
  }

  if (app.processingFee) {
    return `USD ${app.processingFee}`;
  }

  return "-";
};

// Get file URL helper
const getFileUrl = (filePath) => {
  if (!filePath) return '#';
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase.replace(/\/+$/, '');
  return filePath.startsWith('http') ? filePath : `${baseUrl}${filePath}`;
};

// Format file size helper
const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Watch for route query changes to update active tab
watch(() => route.query.tab, (newTab) => {
  if (Array.isArray(newTab)) {
    activeTab.value = newTab[0] || "details";
  } else if (newTab && typeof newTab === 'string') {
    activeTab.value = newTab;
  } else {
    activeTab.value = "details";
  }
});

// Watch for tab changes to load data
watch(activeTab, (newTab) => {
  if (newTab === "payment" && !payment.value) {
    loadPayment();
  }
  if ((newTab === 'documents' || newTab === 'additional-info') && travelers.value.length === 0) {
    loadTravelers();
  }
  if (newTab === 'additional-info' && application.value?.visaProductId && fieldDefinitions.value.length === 0) {
    loadFieldDefinitions();
  }
  if (newTab === 'additional-info') {
    loadApplicationResponses();
  }
});

// Set page title
useHead({
  title: computed(
    () =>
      `${
        application.value?.applicationNumber ||
        application.value?.id ||
        "Application"
      } - Application Details - iVisa`
  ),
});

// Load application on mount
onMounted(() => {
  // Set initial tab from query parameter
  const tab = route.query.tab;
  if (Array.isArray(tab)) {
    activeTab.value = tab[0] || "details";
  } else if (tab && typeof tab === 'string') {
    activeTab.value = tab;
  }
  
  loadApplication();
  loadTravelers();
  // If initial tab is additional-info, load responses too
  if (activeTab.value === 'additional-info') {
    loadApplicationResponses();
  }
});

// Status update handlers
const openStatusUpdateModal = () => {
  statusUpdateValue.value = applicationStatus.value;
  statusUpdateError.value = '';
  showStatusUpdateModal.value = true;
};

const closeStatusUpdateModal = () => {
  showStatusUpdateModal.value = false;
  statusUpdateValue.value = '';
  statusUpdateError.value = '';
};

const handleStatusChange = async (newStatus) => {
  // Optional: Auto-update on dropdown change (you can remove this if you only want manual updates via button)
  // For now, we'll only update via the modal to give users more control
};

const submitStatusUpdate = async () => {
  if (!statusUpdateValue.value || statusUpdateValue.value === applicationStatus.value) {
    return;
  }

  if (!applicationId.value) {
    statusUpdateError.value = 'Application ID not found';
    return;
  }

  try {
    isUpdatingStatus.value = true;
    statusUpdateError.value = '';

    await updateApplicationStatus(applicationId.value, statusUpdateValue.value);
    
    // Update local state
    applicationStatus.value = statusUpdateValue.value;
    if (application.value) {
      application.value.status = statusUpdateValue.value;
    }

    closeStatusUpdateModal();
    
    // Show success message
    alert('Application status updated successfully');
    
    // Reload application to get latest data
    await loadApplication();
  } catch (error) {
    statusUpdateError.value = error instanceof Error ? error.message : 'Failed to update application status';
    console.error('Error updating status:', error);
  } finally {
    isUpdatingStatus.value = false;
  }
};

// Navigation
const goBack = () => {
  router.push("/dashboard/applications");
};
</script>
