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
            :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
          >
            <Home class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
            <span v-show="!sidebarCollapsed" class="truncate">Dashboard</span>
          </a>

          <!-- Countries -->
          <div>
            <button
              @click="toggleCountries"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
            >
              <Send class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Countries</span>
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="countriesOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="countriesOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/countries"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Countries</a
              >
              <a
                href="/dashboard/countries/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add Country</a
              >
            </div>
          </div>

          <!-- Visa Products -->
          <div>
            <button
              @click="toggleVisaproducts"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
            >
              <MessageCircle
                class="h-4 w-4"
                :class="sidebarCollapsed ? '' : 'mr-3'"
              />
              <span v-show="!sidebarCollapsed" class="truncate"
                >Visa Products</span
              >
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="visaproductsOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="visaproductsOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/visaproducts"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Visa Products</a
              >
              <a
                href="/dashboard/visaproducts/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add Visa Product</a
              >
            </div>
          </div>

          <!-- Nationalities -->
          <div>
            <button
              @click="toggleNationalities"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
            >
              <Network
                class="h-4 w-4"
                :class="sidebarCollapsed ? '' : 'mr-3'"
              />
              <span v-show="!sidebarCollapsed" class="truncate"
                >Nationalities</span
              >
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="nationalitiesOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="nationalitiesOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/nationalities"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Nationalities</a
              >
              <a
                href="/dashboard/nationalities/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add Nationality</a
              >
            </div>
          </div>

          <!-- Embassies -->
          <div>
            <button
              @click="toggleEmbassies"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
            >
              <Folder class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Embassies</span>
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="embassiesOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="embassiesOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/embassies"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Embassies</a
              >
              <a
                href="/dashboard/embassies/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add Embassy</a
              >
            </div>
          </div>

          <!-- Customers -->
          <div>
            <button
              @click="toggleCustomers"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
            >
              <Folder class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Customers</span>
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="customersOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="customersOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/customers"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Customers</a
              >
              <a
                href="/dashboard/customers/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add Customer</a
              >
            </div>
          </div>

          <!-- Applications -->
          <div>
            <button
              @click="toggleApplications"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
            >
              <Clock class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate"
                >Applications</span
              >
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="applicationsOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="applicationsOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/applications"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Applications</a
              >
              <a
                href="/dashboard/applications/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add Application</a
              >
            </div>
          </div>

          <!-- Finances -->
          <div>
            <button
              @click="toggleFinances"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
            >
              <Users class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Finances</span>
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="financesOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="financesOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/finances"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Finances</a
              >
              <a
                href="/dashboard/finances/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add Finance</a
              >
            </div>
          </div>
        </div>
      </nav>

      <!-- Settings -->
      <nav
        :class="sidebarCollapsed ? 'px-2' : 'px-2'"
        class="absolute bottom-16 left-0 right-0"
      >
        <a
          href="/dashboard/settings"
          class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
          style="margin: 8px"
          :class="sidebarCollapsed ? 'justify-center' : ''"
        >
          <Settings class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
          <span v-show="!sidebarCollapsed" class="truncate">Settings</span>
        </a>
      </nav>
      <!-- User Profile -->
      <div
        class="absolute bottom-0 left-0 right-0 cursor-pointer transition-colors duration-200 rounded-md relative"
        :class="sidebarCollapsed ? 'p-2' : 'p-4'"
        style="position: absolute"
        @click="toggleLogoutDropdown"
      >
        <div
          class="flex items-center py-2 hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31]"
          :class="sidebarCollapsed ? 'justify-center px-1' : 'px-1'"
          style="border-radius: 5px"
        >
          <div
            class="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center"
          >
            <User class="h-4 w-4 text-gray-600" />
          </div>

          <div v-show="!sidebarCollapsed" class="ml-3 min-w-0 flex-1">
            <p
              class="text-sm font-medium text-gray-900 dark:text-white truncate"
            >
              Nick Patrocky
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              ivisa@gmail.com
            </p>
          </div>

          <MoreVertical
            v-show="!sidebarCollapsed"
            class="h-4 w-4 text-gray-400"
          />
        </div>

        <!-- Logout Dropdown -->
        <div
          v-if="logoutDropdownOpen && !sidebarCollapsed"
          class="absolute left-[200px] bottom-[-10px] mb-2 w-56 bg-white dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20"
          @click.stop
          style="
            transform: translateX(50px) translateY(-20px);
            border-radius: 5px;
          "
        >
          <!-- User Info Section -->
          <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center">
              <div
                class="h-8 w-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center"
              >
                <span class="text-white font-medium text-sm">TB</span>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  Toby Belhome
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  hello@tobybelhome.com
                </p>
              </div>
            </div>
          </div>

          <!-- Menu Items -->
          <button
            @click="logoutDropdownOpen = false"
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
          >
            <div class="h-4 w-4 mr-3 flex items-center justify-center">
              <div
                class="h-3 w-3 border-2 border-gray-400 rounded-full flex items-center justify-center"
              >
                <div class="h-1.5 w-1.5 bg-gray-400 rounded-full"></div>
              </div>
            </div>
            <span>Account</span>
          </button>

          <button
            @click="logoutDropdownOpen = false"
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
          >
            <CreditCard class="h-4 w-4 text-gray-400 mr-3" />
            <span>Billing</span>
          </button>

          <button
            @click="logoutDropdownOpen = false"
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
          >
            <Bell class="h-4 w-4 text-gray-400 mr-3" />
            <span>Notifications</span>
          </button>

          <button
            @click="logoutDropdownOpen = false"
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
          >
            <LogOut class="h-4 w-4 text-gray-400 mr-3" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div
      :class="sidebarCollapsed ? 'pl-0 lg:pl-16' : 'pl-0 lg:pl-64'"
      class="min-h-screen transition-all duration-300 dark:bg-[#18181B] bg-[#F4F4F6] dark:border-gray-700"
    >
      <!-- Top Header -->
      <div
        style="
          border: 1px solid transparent;
          border-radius: 17px;
          padding: 10px 8px;
        "
      >
        <header
          class="bg-[#FFFFFF] dark:bg-[#09090B]"
          style="
            border-top-right-radius: 15px;
            border-top-left-radius: 15px;
            border-top: 1px solid #e4e4e8;
            border-left: 1px solid #e4e4e8;
            border-right: 1px solid #e4e4e8;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          "
        >
          <div
            class="flex h-14 items-center justify-between px-3 sm:px-4 lg:px-6 border-b border-gray-200"
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
              <!-- Notifications -->
              <div class="relative">
                <button
                  @click="toggleNotificationsDropdown"
                  class="p-2 hover:bg-[#E4E4E8] relative dark:hover:bg-[#2F2F31]"
                  style="border-radius: 5px"
                >
                  <Bell
                    class="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300"
                    style="height: 15px; width: 15px"
                  />
                  <!-- Notification Badge -->
                  <span
                    class="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <span class="text-xs text-white font-medium"></span>
                  </span>
                </button>

                <!-- Notifications Dropdown -->
                <div
                  v-if="notificationsDropdownOpen"
                  class="absolute right-0 z-10 mt-2 w-80 bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
                  style="border-radius: 5px"
                >
                  <!-- Header -->
                  <div
                    class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
                  >
                    <h3
                      class="text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Notificationsa
                    </h3>
                    <button
                      class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      View all
                    </button>
                  </div>

                  <!-- Notifications List -->
                  <div class="max-h-96 overflow-y-auto">
                    <div
                      v-for="notification in notifications"
                      :key="notification.id"
                      class="px-4 py-2 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 relative"
                    >
                      <div class="flex items-start space-x-3">
                        <!-- Avatar -->
                        <div class="flex-shrink-0">
                          <div
                            class="h-8 w-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
                          >
                            <span class="text-white text-xs font-medium">
                              {{ notification.title.charAt(0) }}
                            </span>
                          </div>
                        </div>

                        <!-- Content -->
                        <div class="flex-1 min-w-0">
                          <p
                            class="text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {{ notification.title }}
                          </p>
                          <p
                            class="text-sm text-gray-600 dark:text-gray-300 mt-1"
                          >
                            {{ notification.message }}
                          </p>

                          <!-- Action Buttons (for specific notifications) -->
                          <div
                            v-if="notification.hasActions"
                            class="flex space-x-2 mt-2"
                          >
                            <button
                              class="px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#18181B] text-gray-700 dark:text-white dark:text-white rounded-md hover:bg-gray-50 dark:hover:bg-[#18181B]"
                              st
                              style="border-radius: 5px"
                            >
                              Accept
                            </button>
                            <button
                              class="px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700"
                              style="border-radius: 5px"
                            >
                              Decline
                            </button>
                          </div>

                          <!-- Time -->
                          <div class="flex items-center mt-1">
                            <svg
                              class="h-3 w-3 text-gray-400 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span
                              class="text-xs text-gray-500 dark:text-gray-400"
                              >{{ notification.time }}</span
                            >
                          </div>
                        </div>

                        <!-- Unread Indicator -->
                        <div v-if="notification.unread" class="flex-shrink-0">
                          <div class="h-2 w-2 bg-red-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                <button
                  @click="toggleSettingsDropdown"
                  class="p-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31]"
                  style="border-radius: 5px"
                >
                  <Settings
                    class="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300"
                    style="height: 15px; width: 15px"
                  />
                </button>

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
                  <!-- User Info Section -->
                  <div
                    class="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
                  >
                    <div class="flex items-center">
                      <div
                        class="h-8 w-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center"
                      >
                        <span class="text-white font-medium text-sm">TB</span>
                      </div>
                      <div class="ml-3">
                        <p
                          class="text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Toby Belhome
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          hello@tobybelhome.comm
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Menu Items -->
                  <button
                    @click="
                      handleUpgradeClick;
                      userDropdownOpen = false;
                    "
                    class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                  >
                    <div class="h-4 w-4 mr-3 flex items-center justify-center">
                      <svg
                        class="h-4 w-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </div>
                    <span>Upgrade to Pro</span>
                  </button>

                  <button
                    @click="
                      handleAccountClick;
                      userDropdownOpen = false;
                    "
                    class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                  >
                    <div class="h-4 w-4 mr-3 flex items-center justify-center">
                      <div
                        class="h-3 w-3 border-2 border-gray-400 rounded-full flex items-center justify-center"
                      >
                        <div class="h-1.5 w-1.5 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <span>Account</span>
                  </button>

                  <button
                    @click="
                      handleBillingClick;
                      userDropdownOpen = false;
                    "
                    class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                  >
                    <CreditCard class="h-4 w-4 text-gray-400 mr-3" />
                    <span>Billing</span>
                  </button>

                  <button
                    @click="
                      handleNotificationsClick;
                      userDropdownOpen = false;
                    "
                    class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                  >
                    <Bell class="h-4 w-4 text-gray-400 mr-3" />
                    <span>Notifications</span>
                  </button>

                  <button
                    @click="
                      handleSignOutClick;
                      userDropdownOpen = false;
                    "
                    class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                  >
                    <LogOut class="h-4 w-4 text-gray-400 mr-3" />
                    <span>Log out</span>
                  </button>

                  <!-- Credits Section -->
                  <div
                    class="px-4 py-2 bg-[#F5F5F5] dark:bg-[#18181B] border-t border-gray-200 dark:border-gray-700"
                    style="border-radius: 5px; margin: 5px"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <span
                        class="text-sm font-medium text-gray-900 dark:text-white"
                        >Credits</span
                      >
                      <div class="flex items-center">
                        <span class="text-sm text-gray-600">5 left</span>
                        <ChevronRight class="h-4 w-4 text-gray-400 ml-1" />
                      </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div
                        class="bg-gray-900 h-2 rounded-full"
                        style="width: 33%"
                      ></div>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      Daily credits used first
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main
          class="p-3 sm:p-4 lg:p-6 bg-[#FFFFFF] dark:bg-[#09090B]"
          style="
            border-bottom-right-radius: 15px;
            border-bottom-left-radius: 15px;
            border-bottom: 1px solid #e4e4e8;
            border-left: 1px solid #e4e4e8;
            border-right: 1px solid #e4e4e8;
            box-shadow: -2px 0 4px rgba(0, 0, 0, 0.05),
              2px 0 4px rgba(0, 0, 0, 0.05);
          "
        >
          <div class="space-y-8 sm:space-y-4">
            <!-- Page Title and Add Button -->
            <div
              class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4"
            >
              <div class="flex-1 min-w-0">
                <h1
                  class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white"
                >
                  Countries
                </h1>
                <label
                  class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
                  style="font-weight: 400; letter-spacing: 0%"
                >
                  Here you can find all the Countries.
                </label>
              </div>
              <button
                class="bg-black h-[36px] dark:bg-white text-white dark:text-black px-3 sm:px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 rounded-[7px] flex-shrink-0"
              >
                <div
                  class="flex items-center justify-center w-4 h-4 border border-white dark:border-black rounded-full bg-black dark:bg-white"
                >
                  <Plus class="h-4 w-4 text-white dark:text-black" />
                </div>
                <span
                  class="text-sm sm:text-base"
                  style="
                    font-size: 14px;
                    font-weight: 400;
                    font-style: normal;
                    line-height: 20px;
                    font-family: 'Geist', sans-serif;
                    letter-spacing: 0;
                  "
                  >Add Country</span
                >
              </button>
            </div>
            <!-- Search and Filters Row -->
            <div
              class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4"
            >
              <!-- Search and Filter Buttons -->
              <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
                <!-- Search Bar -->
                <div class="relative flex-1 w-full sm:w-[30%]">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search Countries"
                    class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                    style="border-radius: 7px"
                  />
                </div>
              </div>
            </div>

            <!-- Countries Table -->
            <div
              class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
              style="border-radius: 7px"
            >
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead
                    class="bg-[#FFFFFF] dark:bg-[#09090B] border-b dark:border-gray-800"
                  >
                    <tr class="!h-[37px]">
                      <th class="w-10 sm:w-12 px-4 py-3 text-left align-middle">
                        <input
                          type="checkbox"
                          v-model="selectAll"
                          class="border-gray-300"
                          style="border-radius: 7px"
                        />
                      </th>
                      <th
                        class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                      >
                        Country
                      </th>
                      <th
                        class="px-4 py-3 text-left text-sm font-medium text-[#475467] dark:text-white"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Products</span>
                          <svg
                            class="h-4 w-4 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </th>
                      <th class="w-20 px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr
                      v-for="country in filteredCountries"
                      :key="country.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td class="px-4 py-3">
                        <input
                          type="checkbox"
                          v-model="country.selected"
                          class="border-gray-300"
                          style="border-radius: 7px"
                        />
                      </td>
                      <td
                        class="px-4 py-3 text-sm text-[#475467] dark:text-white font-medium"
                      >
                        {{ country.name }}
                      </td>
                      <td
                        class="px-4 py-3 text-sm text-[#475467] dark:text-white"
                      >
                        {{ country.products }}
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center space-x-2">
                          <button
                            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            title="View"
                          >
                            <svg
                              class="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              ></path>
                            </svg>
                          </button>
                          <button
                            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            title="Edit"
                          >
                            <svg
                              class="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              ></path>
                            </svg>
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
                {{ selectedCount }} of {{ countries.length }} row(s) selected.
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
        </main>
      </div>
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
  Eye,
  Pencil,
} from "lucide-vue-next";

