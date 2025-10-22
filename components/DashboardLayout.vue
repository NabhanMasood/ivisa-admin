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
        :class="sidebarCollapsed ? 'px-2 justify-center' : 'px-4 sm:px-6'"
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
            class="group flex items-center py-2 text-sm font-medium rounded-md transition-colors text-gray-700 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] hover:text-gray-900 dark:text-white hover:rounded-[5px] bg-gray-100 text-gray-900 dark:text-white"
            :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
          >
            <BarChart3
              class="h-4 w-4"
              :class="sidebarCollapsed ? '' : 'mr-3'"
            />
            <span v-show="!sidebarCollapsed" class="truncate">Dashboard</span>
          </a>

          <!-- Notifications -->
          <a
            href="/dashboard/notifications"
            class="group flex items-center py-2 text-sm font-medium rounded-md transition-colors text-gray-700 dark:hover:bg-[#2F2F31] dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
            :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
          >
            <MessageCircle
              class="h-4 w-4"
              :class="sidebarCollapsed ? '' : 'mr-3'"
            />
            <span v-show="!sidebarCollapsed" class="truncate"
              >Notifications</span
            >
            <span
              v-show="!sidebarCollapsed"
              class="ml-auto text-xs py-0.5 rounded-full"
              >10</span
            >
          </a>

          <!-- Properties -->
          <div>
            <button
              @click="toggleProperties"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
            >
              <Building
                class="h-4 w-4"
                :class="sidebarCollapsed ? '' : 'mr-3'"
              />
              <span v-show="!sidebarCollapsed" class="truncate"
                >Properties</span
              >
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="propertiesOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="propertiesOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/properties"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Properties</a
              >
              <a
                href="/dashboard/properties/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add Property</a
              >
            </div>
          </div>

          <!-- Owners -->
          <div>
            <button
              @click="toggleOwners"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
            >
              <User class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Owners</span>
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="ownersOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="ownersOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/owners"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Owners</a
              >
              <a
                href="/dashboard/owners/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add Owner</a
              >
            </div>
          </div>

          <!-- Calendar -->
          <a
            href="/dashboard/calendar"
            class="group flex items-center py-2 text-sm font-medium rounded-md transition-colors text-gray-700 dark:hover:bg-[#2F2F31] dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
            :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
          >
            <Calendar class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
            <span v-show="!sidebarCollapsed" class="truncate">Calendar</span>
          </a>

          <!-- Bookings -->
          <div>
            <button
              @click="toggleBookings"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
            >
              <FileCheck
                class="h-4 w-4"
                :class="sidebarCollapsed ? '' : 'mr-3'"
              />
              <span v-show="!sidebarCollapsed" class="truncate">Bookings</span>
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="bookingsOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="bookingsOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/bookings"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Bookings</a
              >
              <a
                href="/dashboard/bookings/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add Booking</a
              >
            </div>
          </div>

          <!-- Guests -->
          <div>
            <button
              @click="toggleGuests"
              class="group flex items-center w-full py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
            >
              <Users class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Guests</span>
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="guestsOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="guestsOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/guests"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Guests</a
              >
              <a
                href="/dashboard/guests/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add Guest</a
              >
            </div>
          </div>

          <!-- Users -->
          <div>
            <button
              @click="toggleUsers"
              class="group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md dark:hover:bg-[#2F2F31] transition-colors text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center' : ''"
            >
              <Users class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate">Users</span>
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="usersOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="usersOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/users"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Users</a
              >
              <a
                href="/dashboard/users/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add User</a
              >
            </div>
          </div>

          <!-- Maintenance -->
          <div>
            <button
              @click="toggleMaintenance"
              class="group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
              :class="sidebarCollapsed ? 'justify-center' : ''"
            >
              <Wrench class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
              <span v-show="!sidebarCollapsed" class="truncate"
                >Maintenance</span
              >
              <ChevronDown
                v-show="!sidebarCollapsed"
                :class="maintenanceOpen ? 'rotate-180' : ''"
                class="ml-auto h-4 w-4 transition-transform"
              />
            </button>
            <div
              v-if="maintenanceOpen && !sidebarCollapsed"
              class="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
            >
              <a
                href="/dashboard/maintenance"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >List of Maintenance</a
              >
              <a
                href="/dashboard/maintenance/add"
                class="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-white hover:bg-[#DCDCDE] dark:hover:bg-[#2F2F31] transition-colors"
                style="border-radius: 5px"
                >Add Maintenance</a
              >
            </div>
          </div>

          <!-- Transactions -->
          <a
            href="/dashboard/transactions"
            class="group flex items-center py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
            :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
          >
            <Wallet class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
            <span v-show="!sidebarCollapsed" class="truncate"
              >Transactions</span
            >
          </a>

          <!-- Reports -->
          <a
            href="/dashboard/reports"
            class="group flex items-center py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
            :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
          >
            <PieChart class="h-4 w-4" :class="sidebarCollapsed ? '' : 'mr-3'" />
            <span v-show="!sidebarCollapsed" class="truncate">Reports</span>
          </a>

          <!-- Communication -->
          <a
            href="/dashboard/communication"
            class="group flex items-center py-2 text-sm font-medium rounded-md transition-colors dark:hover:bg-[#2F2F31] text-gray-700 dark:text-white hover:bg-[#DCDCDE] hover:text-gray-900 dark:text-white hover:rounded-[5px]"
            :class="sidebarCollapsed ? 'justify-center px-2' : 'px-3'"
          >
            <MessageSquare
              class="h-4 w-4"
              :class="sidebarCollapsed ? '' : 'mr-3'"
            />
            <span v-show="!sidebarCollapsed" class="truncate"
              >Communication</span
            >
          </a>
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
          <slot />
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
} from "lucide-vue-next";

