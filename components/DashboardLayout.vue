<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#09090B]">
    <!-- Mobile Menu Button -->
    <button
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      style="display: none"
    >
      <PanelLeft class="h-6 w-6" />
    </button>

    <!-- Mobile Backdrop -->
    <div
      v-if="!sidebarCollapsed"
      @click="toggleSidebar"
      class="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
    ></div>

    <!-- Sidebar -->
    <div
      :class="sidebarClasses"
      class="fixed inset-y-0 left-0 z-40 bg-[#f4f4f6] dark:bg-[#18181B] border-none shadow-none transition-all duration-300 ease-in-out"
    >
      <!-- Logo -->
      <div
        class="flex h-16 items-center border-b border-none"
        :class="sidebarCollapsed ? 'px-2 justify-center' : 'px-2 sm:px-4'"
      >
        <div
          class="flex items-center"
          :class="sidebarCollapsed ? 'justify-center w-full' : ''"
        >
          <img
            :class="sidebarCollapsed ? 'h-8 w-8' : 'h-8 w-auto'"
            src="/logo/logoname.svg"
            alt="iVisa"
          />
        </div>
      </div>

      <!-- Navigation -->
      <nav :class="sidebarCollapsed ? 'px-2' : 'px-2'" style="padding: 10px">
        <div class="space-y-1">
          <!-- Dashboard -->
          <a
            href="/dashboard"
            class="group flex items-center py-2 text-sm font-medium rounded-md transition-colors text-gray-700 dark:hover:bg-[#2F2F31] dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
            :class="[
              sidebarCollapsed ? 'justify-center px-2' : 'px-3',
              isDashboardActive ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' : ''
            ]"
          >
            <Dashboard class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
            <span v-show="!sidebarCollapsed" class="truncate">Dashboard</span>
          </a>

          <!-- Countries -->
          <div v-if="isSuperAdmin() || hasPermission('countries')">
            <button
              @click="toggleCountries"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="[
                sidebarCollapsed ? 'justify-center px-2' : 'px-3',
              ]"
            >
              <Countries class="h-4 w-4 " :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Countries</span>
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="countriesOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 transform -translate-y-2"
              enter-to-class="opacity-100 transform translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 transform translate-y-0"
              leave-to-class="opacity-0 transform -translate-y-2"
            >
              <div
                v-if="countriesOpen && !sidebarCollapsed"
                class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
              >
              <a
                href="/dashboard/countries"
                :class="[
                  'block px-3 py-1.5 text-sm transition-colors',
                  isCountriesListActive 
                    ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
                ]"
                style="border-radius: 5px"
                >List of Countries</a
              >
              <a
                href="/dashboard/countries/add"
                :class="[
                  'block px-3 py-1.5 text-sm transition-colors',
                  isCountriesAddActive 
                    ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
                ]"
                style="border-radius: 5px"
                >Add Country</a
              >
              </div>
            </Transition>
          </div>

          <!-- Visa Products -->
          <div v-if="isSuperAdmin() || hasPermission('visaProducts')">
            <button
              @click="toggleVisaproducts"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="[
                sidebarCollapsed ? 'justify-center px-2' : 'px-3',
              ]"
            >
              <VisaProducts class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate"
                >Visa Products</span
              >
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="visaproductsOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 transform -translate-y-2"
              enter-to-class="opacity-100 transform translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 transform translate-y-0"
              leave-to-class="opacity-0 transform -translate-y-2"
            >
              <div
                v-if="visaproductsOpen && !sidebarCollapsed"
                class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
              >
              <a
                href="/dashboard/visaproducts"
                :class="[
                  'block px-3 py-1.5 text-sm transition-colors',
                  isVisaproductsListActive 
                    ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
                ]"
                style="border-radius: 5px"
                >List of Visa Products</a
              >
              <a
                href="/dashboard/visaproducts/add"
                :class="[
                  'block px-3 py-1.5 text-sm transition-colors',
                  isVisaproductsAddActive 
                    ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
                ]"
                style="border-radius: 5px"
                >Add Visa Product</a
              >
              </div>
            </Transition>
          </div>

          <!-- Nationalities -->
          <div v-if="isSuperAdmin() || hasPermission('nationalities')">
            <button
              @click="toggleNationalities"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="[
                sidebarCollapsed ? 'justify-center px-2' : 'px-3',
              ]"
            >
              <Nationalities class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate"
                >Nationalities</span
              >
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="nationalitiesOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 transform -translate-y-2"
              enter-to-class="opacity-100 transform translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 transform translate-y-0"
              leave-to-class="opacity-0 transform -translate-y-2"
            >
              <div
                v-if="nationalitiesOpen && !sidebarCollapsed"
                class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
              >
              <a
                href="/dashboard/nationalities"
                :class="[
                  'block px-3 py-1.5 text-sm transition-colors',
                  isNationalitiesListActive 
                    ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
                ]"
                style="border-radius: 5px"
                >List of Nationalities</a
              >
              <a
                href="/dashboard/nationalities/add"
                :class="[
                  'block px-3 py-1.5 text-sm transition-colors',
                  isNationalitiesAddActive 
                    ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
                ]"
                style="border-radius: 5px"
                >Add Nationality</a
              >
              </div>
            </Transition>
          </div>

          

          <!-- Embassies -->
          <div v-if="isSuperAdmin() || hasPermission('embassies')">
            <button
              @click="toggleEmbassies"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="[
                sidebarCollapsed ? 'justify-center px-2' : 'px-3',
              ]"
            >
              <Embassies class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Embassies</span>
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="embassiesOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 transform -translate-y-2"
              enter-to-class="opacity-100 transform translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 transform translate-y-0"
              leave-to-class="opacity-0 transform -translate-y-2"
            >
              <div
                v-if="embassiesOpen && !sidebarCollapsed"
                class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
              >
              <a
                href="/dashboard/embassies"
                :class="[
                  'block px-3 py-1.5 text-sm transition-colors',
                  isEmbassiesListActive 
                    ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
                ]"
                style="border-radius: 5px"
                >List of Embassies</a
              >
              <a
                href="/dashboard/embassies/add"
                :class="[
                  'block px-3 py-1.5 text-sm transition-colors',
                  isEmbassiesAddActive 
                    ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
                ]"
                style="border-radius: 5px"
                >Add Embassy</a
              >
              </div>
            </Transition>
          </div>


          <!-- Coupons -->
