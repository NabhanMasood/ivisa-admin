<template>
  <DashboardLayout>
    <div class="space-y-8 sm:space-y-4">
      <!-- Page Title and Add Button -->
      <div class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4">
        <div class="flex-1 min-w-0">
          <h1 class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Users
          </h1>
          <label
            class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
            style="font-weight: 400; letter-spacing: 0%"
          >
            Manage sub-admins and their access permissions
          </label>
        </div>
        <button
          @click="navigateToAddUser"
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
            >Add User</span
          >
        </button>
      </div>

      <!-- Search and Filters Row -->
      <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <!-- Search and Filter Buttons -->
        <div class="w-full sm:w-[40%] flex flex-col sm:flex-row gap-2">
          <!-- Search Bar -->
          <div class="relative flex-1 w-full sm:w-[30%]">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Users"
              class="w-full h-[36px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-black focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
              style="border-radius: 7px"
            />
          </div>
        </div>

        <!-- Columns Filter Button -->
        <div class="flex justify-center sm:justify-end w-full sm:w-auto">
          <div class="relative w-full sm:w-auto">
            <button
              @click="toggleColumnsDropdown"
              class="w-full h-[36px] sm:w-auto bg-[#FFFFFF] dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31] transition-colors flex items-center justify-center space-x-2 text-sm"
              style="border-radius: 5px"
            >
              <Columns class="h-4 w-4" />
              <span class="sm:inline">Columns</span>
            </button>

            <!-- Columns Dropdown -->
            <div
              v-if="columnsDropdownOpen"
              class="absolute top-full right-0 z-10 mt-2 w-48 bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
              style="border-radius: 5px"
            >
              <!-- Column Options -->
              <div class="py-1">
                <label
                  class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                  <span class="text-sm text-gray-900 dark:text-white">Email</span>
                </label>
                <label
                  class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                  <span class="text-sm text-gray-900 dark:text-white">Role</span>
                </label>
                <label
                  class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                  <span class="text-sm text-gray-900 dark:text-white">Permissions</span>
                </label>
                <label
                  class="flex items-center px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer"
                  style="border-radius: 5px; margin: 3px"
                >
                  <span class="mr-3 text-black dark:text-white text-sm font-bold">✓</span>
                  <span class="text-sm text-gray-900 dark:text-white">Status</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fade-in">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800 dark:text-green-400">{{ successMessage }}</p>
          </div>
          <button 
            @click="successMessage = ''" 
            class="ml-auto flex-shrink-0 text-green-400 hover:text-green-600 dark:hover:text-green-300"
          >
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fade-in">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-red-800 dark:text-red-400">{{ errorMessage }}</p>
          </div>
          <button 
            @click="errorMessage = ''" 
            class="ml-auto flex-shrink-0 text-red-400 hover:text-red-600 dark:hover:text-red-300"
          >
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Users Table -->
      <div
        class="bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
        style="border-radius: 7px"
      >
        <div class="overflow-x-auto">
          <table class="w-full min-w-[600px] sm:min-w-[800px]">
            <thead class="bg-[#FFFFFF] dark:bg-[#09090B] border-b dark:border-gray-800">
              <tr class="!h-[37px] bg-[#F9FAFB] dark:bg-[#18181B]">
                <th class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2 text-left align-middle">
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
                    <span>Email</span>
                  </div>
                </th>
                <th
                  class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  <div class="flex items-center space-x-1">
                    <span>Role</span>
                  </div>
                </th>
                <th
                  class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  <div class="flex items-center space-x-1">
                    <span>Permissions</span>
                  </div>
                </th>
                <th
                  class="px-2 sm:px-3 lg:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  <div class="flex items-center space-x-1">
                    <span>Status</span>
                  </div>
                </th>
                <th class="w-10 sm:w-12 px-2 sm:px-3 lg:px-4 py-2"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <!-- Loading State -->
              <tr v-if="isLoading">
                <td colspan="6" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Loading users...
                </td>
              </tr>
              
              <!-- Empty State -->
              <tr v-else-if="!isLoading && filteredUsers.length === 0">
                <td colspan="6" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {{ errorMessage || 'No users found.' }}
                </td>
              </tr>
              
              <!-- Data Rows -->
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <input
                    type="checkbox"
                    v-model="user.selected"
                    class="border-gray-300"
                    style="border-radius: 7px"
                  />
                </td>
                <td
                  class="px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-white"
                  style="
                    font-size: 14px;
                    font-weight: 400;
                    font-style: normal;
                    line-height: 20px;
                    font-family: 'Geist', sans-serif;
                    letter-spacing: 0;
                  "
                >
                  {{ user.email }}
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
                  {{ user.role || 'subadmin' }}
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
                  {{ getPermissionsSummary(user.permissions) }}
                </td>
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black text-white border border-black"
                  >
                    Active
                  </span>
                </td>
                <td class="px-2 sm:px-3 lg:px-4 py-2">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="editUser(user)"
                      class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      title="Edit"
                    >
                      <Pencil class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      @click="deleteUserConfirm(user)"
                      class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      title="Delete"
                    >
                      <Trash2 class="h-4 w-4 text-gray-600 dark:text-gray-400" />
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
        <div class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
          {{ selectedCount }} of {{ users.length }} row(s) selected.
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
  </DashboardLayout>