// Set page title
useHead({
  title: "Countries - iVisa",
});

// Sample countries data
const countries = ref([
  {
    id: 1,
    name: "United States",
    products: "Tourist Visa, Business Visa",
    selected: false,
  },
  {
    id: 2,
    name: "United Kingdom",
    products: "Tourist Visa, Work Visa",
    selected: false,
  },
  {
    id: 3,
    name: "Canada",
    products: "Tourist Visa, Student Visa",
    selected: false,
  },
  {
    id: 4,
    name: "Germany",
    products: "Schengen Visa, Work Visa",
    selected: false,
  },
  {
    id: 5,
    name: "France",
    products: "Schengen Visa, Tourist Visa",
    selected: false,
  },
  {
    id: 6,
    name: "Japan",
    products: "Tourist Visa, Business Visa",
    selected: false,
  },
  {
    id: 7,
    name: "Australia",
    products: "Tourist Visa, Work Visa",
    selected: false,
  },
  {
    id: 8,
    name: "Singapore",
    products: "Tourist Visa, Business Visa",
    selected: false,
  },
  {
    id: 9,
    name: "Thailand",
    products: "Tourist Visa, Work Visa",
    selected: false,
  },
  {
    id: 10,
    name: "UAE",
    products: "Tourist Visa, Business Visa",
    selected: false,
  },
]);

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const sidebarCollapsed = ref(false);
const isDarkMode = ref(false);