<div v-if="isSuperAdmin() || hasPermission('coupons')">
  <button
    @click="toggleCoupons"
    class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
    :class="[
      sidebarCollapsed ? 'justify-center px-2' : 'px-3',
    ]"
  >
    <Coupons class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
    <span v-show="!sidebarCollapsed" class="truncate">Coupons</span>
    <ChevronDown
      v-show="!sidebarCollapsed"
      :class="couponsOpen ? 'rotate-180' : ''"
      class="ml-auto h-4 w-4 transition-transform"
    />
  </button>

  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform -translate-y-2"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform -translate-y-2"
  >
    <div
      v-if="couponsOpen && !sidebarCollapsed"
      class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
    >
      <a
        href="/dashboard/coupons"
        :class="[
          'block px-3 py-1.5 text-sm transition-colors',
          isCouponsListActive 
            ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
            : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
        ]"
        style="border-radius: 5px"
      >
        List of Coupons
      </a>
      <a
        href="/dashboard/coupons/add"
        :class="[
          'block px-3 py-1.5 text-sm transition-colors',
          isCouponsAddActive 
            ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
            : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
        ]"
        style="border-radius: 5px"
      >
        Add Coupon
      </a>
    </div>
  </Transition>
          </div>

          <!-- Additional Info -->
          <div v-if="isSuperAdmin() || hasPermission('additionalInfo')">
            <button
              @click="toggleAdditionalInfo"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="[
                sidebarCollapsed ? 'justify-center px-2' : 'px-3',
              ]"
            >
              <AdditionalInfo class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Additional Info</span>
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="additionalInfoOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 transform -translate-y-2"
              enter-to-class="opacity-100 transform translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 transform translate-y-0"
              leave-to-class="opacity-0 transform -translate-y-2"
            >
              <div
                v-if="additionalInfoOpen && !sidebarCollapsed"
                class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
              >
              <a
                href="/dashboard/additional-info"
                :class="[
                  'block px-3 py-1.5 text-sm transition-colors',
                  isAdditionalInfoListActive 
                    ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
                ]"
                style="border-radius: 5px"
                >List of Forms</a
              >
              <a
                href="/dashboard/additional-info/add"
                :class="[
                  'block px-3 py-1.5 text-sm transition-colors',
                  isAdditionalInfoAddActive 
                    ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
                ]"
                style="border-radius: 5px"
                >Add New</a
              >
              </div>
            </Transition>
          </div>

          

          <!-- Customers -->
          <div v-if="isSuperAdmin() || hasPermission('customers')">
            <a
              href="/dashboard/customers"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="[
                sidebarCollapsed ? 'justify-center px-2' : 'px-3',
                isCustomersActive ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' : ''
              ]"
            >
                <Customers class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Customers</span>
            </a>
          </div>

          <!-- Applications -->
          <div v-if="isSuperAdmin() || hasPermission('applications')">
            <a
              href="/dashboard/applications"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="[
                sidebarCollapsed ? 'justify-center px-2' : 'px-3',
                isApplicationsActive ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' : ''
              ]"
            >
              <Applications class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate"
                >Applications</span
              >
            </a>
          </div>

          <!-- Finances -->
          <div v-if="isSuperAdmin() || hasPermission('finances')">
            <a
              href="/dashboard/finances"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="[
                sidebarCollapsed ? 'justify-center px-2' : 'px-3',
                isFinancesActive ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' : ''
              ]"
            >
              <Finances class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Finances</span>
            </a>
          </div>

          <!-- Users (Only for Super Admins) -->
          <div v-if="isSuperAdmin()">
            <button
              @click="toggleUsers"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="[
                sidebarCollapsed ? 'justify-center px-2' : 'px-3',
              ]"
            >
              <UsersIcon class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Users</span>
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="usersOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 transform -translate-y-2"
              enter-to-class="opacity-100 transform translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 transform translate-y-0"
              leave-to-class="opacity-0 transform -translate-y-2"
            >
              <div
                v-if="usersOpen && !sidebarCollapsed"
                class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
              >
              <a
                href="/dashboard/users"
                :class="[
                  'block px-3 py-1.5 text-sm transition-colors',
                  isUsersListActive 
                    ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
                ]"
                style="border-radius: 5px"
                >List of Users</a
              >
              <a
                href="/dashboard/users/add"
                :class="[
                  'block px-3 py-1.5 text-sm transition-colors',
                  isUsersAddActive 
                    ? 'bg-[#DCDCDE] dark:bg-[#2F2F31] text-gray-900 dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]'
                ]"
                style="border-radius: 5px"
                >Add User</a
              >
              </div>
            </Transition>
          </div>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div
      :class="sidebarCollapsed ? 'pl-2 lg:pl-16' : 'pl-2 lg:pl-64'"
      class="h-screen p-2 transition-all duration-300 dark:bg-[#18181B] bg-[#f4f4f6]  dark:border-gray-700 border border-gray-200"
    >
      <!-- Top Header -->

        <header
          class="bg-[#FFFFFF] dark:bg-[#09090B] border shadow-sm border-[#e4e4e8] rounded-t-xl dark:border-gray-800"
        >
          <div
            class="flex h-14 items-center justify-between px-3 sm:px-4 lg:px-6 border-b border-gray-200 dark:border-gray-800"
          >
            <!-- Left side - Sidebar Toggle and Search -->
            <div class="flex items-center space-x-4">
              <button
                @click="toggleSidebar"
                class="p-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31]"
                style="border-radius: 5px"
                :title="
                  sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
                "
              >
                <PanelLeft
                  :class="
                    sidebarCollapsed
                      ? 'h-5 w-5 text-gray-600 dark:text-gray-300 rotate-180'
                      : 'h-5 w-5 text-gray-600 dark:text-gray-300'
                  "
                />
              </button>
              <label style="color: #e4e4e8">|</label>
              <!-- Search Box -->
              <div class="relative hidden md:block">
                <div
                  class="flex items-center bg-white dark:bg-[#18181B] w-[380px] h-[35px] border border-gray-300 dark:border-gray-700 px-3 py-2 w-80"
                  style="border-radius: 7px"
                >
                  <Search
                    class="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    class="flex-1 h-[36px] bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none"
                  />
                  <button
                    class="bg-gray-200 dark:bg-[#18181B] text-gray-600 dark:text-gray-300 px-2 py-1 text-xs font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    style="border-radius: 7px"
                  >
                    ⌘K
                  </button>
                </div>
              </div>
            </div>

            <!-- Right side - Icons -->
            <div class="flex items-center space-x-1 sm:space-x-2">
              <!-- Theme Toggle -->
              <div class="relative">
                <button
                  @click="toggleTheme"
                  class="p-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31]"
                  style="border-radius: 5px"
                >
                  <Sun
                    v-if="!isDarkMode"
                    class="sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300"
                    style="height: 15px; width: 15px"
                  />
                  <Moon
                    v-else
                    class="sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300"
                    style="height: 15px; width: 15px"
                  />
                </button>
              </div>
              <!-- Settings -->
              <div class="relative">
             

                <!-- Settings Dropdown -->
                <div
                  v-if="settingsDropdownOpen"
                  class="absolute right-0 z-10 mt-2 w-80 bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
                  style="border-radius: 5px"
                >
                  <!-- Theme Preset -->
                  <div class="px-4 py-2 border-none">
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-white mb-3"
                      >Theme preset:</label
                    >
                    <div class="relative">
                      <button
                        @click.stop="toggleThemeDropdown"
                        class="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#18181B] text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#18181B]"
                        style="border-radius: 5px; height: 36px"
                      >
                        <div class="flex items-center">
                          <div
                            class="w-3 h-3 rounded-full mr-2"
                            :style="{
                              backgroundColor: getSelectedThemeColor(),
                            }"
                          ></div>
                          <span>{{ selectedTheme }}</span>
                        </div>
                        <ChevronDown class="h-4 w-4 text-gray-400" />
                      </button>

                      <!-- Custom Dropdown -->
                      <div
                        v-if="themeDropdownOpen"
                        @click.stop
                        class="absolute left-0 right-0 z-10 mt-2 bg-white dark:bg-[#18181B] border border-gray-200 dark:border-gray-600 rounded-md shadow-lg"
                        style="border-radius: 5px"
                      >
                        <div class="py-1">
                          <button
                            v-for="theme in themeOptions"
                            :key="theme.value"
                            @click.stop="
                              setTheme(theme.label);
                              themeDropdownOpen = false;
                            "
                            :class="[
                              'w-full flex items-center justify-between px-3 py-2 text-sm text-left text-gray-900 dark:text-white',
                              selectedTheme === theme.label
                                ? 'bg-gray-100 dark:bg-[#18181B]'
                                : 'hover:bg-gray-50 dark:hover:bg-[#18181B]',
                            ]"
                          >
                            <div class="flex items-center">
                              <div
                                class="w-3 h-3 rounded-full mr-2"
                                :style="{ backgroundColor: theme.color }"
                              ></div>
                              <span>{{ theme.label }}</span>
                            </div>
                            <div
                              v-if="selectedTheme === theme.label"
                              class="text-gray-600"
                            >
                              <svg
                                class="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Scale -->
                  <div class="px-4 py-2 border-none">
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-white mb-3"
                      >Scale:</label
                    >
                    <div
                      class="flex gap-2 justify-center dark:text-white dark:bg-[#09090B]"
                    >
                      <button
                        v-for="scale in scaleOptions"
                        :key="scale.value"
                        @click="selectedScale = scale.value"
                        :class="[
                          'px-3 py-2 text-sm border transition-colors flex items-center justify-center flex-1 dark:text-white dark:bg-[#18181B] dark:border-gray-600',
                          selectedScale === scale.value
                            ? 'bg-gray-100 border-gray-300 text-gray-900 dark:text-white'
                            : 'bg-white border-gray-300 text-gray-700 dark:text-white hover:bg-gray-50',
                        ]"
                        :style="{
                          'border-radius': '5px',
                          height: '36px',
                        }"
                      >
                        <span v-if="scale.value === 'none'" class="text-lg"
                          >⊘</span
                        >
                        <span v-else>{{ scale.label }}</span>
                      </button>
                    </div>
                  </div>

                  <!-- Radius -->
                  <div class="px-4 py-2 border-none">
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-white mb-3"
                      >Radius:</label
                    >
                    <div class="flex gap-2 justify-center">
                      <button
                        v-for="radius in radiusOptions"
                        :key="radius.value"
                        @click="selectedRadius = radius.value"
                        :class="[
                          'px-3 py-2 text-sm border transition-colors flex items-center justify-center flex-1 dark:text-white dark:bg-[#18181B] dark:border-gray-600',
                          selectedRadius === radius.value
                            ? 'bg-gray-100 border-gray-300 text-gray-900 dark:text-white'
                            : 'bg-white border-gray-300 text-gray-700 dark:text-white hover:bg-gray-50',
                        ]"
                        :style="{
                          'border-radius': '5px',
                          height: '36px',
                        }"
                      >
                        <span v-if="radius.value === 'none'" class="text-lg"
                          >⊘</span
                        >
                        <span v-else>{{ radius.label }}</span>
                      </button>
                    </div>
                  </div>

                  <!-- Color Mode -->
                  <div class="px-4 py-2 border-none">
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-white mb-3"
                      >Color mode:</label
                    >
                    <div class="flex gap-2 justify-center">
                      <button
                        v-for="mode in colorModes"
                        :key="mode.value"
                        @click="selectedColorMode = mode.value"
                        :class="[
                          'px-3 py-2 text-sm border transition-colors flex items-center justify-center flex-1 dark:text-white dark:bg-[#18181B] dark:border-gray-600',
                          selectedColorMode === mode.value
                            ? 'bg-gray-100 border-gray-300 text-gray-900 dark:text-white'
                            : 'bg-white border-gray-300 text-gray-700 dark:text-white hover:bg-gray-50',
                        ]"
                        :style="{
                          'border-radius': '5px',
                          height: '36px',
                        }"
                      >
                        {{ mode.label }}
                      </button>
                    </div>
                  </div>

                  <!-- Content Layout -->
                  <div class="px-4 py-2 border-none">
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-white mb-3 dark:text-white dark:bg-[#18181B] dark:border-gray-600"
                      >Content layout:</label
                    >
                    <div class="flex gap-2 justify-center">
                      <button
                        v-for="layout in contentLayouts"
                        :key="layout.value"
                        @click="selectedContentLayout = layout.value"
                        :class="[
                          'px-3 py-2 text-sm border transition-colors flex items-center justify-center flex-1 dark:text-white dark:bg-[#18181B] dark:border-gray-600',
                          selectedContentLayout === layout.value
                            ? 'bg-gray-100 border-gray-300 text-gray-900 dark:text-white'
                            : 'bg-white border-gray-300 text-gray-700 dark:text-white hover:bg-gray-50',
                        ]"
                        :style="{
                          'border-radius': '5px',
                          height: '36px',
                        }"
                      >
                        {{ layout.label }}
                      </button>
                    </div>
                  </div>

                  <!-- Sidebar Mode -->
                  <div class="px-4 py-2 border-none">
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-white mb-3"
                      >Sidebar mode:</label
                    >
                    <div class="flex gap-2 justify-center">
                      <button
                        v-for="mode in sidebarModes"
                        :key="mode.value"
                        @click="selectedSidebarMode = mode.value"
                        :class="[
                          'px-3 py-2 text-sm border transition-colors flex items-center justify-center flex-1 dark:text-white dark:bg-[#18181B] dark:border-gray-600',
                          selectedSidebarMode === mode.value
                            ? 'bg-gray-100 border-gray-300 text-gray-900 dark:text-white'
                            : 'bg-white border-gray-300 text-gray-700 dark:text-white hover:bg-gray-50',
                        ]"
                        :style="{
                          'border-radius': '5px',
                          height: '36px',
                        }"
                      >
                        {{ mode.label }}
                      </button>
                    </div>
                  </div>

                  <!-- Reset Button -->
                  <div class="px-4 py-4">
                    <button
                      @click="resetToDefault"
                      class="w-full bg-red-600 text-white py-2 px-4 hover:bg-red-700 transition-colors text-sm font-medium"
                      style="border-radius: 5px; height: 36px"
                    >
                      Reset to Default
                    </button>
                  </div>
                </div>
              </div>

              <!-- User Avatar -->
              <div class="relative">
                <button
                  @click="toggleUserDropdown"
                  class="h-7 w-7 sm:h-8 sm:w-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <span class="text-white font-medium text-xs sm:text-sm"
                    >TB</span
                  >
                </button>

                <!-- User Dropdown -->
                <div
                  v-if="userDropdownOpen"
                  class="absolute right-0 z-10 mt-2 w-56 bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
                  style="border-radius: 5px"
                >
                  <button
                    @click="handleSignOutClick"
                    class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                  >
                    <LogOut class="h-4 w-4 text-gray-400 mr-3" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main
          class="p-3 sm:p-4 lg:p-6 border border-[#e4e4e8] dark:border-gray-800 border-t-0 rounded-b-xl shadow-sm dark:bg-[#09090B] bg-white h-[calc(100vh-72px)] overflow-y-scroll"
        >

        
          <slot />
        </main>
    </div>
  </div>
