<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
      <!-- Page Title -->
      <div
        class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4"
      >
        <div class="flex-1 min-w-0">
          <h1
            class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Applications
          </h1>
          <label
            class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
            style="font-weight: 400; letter-spacing: 0%"
          >
            Here you can find all the applications
          </label>
        </div>
      </div>
      <!-- Search and Filters Row -->
      <div
        class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4"
      >
        <!-- Search and View Toggle -->
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

        <!-- View Toggle and Columns Filter -->
        <div class="flex justify-center sm:justify-end w-full sm:w-auto gap-2">
          <!-- View Toggle -->
          <div class="flex bg-gray-100 dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 rounded-md p-1">
            <button
              @click="viewMode = 'table'"
              :class="[
                'px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-2',
                viewMode === 'table'
                  ? 'bg-white dark:bg-[#09090B] text-black dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              ]"
            >
              <Table2 class="h-4 w-4" />
              <span class="hidden sm:inline">Table</span>
            </button>
            <button
              @click="viewMode = 'kanban'"
              :class="[
                'px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-2',
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-[#09090B] text-black dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              ]"
            >
              <LayoutGrid class="h-4 w-4" />
              <span class="hidden sm:inline">Kanban</span>
            </button>
          </div>
          
        

          <!-- Sort Button (only show in kanban view) -->
          <div v-if="viewMode === 'kanban'" class="relative w-full sm:w-auto">
            <button
              @click="toggleSortDropdown"
              class="w-full h-[36px] sm:w-auto bg-[#FFFFFF] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31] transition-colors flex items-center justify-center space-x-2 text-sm"
              style="border-radius: 5px"
            >
              <ArrowUpDown class="h-4 w-4" />
              <span class="sm:inline">Sort</span>
            </button>

            <!-- Sort Dropdown -->
            <div
              v-if="sortDropdownOpen"
              class="absolute top-full right-0 z-10 mt-2 w-56 bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
              style="border-radius: 5px"
            >
              <!-- Sort Options -->
              <div class="py-1">
                <button
                  @click="setSortOption('date_desc')"
                  :class="[
                    'w-full text-left flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer transition-colors',
                    sortOption === 'date_desc' ? 'bg-[#E4E4E8] dark:bg-[#18181B]' : ''
                  ]"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span
                    v-if="sortOption === 'date_desc'"
                    class="mr-3 text-black dark:text-white text-sm font-bold"
                    >✓</span
                  >
                  <span
                    v-else
                    class="mr-3 text-transparent text-sm font-bold"
                    >✓</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white"
                    >Latest First</span
                  >
                </button>
                <button
                  @click="setSortOption('date_asc')"
                  :class="[
                    'w-full text-left flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer transition-colors',
                    sortOption === 'date_asc' ? 'bg-[#E4E4E8] dark:bg-[#18181B]' : ''
                  ]"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span
                    v-if="sortOption === 'date_asc'"
                    class="mr-3 text-black dark:text-white text-sm font-bold"
                    >✓</span
                  >
                  <span
                    v-else
                    class="mr-3 text-transparent text-sm font-bold"
                    >✓</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white"
                    >Oldest First</span
                  >
                </button>
                <button
                  @click="setSortOption('amount_desc')"
                  :class="[
                    'w-full text-left flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer transition-colors',
                    sortOption === 'amount_desc' ? 'bg-[#E4E4E8] dark:bg-[#18181B]' : ''
                  ]"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span
                    v-if="sortOption === 'amount_desc'"
                    class="mr-3 text-black dark:text-white text-sm font-bold"
                    >✓</span
                  >
                  <span
                    v-else
                    class="mr-3 text-transparent text-sm font-bold"
                    >✓</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white"
                    >Amount (High to Low)</span
                  >
                </button>
                <button
                  @click="setSortOption('processing_fast')"
                  :class="[
                    'w-full text-left flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer transition-colors',
                    sortOption === 'processing_fast' ? 'bg-[#E4E4E8] dark:bg-[#18181B]' : ''
                  ]"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span
                    v-if="sortOption === 'processing_fast'"
                    class="mr-3 text-black dark:text-white text-sm font-bold"
                    >✓</span
                  >
                  <span
                    v-else
                    class="mr-3 text-transparent text-sm font-bold"
                    >✓</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white"
                    >Lower Processing Time</span
                  >
                </button>
                <button
                  @click="setSortOption('processing_slow')"
                  :class="[
                    'w-full text-left flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer transition-colors',
                    sortOption === 'processing_slow' ? 'bg-[#E4E4E8] dark:bg-[#18181B]' : ''
                  ]"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span
                    v-if="sortOption === 'processing_slow'"
                    class="mr-3 text-black dark:text-white text-sm font-bold"
                    >✓</span
                  >
                  <span
                    v-else
                    class="mr-3 text-transparent text-sm font-bold"
                    >✓</span
                  >
                  <span class="text-sm text-gray-900 dark:text-white"
                    >Higher Processing Time</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Applications Table View -->
      <div
        v-if="viewMode === 'table'"
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
                    <span>Application #</span>
                  </div>
                </th>
                <th
                  class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  <div class="flex items-center space-x-1">
                    <span>Customer Name</span>
                  </div>
                </th>
                <th
                  class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  <div class="flex items-center space-x-1">
                    <span>Destination</span>
                  </div>
                </th>
                <th
                  class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  <div class="flex items-center space-x-1">
                    <span>Visa Type</span>
                  </div>
                </th>
                <th
                  class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  <div class="flex items-center space-x-1">
                    <span>Amount</span>
                  </div>
                </th>
                <th
                  class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  <div class="flex items-center space-x-1">
                    <span>Status</span>
                    <span class="text-gray-500 dark:text-gray-400 text-sm"
                      >↓</span
                    >
                  </div>
                </th>
                <th class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <!-- Loading State -->
              <tr v-if="applicationLoading">
                <td colspan="8" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Loading applications...
                </td>
              </tr>
              
              <!-- Empty State -->
              <tr v-else-if="!applicationLoading && filteredApplications.length === 0">
                <td colspan="8" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {{ applicationError || 'No applications found.' }}
                </td>
              </tr>
              
              <!-- Data Rows -->
              <tr
                v-for="application in filteredApplications"
                :key="application.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <input
                    type="checkbox"
                    v-model="application.selected"
                    class="border-gray-300"
                    style="border-radius: 7px"
                  />
                </td>
                <td
                  class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-white font-semibold"
                  style="
                    font-size: 14px;
                    font-weight: 400;
                    font-style: normal;
                    line-height: 20px;
                    font-family: 'Geist', sans-serif;
                    letter-spacing: 0;
                  "
                >
                  {{ getApplicationId(application) }}
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
                  {{ getCustomerName(application) }}
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
                  {{ application.destinationCountry || application.destination || '-' }}
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
                  {{ application.visaType || '-' }}
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
                  {{ formatAmount(application) }}
                </td>
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <span
                    :class="getStatusPillClasses(application.status)"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {{ getFormattedStatus(application.status) }}
                  </span>
                </td>
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="viewApplication(application)"
                      class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      title="View"
                    >
                      <Eye
                        class="h-4 w-4 text-gray-600 dark:text-gray-400"
                      />
                    </button>
                    <button
                      @click="editApplication(application)"
                      class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      title="Edit"
                    >
                      <Pencil
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

      <!-- Kanban Board View -->
      <div
        v-else
        class="w-full"
      >
        <!-- Loading State -->
        <div v-if="applicationLoading" class="flex items-center justify-center py-12">
          <div class="text-center">
            <div class="inline-block w-8 h-8 border-4 border-gray-300 border-t-black dark:border-t-white rounded-full animate-spin"></div>
            <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading applications...</p>
          </div>
        </div>

        <!-- Content -->
        <div v-else>
          <!-- Mobile Scroll Hint -->
          <div class="sm:hidden mb-2 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
            </svg>
            <span>Swipe to see all columns</span>
            <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </div>

          <!-- Kanban Columns -->
          <div
            ref="kanbanContainer"
            class="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:snap-none"
            style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch;"
            @dragover.prevent="handleKanbanDragOver"
          >
          <!-- Column for each status -->
          <div
            v-for="status in kanbanStatuses"
            :key="status.value"
            :data-status="status.value"
            class="flex-shrink-0 w-[68vw] sm:w-80 snap-center sm:snap-align-none bg-gray-50 dark:bg-[#18181B] rounded-2xl border border-gray-200 dark:border-gray-700 transition-colors overflow-hidden"
            :class="{ 'ring-2 ring-blue-400 bg-blue-50 dark:bg-blue-900/20': isDragOver === status.value }"
            @dragover.prevent="onDragOver($event, status.value)"
            @dragleave="onDragLeave"
            @drop="onDrop($event, status.value)"
            @touchmove.prevent="onTouchMove"
            :ref="el => setColumnRef(el, status.value)"
          >
            <!-- Column Header -->
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <span
                    :class="status.color"
                    class="w-2 h-2 rounded-full"
                  ></span>
                  {{ status.label }}
                </h3>
                <span class="px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 rounded-full">
                  {{ getStatusCount(status.value) }}
                </span>
              </div>
            </div>

            <!-- Cards Container -->
            <div 
              :ref="el => setColumnScrollRef(el, status.value)"
              class="p-3 space-y-3 min-h-[calc(100vh-280px)] max-h-[calc(100vh-280px)] overflow-y-auto"
              @dragover.prevent="onDragOver($event, status.value)"
              @drop="onDrop($event, status.value)"
            >
              <!-- Empty State -->
              <div
                v-if="getApplicationsByStatus(status.value).length === 0"
                class="flex items-center justify-center py-8 text-sm text-gray-500 dark:text-gray-400"
              >
                No applications
              </div>

              <!-- Application Cards -->
              <div
                v-for="application in getApplicationsByStatus(status.value)"
                :key="`${application.id}-${sortOption}`"
                draggable="true"
                @dragstart="onDragStart($event, application)"
                @dragend="onDragEnd"
                @touchstart="onTouchStart($event, application)"
                @touchmove="onTouchMove"
                @touchend="onTouchEnd"
                class="bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-move hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all select-none group"
                :style="{ 
                  opacity: draggedApplication?.id === application.id ? '0.4' : '1',
                  touchAction: 'none',
                  WebkitUserSelect: 'none',
                  userSelect: 'none'
                }"
                title="Drag to change status"
              >
                <!-- Card Header -->
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {{ getApplicationId(application) }}
                    </h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                      {{ getCustomerName(application) }}
                    </p>
                  </div>
                  <div class="flex items-center gap-1 ml-2">
                    <button
                      @click.stop="viewApplication(application)"
                      @mousedown.stop
                      @touchstart.stop
                      class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                      title="View"
                    >
                      <Eye class="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                <!-- Card Details -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-500 dark:text-gray-400">Destination</span>
                    <span class="text-gray-900 dark:text-white font-medium">
                      {{ application.destinationCountry || application.destination || '-' }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-500 dark:text-gray-400">Visa Type</span>
                    <span class="text-gray-900 dark:text-white font-medium">
                      {{ application.visaType || '-' }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-500 dark:text-gray-400">Processing</span>
                    <span :class="getProcessingTimePillClasses(application)" class="px-2 py-0.5 rounded-full text-[10px] font-medium">
                      {{ formatProcessingTime(application) }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-500 dark:text-gray-400">Amount</span>
                    <span class="text-gray-900 dark:text-white font-medium">
                      {{ formatAmount(application) }}
                    </span>
                  </div>
                </div>

                <!-- Card Footer -->
                <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span v-if="application.createdAt || application.created_at || application.created">
                      {{ formatDate(application.createdAt || application.created_at || application.created || '') }}
                    </span>
                    <span v-else>-</span>
                    <span
                      :class="getStatusPillClasses(application.status)"
                      class="px-2.5 py-1 rounded-full text-[10px] font-medium"
                    >
                      {{ getFormattedStatus(application.status) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <!-- Pagination (Table View Only) -->
      <div
        v-if="viewMode === 'table'"
        class="flex flex-row items-center justify-between flex-wrap gap-2 sm:gap-4 w-full"
      >
        <!-- Selection Count -->
        <div
          class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap"
        >
          {{ selectedCount }} of {{ applications.length }} row(s)
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

      <!-- Kanban Statistics (Kanban View Only) -->
      <div
        v-else
        class="flex flex-wrap items-center justify-between gap-3 sm:gap-4 w-full"
      >
        <div class="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          Total Applications: <span class="font-semibold">{{ filteredApplications.length }}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="status in kanbanStatuses"
            :key="status.value"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-[#18181B] border border-gray-200 dark:border-gray-700"
          >
            <span :class="status.color" class="w-2 h-2 rounded-full"></span>
            <span class="text-xs text-gray-600 dark:text-gray-400">{{ status.label }}:</span>
            <span class="text-xs font-semibold text-gray-900 dark:text-white">{{ getStatusCount(status.value) }}</span>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.animate-slide-up) {
  animation: slide-up 0.3s ease-out;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
</style>

<script setup lang="ts">
import {
  Columns,
  Eye,
  Pencil,
  Table2,
  LayoutGrid,
  ArrowUpDown,
} from "lucide-vue-next";
import { useApplication } from "~/composables/useApplication";

// Set page title
useHead({
  title: "Applications - iVisa",
});

const { getAllApplications, updateApplicationStatus, loading: applicationLoading, error: applicationError } = useApplication();

// Define application type
interface Application {
  id: number | string;
  applicationId?: string;
  applicationNumber?: string;
  customerName?: string;
  customer?: {
    fullname?: string;
    name?: string;
    customerName?: string;
  };
  destinationCountry?: string;
  destination?: string;
  visaType?: string;
  totalAmount?: number | string;
  price?: string;
  totalPrice?: string;
  // Processing fee can be a string (amount) or an object with full details
  processingFee?: string | {
    id?: number;
    feeType?: string;
    fee_type?: string;
    timeValue?: number;
    time_value?: number;
    timeUnit?: 'hours' | 'days';
    time_unit?: 'hours' | 'days';
    amount?: number;
  };
  // Also check for snake_case version
  processing_fee?: {
    id?: number;
    feeType?: string;
    fee_type?: string;
    timeValue?: number;
    time_value?: number;
    timeUnit?: 'hours' | 'days';
    time_unit?: 'hours' | 'days';
    amount?: number;
  };
  // Direct fields (camelCase variants)
  processingType?: string;
  processingTime?: string; // Combined string like "5 days" or "48 hours"
  processingTimeValue?: number;
  processingTimeUnit?: 'hours' | 'days';
  // Direct fields (snake_case variants from API)
  processing_type?: string;
  processing_time?: string; // Combined string like "5 days" or "48 hours"
  processing_time_value?: number;
  processing_time_unit?: 'hours' | 'days';
  status?: string;
  createdAt?: string;
  created_at?: string;
  created?: string;
  selected?: boolean;
}

const applications = ref<Application[]>([]);

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const columnsDropdownOpen = ref(false);
const viewMode = ref<'table' | 'kanban'>('kanban'); // Default to kanban view
const draggedApplication = ref<Application | null>(null);
const isDragOver = ref<string | null>(null);
const sortDropdownOpen = ref(false);
const sortOption = ref<'date_desc' | 'date_asc' | 'amount_desc' | 'processing_fast' | 'processing_slow'>('date_desc'); // Default to latest first

// Auto-scroll refs and state
const kanbanContainer = ref<HTMLElement | null>(null);
const columnRefs = ref<Record<string, HTMLElement>>({});
const columnScrollRefs = ref<Record<string, HTMLElement>>({});
let horizontalScrollInterval: NodeJS.Timeout | null = null;
let verticalScrollInterval: NodeJS.Timeout | null = null;
const SCROLL_THRESHOLD = 100; // Distance from edge to trigger scroll (px)
const SCROLL_SPEED = 10; // Pixels to scroll per interval

// Set column ref
const setColumnRef = (el: any, status: string) => {
  if (el && el instanceof HTMLElement) {
    columnRefs.value[status] = el;
  }
};

// Set column scroll container ref
const setColumnScrollRef = (el: any, status: string) => {
  if (el && el instanceof HTMLElement) {
    columnScrollRefs.value[status] = el;
  }
};

// Kanban statuses configuration
const kanbanStatuses = [
  { label: 'Pending', value: 'pending', color: 'bg-orange-500' },
  { label: 'In Process', value: 'in_process', color: 'bg-blue-500' },
  { label: 'Completed', value: 'completed', color: 'bg-green-500' },
  { label: 'Rejected', value: 'rejected', color: 'bg-red-500' },
];

// Load applications from API
const loadApplications = async () => {
  try {
    const data = await getAllApplications(searchQuery.value || undefined);
    console.log('📊 Applications loaded:', data);
    if (Array.isArray(data)) {
      applications.value = data.map((app) => ({
        ...app,
        selected: false,
      }));
      console.log('✅ Applications set:', applications.value.length, 'apps');
      console.log('📋 Sample app:', applications.value[0]);
      
      // Log all unique statuses found
      const uniqueStatuses = [...new Set(applications.value.map((app: Application) => app.status).filter((s): s is string => Boolean(s)))];
      console.log('📊 Unique statuses in DB:', uniqueStatuses);
      console.log('🗂️ Mapped to:', uniqueStatuses.map((s: string) => ({ original: s, normalized: normalizeStatus(s) })));
    } else {
      applications.value = [];
    }
  } catch (error) {
    console.error("Failed to load applications:", error);
    applications.value = [];
  }
};

// Debounce search
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    loadApplications();
  }, 300); // 300ms debounce
});

// Computed properties
const filteredApplications = computed(() => {
  // First, filter out draft applications
  const nonDraftApplications = applications.value.filter(
    (application: Application) => {
      const status = (application.status || '').toLowerCase();
      return status !== 'draft';
    }
  );

  // If search is handled by API, return filtered applications
  // Otherwise, filter client-side
  if (!searchQuery.value) return nonDraftApplications;

  return nonDraftApplications.filter(
    (application: Application) => {
      const applicationId = getApplicationId(application).toLowerCase();
      const customerName = getCustomerName(application).toLowerCase();
      const destination = (application.destinationCountry || application.destination || '').toLowerCase();
      const searchLower = searchQuery.value.toLowerCase();
      
      return (
        applicationId.includes(searchLower) ||
        customerName.includes(searchLower) ||
        destination.includes(searchLower)
      );
    }
  );
});

const selectedCount = computed(() => {
  return applications.value.filter((application: Application) => application.selected)
    .length;
});

// Helper functions to extract data from API response
const getApplicationId = (application: Application): string => {
  if (application.applicationId) return application.applicationId;
  if (application.applicationNumber) return application.applicationNumber;
  if (application.id) return `APP-${application.id}`;
  return '-';
};

const getCustomerName = (application: Application): string => {
  if (application.customerName) return application.customerName;
  if (application.customer?.fullname) return application.customer.fullname;
  if (application.customer?.name) return application.customer.name;
  if (application.customer?.customerName) return application.customer.customerName;
  return '-';
};

const formatAmount = (application: Application): string => {
  if (application.totalAmount) {
    // Format as currency if it's a number
    if (typeof application.totalAmount === 'number') {
      return `USD ${application.totalAmount.toFixed(2)}`;
    }
    // Return as is if it's already a string
    return String(application.totalAmount);
  }
  if (application.price) return application.price;
  if (application.totalPrice) return application.totalPrice;
  if (application.processingFee) return `USD ${application.processingFee}`;
  return '-';
};

// Status styling functions
const getStatusPillClasses = (status: string | undefined): string => {
  if (!status) return "bg-gray-500 text-white border border-gray-500";
  
  // Normalize to get the kanban column
  const normalized = normalizeStatus(status);
  
  switch (normalized) {
    case "pending":
      return "bg-orange-500 text-white border border-orange-500";
    case "in_process":
      return "bg-blue-500 text-white border border-blue-500";
    case "completed":
      return "bg-green-500 text-white border border-green-500";
    case "rejected":
      return "bg-red-500 text-white border border-red-500";
    default:
      return "bg-gray-500 text-white border border-gray-500";
  }
};

const getFormattedStatus = (status: string | undefined): string => {
  if (!status) return '';

  const statusLower = status.toLowerCase().replace(/\s+/g, '_');

  // Format common status values nicely
  const formattedMap: Record<string, string> = {
    'pending': 'Pending',
    'submitted': 'Submitted',
    'in_process': 'In Process',
    'in_review': 'In Review',
    'processing': 'Processing',
    'additional_info_required': 'Additional Info Required',
    'additional info required': 'Additional Info Required',
    'resubmission': 'Resubmission',
    'resubmission_required': 'Resubmission Required',
    'on_hold': 'On Hold',
    'completed': 'Completed',
    'approved': 'Approved',
    'active': 'Active',
    'rejected': 'Rejected',
    'declined': 'Declined',
    'cancelled': 'Cancelled',
  };

  return formattedMap[statusLower] || status.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
};

// Processing time formatting and styling

// Helper to parse combined processingTime string (e.g., "5 days", "48 hours")
const parseProcessingTimeString = (timeStr: string | undefined): { value: number; unit: 'hours' | 'days' } | null => {
  if (!timeStr || typeof timeStr !== 'string') return null;

  const trimmed = timeStr.trim().toLowerCase();
  // Match patterns like "5 days", "48 hours", "1 day", "24 hour"
  const match = trimmed.match(/^(\d+)\s*(hours?|days?)$/i);
  if (!match || !match[1] || !match[2]) return null;

  const value = parseInt(match[1], 10);
  const unitStr = match[2].toLowerCase();
  const unit: 'hours' | 'days' = unitStr.startsWith('hour') ? 'hours' : 'days';

  return { value, unit };
};

// Helper to get processing fee object (checks both camelCase and snake_case)
const getProcessingFeeObject = (app: Application): { timeValue?: number; timeUnit?: string; feeType?: string } | null => {
  // Check processingFee object
  if (app.processingFee && typeof app.processingFee === 'object') {
    const fee = app.processingFee;
    return {
      timeValue: fee.timeValue || fee.time_value,
      timeUnit: fee.timeUnit || fee.time_unit,
      feeType: fee.feeType || fee.fee_type,
    };
  }
  // Check processing_fee object (snake_case)
  if (app.processing_fee && typeof app.processing_fee === 'object') {
    const fee = app.processing_fee;
    return {
      timeValue: fee.timeValue || fee.time_value,
      timeUnit: fee.timeUnit || fee.time_unit,
      feeType: fee.feeType || fee.fee_type,
    };
  }
  return null;
};

// Helper to get processing time value (checks direct fields, processingTime string, and processingFee object)
const getProcessingTimeValueFromApp = (app: Application): number | undefined => {
  // First check direct numeric fields
  if (app.processingTimeValue) return app.processingTimeValue;
  if (app.processing_time_value) return app.processing_time_value;
  // Then check combined processingTime string (e.g., "5 days")
  const parsed = parseProcessingTimeString(app.processingTime || app.processing_time);
  if (parsed) return parsed.value;
  // Finally check processingFee object
  const feeObj = getProcessingFeeObject(app);
  if (feeObj?.timeValue) return feeObj.timeValue;
  return undefined;
};

const getProcessingTimeUnitFromApp = (app: Application): string | undefined => {
  // First check direct fields
  if (app.processingTimeUnit) return app.processingTimeUnit;
  if (app.processing_time_unit) return app.processing_time_unit;
  // Then check combined processingTime string (e.g., "5 days")
  const parsed = parseProcessingTimeString(app.processingTime || app.processing_time);
  if (parsed) return parsed.unit;
  // Finally check processingFee object
  const feeObj = getProcessingFeeObject(app);
  if (feeObj?.timeUnit) return feeObj.timeUnit;
  return undefined;
};

const getProcessingTypeFromApp = (app: Application): string | undefined => {
  // First check direct fields
  if (app.processingType) return app.processingType;
  if (app.processing_type) return app.processing_type;
  // Then check processingFee object for feeType
  const feeObj = getProcessingFeeObject(app);
  if (feeObj?.feeType) return feeObj.feeType;
  return undefined;
};

const hasProcessingTime = (app: Application): boolean => {
  // First check if processingTime string is provided directly
  const parsedTimeStr = parseProcessingTimeString(app.processingTime || app.processing_time);
  if (parsedTimeStr) {
    return true;
  }

  const timeValue = getProcessingTimeValueFromApp(app);
  const timeUnit = getProcessingTimeUnitFromApp(app);
  const procType = getProcessingTypeFromApp(app);

  // Check if explicit time value is provided
  if (timeValue && timeUnit) {
    return true;
  }
  // Check if processing type/feeType is set (not empty/null/undefined)
  if (procType && procType.trim() !== '') {
    return true;
  }
  return false;
};

const getProcessingTimeInDays = (app: Application): number => {
  const timeValue = getProcessingTimeValueFromApp(app);
  const timeUnit = getProcessingTimeUnitFromApp(app);
  const procType = getProcessingTypeFromApp(app);

  // If explicit time value is provided, use it
  if (timeValue && timeUnit) {
    if (timeUnit === 'hours') {
      return timeValue / 24;
    }
    return timeValue;
  }

  // If processing type/feeType is set, use default values
  if (procType && procType.trim() !== '') {
    const processingType = procType.toLowerCase();
    switch (processingType) {
      case 'super-rush':
        return 1; // 1 day (24 hours)
      case 'rush':
        return 3; // 3 days
      case 'standard':
        return 7; // 7 days
      default:
        return 7; // Default to standard if unknown type
    }
  }

  // No processing time set - return large number for sorting (puts them at the end)
  return 999;
};

const formatProcessingTime = (app: Application): string => {
  // If no processing time is set, return "-"
  if (!hasProcessingTime(app)) {
    return '-';
  }

  const timeValue = getProcessingTimeValueFromApp(app);
  const timeUnit = getProcessingTimeUnitFromApp(app);
  const procType = getProcessingTypeFromApp(app);

  // If explicit time value is provided, format it
  if (timeValue && timeUnit) {
    if (timeUnit === 'hours') {
      return timeValue === 1 ? '1 Hour' : `${timeValue} Hours`;
    }
    return timeValue === 1 ? '1 Day' : `${timeValue} Days`;
  }

  // Fall back to default display based on processing type
  const processingType = (procType || '').toLowerCase();
  switch (processingType) {
    case 'super-rush':
      return '1 Day';
    case 'rush':
      return '3 Days';
    case 'standard':
      return '7 Days';
    default:
      return '-';
  }
};

const getProcessingTimePillClasses = (app: Application): string => {
  // If no processing time is set, return neutral styling
  if (!hasProcessingTime(app)) {
    return 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400';
  }

  const days = getProcessingTimeInDays(app);

  if (days <= 1) {
    return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'; // Fastest
  } else if (days <= 3) {
    return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'; // Medium
  } else {
    return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'; // Standard
  }
};

const toggleColumnsDropdown = () => {
  columnsDropdownOpen.value = !columnsDropdownOpen.value;
};

const toggleSortDropdown = () => {
  sortDropdownOpen.value = !sortDropdownOpen.value;
};

const setSortOption = (option: typeof sortOption.value) => {
  sortOption.value = option;
  sortDropdownOpen.value = false;
};

// Kanban helper functions
const normalizeStatus = (status: string): string => {
  if (!status) {
    console.log('⚠️ No status provided, defaulting to pending');
    return 'pending';
  }
  
  const statusLower = status.toLowerCase().replace(/\s+/g, '_');
  
  // Map various status formats to our 4 kanban columns:
  // - pending: New submissions, Additional Info Required
  // - in_process: Processing, In Review, Resubmission, etc.
  // - completed: Approved, Accepted, Active, Completed
  // - rejected: Rejected, Declined
  const statusMap: Record<string, string> = {
    // PENDING
    'pending': 'pending',
    'submitted': 'pending',
    'new': 'pending',
    'additional_info_required': 'pending',
    'additional info required': 'pending',
    
    // IN PROCESS
    'in_process': 'in_process',
    'in process': 'in_process',
    'inprocess': 'in_process',
    'processing': 'in_process',
    'in_review': 'in_process',
    'in review': 'in_process',
    'inreview': 'in_process',
    'review': 'in_process',
    'resubmission': 'in_process',
    'resubmission_required': 'in_process',
    'on_hold': 'in_process',
    'on hold': 'in_process',
    'onhold': 'in_process',
    'hold': 'in_process',
    'under_review': 'in_process',
    'under review': 'in_process',
    
    // COMPLETED
    'completed': 'completed',
    'approved': 'completed',
    'accept': 'completed',
    'accepted': 'completed',
    'active': 'completed',
    'done': 'completed',
    'finished': 'completed',
    'issued': 'completed',
    
    // REJECTED
    'rejected': 'rejected',
    'reject': 'rejected',
    'declined': 'rejected',
    'denied': 'rejected',
    'cancelled': 'rejected',
    'canceled': 'rejected',
  };
  
  const mapped = statusMap[statusLower] || statusLower;
  
  // Log unmapped statuses for debugging
  if (!statusMap[statusLower] && !['pending', 'in_process', 'completed', 'rejected'].includes(mapped)) {
    console.log(`⚠️ Unknown status "${status}" (normalized: "${statusLower}"), using as-is:`, mapped);
  }
  
  return mapped;
};

// Helper to get date from application (try multiple field names)
const getApplicationDate = (app: Application): Date | null => {
  const dateStr = app.createdAt || app.created_at || app.created;
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
};

// Helper to extract numeric ID from application ID string (e.g., "VAP-2025-000024" -> 24)
const getNumericId = (app: Application): number => {
  const appId = getApplicationId(app);
  // Extract the last number from the ID string
  const match = appId.match(/(\d+)$/);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  // Fallback to raw id if available
  if (typeof app.id === 'number') return app.id;
  if (typeof app.id === 'string') return parseInt(app.id, 10) || 0;
  return 0;
};


// Sort function that uses current sortOption
const sortApplications = (apps: Application[]): Application[] => {
  const sorted = [...apps].sort((a: Application, b: Application) => {
    switch (sortOption.value) {
      case 'date_desc':
        // Latest first (newest dates first)
        const dateA = getApplicationDate(a);
        const dateB = getApplicationDate(b);
        
        // Handle missing dates by putting them at the end
        if (!dateA && !dateB) {
          // Both missing dates - sort by ID (highest first)
          return getNumericId(b) - getNumericId(a);
        }
        if (!dateA) return 1;
        if (!dateB) return -1;
        
        // Compare dates
        const dateDiff = dateB.getTime() - dateA.getTime();
        
        // If dates are equal, sort by ID (highest first for latest)
        if (dateDiff === 0) {
          return getNumericId(b) - getNumericId(a);
        }
        
        return dateDiff;
      
      case 'date_asc':
        // Oldest first
        const dateA_asc = getApplicationDate(a);
        const dateB_asc = getApplicationDate(b);
        
        // Handle missing dates by putting them at the end
        if (!dateA_asc && !dateB_asc) {
          // Both missing dates - sort by ID (lowest first)
          return getNumericId(a) - getNumericId(b);
        }
        if (!dateA_asc) return 1;
        if (!dateB_asc) return -1;
        
        // Compare dates
        const dateDiff_asc = dateA_asc.getTime() - dateB_asc.getTime();
        
        // If dates are equal, sort by ID (lowest first for oldest)
        if (dateDiff_asc === 0) {
          return getNumericId(a) - getNumericId(b);
        }
        
        return dateDiff_asc;
      
      case 'amount_desc':
        // High to low
        const amountA = parseFloat(
          String(a.totalAmount || a.price || a.totalPrice || a.processingFee || '0')
        );
        const amountB = parseFloat(
          String(b.totalAmount || b.price || b.totalPrice || b.processingFee || '0')
        );

        const amountDiff = amountB - amountA;

        // If amounts are equal, sort by ID (highest first)
        if (amountDiff === 0) {
          return getNumericId(b) - getNumericId(a);
        }

        return amountDiff;

      case 'processing_fast':
        // Fastest processing first (lowest days first)
        const daysA_fast = getProcessingTimeInDays(a);
        const daysB_fast = getProcessingTimeInDays(b);

        const daysDiff_fast = daysA_fast - daysB_fast;

        // If processing days are equal, sort by date (latest first)
        if (daysDiff_fast === 0) {
          const dateA_fast = getApplicationDate(a);
          const dateB_fast = getApplicationDate(b);
          if (dateA_fast && dateB_fast) {
            return dateB_fast.getTime() - dateA_fast.getTime();
          }
          return getNumericId(b) - getNumericId(a);
        }

        return daysDiff_fast;

      case 'processing_slow':
        // Slowest processing first (highest days first)
        const daysA_slow = getProcessingTimeInDays(a);
        const daysB_slow = getProcessingTimeInDays(b);

        const daysDiff_slow = daysB_slow - daysA_slow;

        // If processing days are equal, sort by date (latest first)
        if (daysDiff_slow === 0) {
          const dateA_slow = getApplicationDate(a);
          const dateB_slow = getApplicationDate(b);
          if (dateA_slow && dateB_slow) {
            return dateB_slow.getTime() - dateA_slow.getTime();
          }
          return getNumericId(b) - getNumericId(a);
        }

        return daysDiff_slow;

      default:
        return 0;
    }
  });
  
  return sorted;
};

// Create computed properties for each status - this makes it reactive
const sortedApplicationsByStatus = computed(() => {
  const result: Record<string, Application[]> = {
    pending: [],
    in_process: [],
    completed: [],
    rejected: [],
  };

  
  // Filter applications by status
  filteredApplications.value.forEach((app: Application) => {
    const normalizedStatus = normalizeStatus(app.status || 'pending');
    if (result[normalizedStatus]) {
      result[normalizedStatus].push(app);
    }
  });

  // Sort each status group
  Object.keys(result).forEach((status) => {
    const apps = result[status];
    if (apps) {
      result[status] = sortApplications(apps);
    }
  });

  return result;
});

const getApplicationsByStatus = (status: string): Application[] => {
  const apps = sortedApplicationsByStatus.value[status];
  return apps || [];
};

const getStatusCount = (status: string) => {
  return getApplicationsByStatus(status).length;
};

const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } catch {
    return '-';
  }
};