const props = defineProps({
  pageTitle: {
    type: String,
    default: "Dashboard",
  },
});

// State management
const sidebarCollapsed = ref(false);
const isDarkMode = ref(false);

// Navigation state - All closed by default
const propertiesOpen = ref(false);
const ownersOpen = ref(false);
const bookingsOpen = ref(false);
const guestsOpen = ref(false);
const usersOpen = ref(false);
const maintenanceOpen = ref(false);

// Dropdown states
const settingsDropdownOpen = ref(false);
const userDropdownOpen = ref(false);
const notificationsDropdownOpen = ref(false);
const logoutDropdownOpen = ref(false);

// Computed properties
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
const toggleProperties = () => {
  ownersOpen.value = false;
  bookingsOpen.value = false;
  guestsOpen.value = false;
  usersOpen.value = false;
  maintenanceOpen.value = false;
  propertiesOpen.value = !propertiesOpen.value;
};

const toggleOwners = () => {
  propertiesOpen.value = false;
  bookingsOpen.value = false;
  guestsOpen.value = false;
  usersOpen.value = false;
  maintenanceOpen.value = false;
  ownersOpen.value = !ownersOpen.value;
};

const toggleBookings = () => {
  propertiesOpen.value = false;
  ownersOpen.value = false;
  guestsOpen.value = false;
  usersOpen.value = false;
  maintenanceOpen.value = false;
  bookingsOpen.value = !bookingsOpen.value;
};

const toggleGuests = () => {
  propertiesOpen.value = false;
  ownersOpen.value = false;
  bookingsOpen.value = false;
  usersOpen.value = false;
  maintenanceOpen.value = false;
  guestsOpen.value = !guestsOpen.value;
};

const toggleUsers = () => {
  propertiesOpen.value = false;
  ownersOpen.value = false;
  bookingsOpen.value = false;
  guestsOpen.value = false;
  maintenanceOpen.value = false;
  usersOpen.value = !usersOpen.value;
};

const toggleMaintenance = () => {
  propertiesOpen.value = false;
  ownersOpen.value = false;
  bookingsOpen.value = false;
  guestsOpen.value = false;
  usersOpen.value = false;
  maintenanceOpen.value = !maintenanceOpen.value;
};

// Dropdown toggle functions
const toggleSettingsDropdown = () => {
  userDropdownOpen.value = false;
  notificationsDropdownOpen.value = false;
  logoutDropdownOpen.value = false;
  settingsDropdownOpen.value = !settingsDropdownOpen.value;
};

const toggleUserDropdown = () => {
  settingsDropdownOpen.value = false;
  notificationsDropdownOpen.value = false;
  logoutDropdownOpen.value = false;
  userDropdownOpen.value = !userDropdownOpen.value;
};

const toggleNotificationsDropdown = () => {
  settingsDropdownOpen.value = false;
  userDropdownOpen.value = false;
  logoutDropdownOpen.value = false;
  notificationsDropdownOpen.value = !notificationsDropdownOpen.value;
};

const toggleLogoutDropdown = () => {
  settingsDropdownOpen.value = false;
  userDropdownOpen.value = false;
  notificationsDropdownOpen.value = false;
  logoutDropdownOpen.value = !logoutDropdownOpen.value;
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
});
</script>