</template>

<script setup>
import {
  Plus,
  Columns,
  Search,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  MoreHorizontal,
  Home,
  ShoppingCart,
  TrendingUp,
  Users,
  User,
  Bell,
  Sun,
  Moon,
  Settings,
  MessageCircle,
  Image,
  Volume2,
  Handshake,
  Box,
  ChevronRight,
  DollarSign,
  Key,
  AlertCircle,
  PanelLeft,
  CreditCard,
  LogOut,
  BarChart3,
  Building,
  Calendar,
  FileCheck,
  Wrench,
  Wallet,
  PieChart,
  MessageSquare,
  Send,
  Folder,
  Network,
  Clock,
} from "lucide-vue-next";
import Countries from "./svg/countries.vue";
import VisaProducts from "./svg/visaproducts.vue";
import Nationalities from "./svg/nationalities.vue";
import Embassies from "./svg/embassies.vue";
import Customers from "./svg/customers.vue";
import Applications from "./svg/applications.vue";
import Finances from "./svg/finances.vue";
import Dashboard from "./svg/dashboard.vue";
import Coupons from "./svg/coupons.vue";
import AdditionalInfo from "./svg/additionalinfo.vue";
import UsersIcon from "./svg/users.vue";
import { usePermissions } from "~/composables/usePermissions";
import { useAuthApi } from "~/composables/useAuthApi";