// Auto-scroll functions
const startHorizontalScroll = (direction: 'left' | 'right') => {
  if (horizontalScrollInterval) return; // Already scrolling
  
  horizontalScrollInterval = setInterval(() => {
    if (!kanbanContainer.value) return;
    
    const scrollAmount = direction === 'left' ? -SCROLL_SPEED : SCROLL_SPEED;
    kanbanContainer.value.scrollLeft += scrollAmount;
  }, 16); // ~60fps
};

const stopHorizontalScroll = () => {
  if (horizontalScrollInterval) {
    clearInterval(horizontalScrollInterval);
    horizontalScrollInterval = null;
  }
};

const startVerticalScroll = (columnStatus: string, direction: 'up' | 'down') => {
  if (verticalScrollInterval) return; // Already scrolling
  
  const columnScroll = columnScrollRefs.value[columnStatus];
  if (!columnScroll) return;
  
  verticalScrollInterval = setInterval(() => {
    if (!columnScroll) return;
    
    const scrollAmount = direction === 'up' ? -SCROLL_SPEED : SCROLL_SPEED;
    columnScroll.scrollTop += scrollAmount;
  }, 16); // ~60fps
};

const stopVerticalScroll = () => {
  if (verticalScrollInterval) {
    clearInterval(verticalScrollInterval);
    verticalScrollInterval = null;
  }
};