// Navigation state - All closed by default
const countriesOpen = ref(false);
const visaproductsOpen = ref(false);
const nationalitiesOpen = ref(false);
const embassiesOpen = ref(false);
const customersOpen = ref(false);
const applicationsOpen = ref(false);
const financesOpen = ref(false);

// Dropdown states
const settingsDropdownOpen = ref(false);
const userDropdownOpen = ref(false);
const notificationsDropdownOpen = ref(false);
const logoutDropdownOpen = ref(false);
const statusDropdownOpen = ref(false);
const planDropdownOpen = ref(false);
const roleDropdownOpen = ref(false);
const columnsDropdownOpen = ref(false);

// Notifications data
const notifications = ref([
  {
    id: 1,
    title: "Your order is placed",
    message: "Amet minim mollit non deser unt ullamco e...",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 2,
    title: "Congratulations Darlene 🎉",
    message: "Won the monthly best seller badge",
    time: "11 am",
    unread: true,
  },
  {
    id: 3,
    title: "Joaquina Weisenborn",
    message: "Requesting access permission",
    time: "12 pm",
    unread: true,
    hasActions: true,
  },
  {
    id: 4,
    title: "Brooklyn Simmons",
    message: "Added you to Top Secret Project...",
    time: "1 pm",
    unread: true,
  },
]);