const props = defineProps({
  pageTitle: {
    type: String,
    default: "Dashboard",
  },
});

// Permissions
const { hasPermission, isSuperAdmin, getUserPermissions } = usePermissions();
const { getCurrentUser, logout } = useAuthApi();
const router = useRouter();

// Debug: Log user and permissions on mount
onMounted(() => {
  const currentUser = getCurrentUser();
  console.log('=== DASHBOARD LAYOUT DEBUG ===');
  console.log('Current User:', currentUser);
  console.log('User Role:', currentUser?.role);
  console.log('User Permissions:', currentUser?.permissions);
  console.log('Is Super Admin:', isSuperAdmin());
  console.log('Get User Permissions:', getUserPermissions());
  console.log('Has Countries Permission:', hasPermission('countries'));
  console.log('Has Applications Permission:', hasPermission('applications'));
  console.log('==============================');
});

// State management
const sidebarCollapsed = ref(false);
const isDarkMode = ref(false);

// Navigation state - Persist across page navigation
const countriesOpen = ref(false);
const visaproductsOpen = ref(false);
const nationalitiesOpen = ref(false);
const embassiesOpen = ref(false);
const couponsOpen = ref(false);
const additionalInfoOpen = ref(false);
const usersOpen = ref(false);

// Route detection for active states
const route = useRoute()

