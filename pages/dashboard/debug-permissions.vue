<template>
  <DashboardLayout>
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6 dark:text-white">Debug Permissions</h1>
      
      <div class="space-y-6">
        <!-- Current User Info -->
        <div class="bg-white dark:bg-[#09090B] p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 class="text-lg font-semibold mb-4 dark:text-white">Current User Data (from Cookie)</h2>
          <pre class="bg-gray-100 dark:bg-[#18181B] p-4 rounded overflow-x-auto text-sm">{{ JSON.stringify(currentUser, null, 2) }}</pre>
        </div>

        <!-- Permissions Check -->
        <div class="bg-white dark:bg-[#09090B] p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 class="text-lg font-semibold mb-4 dark:text-white">Permission Checks</h2>
          <div class="space-y-2 text-sm">
            <p class="dark:text-white"><strong>Is Super Admin:</strong> {{ isSuperAdmin() }}</p>
            <p class="dark:text-white"><strong>Has Countries Permission:</strong> {{ hasPermission('countries') }}</p>
            <p class="dark:text-white"><strong>Has Applications Permission:</strong> {{ hasPermission('applications') }}</p>
            <p class="dark:text-white"><strong>All Permissions:</strong></p>
            <pre class="bg-gray-100 dark:bg-[#18181B] p-4 rounded overflow-x-auto">{{ JSON.stringify(getUserPermissions(), null, 2) }}</pre>
          </div>
        </div>

        <!-- Token Info -->
        <div class="bg-white dark:bg-[#09090B] p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 class="text-lg font-semibold mb-4 dark:text-white">Token Status</h2>
          <div class="space-y-2 text-sm dark:text-white">
            <p><strong>Is Authenticated:</strong> {{ isAuthenticated() }}</p>
            <p><strong>Token Exists:</strong> {{ !!tokenValue }}</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white dark:bg-[#09090B] p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 class="text-lg font-semibold mb-4 dark:text-white">Actions</h2>
          <div class="space-y-3">
            <button
              @click="refreshProfile"
              :disabled="isRefreshing"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {{ isRefreshing ? 'Refreshing...' : 'Refresh Profile from Backend' }}
            </button>
            
            <button
              @click="forceLogout"
              class="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Force Logout & Clear Cookies
            </button>

            <div v-if="refreshMessage" class="mt-2 p-3 rounded" :class="refreshSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
              {{ refreshMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { useAuthApi } from '~/composables/useAuthApi'
import { usePermissions } from '~/composables/usePermissions'

useHead({
  title: 'Debug Permissions - iVisa',
})

const { getCurrentUser, isAuthenticated, getAdminProfile, logout } = useAuthApi()
const { getUserPermissions, hasPermission, isSuperAdmin } = usePermissions()

const currentUser = ref(null)
const tokenValue = ref(null)
const isRefreshing = ref(false)
const refreshMessage = ref('')
const refreshSuccess = ref(false)

const loadUserData = () => {
  currentUser.value = getCurrentUser()
  const tokenCookie = useCookie('admin_auth_token')
  tokenValue.value = tokenCookie.value
}

const refreshProfile = async () => {
  const user = getCurrentUser()
  if (!user || !user.id) {
    refreshMessage.value = 'No user ID found. Please login again.'
    refreshSuccess.value = false
    return
  }

  isRefreshing.value = true
  refreshMessage.value = ''
  
  try {
    const response = await getAdminProfile(user.id)
    if (response.success) {
      refreshMessage.value = 'Profile refreshed successfully! Please reload the page.'
      refreshSuccess.value = true
      // Reload user data
      setTimeout(() => {
        loadUserData()
      }, 500)
    } else {
      refreshMessage.value = 'Failed to refresh profile: ' + (response.message || 'Unknown error')
      refreshSuccess.value = false
    }
  } catch (error) {
    refreshMessage.value = 'Error: ' + (error instanceof Error ? error.message : 'Unknown error')
    refreshSuccess.value = false
  } finally {
    isRefreshing.value = false
  }
}

const forceLogout = () => {
  logout()
  refreshMessage.value = 'Logged out. Redirecting to login...'
  refreshSuccess.value = true
  setTimeout(() => {
    navigateTo('/login')
  }, 1000)
}

onMounted(() => {
  loadUserData()
})
</script>