const handleKanbanDragOver = (event: DragEvent) => {
  if (!kanbanContainer.value || !draggedApplication.value) {
    stopHorizontalScroll();
    stopVerticalScroll();
    return;
  }
  
  const containerRect = kanbanContainer.value.getBoundingClientRect();
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  
  // Horizontal auto-scroll (left/right edges of kanban container)
  const distanceFromLeft = mouseX - containerRect.left;
  const distanceFromRight = containerRect.right - mouseX;
  
  if (distanceFromLeft < SCROLL_THRESHOLD) {
    startHorizontalScroll('left');
  } else if (distanceFromRight < SCROLL_THRESHOLD) {
    startHorizontalScroll('right');
  } else {
    stopHorizontalScroll();
  }
  
  // Vertical auto-scroll (find which column we're over)
  const currentDragOverStatus = isDragOver.value;
  if (currentDragOverStatus) {
    const columnScroll = columnScrollRefs.value[currentDragOverStatus];
    if (columnScroll) {
      const columnRect = columnScroll.getBoundingClientRect();
      const distanceFromTop = mouseY - columnRect.top;
      const distanceFromBottom = columnRect.bottom - mouseY;
      
      if (distanceFromTop < SCROLL_THRESHOLD) {
        startVerticalScroll(currentDragOverStatus, 'up');
      } else if (distanceFromBottom < SCROLL_THRESHOLD) {
        startVerticalScroll(currentDragOverStatus, 'down');
      } else {
        stopVerticalScroll();
      }
    }
  }
};