// Computed properties for active states
const isDashboardActive = computed(() => route.path === '/dashboard')
const isCountriesActive = computed(() => route.path.startsWith('/dashboard/countries'))
const isVisaproductsActive = computed(() => route.path.startsWith('/dashboard/visaproducts'))
const isNationalitiesActive = computed(() => route.path.startsWith('/dashboard/nationalities'))
const isEmbassiesActive = computed(() => route.path.startsWith('/dashboard/embassies'))
const isCustomersActive = computed(() => route.path.startsWith('/dashboard/customers'))
const isApplicationsActive = computed(() => route.path.startsWith('/dashboard/applications'))
const isFinancesActive = computed(() => route.path.startsWith('/dashboard/finances'))
const isCouponsActive = computed(() => route.path.startsWith('/dashboard/coupons'))
const isCouponsListActive = computed(() => route.path === '/dashboard/coupons')
const isCouponsAddActive = computed(() => route.path === '/dashboard/coupons/add')
const isAdditionalInfoActive = computed(() => route.path.startsWith('/dashboard/additional-info'))
const isAdditionalInfoListActive = computed(() => route.path === '/dashboard/additional-info')
const isAdditionalInfoAddActive = computed(() => route.path === '/dashboard/additional-info/add')
const isUsersActive = computed(() => route.path.startsWith('/dashboard/users'))
const isUsersListActive = computed(() => route.path === '/dashboard/users')
const isUsersAddActive = computed(() => route.path === '/dashboard/users/add')

