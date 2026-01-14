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
                  travelers.length > 0 
                    ? travelers.map(t => `${t.firstName || ''} ${t.lastName || ''}`.trim() || 'Traveler').filter(Boolean).join(', ') 
                    : (application.customer?.fullname ||
                  application.customer?.customerName ||
                       "-")
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
              <!-- Embassy Information -->
              <div
                v-if="application.embassy"
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Embassy Name</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.embassy?.embassyName || "-"
                }}</span>
              </div>
              <div
                v-if="application.embassy"
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Embassy Address</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.embassy?.address || "-"
                }}</span>
              </div>
              <div
                v-if="application.embassy"
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Origin Country</span
                >
                <span class="text-sm text-gray-900 dark:text-white">{{
                  application.embassy?.originCountry || "-"
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
                  application.visaProductName || "-"
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
                  travelers.length ||
                  "-"
                }}</span>
              </div>
              <!-- Traveler Names -->
              <div
                v-if="travelers.length > 0"
                class="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400"
                  >Traveler Name(s)</span
                >
                <span class="text-sm text-gray-900 dark:text-white">
                  {{ travelers.map(t => `${t.firstName || ''} ${t.lastName || ''}`.trim() || 'Traveler').filter(Boolean).join(', ') || '-' }}
                </span>
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

              <!-- Email Reminder Tracking Section -->
              <div
                v-if="application.status && application.status.toLowerCase() === 'draft' && application.emailCaptured"
                class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg"
                style="border-radius: 7px"
              >
                <h3 class="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3">
                  Email Reminder Tracking
                </h3>
                <div class="space-y-2">
                  <div class="grid grid-cols-2 gap-4">
                    <span class="text-sm font-medium text-[#020617] dark:text-gray-400">
                      Email Captured:
                    </span>
                    <span class="text-sm text-gray-900 dark:text-white">
                      {{ application.emailCaptured }}
                    </span>
                  </div>
                  <div
                    v-if="application.emailCapturedAt"
                    class="grid grid-cols-2 gap-4"
                  >
                    <span class="text-sm font-medium text-[#020617] dark:text-gray-400">
                      Captured At:
                    </span>
                    <span class="text-sm text-gray-900 dark:text-white">
                      {{ formatDateTime(application.emailCapturedAt) }}
                    </span>
                  </div>
                  <div
                    v-if="application.pendingReminderSentAt"
                    class="grid grid-cols-2 gap-4"
                  >
                    <span class="text-sm font-medium text-[#020617] dark:text-gray-400">
                      First Reminder Sent:
                    </span>
                    <span class="text-sm text-green-700 dark:text-green-300 flex items-center gap-1">
                      {{ formatDateTime(application.pendingReminderSentAt) }}
                      <span class="text-green-600 dark:text-green-400">✓</span>
                    </span>
                  </div>
                  <div
                    v-if="application.couponEmailSentAt"
                    class="grid grid-cols-2 gap-4"
                  >
                    <span class="text-sm font-medium text-[#020617] dark:text-gray-400">
                      Coupon Email Sent:
                    </span>
                    <span class="text-sm text-green-700 dark:text-green-300 flex items-center gap-1">
                      {{ formatDateTime(application.couponEmailSentAt) }}
                      <span class="text-green-600 dark:text-green-400">✓</span>
                    </span>
                  </div>
                </div>
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
        <div v-else-if="allTravelers.length === 0" class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
          <div class="text-sm text-gray-500 dark:text-gray-400">No travelers found for this application.</div>
        </div>
        <div v-else class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden" style="border-radius: 7px">
          <!-- People Name Tabs -->
          <div class="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-1 flex gap-2 overflow-x-auto">
           <button
            v-for="person in allTravelers"
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
            <div v-if="selectedTraveler" class="space-y-6">
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
                    isFieldRequested(field.fieldId) ? 'bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-l-yellow-500 pl-4' : '',
                    field.isPassportField ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500 pl-4' : ''
                  ]"
                >
                  <span class="pl-4 text-sm font-medium text-[#020617] dark:text-gray-400 flex items-center gap-2">
                    <span v-if="field.isPassportField" class="text-blue-600 dark:text-blue-400">🛂</span>
                    {{ field.question }}
                    <span v-if="field.isPassportField"
                      class="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded whitespace-nowrap">
                      Passport Info
                    </span>
                    <span v-if="isFieldRequested(field.fieldId)"
                      class="text-xs px-2 py-0.5 bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 rounded whitespace-nowrap">
                      Resubmission Requested
                    </span>
                  </span>
                  <div class="text-sm text-gray-900 dark:text-white">
                    <!-- File Upload Display -->
                    <div v-if="field.isFile" class="flex items-center gap-2">
                      <a
                        :href="getFileUrl(field.value?.filePath)"
                        target="_blank"
                        rel="noopener noreferrer"
                        @click.stop.prevent="openFileInNewTab(field.value?.filePath)"
                        class="px-3 py-1 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-[12px] text-sm hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors inline-flex items-center gap-2"
                      >
                        <span>{{ field.value?.fileName || 'Download' }}</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                          ({{ formatFileSize(field.value?.fileSize) }})
                        </span>
                      </a>
                    </div>
                    <!-- Regular Value Display -->
                    <span v-else>
                      <span v-if="field.value && field.value !== '-'">{{ field.value }}</span>
                      <span v-else class="text-gray-400 dark:text-gray-500 italic">Not provided</span>
                    </span>
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
        <div v-else-if="allTravelers.length === 0" class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
          <div class="text-sm text-gray-500 dark:text-gray-400">No travelers found for this application.</div>
        </div>
        <div v-else class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden" style="border-radius: 7px">
          <!-- People Name Tabs -->
          <div class="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-1 flex gap-2 overflow-x-auto">
            <button
              v-for="person in allTravelers"
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
                        rel="noopener noreferrer"
                        @click.stop.prevent="openFileInNewTab(document.filePath)"
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

// Helper function to check if a person has field responses
const hasFieldResponses = (person) => {
  if (person.type === 'customer') {
    // Check if customer has application-level field responses
    const fieldResponses = application.value?.fieldResponses;
    if (!fieldResponses) return false;
    
    const customerData = fieldResponses.application || fieldResponses;
    // Check if it's an array with items or an object with keys
    if (Array.isArray(customerData)) {
      return customerData.length > 0;
    }
    if (typeof customerData === 'object' && customerData !== null) {
      return Object.keys(customerData).length > 0;
    }
    return false;
  } else if (person.type === 'traveler') {
    // IMPORTANT: Traveler 1 (customer traveler) has responses stored at application level
    // Check if this is traveler 1 (customer traveler)
    const isTraveler1 = person.data?._isCustomerTraveler || 
                        (application.value?.travelers?.[0]?.id === person.id) ||
                        (application.value?.customer?.email && person.data?.email === application.value.customer.email);
    
    if (isTraveler1) {
      // Traveler 1's responses are stored at application level
      const fieldResponses = application.value?.fieldResponses;
      const customerData = fieldResponses?.application || fieldResponses || {};
      
      if (Array.isArray(customerData)) {
        return customerData.length > 0;
      }
      if (typeof customerData === 'object' && customerData !== null) {
        return Object.keys(customerData).length > 0;
      }
      return false;
    }
    
    // Regular traveler - check if traveler has field responses
    // First check if traveler has fieldResponses directly on the data
    let travelerData = person.data?.fieldResponses;
    
    // If not found, check in application.value.fieldResponses.travelers array
    if (!travelerData && application.value?.fieldResponses?.travelers) {
      const travelersArray = application.value.fieldResponses.travelers;
      const travelerResponse = travelersArray.find(t => Number(t.travelerId) === Number(person.id));
      if (travelerResponse && travelerResponse.responses) {
        // Convert array of responses to object keyed by fieldId
        travelerData = {};
        travelerResponse.responses.forEach(response => {
          const fieldId = response.fieldId;
          if (response.filePath) {
            travelerData[fieldId] = {
              filePath: response.filePath,
              fileName: response.fileName,
              fileSize: response.fileSize,
              submittedAt: response.submittedAt
            };
          } else {
            travelerData[fieldId] = {
              value: response.value,
              submittedAt: response.submittedAt
            };
          }
        });
      }
    }
    
    if (!travelerData) return false;
    
    if (typeof travelerData === 'object' && travelerData !== null) {
      return Object.keys(travelerData).length > 0;
    }
    return false;
  }
  return false;
};

// All people in application (customer + travelers) - only include those with field responses
const allPeople = computed(() => {
  const people = [];
  
  // Add customer (application filler) only if they have field responses
  if (application.value?.customer) {
    const customer = application.value.customer;
    const customerName = customer.fullname || customer.customerName || customer.name || 'Application Filler';
    
    console.log('👤 Customer:', { id: customer.id, name: customerName });
    
    const customerPerson = {
      id: `customer-${customer.id || 'filler'}`,
      name: customerName,
      type: 'customer',
      data: customer
    };
    
    // Only add customer if they have field responses
    if (hasFieldResponses(customerPerson)) {
      people.push(customerPerson);
      console.log('✅ Customer has field responses, adding to list');
    } else {
      console.log('❌ Customer has no field responses, skipping');
    }
  }
  
  // ✅ FILTER: Only add travelers that have a valid ID AND field responses
  const validTravelers = travelers.value.filter(t => t.id !== null && t.id !== undefined);
  
  console.log('🚶 Travelers array (filtered):', validTravelers);
  
  validTravelers.forEach((traveler, index) => {
    const travelerName = `${traveler.firstName || ''} ${traveler.lastName || ''}`.trim() || `Traveler ${index + 2}`;
    
    console.log(`  Traveler ${index}:`, { id: traveler.id, name: travelerName });
    
    const travelerPerson = {
      id: traveler.id,
      name: travelerName,
      type: 'traveler',
      data: traveler
    };
    
    // Only add traveler if they have field responses
    if (hasFieldResponses(travelerPerson)) {
      people.push(travelerPerson);
      console.log(`✅ Traveler ${index} has field responses, adding to list`);
    } else {
      console.log(`❌ Traveler ${index} has no field responses, skipping`);
    }
  });
  
  console.log('📋 Final allPeople (with data only):', people);
  
  return people;
});