// Helper function to handle status change
const handleStatusChange = async (application: Application, targetStatus: string) => {
  const currentStatus = normalizeStatus(application.status || 'pending');
  
  console.log('📊 Current status:', currentStatus, '-> Target status:', targetStatus);
  
  // Don't update if status is the same
  if (currentStatus === targetStatus) {
    console.log('ℹ️ Status unchanged, no update needed');
    return;
  }
  
  try {
    console.log('🔄 Updating application status...');
    
    // Update status via API
    await updateApplicationStatus(application.id, targetStatus);
    
    // Update local state
    const index = applications.value.findIndex((app: Application) => app.id === application.id);
    if (index !== -1 && applications.value[index]) {
      applications.value[index].status = targetStatus;
      console.log('✅ Application status updated successfully');
      
      // Show success message
      const statusLabel = kanbanStatuses.find(s => s.value === targetStatus)?.label || targetStatus;
      showSuccessToast(`Application moved to ${statusLabel}`);
    }
  } catch (error) {
    console.error('❌ Failed to update application status:', error);
    showErrorToast('Failed to update application status. Please try again.');
  }
};

// Touch drag state
const touchDragState = ref<{
  application: Application | null;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
} | null>(null);

// Touch drag handlers for mobile
const onTouchStart = (event: TouchEvent, application: Application) => {
  if (event.touches.length !== 1) return;
  
  const touch = event.touches[0];
  if (!touch) return;
  
  touchDragState.value = {
    application,
    startX: touch.clientX,
    startY: touch.clientY,
    currentX: touch.clientX,
    currentY: touch.clientY
  };
  
  draggedApplication.value = application;
  console.log('👆 Touch drag started for application:', application.id);
};