// Individual dropdown item active states
const isCountriesListActive = computed(() => route.path === '/dashboard/countries')
const isCountriesAddActive = computed(() => route.path === '/dashboard/countries/add')
const isVisaproductsListActive = computed(() => route.path === '/dashboard/visaproducts')
const isVisaproductsAddActive = computed(() => route.path === '/dashboard/visaproducts/add')
const isNationalitiesListActive = computed(() => route.path === '/dashboard/nationalities')
const isNationalitiesAddActive = computed(() => route.path === '/dashboard/nationalities/add')
const isEmbassiesListActive = computed(() => route.path === '/dashboard/embassies')
const isEmbassiesAddActive = computed(() => route.path === '/dashboard/embassies/add')

// Initialize dropdown states from localStorage and route
onMounted(() => {
  if (process.client) {
    // Check if we should open dropdowns based on current route
    if (isCountriesActive.value) {
      countriesOpen.value = true
      localStorage.setItem('countriesOpen', 'true')
    } else {
      countriesOpen.value = localStorage.getItem('countriesOpen') === 'true'
    }
    
    if (isVisaproductsActive.value) {
      visaproductsOpen.value = true
      localStorage.setItem('visaproductsOpen', 'true')
    } else {
      visaproductsOpen.value = localStorage.getItem('visaproductsOpen') === 'true'
    }
    
    if (isNationalitiesActive.value) {
      nationalitiesOpen.value = true
      localStorage.setItem('nationalitiesOpen', 'true')
    } else {
      nationalitiesOpen.value = localStorage.getItem('nationalitiesOpen') === 'true'
    }
    
    if (isEmbassiesActive.value) {
      embassiesOpen.value = true
      localStorage.setItem('embassiesOpen', 'true')
    } else {
      embassiesOpen.value = localStorage.getItem('embassiesOpen') === 'true'
    }
    if (isCouponsActive.value) {
    couponsOpen.value = true
      localStorage.setItem('couponsOpen', 'true')
    } else {
     couponsOpen.value = localStorage.getItem('couponsOpen') === 'true'
}
    if (isAdditionalInfoActive.value) {
      additionalInfoOpen.value = true
      localStorage.setItem('additionalInfoOpen', 'true')
    } else {
      additionalInfoOpen.value = localStorage.getItem('additionalInfoOpen') === 'true'
    }
    if (isUsersActive.value) {
      usersOpen.value = true
      localStorage.setItem('usersOpen', 'true')
    } else {
      usersOpen.value = localStorage.getItem('usersOpen') === 'true'
    }
  }
});