// Only travelers (for travelers tab) - excludes customer
// Show ALL travelers, not just those with field responses
const allTravelers = computed(() => {
  const people = [];
  
  // Get all travelers from travelers.value (not filtered by field responses)
  // All travelers should have IDs now (either real or temporary)
  const validTravelers = travelers.value.filter(t => t.id !== null && t.id !== undefined);
  
  console.log('🔍 allTravelers - raw travelers.value:', travelers.value.map(t => ({ 
    id: t.id, 
    firstName: t.firstName, 
    lastName: t.lastName,
    fullname: t.fullname,
    customerName: t.customerName,
    passportNumber: t.passportNumber,
    isTempId: t._isTempId
  })));
  console.log('🔍 allTravelers - validTravelers (after ID filter):', validTravelers.map(t => ({ 
    id: t.id, 
    firstName: t.firstName, 
    lastName: t.lastName,
    isTempId: t._isTempId
  })));
  
  validTravelers.forEach((traveler, index) => {
    // Only skip if it's clearly customer data
    // If it has customer-specific fields (fullname, customerName) but NO traveler fields at all,
    // then it's likely a customer entry that was incorrectly included
    const hasCustomerFields = traveler.fullname || traveler.customerName || (traveler.name && !traveler.firstName && !traveler.lastName);
    const hasTravelerFields = traveler.firstName || traveler.lastName || traveler.passportNumber || traveler.dateOfBirth || traveler.email;
    
    // Only skip if it has customer fields but NO traveler fields at all
    if (hasCustomerFields && !hasTravelerFields) {
      console.log('⚠️ Skipping entry that looks like customer data (has customer fields but no traveler fields):', {
        id: traveler.id,
        fullname: traveler.fullname,
        customerName: traveler.customerName,
        name: traveler.name
      });
      return; // Skip - this looks like customer data
    }
    
    // Include all other entries - they're travelers
    const travelerName = `${traveler.firstName || ''} ${traveler.lastName || ''}`.trim() || `Traveler ${index + 1}`;
    
    const travelerPerson = {
      id: traveler.id,
      name: travelerName,
      type: 'traveler',
      data: traveler
    };
    
    console.log(`✅ Including traveler ${index + 1}:`, { id: traveler.id, name: travelerName });
    people.push(travelerPerson);
  });
  
  console.log('🔍 allTravelers (all travelers, not filtered by responses):', people.map(t => ({ id: t.id, name: t.name, type: t.type })));
  
  return people;
});

// Selected traveler computed - prefer travelers
const selectedTraveler = computed(() => {
  if (!selectedTravelerId.value) return null;
  // First try to find in travelers (for Additional Info tab)
  const traveler = allTravelers.value.find(p => p.id === selectedTravelerId.value);
  if (traveler) return traveler.data;
  // Fallback to allPeople (for other cases)
  const person = allPeople.value.find(p => p.id === selectedTravelerId.value);
  return person ? person.data : null;
});

// Selected person name - prefer travelers, fallback to allPeople
const selectedPersonName = computed(() => {
  if (!selectedTravelerId.value) return '';
  // First try to find in travelers (for Additional Info tab)
  const traveler = allTravelers.value.find(p => p.id === selectedTravelerId.value);
  if (traveler) return traveler.name;
  // Fallback to allPeople (for other cases)
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
  // Filter out customers - only include actual travelers
  return travelers.value.filter(t => {
    // Must have a valid ID
    if (!t.id || t.id === null || t.id === undefined) return false;
    // Must have firstName or lastName (travelers have these, customers don't)
    if (!t.firstName && !t.lastName) {
      // If it has fullname/customerName but no firstName, it's likely a customer
      if (t.fullname || t.customerName || t.name) {
        return false; // This is a customer, not a traveler
      }
    }
    return true;
  });
})
// Additional info fields state
const isLoadingFields = ref(false);
const fieldDefinitions = ref([]);
// Store traveler-specific field responses that are loaded on demand
const travelerFieldResponsesCache = ref({});

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