// Computed properties
const sidebarClasses = computed(() => {
  if (sidebarCollapsed.value) {
    return "w-64 lg:w-16 -translate-x-full lg:translate-x-0";
  } else {
    return "w-64 lg:w-64 translate-x-0";
  }
});

const filteredCountries = computed(() => {
  if (!searchQuery.value) return countries.value;

  return countries.value.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectedCount = computed(() => {
  return countries.value.filter((country) => country.selected).length;
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
  customersOpen.value = false;
  applicationsOpen.value = false;
  financesOpen.value = false;
  countriesOpen.value = !countriesOpen.value;
};

const toggleVisaproducts = () => {
  countriesOpen.value = false;
  nationalitiesOpen.value = false;
  embassiesOpen.value = false;
  customersOpen.value = false;
  applicationsOpen.value = false;
  financesOpen.value = false;
  visaproductsOpen.value = !visaproductsOpen.value;
};

const toggleNationalities = () => {
  countriesOpen.value = false;
  visaproductsOpen.value = false;
  embassiesOpen.value = false;
  customersOpen.value = false;
  applicationsOpen.value = false;
  financesOpen.value = false;
  nationalitiesOpen.value = !nationalitiesOpen.value;
};

const toggleEmbassies = () => {
  countriesOpen.value = false;
  visaproductsOpen.value = false;
  nationalitiesOpen.value = false;
  customersOpen.value = false;
  applicationsOpen.value = false;
  financesOpen.value = false;
  embassiesOpen.value = !embassiesOpen.value;
};

const toggleCustomers = () => {
  countriesOpen.value = false;
  visaproductsOpen.value = false;
  nationalitiesOpen.value = false;
  embassiesOpen.value = false;
  applicationsOpen.value = false;
  financesOpen.value = false;
  customersOpen.value = !customersOpen.value;
};

const toggleApplications = () => {
  countriesOpen.value = false;
  visaproductsOpen.value = false;
  nationalitiesOpen.value = false;
  embassiesOpen.value = false;
  customersOpen.value = false;
  financesOpen.value = false;
  applicationsOpen.value = !applicationsOpen.value;
};

const toggleFinances = () => {
  countriesOpen.value = false;
  visaproductsOpen.value = false;
  nationalitiesOpen.value = false;
  embassiesOpen.value = false;
  customersOpen.value = false;
  applicationsOpen.value = false;
  financesOpen.value = !financesOpen.value;
};

// Dropdown toggle functions
const toggleSettingsDropdown = () => {
  userDropdownOpen.value = false;
  notificationsDropdownOpen.value = false;
  logoutDropdownOpen.value = false;
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  settingsDropdownOpen.value = !settingsDropdownOpen.value;
};

const toggleUserDropdown = () => {
  settingsDropdownOpen.value = false;
  notificationsDropdownOpen.value = false;
  logoutDropdownOpen.value = false;
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  userDropdownOpen.value = !userDropdownOpen.value;
};

const toggleNotificationsDropdown = () => {
  settingsDropdownOpen.value = false;
  userDropdownOpen.value = false;
  logoutDropdownOpen.value = false;
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  notificationsDropdownOpen.value = !notificationsDropdownOpen.value;
};

const toggleLogoutDropdown = () => {
  settingsDropdownOpen.value = false;
  userDropdownOpen.value = false;
  notificationsDropdownOpen.value = false;
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  logoutDropdownOpen.value = !logoutDropdownOpen.value;
};

const toggleStatusDropdown = () => {
  settingsDropdownOpen.value = false;
  userDropdownOpen.value = false;
  notificationsDropdownOpen.value = false;
  logoutDropdownOpen.value = false;
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  statusDropdownOpen.value = !statusDropdownOpen.value;
};

const togglePlanDropdown = () => {
  settingsDropdownOpen.value = false;
  userDropdownOpen.value = false;
  notificationsDropdownOpen.value = false;
  logoutDropdownOpen.value = false;
  statusDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  planDropdownOpen.value = !planDropdownOpen.value;
};

const toggleRoleDropdown = () => {
  settingsDropdownOpen.value = false;
  userDropdownOpen.value = false;
  notificationsDropdownOpen.value = false;
  logoutDropdownOpen.value = false;
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  columnsDropdownOpen.value = false;
  roleDropdownOpen.value = !roleDropdownOpen.value;
};

const toggleColumnsDropdown = () => {
  settingsDropdownOpen.value = false;
  userDropdownOpen.value = false;
  notificationsDropdownOpen.value = false;
  logoutDropdownOpen.value = false;
  statusDropdownOpen.value = false;
  planDropdownOpen.value = false;
  roleDropdownOpen.value = false;
  columnsDropdownOpen.value = !columnsDropdownOpen.value;
};

// Watch for select all changes
watch(selectAll, (newValue) => {
  countries.value.forEach((country) => {
    country.selected = newValue;
  });
});

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
});
</script>