// Watch for route changes to maintain dropdown state
watch(() => route.path, (newPath) => {
  if (process.client) {
    // Update dropdown states based on new route
    if (newPath.startsWith('/dashboard/countries')) {
      countriesOpen.value = true
      visaproductsOpen.value = false
      nationalitiesOpen.value = false
      embassiesOpen.value = false
      localStorage.setItem('countriesOpen', 'true')
      localStorage.setItem('visaproductsOpen', 'false')
      localStorage.setItem('nationalitiesOpen', 'false')
      localStorage.setItem('embassiesOpen', 'false')
    } else if (newPath.startsWith('/dashboard/visaproducts')) {
      countriesOpen.value = false
      visaproductsOpen.value = true
      nationalitiesOpen.value = false
      embassiesOpen.value = false
      localStorage.setItem('countriesOpen', 'false')
      localStorage.setItem('visaproductsOpen', 'true')
      localStorage.setItem('nationalitiesOpen', 'false')
      localStorage.setItem('embassiesOpen', 'false')
    } else if (newPath.startsWith('/dashboard/nationalities')) {
      countriesOpen.value = false
      visaproductsOpen.value = false
      nationalitiesOpen.value = true
      embassiesOpen.value = false
      localStorage.setItem('countriesOpen', 'false')
      localStorage.setItem('visaproductsOpen', 'false')
      localStorage.setItem('nationalitiesOpen', 'true')
      localStorage.setItem('embassiesOpen', 'false')
    } else if (newPath.startsWith('/dashboard/embassies')) {
      countriesOpen.value = false
      visaproductsOpen.value = false
      nationalitiesOpen.value = false
      embassiesOpen.value = true
      localStorage.setItem('countriesOpen', 'false')
      localStorage.setItem('visaproductsOpen', 'false')
      localStorage.setItem('nationalitiesOpen', 'false')
      localStorage.setItem('embassiesOpen', 'true')
    } else if (newPath.startsWith('/dashboard/coupons')) {
      countriesOpen.value = false
      visaproductsOpen.value = false
      nationalitiesOpen.value = false
      embassiesOpen.value = false
      couponsOpen.value = true
      additionalInfoOpen.value = false
      localStorage.setItem('countriesOpen', 'false')
      localStorage.setItem('visaproductsOpen', 'false')
      localStorage.setItem('nationalitiesOpen', 'false')
      localStorage.setItem('embassiesOpen', 'false')
      localStorage.setItem('couponsOpen', 'true')
      localStorage.setItem('additionalInfoOpen', 'false')
    } else if (newPath.startsWith('/dashboard/additional-info')) {
      countriesOpen.value = false
      visaproductsOpen.value = false
      nationalitiesOpen.value = false
      embassiesOpen.value = false
      couponsOpen.value = false
      additionalInfoOpen.value = true
      usersOpen.value = false
      localStorage.setItem('countriesOpen', 'false')
      localStorage.setItem('visaproductsOpen', 'false')
      localStorage.setItem('nationalitiesOpen', 'false')
      localStorage.setItem('embassiesOpen', 'false')
      localStorage.setItem('couponsOpen', 'false')
      localStorage.setItem('additionalInfoOpen', 'true')
      localStorage.setItem('usersOpen', 'false')
    } else if (newPath.startsWith('/dashboard/users')) {
      countriesOpen.value = false
      visaproductsOpen.value = false
      nationalitiesOpen.value = false
      embassiesOpen.value = false
      couponsOpen.value = false
      additionalInfoOpen.value = false
      usersOpen.value = true
      localStorage.setItem('countriesOpen', 'false')
      localStorage.setItem('visaproductsOpen', 'false')
      localStorage.setItem('nationalitiesOpen', 'false')
      localStorage.setItem('embassiesOpen', 'false')
      localStorage.setItem('couponsOpen', 'false')
      localStorage.setItem('additionalInfoOpen', 'false')
      localStorage.setItem('usersOpen', 'true')
    }
  }
}, { immediate: true });

// Dropdown states
const settingsDropdownOpen = ref(false);
const userDropdownOpen = ref(false);
const themeDropdownOpen = ref(false);

// Theme and settings data
const selectedTheme = ref("Default");
const selectedScale = ref("none");
const selectedRadius = ref("none");
const selectedColorMode = ref("light");
const selectedContentLayout = ref("full");
const selectedSidebarMode = ref("default");

// Theme options
const themeOptions = [
  { label: "Default", value: "default", color: "#000000" },
  { label: "Underground", value: "underground", color: "#2D5A27" },
  { label: "Rose Garden", value: "rose-garden", color: "#DC2626" },
  { label: "Lake View", value: "lake-view", color: "#0891B2" },
  { label: "Sunset Glow", value: "sunset-glow", color: "#EA580C" },
];

const scaleOptions = [
  { label: "None", value: "none" },
  { label: "XS", value: "xs" },
  { label: "LG", value: "lg" },
];

const radiusOptions = [
  { label: "None", value: "none" },
  { label: "SM", value: "sm" },
  { label: "MD", value: "md" },
  { label: "LG", value: "lg" },
  { label: "XL", value: "xl" },
];

const colorModes = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

const contentLayouts = [
  { label: "Full", value: "full" },
  { label: "Centered", value: "centered" },
];

const sidebarModes = [
  { label: "Default", value: "default" },
  { label: "Icon", value: "icon" },
];

// Computed countries
const sidebarClasses = computed(() => {
  if (sidebarCollapsed.value) {
    return "w-64 lg:w-16 -translate-x-full lg:translate-x-0";
  } else {
    return "w-64 lg:w-64 translate-x-0";
  }
});

// Methods
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

// Navigation toggle functions
const toggleCountries = () => {
  visaproductsOpen.value = false;
  nationalitiesOpen.value = false;
  embassiesOpen.value = false;
  countriesOpen.value = !countriesOpen.value;
  
  // Save to localStorage
  if (process.client) {
    localStorage.setItem('countriesOpen', countriesOpen.value.toString());
    localStorage.setItem('visaproductsOpen', 'false');
    localStorage.setItem('nationalitiesOpen', 'false');
    localStorage.setItem('embassiesOpen', 'false');
  }
};

const toggleVisaproducts = () => {
  countriesOpen.value = false;
  nationalitiesOpen.value = false;
  embassiesOpen.value = false;
  visaproductsOpen.value = !visaproductsOpen.value;
  
  // Save to localStorage
  if (process.client) {
    localStorage.setItem('visaproductsOpen', visaproductsOpen.value.toString());
    localStorage.setItem('countriesOpen', 'false');
    localStorage.setItem('nationalitiesOpen', 'false');
    localStorage.setItem('embassiesOpen', 'false');
  }
};