</template>

<script setup>
import { Plus, Columns, Pencil, Trash2 } from "lucide-vue-next";
import { useUsersApi } from "~/composables/useUsersApi";

useHead({
  title: "Users - iVisa",
});

const { getAllUsers, deleteUser } = useUsersApi();
const users = ref([]);

const searchQuery = ref("");
const selectAll = ref(false);
const currentPage = ref(1);
const columnsDropdownOpen = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const loadUsers = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    
    const response = await getAllUsers();
    
    if (response.success && response.data) {
      users.value = response.data.map((user) => ({
        ...user,
        selected: false,
      }));
    } else {
      users.value = [];
      errorMessage.value = response.message || "Failed to load users";
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Failed to load users. Please try again.";
    users.value = [];
  } finally {
    isLoading.value = false;
  }
};

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;

  return users.value.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (user.fullName && user.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

const selectedCount = computed(() => {
  return users.value.filter((user) => user.selected).length;
});

const getPermissionsSummary = (permissions) => {
  if (!permissions) return "None";
  const enabledPermissions = Object.keys(permissions).filter(key => permissions[key]);
  if (enabledPermissions.length === 0) return "None";
  if (enabledPermissions.length === Object.keys(permissions).length) return "All";
  return `${enabledPermissions.length} sections`;
};

const router = useRouter();

const navigateToAddUser = () => {
  router.push("/dashboard/users/add");
};

const editUser = (user) => {
  router.push(`/dashboard/users/add?id=${user.id}&mode=edit`);
};

const successMessage = ref("");

const deleteUserConfirm = async (user) => {
  if (confirm(`Are you sure you want to delete user ${user.email}?`)) {
    try {
      const response = await deleteUser(user.id);
      if (response.success) {
        successMessage.value = "User deleted successfully!";
        setTimeout(() => {
          successMessage.value = "";
        }, 3000);
        await loadUsers();
      } else {
        errorMessage.value = response.message || "Failed to delete user";
      }
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : "Failed to delete user";
    }
  }
};

// Auto-dismiss error messages after 5 seconds
watch(errorMessage, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      errorMessage.value = "";
    }, 5000);
  }
});

const toggleColumnsDropdown = () => {
  columnsDropdownOpen.value = !columnsDropdownOpen.value;
};

watch(selectAll, (newValue) => {
  users.value.forEach((user) => {
    user.selected = newValue;
  });
});

onMounted(() => {
  loadUsers();
});

onActivated(() => {
  loadUsers();
});
</script>