const onTouchMove = (event: TouchEvent) => {
  if (!touchDragState.value || event.touches.length !== 1) return;
  
  event.preventDefault();
  const touch = event.touches[0];
  if (!touch) return;
  
  touchDragState.value.currentX = touch.clientX;
  touchDragState.value.currentY = touch.clientY;
  
  // Find which column we're over
  const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
  const columnElement = elements.find(el => {
    const status = el.getAttribute('data-status');
    return status && kanbanStatuses.some(s => s.value === status);
  });
  
  if (columnElement) {
    const status = columnElement.getAttribute('data-status');
    if (status && isDragOver.value !== status) {
      isDragOver.value = status;
    }
  }
  
  // Handle auto-scroll
  if (kanbanContainer.value) {
    const containerRect = kanbanContainer.value.getBoundingClientRect();
    const mouseX = touch.clientX;
    const distanceFromLeft = mouseX - containerRect.left;
    const distanceFromRight = containerRect.right - mouseX;
    
    if (distanceFromLeft < SCROLL_THRESHOLD) {
      startHorizontalScroll('left');
    } else if (distanceFromRight < SCROLL_THRESHOLD) {
      startHorizontalScroll('right');
    } else {
      stopHorizontalScroll();
    }
  }
};

const onTouchEnd = (event: TouchEvent) => {
  if (!touchDragState.value) return;
  
  const touchState = touchDragState.value;
  const moved = Math.abs(touchState.currentX - touchState.startX) > 10 || Math.abs(touchState.currentY - touchState.startY) > 10;
  
  if (moved && isDragOver.value && touchState.application) {
    // Simulate drop
    const targetStatus = isDragOver.value;
    handleStatusChange(touchState.application, targetStatus);
  }
  
  touchDragState.value = null;
  draggedApplication.value = null;
  isDragOver.value = null;
  stopHorizontalScroll();
  stopVerticalScroll();
};