const toggleNationalities = () => {
  countriesOpen.value = false;
  visaproductsOpen.value = false;
  embassiesOpen.value = false;
  nationalitiesOpen.value = !nationalitiesOpen.value;
  
  // Save to localStorage
  if (process.client) {
    localStorage.setItem('nationalitiesOpen', nationalitiesOpen.value.toString());
    localStorage.setItem('countriesOpen', 'false');
    localStorage.setItem('visaproductsOpen', 'false');
    localStorage.setItem('embassiesOpen', 'false');
  }
};

const toggleEmbassies = () => {
  countriesOpen.value = false;
  visaproductsOpen.value = false;
  nationalitiesOpen.value = false;
  embassiesOpen.value = !embassiesOpen.value;
  
  // Save to localStorage
  if (process.client) {
    localStorage.setItem('embassiesOpen', embassiesOpen.value.toString());
    localStorage.setItem('countriesOpen', 'false');
    localStorage.setItem('visaproductsOpen', 'false');
    localStorage.setItem('nationalitiesOpen', 'false');
  }
};

const toggleCoupons = () => {
  countriesOpen.value = false;
  visaproductsOpen.value = false;
  nationalitiesOpen.value = false;
  embassiesOpen.value = false;
  additionalInfoOpen.value = false;
  couponsOpen.value = !couponsOpen.value;
  
  // Save to localStorage
  if (process.client) {
    localStorage.setItem('couponsOpen', couponsOpen.value.toString());
    localStorage.setItem('countriesOpen', 'false');
    localStorage.setItem('visaproductsOpen', 'false');
    localStorage.setItem('nationalitiesOpen', 'false');
    localStorage.setItem('embassiesOpen', 'false');
    localStorage.setItem('additionalInfoOpen', 'false');
  }
};

const toggleAdditionalInfo = () => {
  countriesOpen.value = false;
  visaproductsOpen.value = false;
  nationalitiesOpen.value = false;
  embassiesOpen.value = false;
  couponsOpen.value = false;
  usersOpen.value = false;
  additionalInfoOpen.value = !additionalInfoOpen.value;
  
  // Save to localStorage
  if (process.client) {
    localStorage.setItem('additionalInfoOpen', additionalInfoOpen.value.toString());
    localStorage.setItem('countriesOpen', 'false');
    localStorage.setItem('visaproductsOpen', 'false');
    localStorage.setItem('nationalitiesOpen', 'false');
    localStorage.setItem('embassiesOpen', 'false');
    localStorage.setItem('couponsOpen', 'false');
    localStorage.setItem('usersOpen', 'false');
  }
};

const toggleUsers = () => {
  countriesOpen.value = false;
  visaproductsOpen.value = false;
  nationalitiesOpen.value = false;
  embassiesOpen.value = false;
  couponsOpen.value = false;
  additionalInfoOpen.value = false;
  usersOpen.value = !usersOpen.value;
  
  // Save to localStorage
  if (process.client) {
    localStorage.setItem('usersOpen', usersOpen.value.toString());
    localStorage.setItem('countriesOpen', 'false');
    localStorage.setItem('visaproductsOpen', 'false');
    localStorage.setItem('nationalitiesOpen', 'false');
    localStorage.setItem('embassiesOpen', 'false');
    localStorage.setItem('couponsOpen', 'false');
    localStorage.setItem('additionalInfoOpen', 'false');
  }
};


// Dropdown toggle functions
const toggleSettingsDropdown = () => {
  userDropdownOpen.value = false;
  settingsDropdownOpen.value = !settingsDropdownOpen.value;
};

const toggleUserDropdown = () => {
  settingsDropdownOpen.value = false;
  userDropdownOpen.value = !userDropdownOpen.value;
};

// Theme dropdown toggle
const toggleThemeDropdown = () => {
  themeDropdownOpen.value = !themeDropdownOpen.value;
};

// User dropdown menu handlers
const handleSignOutClick = () => {
  logout();
  userDropdownOpen.value = false;
  router.push('/login');
};

// Theme management
const setTheme = (theme) => {
  selectedTheme.value = theme;
};

const getSelectedThemeColor = () => {
  const theme = themeOptions.find((t) => t.label === selectedTheme.value);
  return theme ? theme.color : "#000000";
};

const resetToDefault = () => {
  selectedTheme.value = "Default";
  selectedScale.value = "none";
  selectedRadius.value = "none";
  selectedColorMode.value = "light";
  selectedContentLayout.value = "full";
  selectedSidebarMode.value = "default";
  settingsDropdownOpen.value = false;
};

// Click outside handling
const handleClickOutside = (event) => {
  // Close all dropdowns when clicking outside
  if (!event.target.closest('.relative')) {
    settingsDropdownOpen.value = false;
    userDropdownOpen.value = false;
    themeDropdownOpen.value = false;
  }
};

// Component mounted
onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  } else {
    isDarkMode.value = false;
    document.documentElement.classList.remove("dark");
  }
  
  // Add click outside listener
  document.addEventListener('click', handleClickOutside);
});

// Component unmounted
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