// Load traveler-specific field responses
const loadTravelerFieldResponses = async (travelerId) => {
  if (!applicationId.value || !travelerId) return {};
  
  try {
    console.log('🔄 Loading field responses for traveler:', travelerId);
    const { getFieldsWithResponsesByApplication } = useVisaProductFieldsApi();
    const merged = await getFieldsWithResponsesByApplication(applicationId.value, travelerId);
    const data = merged?.data;
    const list = Array.isArray(data?.fields) ? data.fields : (Array.isArray(data) ? data : []);
    
    // Extract responses from the list
    const responses = {};
    (list || []).forEach((f) => {
      const fid = f?.id ?? f?.fieldId;
      const r = f?.response;
      if (fid == null || !r) return;
      if (r && typeof r === 'object' && 'filePath' in r) {
        responses[fid] = {
          filePath: r.filePath,
          fileName: r.fileName,
          fileSize: r.fileSize,
          submittedAt: r.submittedAt,
        };
      } else if (r && (r.value !== undefined || r.submittedAt)) {
        responses[fid] = { value: r.value, submittedAt: r.submittedAt };
      }
    });
    
    console.log('✅ Loaded field responses for traveler:', travelerId, 'Count:', Object.keys(responses).length);
    return responses;
  } catch (error) {
    console.error('❌ Error loading traveler field responses:', error);
    return {};
  }
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
      // Debug: Log raw data from backend before processing
      console.log('📋 Raw fields from backend:', list.map(f => ({
        id: f?.id ?? f?.fieldId,
        question: f?.question,
        displayOrder: f?.displayOrder,
        fieldType: f?.fieldType
      })));
      
      // Check for negative field IDs (resubmission fields) in the response
      const negativeFieldIds = list.filter(f => {
        const id = f?.id ?? f?.fieldId;
        return id !== null && id !== undefined && Number(id) < 0;
      });
      if (negativeFieldIds.length > 0) {
        console.log('✅ Found resubmission fields in getFieldsWithResponsesByApplication:', negativeFieldIds.map(f => ({
          id: f?.id ?? f?.fieldId,
          question: f?.question
        })));
      }
      
      fieldDefinitions.value = list
        .map((f) => ({
          id: f?.id ?? f?.fieldId,
          question: f?.question,
          fieldType: f?.fieldType,
          displayOrder: f?.displayOrder ?? 999,
        }))
        .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
      
      // Debug: Log sorted fields
      console.log('📋 Sorted fields order:', fieldDefinitions.value.map(f => ({
        id: f.id,
        displayOrder: f.displayOrder,
        question: f.question,
        fieldType: f.fieldType
      })));
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

// Helper function to get fields from resubmission requests
const getFieldsFromResubmissionRequests = (requests, travelerId = null) => {
  const fields = [];
  if (!requests || !Array.isArray(requests)) return fields;
  
  console.log('🔍 getFieldsFromResubmissionRequests called:', {
    requestsCount: requests.length,
    travelerId,
    requests: requests.map(r => ({
      id: r.id,
      target: r.target,
      travelerId: r.travelerId,
      fulfilledAt: r.fulfilledAt,
      fieldIds: r.fieldIds,
      newFieldsCount: r.newFields?.length || 0
    }))
  });
  
  requests.forEach((req, reqIndex) => {
    console.log(`🔍 Processing request ${reqIndex + 1}:`, {
      id: req.id,
      target: req.target,
      travelerId: req.travelerId,
      currentTravelerId: travelerId,
      fieldIds: req.fieldIds,
      newFieldsCount: req.newFields?.length || 0
    });
    
    // Process both fulfilled and non-fulfilled requests
    // (fulfilled requests still have the field definitions we need)
    // if (req.fulfilledAt) {
    //   return; // Skip fulfilled requests
    // }
    
    // Check if this request is for the current person
    // If travelerId is null, we're processing customer (application-level)
    // If travelerId is not null, we're processing a traveler
    if (travelerId === null) {
      // Processing customer - only include application-level requests
      if (req.target !== 'application') {
        console.log(`  ⏭️ Skipping: target is "${req.target}", expected "application"`);
        return; // Skip traveler requests when processing customer
      }
    } else {
      // Processing traveler - only include requests for this specific traveler
      // Special case: req.travelerId === null means "first traveler / customer traveler"
      const isFirstTraveler = String(travelerId).startsWith('temp-traveler-0') ||
        (allTravelers.value.length > 0 && allTravelers.value[0]?.id === travelerId);
      const reqIsForFirstTraveler = req.travelerId === null || req.travelerId === undefined;

      // Match if: target is 'traveler' AND (IDs match OR request is for first traveler and we ARE first traveler)
      const idsMatch = Number(req.travelerId) === Number(travelerId) ||
        String(req.travelerId) === String(travelerId);
      const matchesFirstTraveler = reqIsForFirstTraveler && isFirstTraveler;

      if (req.target !== 'traveler' || (!idsMatch && !matchesFirstTraveler)) {
        console.log(`  ⏭️ Skipping: target="${req.target}", req.travelerId=${req.travelerId}, currentTravelerId=${travelerId}, isFirstTraveler=${isFirstTraveler}, reqIsForFirstTraveler=${reqIsForFirstTraveler}`);
        return; // Skip application requests or requests for other travelers
      }
    }
    
    console.log(`  ✅ Request matches! Processing fields...`);
    
    // Get field IDs from the request
    const fieldIds = req.fieldIds || [];
    console.log(`  📋 Field IDs:`, fieldIds);
    
    // Get new fields from the request
    if (req.newFields && Array.isArray(req.newFields)) {
      console.log(`  📋 New Fields:`, req.newFields);
      console.log(`  📋 Field IDs:`, fieldIds);
      req.newFields.forEach((newField, index) => {
        // Try to get field ID from newField.id first (backend might include this)
        // Fall back to fieldIds array index if id is not in newField
        let fieldId = newField.id;
        if (fieldId === undefined || fieldId === null) {
          // Fallback: match by index from fieldIds array
          // Make sure we have a fieldId at this index
          if (index < fieldIds.length) {
            fieldId = fieldIds[index];
          } else {
            console.log(`  ⚠️ No fieldId at index ${index}, fieldIds length: ${fieldIds.length}`);
            return; // Skip this field if we can't get an ID
          }
        }
        
        // Ensure fieldId is a number (could be string from API)
        fieldId = Number(fieldId);
        
        console.log(`  🔹 Field ${index}: fieldId=${fieldId}, question="${newField.question}"`);
        if (fieldId !== undefined && fieldId !== null && !isNaN(fieldId)) {
          fields.push({
            id: fieldId, // Use the negative ID
            question: newField.question || `Field ${fieldId}`,
            fieldType: newField.fieldType || 'text',
            displayOrder: newField.displayOrder || 999,
            isRequired: newField.isRequired || false,
            options: newField.options || [],
            allowedFileTypes: newField.allowedFileTypes || []
          });
          console.log(`  ✅ Added field: ${fieldId} - "${newField.question}"`);
        } else {
          console.log(`  ⚠️ Field ID is invalid at index ${index}: ${fieldId}`);
        }
      });
    } else {
      console.log(`  ⚠️ No newFields array found or it's not an array`);
    }
  });
  
  console.log(`🔍 Total fields extracted: ${fields.length}`, fields);
  
  return fields;
};

// Helper function to find a field in resubmission requests by field ID
const findFieldInResubmissionRequests = (fieldId, travelerId = null) => {
  // Check both activeResubmissionRequests and application.value.resubmissionRequests
  const allResubmissionRequests = [
    ...(activeResubmissionRequests.value || []),
    ...(application.value?.resubmissionRequests || [])
  ];
  
  if (!allResubmissionRequests || allResubmissionRequests.length === 0) {
    return null;
  }
  
  // Remove duplicates by ID if they exist
  const uniqueRequests = allResubmissionRequests.filter((req, index, self) => 
    index === self.findIndex(r => r.id === req.id)
  );
  
  const numericFieldId = Number(fieldId);
  
  for (const req of uniqueRequests) {
    // Check both fulfilled and non-fulfilled requests
    // (fulfilled requests still have the field definitions we need)
    // if (req.fulfilledAt) {
    //   continue; // Skip fulfilled requests
    // }
    
    // Check if this request is for the current person
    // If travelerId is null, we're processing customer (application-level)
    // If travelerId is not null, we're processing a traveler
    if (travelerId === null) {
      // Processing customer - only check application-level requests
      if (req.target !== 'application') {
        continue; // Skip traveler requests when processing customer
      }
    } else {
      // Processing traveler - only check requests for this specific traveler
      // Use Number() for comparison to handle string/number type mismatch
      if (req.target !== 'traveler' || Number(req.travelerId) !== Number(travelerId)) {
        continue; // Skip application requests or requests for other travelers
      }
    }

    const fieldIds = req.fieldIds || [];
    const newFields = req.newFields || [];
    
    // First, try to find by newField.id (backend might include this)
    if (newFields.length > 0) {
      const fieldByNewFieldId = newFields.find(f => {
        const fId = f.id !== undefined && f.id !== null ? Number(f.id) : null;
        return fId === numericFieldId;
      });
      if (fieldByNewFieldId) {
        console.log(`  ✅ Found by newField.id: ${numericFieldId} -> "${fieldByNewFieldId.question}"`);
        return {
          id: fieldId,
          question: fieldByNewFieldId.question || `Field ${fieldId}`,
          fieldType: fieldByNewFieldId.fieldType || 'text',
          displayOrder: fieldByNewFieldId.displayOrder || 999,
          isRequired: fieldByNewFieldId.isRequired || false
        };
      }
    }
    
    // Fallback: Find the index of this fieldId in fieldIds array
    // This is the primary method since newFields might not have id properties
    const fieldIndex = fieldIds.findIndex(id => {
      const idNum = Number(id);
      return idNum === numericFieldId;
    });
    
    if (fieldIndex !== -1 && fieldIndex < newFields.length) {
      const newField = newFields[fieldIndex];
      console.log(`  ✅ Found by fieldIds index: ${fieldIndex} -> "${newField.question}"`);
      return {
        id: fieldId,
        question: newField.question || `Field ${fieldId}`,
        fieldType: newField.fieldType || 'text',
        displayOrder: newField.displayOrder || 999,
        isRequired: newField.isRequired || false
      };
    } else if (fieldIndex !== -1) {
      console.log(`  ⚠️ Found fieldId ${numericFieldId} at index ${fieldIndex} but no corresponding newField`);
    }
  }
  
  return null;
};

// Additional info fields for selected person
const additionalInfoFields = computed(() => {
  if (!selectedTravelerId.value) return [];
  
  const fields = [];
  
  // Determine if selected person is customer or traveler
  // First try to find in allTravelers (includes all travelers, even without responses)
  let selectedPerson = allTravelers.value.find(p => p.id === selectedTravelerId.value);
  // If not found, try allPeople (for customers or travelers with responses)
  if (!selectedPerson) {
    selectedPerson = allPeople.value.find(p => p.id === selectedTravelerId.value);
  }
  if (!selectedPerson) return [];
  
  // Get resubmission request fields for this person
  const travelerIdForResubmission = selectedPerson.type === 'traveler' ? selectedPerson.id : null;
  
  // Check both activeResubmissionRequests and application.value.resubmissionRequests
  const allResubmissionRequests = [
    ...(activeResubmissionRequests.value || []),
    ...(application.value?.resubmissionRequests || [])
  ];
  
  // Remove duplicates by ID if they exist
  const uniqueRequests = allResubmissionRequests.filter((req, index, self) => 
    index === self.findIndex(r => r.id === req.id)
  );
  
  console.log('🔍 Resubmission Requests Debug:', {
    activeResubmissionRequestsCount: activeResubmissionRequests.value?.length || 0,
    applicationResubmissionRequestsCount: application.value?.resubmissionRequests?.length || 0,
    uniqueRequestsCount: uniqueRequests.length,
    activeResubmissionRequestsValue: activeResubmissionRequests.value, // Log the full value
    requests: uniqueRequests.map(r => ({
      id: r.id,
      target: r.target,
      travelerId: r.travelerId,
      fulfilledAt: r.fulfilledAt,
      fieldIds: r.fieldIds,
      newFieldsCount: r.newFields?.length || 0,
      newFields: r.newFields // Log the actual newFields to see structure
    })),
    fullApplicationObject: application.value // Log full application to see structure
  });
  
  const resubmissionFields = getFieldsFromResubmissionRequests(
    uniqueRequests, 
    travelerIdForResubmission
  );
  
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
    // IMPORTANT: Traveler 1 (customer traveler) has responses stored at application level
    // Check if this is traveler 1 (customer traveler)
    const isTraveler1 = selectedPerson.data?._isCustomerTraveler || 
                        (application.value?.travelers?.[0]?.id === selectedPerson.id) ||
                        (application.value?.customer?.email && selectedPerson.data?.email === application.value.customer.email);
    
    if (isTraveler1) {
      console.log('TRAVELER 1 (Customer Traveler): Using application-level fieldResponses');
      // Traveler 1's responses are stored at application level
      if (application.value?.fieldResponses) {
        const fieldResponses = application.value.fieldResponses;
        const rawData = fieldResponses.application || fieldResponses || {};
        
        // CRITICAL: If it's an array, convert it to an object keyed by fieldId
        if (Array.isArray(rawData)) {
          console.log('TRAVELER 1: Converting array to object keyed by fieldId');
          personData = {};
          rawData.forEach((item, index) => {
            const fieldId = item.fieldId || String(index);
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
          console.log('TRAVELER 1: Converted personData:', JSON.stringify(personData, null, 2));
        } else {
          personData = rawData;
          console.log('TRAVELER 1: Final personData (object):', JSON.stringify(personData, null, 2));
        }
      }
    } else {
      // Regular traveler - get responses from traveler entity
      // First check if traveler has fieldResponses directly on the data
    console.log('TRAVELER: Raw selectedPerson.data.fieldResponses:', JSON.stringify(selectedPerson.data?.fieldResponses, null, 2));
      personData = selectedPerson.data?.fieldResponses;
    }
    
    // If not found for regular travelers, check in application.value.fieldResponses.travelers array
    if (!personData && !isTraveler1 && application.value?.fieldResponses?.travelers) {
      console.log('TRAVELER: Checking application.value.fieldResponses.travelers array...');
      const travelersArray = application.value.fieldResponses.travelers;
      const travelerResponse = travelersArray.find(t => Number(t.travelerId) === Number(selectedPerson.id));
      if (travelerResponse && travelerResponse.responses) {
        console.log('TRAVELER: Found in travelers array, converting to object...');
        // Convert array of responses to object keyed by fieldId
        personData = {};
        travelerResponse.responses.forEach(response => {
          const fieldId = response.fieldId;
          if (response.filePath) {
            personData[fieldId] = {
              filePath: response.filePath,
              fileName: response.fileName,
              fileSize: response.fileSize,
              submittedAt: response.submittedAt
            };
          } else {
            personData[fieldId] = {
              value: response.value,
              submittedAt: response.submittedAt
            };
          }
        });
        console.log('TRAVELER: Converted from array to object:', JSON.stringify(personData, null, 2));
      }
    }
    
    // If still not found, try checking if responses are stored in a different format
    // Some APIs might return responses directly on the traveler object with a different structure
    if (!personData) {
      console.log('TRAVELER: No fieldResponses found in standard locations, checking alternative formats...');
      
      // Check if responses might be in application.value directly (some APIs structure differently)
      if (application.value?.travelers) {
        const travelerInApp = application.value.travelers.find(t => t.id === selectedPerson.id);
        if (travelerInApp?.fieldResponses) {
          console.log('TRAVELER: Found fieldResponses in application.value.travelers');
          personData = travelerInApp.fieldResponses;
        }
      }
      
      // Check if there's a fieldResponses object keyed by traveler ID at the application level
      if (!personData && application.value?.fieldResponses) {
        const fieldResponses = application.value.fieldResponses;
        // Check if there's a property matching the traveler ID
        if (fieldResponses[selectedPerson.id]) {
          console.log('TRAVELER: Found fieldResponses keyed by traveler ID in application.value.fieldResponses');
          personData = fieldResponses[selectedPerson.id];
        }
      }
      
      // Check cache for previously loaded responses
      if (!personData && travelerFieldResponsesCache.value[selectedPerson.id]) {
        console.log('TRAVELER: Found fieldResponses in cache');
        personData = travelerFieldResponsesCache.value[selectedPerson.id];
      }
      
      if (!personData) {
        console.log('TRAVELER: Could not find fieldResponses for traveler:', selectedPerson.id);
        console.log('TRAVELER: Available data structures:', {
          hasTravelerData: !!selectedPerson.data,
          travelerDataKeys: selectedPerson.data ? Object.keys(selectedPerson.data) : [],
          hasAppFieldResponses: !!application.value?.fieldResponses,
          appFieldResponsesKeys: application.value?.fieldResponses ? Object.keys(application.value.fieldResponses) : [],
          hasAppTravelers: !!application.value?.travelers,
          appTravelersCount: application.value?.travelers?.length || 0,
          cacheHasData: !!travelerFieldResponsesCache.value[selectedPerson.id],
          travelerObject: selectedPerson.data // Log full traveler object to see structure
        });
      } else {
        console.log('TRAVELER: Final personData:', JSON.stringify(personData, null, 2));
      }
    } else {
      console.log('TRAVELER: Final personData:', JSON.stringify(personData, null, 2));
    }
  }
  
  // Even if personData is empty, we should still check for passport fields
  // from the traveler object, so don't return early here
  const hasPersonData = personData && Object.keys(personData).length > 0;

  if (!hasPersonData) {
    console.log('No personData (fieldResponses) found, but will still check passport fields from traveler object');
  } else {
    console.log('Field Definitions Count:', fieldDefinitions.value.length);
    console.log('Field Definitions:', fieldDefinitions.value.map(f => ({ id: f.id, question: f.question, displayOrder: f.displayOrder })));
    console.log('Resubmission Fields Count:', resubmissionFields.length);
    console.log('Resubmission Fields:', resubmissionFields.map(f => ({ id: f.id, question: f.question })));
    console.log('PersonData Keys:', Object.keys(personData));
    console.log('PersonData:', JSON.stringify(personData, null, 2));
  }

  // Combine regular fields and resubmission request fields
  const allFieldDefinitions = [...fieldDefinitions.value, ...resubmissionFields];

  // CRITICAL: Iterate over allFieldDefinitions FIRST (sorted by displayOrder)
  // This ensures fields are displayed in the correct order and matched correctly
  //
  // How this handles new fields:
  // - New fields added to fieldDefinitions will be processed, but won't have responses
  //   in old applications, so they won't be displayed (correct behavior)
  // - Old responses are matched by fieldId, so they'll still work even if field order changes
  // - Responses with negative field IDs are matched to resubmission request fields
  // - Orphaned responses (from deleted fields) are shown at the end
  // - Order is always determined by displayOrder in allFieldDefinitions, ensuring consistency
  // Only process field definitions if we have personData (fieldResponses)
  if (hasPersonData) {
  allFieldDefinitions.forEach((fieldDef, index) => {
    console.log(`\n--- Processing Field Definition ${index + 1} ---`);
    console.log('FieldDef ID:', fieldDef.id, 'Type:', typeof fieldDef.id);
    console.log('FieldDef Question:', fieldDef.question);
    console.log('FieldDef DisplayOrder:', fieldDef.displayOrder);
    // Try to find matching response by checking all possible key formats
    const fieldIdNum = Number(fieldDef.id);
    const fieldIdStr = String(fieldDef.id);
    const fieldIdNumStr = String(fieldIdNum); // String representation of numeric ID
    
    console.log('Looking for response with ID:', fieldDef.id, 'as number:', fieldIdNum, 'as string:', fieldIdStr);
    
    // Check multiple key formats: number, string, and try all keys
    // For negative IDs, we need to check both "-1" and -1 formats
    let fieldData = personData[fieldDef.id] || personData[fieldIdStr] || personData[fieldIdNum] || personData[fieldIdNumStr];
    console.log('Direct lookup result:', fieldData ? 'FOUND' : 'NOT FOUND');
    
    // If still not found, search through all keys for a match
    // This is especially important for negative field IDs which might be stored as strings
    if (!fieldData) {
      console.log('Searching through all keys...');
      const matchingKey = Object.keys(personData).find(key => {
        const keyNum = Number(key);
        const keyStr = String(key);
        // Try multiple comparison methods to handle string/number mismatches
        const matches = 
          (keyNum === fieldDef.id) || 
               (keyNum === fieldIdNum) ||
          (keyStr === fieldIdStr) || 
          (keyStr === fieldIdNumStr) ||
          (String(keyNum) === String(fieldDef.id)) ||
          (String(keyNum) === String(fieldIdNum)) ||
          // For negative IDs, also check if they're the same absolute value and both negative
          (keyNum < 0 && fieldIdNum < 0 && Math.abs(keyNum) === Math.abs(fieldIdNum));
        if (matches) {
          console.log(`  Found match! Key: "${key}" (num: ${keyNum}, str: "${keyStr}") matches fieldDef.id: ${fieldDef.id} (num: ${fieldIdNum})`);
        }
        return matches;
      });
      if (matchingKey) {
        fieldData = personData[matchingKey];
        console.log('Matched via key search:', matchingKey);
      } else {
        console.log('  No match found in keys:', Object.keys(personData));
        console.log('  Field definition ID details:', {
          original: fieldDef.id,
          asNumber: fieldIdNum,
          asString: fieldIdStr,
          asNumString: fieldIdNumStr
        });
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
  } // End of if (hasPersonData)

  console.log('\n--- Checking for orphaned responses ---');
  console.log('Fields matched so far:', fields.length);
  
  // Check for passport fields with special keys (added when addPassportDetailsLater is true)
  const passportFieldKeys = ['_passport_number', '_passport_expiry_date', '_residence_country', '_has_schengen_visa'];
  const passportFieldLabels = {
    '_passport_number': 'Passport Number',
    '_passport_expiry_date': 'Passport Expiration Date',
    '_residence_country': 'Residence Country',
    '_has_schengen_visa': 'Do you have a valid visa or residence permit from the Schengen Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand, Ireland, or Switzerland?'
  };
  const passportFieldTypes = {
    '_passport_number': 'text',
    '_passport_expiry_date': 'date',
    '_residence_country': 'text',
    '_has_schengen_visa': 'text'
  };
  
  // Map passport field keys to traveler object properties
  const passportFieldToTravelerProp = {
    '_passport_number': 'passportNumber',
    '_passport_expiry_date': 'passportExpiryDate',
    '_residence_country': 'residenceCountry',
    '_has_schengen_visa': 'hasSchengenVisa'
  };
  
  // Helper function to detect if this is traveler 1 (customer traveler)
  const isTraveler1Check = () => {
    if (selectedPerson?.type !== 'traveler') return false;
    
    // Check multiple ways to identify traveler 1
    return (
      selectedPerson.data?._isCustomerTraveler ||
      // Check if it's the first traveler in application.travelers (handle null IDs and temp IDs)
      (application.value?.travelers?.[0] && (
        application.value.travelers[0].id === selectedPerson.id ||
        String(application.value.travelers[0].id) === String(selectedPerson.id) ||
        (application.value.travelers[0].id === null && String(selectedPerson.id).startsWith('temp-traveler-0')) ||
        (application.value.travelers[0].id === null && selectedPerson.id === null)
      )) ||
      // Check by email match with customer
      (application.value?.customer?.email && selectedPerson.data?.email && 
        application.value.customer.email.toLowerCase() === selectedPerson.data.email.toLowerCase()) ||
      // Check if it's the first traveler by position in allTravelers
      (allTravelers.value[0]?.id === selectedPerson.id && String(selectedPerson.id).startsWith('temp-traveler-0'))
    );
  };
  
  // Helper function to get passport value from multiple sources
  const getPassportFieldValue = (fieldKey) => {
    const isTraveler1 = isTraveler1Check();
    const travelerProp = passportFieldToTravelerProp[fieldKey];

    console.log(`🔍 getPassportFieldValue called for: ${fieldKey} (travelerProp: ${travelerProp})`);
    console.log(`  selectedPerson:`, selectedPerson ? { id: selectedPerson.id, name: selectedPerson.name, type: selectedPerson.type } : null);
    console.log(`  selectedPerson.data keys:`, selectedPerson?.data ? Object.keys(selectedPerson.data) : 'N/A');
    console.log(`  selectedPerson.data[${travelerProp}]:`, selectedPerson?.data?.[travelerProp]);
    console.log(`  isTraveler1:`, isTraveler1);

    // 1. First check personData (fieldResponses)
    // BUT: only return if the value is actually non-empty, otherwise continue to check traveler object
    if (personData && personData[fieldKey] !== undefined) {
      const fieldData = personData[fieldKey];
      const value = fieldData?.value !== undefined ? fieldData.value : fieldData;
      // Only return if value is not empty - otherwise fall through to check traveler object
      if (value !== undefined && value !== null && value !== '') {
        console.log(`  ✅ Found in fieldResponses with value: ${value}`);
        return {
          value: value,
          submittedAt: fieldData?.submittedAt,
          source: 'fieldResponses'
        };
      } else {
        console.log(`  ⚠️ fieldResponses has empty value, checking traveler object...`);
      }
    }
    
    // 1b. For traveler 1, check application-level fieldResponses directly
    // (passport fields added later might be here even if not in personData)
    if (isTraveler1 && application.value?.fieldResponses?.application) {
      const appFieldResponses = application.value.fieldResponses.application;
      // Handle both array and object formats
      let appPersonData = appFieldResponses;
      if (Array.isArray(appFieldResponses)) {
        appPersonData = {};
        appFieldResponses.forEach((item, idx) => {
          const fieldId = item.fieldId || String(idx);
          if (item.filePath) {
            appPersonData[fieldId] = {
              filePath: item.filePath,
              fileName: item.fileName,
              fileSize: item.fileSize,
              submittedAt: item.submittedAt
            };
          } else {
            appPersonData[fieldId] = {
              value: item.value,
              submittedAt: item.submittedAt
            };
          }
        });
      }
      
      if (appPersonData[fieldKey] !== undefined) {
        const fieldData = appPersonData[fieldKey];
        const value = fieldData?.value !== undefined ? fieldData.value : fieldData;
        console.log(`✅ Passport field found in application.fieldResponses.application: ${fieldKey} = ${value}`);
        return {
          value: value,
          submittedAt: fieldData?.submittedAt,
          source: 'applicationFieldResponses'
        };
      }
    }
    
    // 2. Check traveler object directly (from selectedPerson.data)
    if (selectedPerson?.data && selectedPerson.data[travelerProp] !== undefined && selectedPerson.data[travelerProp] !== null && selectedPerson.data[travelerProp] !== '') {
      let value = selectedPerson.data[travelerProp];
      
      // Format date fields if needed
      if (fieldKey === '_passport_expiry_date' && value) {
        // If it's already a date string, use it; otherwise format it
        if (typeof value === 'string' && value.includes('-')) {
          // Already formatted
        } else if (typeof value === 'object' && value.year && value.month && value.date) {
          // Format from object: {year: 2025, month: 1, date: 1}
          value = `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.date).padStart(2, '0')}`;
        }
      }
      
      return {
        value: value,
        submittedAt: selectedPerson.data.createdAt || selectedPerson.data.updatedAt,
        source: 'travelerObject'
      };
    }
    
    // 2b. Check application.travelers array (in case traveler data is there but not in selectedPerson.data)
    // For traveler 1, check the first traveler specifically
    if (selectedPerson?.type === 'traveler' && application.value?.travelers) {
      let travelerInApp = null;
      if (isTraveler1) {
        // For traveler 1, use the first traveler in the array
        travelerInApp = application.value.travelers[0];
      } else {
        travelerInApp = application.value.travelers.find(t => t.id === selectedPerson.id);
      }
      
      if (travelerInApp && travelerInApp[travelerProp] !== undefined && travelerInApp[travelerProp] !== null && travelerInApp[travelerProp] !== '') {
        let value = travelerInApp[travelerProp];
        
        // Format date fields if needed
        if (fieldKey === '_passport_expiry_date' && value) {
          if (typeof value === 'string' && value.includes('-')) {
            // Already formatted
          } else if (typeof value === 'object' && value.year && value.month && value.date) {
            value = `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.date).padStart(2, '0')}`;
          }
        }
        
        return {
          value: value,
          submittedAt: travelerInApp.createdAt || travelerInApp.updatedAt,
          source: 'applicationTravelers'
        };
      }
    }
    
    // 3. Check drafts data (for traveler 1 or travelers added later)
    if (selectedPerson?.type === 'traveler') {
      const drafts = application.value?.drafts;
      const step3PassportDetails = drafts?.step3?.passportDetails || [];
      
      // Determine which traveler index to use
      let travelerIndex = -1;
      if (isTraveler1) {
        // Traveler 1 (customer traveler) is at index 0
        travelerIndex = 0;
      } else {
        // Find traveler index in application.travelers
        const travelerInApp = application.value?.travelers?.findIndex(t => t.id === selectedPerson.id);
        if (travelerInApp !== -1) {
          travelerIndex = travelerInApp;
        }
      }
      
      if (travelerIndex >= 0 && step3PassportDetails[travelerIndex]) {
        const passportDetails = step3PassportDetails[travelerIndex];
        
        if (fieldKey === '_passport_number' && passportDetails.passportNumber) {
          return {
            value: passportDetails.passportNumber,
            submittedAt: null,
            source: 'drafts'
          };
        } else if (fieldKey === '_passport_expiry_date' && passportDetails.expiryYear && passportDetails.expiryMonth && passportDetails.expiryDate) {
          const formattedDate = `${passportDetails.expiryYear}-${String(passportDetails.expiryMonth).padStart(2, '0')}-${String(passportDetails.expiryDate).padStart(2, '0')}`;
          return {
            value: formattedDate,
            submittedAt: null,
            source: 'drafts'
          };
        } else if (fieldKey === '_residence_country' && passportDetails.residenceCountry) {
          return {
            value: passportDetails.residenceCountry,
            submittedAt: null,
            source: 'drafts'
          };
        } else if (fieldKey === '_has_schengen_visa' && passportDetails.hasSchengenVisa) {
          return {
            value: passportDetails.hasSchengenVisa,
            submittedAt: null,
            source: 'drafts'
          };
        }
      }
    }
    
    return null;
  };
  
  // Add passport fields - check multiple sources and always show at top
  passportFieldKeys.forEach((fieldKey, index) => {
    // Check if already included
    const alreadyIncluded = fields.some(f => f.fieldId === fieldKey);
    
    if (!alreadyIncluded) {
      const passportValue = getPassportFieldValue(fieldKey);
      
      if (passportValue && passportValue.value !== undefined && passportValue.value !== null && passportValue.value !== '') {
        console.log(`🛂 Passport field found: ${fieldKey} (source: ${passportValue.source})`);
        fields.push({
          fieldId: fieldKey,
          question: passportFieldLabels[fieldKey],
          value: passportValue.value,
          isFile: false,
          submittedAt: passportValue.submittedAt,
          fieldType: passportFieldTypes[fieldKey],
          displayOrder: -100 + index, // Show passport fields first (negative displayOrder)
          isPassportField: true // Flag to identify passport fields
        });
      } else {
        // Even if value is empty, show the field if it exists in any source (user might have skipped it)
        // But only show if there's at least some indication it was attempted
        const travelerProp = passportFieldToTravelerProp[fieldKey];
        const hasAnyData = 
          (personData && personData[fieldKey] !== undefined) ||
          (selectedPerson?.data && selectedPerson.data[travelerProp] !== undefined) ||
          (selectedPerson?.type === 'traveler' && application.value?.travelers?.some(t => 
            t.id === selectedPerson.id && t[travelerProp] !== undefined
          )) ||
          (selectedPerson?.type === 'traveler' && application.value?.drafts?.step3?.passportDetails?.some((p, idx) => {
            // Check if this passport detail corresponds to the selected traveler
            const isTraveler1 = selectedPerson.data?._isCustomerTraveler || 
                               (application.value?.travelers?.[0]?.id === selectedPerson.id);
            const travelerIndex = isTraveler1 ? 0 : 
                                 (application.value?.travelers?.findIndex(t => t.id === selectedPerson.id) || -1);
            return idx === travelerIndex && (
              (fieldKey === '_passport_number' && p.passportNumber !== undefined) ||
              (fieldKey === '_passport_expiry_date' && (p.expiryYear || p.expiryMonth || p.expiryDate)) ||
              (fieldKey === '_residence_country' && p.residenceCountry !== undefined) ||
              (fieldKey === '_has_schengen_visa' && p.hasSchengenVisa !== undefined)
            );
          }));
        
        if (hasAnyData) {
          console.log(`🛂 Passport field found (empty/skipped): ${fieldKey}`);
          fields.push({
            fieldId: fieldKey,
            question: passportFieldLabels[fieldKey],
            value: '-',
            isFile: false,
            submittedAt: null,
            fieldType: passportFieldTypes[fieldKey],
            displayOrder: -100 + index,
            isPassportField: true,
            isEmpty: true
          });
        }
      }
    }
  });
  
  // Also include any responses that don't have matching field definitions (orphaned responses)
  // Only process if we have personData
  if (hasPersonData) {
  Object.keys(personData).forEach(fieldId => {
    const fieldData = personData[fieldId];
    const numericFieldId = Number(fieldId);
    
    // Skip passport fields (already handled above)
    if (passportFieldKeys.includes(fieldId)) {
      return;
    }
    
    // Check if this field is already included in fields array
    const alreadyIncluded = fields.some(f => {
      const fId = Number(f.fieldId) || f.fieldId;
      return fId === numericFieldId || 
             fId === fieldId || 
             String(fId) === String(fieldId) ||
             Number(String(fId)) === numericFieldId;
    });
    
    if (!alreadyIncluded) {
      // Check if this is a field from a resubmission request (negative field ID)
      console.log(`🔍 Checking orphaned response: fieldId="${fieldId}", numericFieldId=${numericFieldId}, travelerId=${travelerIdForResubmission}`);
      const resubmissionField = findFieldInResubmissionRequests(numericFieldId, travelerIdForResubmission);
      
      // Check if question text is stored in the response data itself (fallback)
      const questionFromResponse = fieldData?.question || fieldData?.questionText || fieldData?.fieldQuestion;
      
      if (resubmissionField) {
        // This is from a resubmission request, use the field info from the request
        console.log(`✅ Resubmission field found: Field ID "${fieldId}" -> "${resubmissionField.question}"`);
        const isFile = fieldData.filePath !== undefined;
        fields.push({
          fieldId: numericFieldId || fieldId,
          question: resubmissionField.question,
          value: isFile ? fieldData : (fieldData.value !== undefined ? fieldData.value : fieldData),
          isFile: isFile,
          submittedAt: fieldData.submittedAt,
          fieldType: resubmissionField.fieldType || 'text',
          displayOrder: resubmissionField.displayOrder || 999
        });
      } else if (questionFromResponse && numericFieldId < 0) {
        // Negative field ID with question text in response data (fulfilled resubmission request)
        console.log(`✅ Resubmission field (from response data): Field ID "${fieldId}" -> "${questionFromResponse}"`);
        const isFile = fieldData.filePath !== undefined;
        fields.push({
          fieldId: numericFieldId || fieldId,
          question: questionFromResponse,
          value: isFile ? fieldData : (fieldData.value !== undefined ? fieldData.value : fieldData),
          isFile: isFile,
          submittedAt: fieldData.submittedAt,
          fieldType: fieldData?.fieldType || (isFile ? 'upload' : 'text'),
          displayOrder: fieldData?.displayOrder || 999
        });
      } else if (numericFieldId < 0) {
        // Negative field ID but no question text available - try one more time with more debugging
        console.log(`⚠️ Resubmission field (fulfilled, no question): Field ID "${fieldId}" - attempting to find in all requests...`);
        console.log(`  Available resubmission requests:`, {
          activeCount: activeResubmissionRequests.value?.length || 0,
          appCount: application.value?.resubmissionRequests?.length || 0,
          allRequests: [
            ...(activeResubmissionRequests.value || []),
            ...(application.value?.resubmissionRequests || [])
          ].map(r => ({
            id: r.id,
            target: r.target,
            travelerId: r.travelerId,
            fieldIds: r.fieldIds,
            newFieldsCount: r.newFields?.length || 0
          }))
        });
        
        // Try to find in resubmissionFields that were already extracted
        const foundInResubmissionFields = resubmissionFields.find(f => Number(f.id) === numericFieldId);
        if (foundInResubmissionFields) {
          console.log(`  ✅ Found in resubmissionFields: "${foundInResubmissionFields.question}"`);
          const isFile = fieldData.filePath !== undefined;
          fields.push({
            fieldId: numericFieldId || fieldId,
            question: foundInResubmissionFields.question,
            value: isFile ? fieldData : (fieldData.value !== undefined ? fieldData.value : fieldData),
            isFile: isFile,
            submittedAt: fieldData.submittedAt,
            fieldType: foundInResubmissionFields.fieldType || 'text',
            displayOrder: foundInResubmissionFields.displayOrder || 999
          });
        } else {
          // Still can't find it - show generic label
          console.log(`  ❌ Still not found - showing generic label`);
          const isFile = fieldData.filePath !== undefined;
          fields.push({
            fieldId: numericFieldId || fieldId,
            question: `Resubmission Field ${fieldId}`,
            value: isFile ? fieldData : (fieldData.value !== undefined ? fieldData.value : fieldData),
            isFile: isFile,
            submittedAt: fieldData.submittedAt,
            fieldType: isFile ? 'upload' : 'text',
            displayOrder: 999
          });
        }
      } else {
        // Truly orphaned response (not from resubmission request)
      console.log(`Orphaned response found: Field ID "${fieldId}" (numeric: ${numericFieldId})`);
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
    }
  });
  } // End of if (hasPersonData) for orphaned responses

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

  console.log('📄 DOCUMENTS TAB DEBUG START');
  console.log('📄 selectedTravelerIdForDocuments:', selectedTravelerIdForDocuments.value);

  const docs = [];
  // Helper to compare IDs (handles both numeric and string IDs like 'temp-traveler-0')
  const idsMatch = (id1, id2) => {
    if (id1 === id2) return true;
    if (id1 === null || id2 === null || id1 === undefined || id2 === undefined) return false;
    const num1 = Number(id1);
    const num2 = Number(id2);
    if (!isNaN(num1) && !isNaN(num2)) return num1 === num2;
    return String(id1) === String(id2);
  };

  // First try to find in allTravelers (for documents tab)
  let selectedPerson = allTravelers.value.find(p => idsMatch(p.id, selectedTravelerIdForDocuments.value));
  console.log('📄 selectedPerson from allTravelers:', selectedPerson ? { id: selectedPerson.id, name: selectedPerson.name, type: selectedPerson.type, hasData: !!selectedPerson.data, dataKeys: selectedPerson.data ? Object.keys(selectedPerson.data) : [] } : null);
  console.log('📄 selectedPerson.data?.fieldResponses:', selectedPerson?.data?.fieldResponses ? Object.keys(selectedPerson.data.fieldResponses) : 'none');
  // If not found, try allPeople (fallback)
  if (!selectedPerson) {
    selectedPerson = allPeople.value.find(p => idsMatch(p.id, selectedTravelerIdForDocuments.value));
  }
  if (!selectedPerson) return [];

  // Get documents from the static documents array (if any)
  if (selectedPerson.type === 'traveler') {
    docs.push(...documents.value.filter(doc => idsMatch(doc.travelerId, selectedTravelerIdForDocuments.value)));
  }
  
  // Get files from field responses
  let personData = null;
  
  // IMPORTANT: Traveler 1 (customer traveler) has responses stored at application level
  // Check if this is traveler 1 (customer traveler)
  const isTraveler1 = selectedPerson.data?._isCustomerTraveler || 
    (selectedPerson.type === 'traveler' && 
     application.value?.travelers?.[0]?.id === selectedPerson.id) ||
    (selectedPerson.type === 'traveler' && 
     application.value?.customer?.email && 
     selectedPerson.data?.email && 
     application.value.customer.email.toLowerCase() === selectedPerson.data.email.toLowerCase());
  
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
    // For traveler 1 (customer traveler), use application-level fieldResponses
    if (isTraveler1) {
      console.log('📄 TRAVELER 1 (Customer Traveler): Using application-level fieldResponses for documents');
      // Get application-level field responses
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
    } else {
      // Get traveler-level field responses from traveler entity
      // The fieldResponses are stored directly on the traveler entity
      if (selectedPerson.data?.fieldResponses) {
        personData = selectedPerson.data.fieldResponses;
      }

      // Fallback 1: Check application.value.fieldResponses.travelers array
      if (!personData && application.value?.fieldResponses?.travelers) {
        const travelersArray = application.value.fieldResponses.travelers;
        const travelerResponse = travelersArray.find(t => Number(t.travelerId) === Number(selectedPerson.id));
        if (travelerResponse && travelerResponse.responses) {
          personData = {};
          travelerResponse.responses.forEach(response => {
            const fId = response.fieldId;
            if (response.filePath) {
              personData[fId] = {
                filePath: response.filePath,
                fileName: response.fileName,
                fileSize: response.fileSize,
                submittedAt: response.submittedAt
              };
            } else {
              personData[fId] = {
                value: response.value,
                submittedAt: response.submittedAt
              };
            }
          });
        }
      }

      // Fallback 2: Check application.value.travelers for fieldResponses
      if (!personData && application.value?.travelers) {
        const travelerInApp = application.value.travelers.find(t => t.id === selectedPerson.id);
        if (travelerInApp?.fieldResponses) {
          personData = travelerInApp.fieldResponses;
        }
      }

      // Fallback 3: Check if fieldResponses is keyed by traveler ID
      if (!personData && application.value?.fieldResponses) {
        const fieldResponses = application.value.fieldResponses;
        if (fieldResponses[selectedPerson.id]) {
          personData = fieldResponses[selectedPerson.id];
        }
      }

      // Fallback 4: Check cache
      if (!personData && travelerFieldResponsesCache.value[selectedPerson.id]) {
        personData = travelerFieldResponsesCache.value[selectedPerson.id];
      }
    }
  }

  console.log('📄 DOCUMENTS TAB - personData found:', personData ? Object.keys(personData) : 'none');
  console.log('📄 DOCUMENTS TAB - personData details:', personData ? JSON.stringify(personData, null, 2) : 'null');

  // Get resubmission field definitions for looking up negative field IDs
  const travelerIdForResubmission = selectedPerson.type === 'traveler' ? selectedPerson.id : null;
  const allResubmissionRequests = [
    ...(activeResubmissionRequests.value || []),
    ...(application.value?.resubmissionRequests || [])
  ];
  const uniqueRequests = allResubmissionRequests.filter((req, index, self) =>
    index === self.findIndex(r => r.id === req.id)
  );
  const resubmissionFields = getFieldsFromResubmissionRequests(uniqueRequests, travelerIdForResubmission);
  const allFieldDefs = [...fieldDefinitions.value, ...resubmissionFields];

  if (personData) {
    Object.keys(personData).forEach(fieldId => {
      const fieldData = personData[fieldId];
      if (fieldData.filePath) {
        const numericFieldId = Number(fieldId);
        const isResubmission = numericFieldId < 0;

        // Try to find field definition in combined list (regular + resubmission)
        const fieldDef = allFieldDefs.find(f =>
          f.id === numericFieldId || String(f.id) === String(fieldId)
        );
        const fieldName = fieldDef?.question || (isResubmission ? 'Resubmission Upload' : `Field ${fieldId}`);
        const documentType = isResubmission ? 'Resubmission Upload' : (fieldDef?.fieldType === 'upload' ? 'Upload' : 'Document');

        docs.push({
          id: `additional-info-${selectedPerson.id}-${fieldId}`,
          travelerId: selectedPerson.id,
          documentType: documentType,
          fileName: fieldData.fileName || 'Unknown file',
          filePath: fieldData.filePath,
          fileSize: fieldData.fileSize,
          dateUploaded: fieldData.submittedAt ? formatDate(fieldData.submittedAt) : '-',
          fieldName: fieldName,
          fieldId: numericFieldId,
          selected: false,
          isAdditionalInfo: true,
          isResubmission: isResubmission
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
    // Use Number() for comparison to handle string/number type mismatch
    const personIdNum = Number(person.id)
    return activeResubmissionRequests.value.filter(
      req => !req.fulfilledAt && req.target === 'traveler' && Number(req.travelerId) === personIdNum
    )
  }
})

// ✅ ADD: After computed properties
const getTravelerNameById = (travelerId) => {
   if (!travelerId) return 'Application'
  const person = allPeople.value.find(p => Number(p.id) === Number(travelerId))
  return person ? person.name : `Traveler ${travelerId}`
}

const getApplicationFields = () => {
  // Return all fields that don't have a travelerId (application-level fields)
  // Since we're getting fields from the combined endpoint, all fields without travelerId are application fields
  return fieldDefinitions.value.filter(f => !f.travelerId)
}

const getTravelerFields = (travelerId) => {
  // Get all application-level fields (fields without travelerId)
  const applicationFields = fieldDefinitions.value.filter(f => !f.travelerId)
  
  // Get resubmission fields for this specific traveler
  const resubmissionFields = getFieldsFromResubmissionRequests(
    activeResubmissionRequests.value,
    travelerId
  )
  
  // Combine application fields with resubmission fields for this traveler
  // Only include resubmission fields that were requested for THIS traveler
  const allFields = [...applicationFields, ...resubmissionFields]
  
  // Filter to ensure we only show fields that belong to this traveler
  // Application-level fields (positive IDs) are shown to all travelers
  // Resubmission fields (negative IDs) should only be shown to the traveler they were requested for
  return allFields.filter(field => {
    // If it's a positive field ID, it's an application-level field - show to all travelers
    if (field.id > 0) {
      return true
    }
    
    // If it's a negative field ID, it's a resubmission field - only show if it was requested for this traveler
    if (field.id < 0) {
      // Check if this negative field ID belongs to this traveler
      // Use Number() for comparison to handle string/number type mismatch
      const request = activeResubmissionRequests.value.find(req => {
        if (req.target !== 'traveler' || Number(req.travelerId) !== Number(travelerId)) {
          return false
        }
        const fieldIds = req.fieldIds || []
        return fieldIds.includes(field.id)
      })
      return !!request
    }
    
    return true
  })
}

const getBulkTravelerSelection = (travelerId) => {
  // Normalize ID: convert to number if numeric, otherwise keep as string (e.g., 'temp-traveler-0')
  const normalizeId = (id) => {
    if (id === null || id === undefined) return null
    const num = Number(id)
    return isNaN(num) ? String(id) : num
  }

  const normalizedId = normalizeId(travelerId)

  // Find existing entry using normalized comparison
  const existing = bulkRequestSelection.value.travelers.find(t => {
    return normalizeId(t.travelerId) === normalizedId
  })

  // Return existing or a NON-REACTIVE fallback (do NOT push during render to avoid infinite loops)
  return existing || { travelerId: normalizedId, fieldIds: [], newFields: [], note: '' }
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

// ✅ OPTIMIZED: Load all admin modal data in one API call
// This replaces 2 separate calls (getActiveResubmissionRequests + getAllResubmissionRequests)
// and optionally loads field definitions too
const loadActiveResubmissionRequests = async (alsoLoadFieldDefinitions = false) => {
  console.log('🚀 loadActiveResubmissionRequests called (using consolidated endpoint)', { applicationId: applicationId.value })
  if (!applicationId.value) {
    console.log('⚠️ No applicationId, skipping loadActiveResubmissionRequests')
    return
  }
  try {
    const { getAdminModalData } = useApplication()

    console.log('📞 Calling getAdminModalData (consolidated endpoint)...')
    const response = await getAdminModalData(Number(applicationId.value))
    console.log('📞 getAdminModalData response:', response)

    const data = response?.data || {}

    // Set resubmission requests (already enriched with newFields from backend)
    activeResubmissionRequests.value = data.resubmissionRequests || []

    // Optionally set field definitions if requested and available
    if (alsoLoadFieldDefinitions && data.fieldDefinitions && data.fieldDefinitions.length > 0) {
      fieldDefinitions.value = data.fieldDefinitions
      console.log('✅ Field definitions loaded from consolidated endpoint:', fieldDefinitions.value.length)
    }

    console.log('✅ Loaded from consolidated endpoint:', {
      resubmissionRequests: activeResubmissionRequests.value.length,
      active: activeResubmissionRequests.value.filter(r => !r.fulfilledAt).length,
      fulfilled: activeResubmissionRequests.value.filter(r => r.fulfilledAt).length,
      withNewFields: activeResubmissionRequests.value.filter(r => r.newFields && r.newFields.length > 0).length,
      fieldDefinitions: data.fieldDefinitions?.length || 0,
      adminRequestedFields: data.adminRequestedFields?.length || 0
    })
  } catch (error) {
    console.error('❌ Error loading admin modal data:', error)
    activeResubmissionRequests.value = []
  }
}

const openBulkResubmitModal = () => {
  // Normalize ID: convert to number if numeric, otherwise keep as string (e.g., 'temp-traveler-0')
  const normalizeId = (id) => {
    if (id === null || id === undefined) return null
    const num = Number(id)
    return isNaN(num) ? String(id) : num
  }

  // Pre-populate all travelers with normalized IDs to avoid type mismatches
  const travelerSelections = validTravelersForModal.value.map(t => ({
    travelerId: normalizeId(t.id),
    fieldIds: [],
    newFields: [],
    note: ''
  }))

  bulkRequestSelection.value = {
    application: { fieldIds: [], newFields: [], note: '' },
    travelers: travelerSelections
  }
  showBulkResubmitModal.value = true
}

const closeBulkResubmitModal = () => {
  showBulkResubmitModal.value = false
}

const submitBulkResubmissionRequest = async () => {
  try {
    const requests = []
    
    // Process traveler-level requests only (application fields removed)
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
    // Use Number() for comparison to handle string/number type mismatch
    const personIdNum = Number(person.id)
    const requests = activeResubmissionRequests.value.filter(
      req => !req.fulfilledAt && req.target === 'traveler' && Number(req.travelerId) === personIdNum
    )
    return requests.reduce((sum, req) => {
      const fieldIdsCount = (req.fieldIds || []).length
      const newFieldsCount = (req.newFields || []).length
      return sum + fieldIdsCount + newFieldsCount
    }, 0)
  }
}

const bulkRequestTotalCount = computed(() => {
  let count = 0
  bulkRequestSelection.value.travelers.forEach(t => {
    count += (t.fieldIds?.length || 0) + (t.newFields?.length || 0)
  })
  return count
})

const bulkRequestTargetCount = computed(() => {
  let count = 0
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
               Number(d.travelerId) === Number(doc.travelerId) &&
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
               Number(d.travelerId) === Number(traveler.id) &&
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
      const rawTravelers = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);
      
      console.log('📋 Raw travelers from API:', rawTravelers.map(t => ({ 
        id: t.id, 
        firstName: t.firstName, 
        lastName: t.lastName,
        email: t.email,
        hasFieldResponses: !!t.fieldResponses,
        fieldResponsesKeys: t.fieldResponses ? Object.keys(t.fieldResponses) : [],
        allKeys: Object.keys(t) // Log all keys to see what's available
      })));
      
      // Check if we need to add the first traveler (customer traveler)
      // According to backend: when numberOfTravelers > 1, first traveler is the customer traveler
      const numberOfTravelers = application.value?.numberOfTravelers || 0;
      const customer = application.value?.customer;
      const expectedTravelerCount = numberOfTravelers;
      
      console.log('📊 Traveler count check:', {
        numberOfTravelers,
        rawTravelersCount: rawTravelers.length,
        expectedCount: expectedTravelerCount,
        customerId: customer?.id,
        customerEmail: customer?.email
      });
      
      // Check if we need to add the first traveler (customer traveler)
      // According to backend: when numberOfTravelers > 1, first traveler is the customer traveler
      const appTravelers = application.value?.travelers || [];
      const firstAppTraveler = appTravelers[0]; // First traveler is customer traveler
      
      // Check if first traveler (customer traveler) already exists in rawTravelers
      // Check by ID first (most reliable), then by email, then by name match
      let customerTravelerExists = false;
      if (firstAppTraveler?.id) {
        customerTravelerExists = rawTravelers.some(t => t.id === firstAppTraveler.id);
      }
      if (!customerTravelerExists && customer?.email) {
        customerTravelerExists = rawTravelers.some(t => 
          t.email && customer.email && t.email.toLowerCase() === customer.email.toLowerCase()
        );
      }
      if (!customerTravelerExists && firstAppTraveler) {
        // Check by name match as last resort
        const firstTravelerName = `${firstAppTraveler.firstName || ''} ${firstAppTraveler.lastName || ''}`.trim().toLowerCase();
        customerTravelerExists = rawTravelers.some(t => {
          const travelerName = `${t.firstName || ''} ${t.lastName || ''}`.trim().toLowerCase();
          return travelerName && firstTravelerName && travelerName === firstTravelerName;
        });
      }
      
      // Only add if we have fewer travelers than expected AND customer traveler doesn't exist
      if (rawTravelers.length < expectedTravelerCount && customer && !customerTravelerExists) {
        console.log('⚠️ First traveler (customer traveler) is missing, adding it...');
        
        // Create customer traveler entry - prefer data from application.travelers if available
        const customerTraveler = {
          id: firstAppTraveler?.id || null, // Use ID from application traveler if available
          firstName: firstAppTraveler?.firstName || customer.fullname?.split(' ')[0] || customer.customerName?.split(' ')[0] || '',
          lastName: firstAppTraveler?.lastName || customer.fullname?.split(' ').slice(1).join(' ') || customer.customerName?.split(' ').slice(1).join(' ') || '',
          email: firstAppTraveler?.email || customer.email,
          // Add other traveler fields from application traveler or customer
          passportNumber: firstAppTraveler?.passportNumber || customer.passportNumber,
          passportExpiryDate: firstAppTraveler?.passportExpiryDate || customer.passportExpiryDate,
          residenceCountry: firstAppTraveler?.residenceCountry || customer.residenceCountry,
          dateOfBirth: firstAppTraveler?.dateOfBirth || customer.dateOfBirth,
          _isCustomerTraveler: true,
          // Set fieldResponses from application-level responses if available
          fieldResponses: application.value?.fieldResponses?.application || firstAppTraveler?.fieldResponses || {}
        };
        
        console.log('✅ Adding customer traveler to travelers list:', {
          ...customerTraveler,
          fieldResponsesKeys: Object.keys(customerTraveler.fieldResponses || {})
        });
        rawTravelers.unshift(customerTraveler); // Add at the beginning
      } else if (customerTravelerExists) {
        console.log('✅ Customer traveler already exists in travelers list, skipping addition');
      }
      
      // Remove duplicates before processing (by ID, then by name)
      const seenIds = new Set();
      const seenNames = new Set();
      const uniqueTravelers = rawTravelers.filter(t => {
        const travelerId = t.id;
        const travelerName = `${t.firstName || ''} ${t.lastName || ''}`.trim().toLowerCase();
        
        // Check for duplicate by ID
        if (travelerId && seenIds.has(travelerId)) {
          console.log(`⚠️ Removing duplicate traveler by ID: ${travelerId}`, t);
          return false;
        }
        if (travelerId) seenIds.add(travelerId);
        
        // Check for duplicate by name (if no ID or ID is null)
        if (!travelerId && travelerName && seenNames.has(travelerName)) {
          console.log(`⚠️ Removing duplicate traveler by name: ${travelerName}`, t);
          return false;
        }
        if (travelerName) seenNames.add(travelerName);
        
        return true;
      });
      
      console.log('📋 Travelers after deduplication:', uniqueTravelers.length, 'of', rawTravelers.length);
      
      // Filter out any customer entries that might have been included
      // Be very lenient - include all entries unless they're clearly customers
      // Assign temporary IDs to travelers with null IDs
      travelers.value = uniqueTravelers.map((t, index) => {
        // If traveler has no ID, assign a temporary one
        if (!t.id || t.id === null || t.id === undefined) {
          const tempId = `temp-traveler-${index}`;
          console.log(`⚠️ Traveler has no ID, assigning temporary ID: ${tempId}`, t);
          return { ...t, id: tempId, _isTempId: true };
        }
        return t;
      }).filter(t => {
        // Check if it's clearly customer data (has customer fields but NO traveler fields)
        const hasCustomerFields = t.fullname || t.customerName || (t.name && !t.firstName && !t.lastName);
        const hasTravelerFields = t.firstName || t.lastName || t.passportNumber || t.dateOfBirth || t.email;
        
        // Only exclude if it has customer fields but NO traveler fields at all
        // BUT: if it's marked as customer traveler, include it
        if (t._isCustomerTraveler) {
          console.log('✅ Including customer traveler:', { id: t.id, firstName: t.firstName, lastName: t.lastName });
          return true;
        }
        
        if (hasCustomerFields && !hasTravelerFields) {
          console.log('⚠️ Filtering out customer entry from travelers (has customer fields but no traveler fields):', {
            id: t.id,
            fullname: t.fullname,
            customerName: t.customerName,
            name: t.name
          });
          return false;
        }
        
        // Include all other entries - they're travelers
        console.log('✅ Including traveler:', { id: t.id, firstName: t.firstName, lastName: t.lastName, isTempId: t._isTempId });
        return true;
      });
      
      console.log('📋 Loaded travelers (filtered):', travelers.value.map(t => ({ id: t.id, name: `${t.firstName || ''} ${t.lastName || ''}`.trim() })));
      
      // Set first person as selected by default
      nextTick(() => {
        if (allPeople.value.length > 0) {
          if (!selectedTravelerId.value) {
            // For Additional Info, prefer travelers
            selectedTravelerId.value = allTravelers.value[0]?.id || allPeople.value[0]?.id;
          }
          if (!selectedTravelerIdForDocuments.value) {
            // For documents tab, only use travelers (not customer)
            selectedTravelerIdForDocuments.value = allTravelers.value[0]?.id;
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
    
    // Debug: Check if resubmissionRequests are in the application object
    console.log('📋 Application object loaded:', {
      hasResubmissionRequests: !!application.value?.resubmissionRequests,
      resubmissionRequestsType: typeof application.value?.resubmissionRequests,
      resubmissionRequestsIsArray: Array.isArray(application.value?.resubmissionRequests),
      resubmissionRequestsCount: application.value?.resubmissionRequests?.length || 0,
      resubmissionRequests: application.value?.resubmissionRequests,
      applicationKeys: Object.keys(application.value || {}),
      fullApplication: JSON.parse(JSON.stringify(application.value)) // Deep clone to see full structure
    });

    // Set status from application
    if (data.status) {
      applicationStatus.value = data.status.toLowerCase();
    }
    
    // Load field definitions AND resubmission requests in ONE API call (optimized)
    if (data.visaProductId) {
      // Pass true to also load field definitions from the consolidated endpoint
      await loadActiveResubmissionRequests(true)
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

// Format date and time helper for email tracking
const formatDateTime = (date) => {
  if (!date) return "-";
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "-";
    return dateObj.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
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
  // If already a full URL, return as-is
  if (filePath.startsWith('http')) return filePath;
  // Ensure filePath starts with / for proper URL construction
  const normalizedPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
  return `${baseUrl}${normalizedPath}`;
};

// Open file in new tab (handles click to avoid Vue Router interference)
const openFileInNewTab = (filePath) => {
  const url = getFileUrl(filePath);
  if (url && url !== '#') {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    alert('Unable to open file. The file path is missing.');
  }
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

// Watch for selectedTravelerId changes to preload field responses if not found
watch(selectedTravelerId, async (newTravelerId) => {
  if (!newTravelerId || activeTab.value !== 'additional-info') return;
  
  // Find the selected person
  let selectedPerson = allTravelers.value.find(p => p.id === newTravelerId);
  if (!selectedPerson) {
    selectedPerson = allPeople.value.find(p => p.id === newTravelerId);
  }
  
  if (!selectedPerson || selectedPerson.type !== 'traveler') return;
  
  // Check if we already have responses for this traveler
  const hasResponses = selectedPerson.data?.fieldResponses ||
                       travelerFieldResponsesCache.value[newTravelerId] ||
                       (application.value?.fieldResponses?.travelers?.some(t => Number(t.travelerId) === Number(newTravelerId)));
  
  if (!hasResponses) {
    console.log('🔄 Preloading field responses for traveler:', newTravelerId);
    const responses = await loadTravelerFieldResponses(newTravelerId);
    if (responses && Object.keys(responses).length > 0) {
      travelerFieldResponsesCache.value[newTravelerId] = responses;
      // Also update the traveler object if it exists
      const traveler = travelers.value.find(t => Number(t.id) === Number(newTravelerId));
      if (traveler) {
        traveler.fieldResponses = responses;
      }
    }
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