// Drag and drop handlers
const onDragStart = (event: DragEvent, application: Application) => {
  console.log('🎯 Drag started for application:', application.id);
  draggedApplication.value = application;
  
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    // Set data for compatibility
    event.dataTransfer.setData('text/plain', application.id.toString());
  }
};

const onDragEnd = (event: DragEvent) => {
  console.log('🏁 Drag ended');
  draggedApplication.value = null;
  isDragOver.value = null;
  // Stop all auto-scrolling
  stopHorizontalScroll();
  stopVerticalScroll();
};

const onDragOver = (event: DragEvent, targetStatus: string) => {
  event.preventDefault();
  event.stopPropagation();
  
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
  
  // Update visual feedback
  if (isDragOver.value !== targetStatus) {
    isDragOver.value = targetStatus;
  }
  
  // Handle auto-scroll for this column
  if (draggedApplication.value) {
    const columnScroll = columnScrollRefs.value[targetStatus];
    if (columnScroll) {
      const columnRect = columnScroll.getBoundingClientRect();
      const mouseY = event.clientY;
      const distanceFromTop = mouseY - columnRect.top;
      const distanceFromBottom = columnRect.bottom - mouseY;
      
      if (distanceFromTop < SCROLL_THRESHOLD) {
        startVerticalScroll(targetStatus, 'up');
      } else if (distanceFromBottom < SCROLL_THRESHOLD) {
        startVerticalScroll(targetStatus, 'down');
      } else {
        // Only stop vertical scroll if we're not near any edge
        const kanbanContainerEl = kanbanContainer.value;
        if (kanbanContainerEl) {
          const containerRect = kanbanContainerEl.getBoundingClientRect();
          const mouseX = event.clientX;
          const distanceFromLeft = mouseX - containerRect.left;
          const distanceFromRight = containerRect.right - mouseX;
          
          if (distanceFromLeft >= SCROLL_THRESHOLD && distanceFromRight >= SCROLL_THRESHOLD) {
            stopVerticalScroll();
          }
        }
      }
    }
  }
};

const onDragLeave = (event: DragEvent) => {
  // Only clear if leaving the column completely
  const target = event.currentTarget as HTMLElement;
  const relatedTarget = event.relatedTarget as HTMLElement;
  
  if (!target.contains(relatedTarget)) {
    isDragOver.value = null;
  }
};

const onDrop = async (event: DragEvent, targetStatus: string) => {
  event.preventDefault();
  event.stopPropagation();
  
  console.log('📦 Drop event triggered for status:', targetStatus);
  
  isDragOver.value = null;
  // Stop all auto-scrolling on drop
  stopHorizontalScroll();
  stopVerticalScroll();
  
  if (!draggedApplication.value) {
    console.log('⚠️ No dragged application found');
    return;
  }
  
  const application = draggedApplication.value;
  await handleStatusChange(application, targetStatus);
  draggedApplication.value = null;
};

// Toast notification functions
const showSuccessToast = (message: string) => {
  // Create a simple toast notification
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-up';
  toast.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

const showErrorToast = (message: string) => {
  // Create a simple error toast notification
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-up';
  toast.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

// Navigation functions
const router = useRouter();

const viewApplication = (application: Application) => {
  router.push(`/dashboard/applications/${application.id}`);
};

const editApplication = (application: Application) => {
  router.push(`/dashboard/applications/add?id=${application.id}&mode=edit`);
};

// Watch for select all changes
watch(selectAll, (newValue) => {
  applications.value.forEach((application: Application) => {
    application.selected = newValue;
  });
});

// Close dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    columnsDropdownOpen.value = false;
    sortDropdownOpen.value = false;
  }
};

// Load applications on mount
onMounted(() => {
  loadApplications();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  // Cleanup scroll intervals
  stopHorizontalScroll();
  stopVerticalScroll();
  document.removeEventListener('click', handleClickOutside);
});

onActivated(() => {
  loadApplications();
});
</script>
