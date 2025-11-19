<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#09090B]">
    <div class="max-w-md w-full p-8 bg-white dark:bg-[#18181B] rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
      <h1 class="text-2xl font-bold text-center mb-6 dark:text-white">Clear Cookies</h1>
      
      <div class="space-y-4">
        <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
          This will clear all authentication cookies and redirect you to login.
        </p>
        
        <button
          @click="clearAndRedirect"
          class="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Clear Cookies & Logout
        </button>
        
        <div v-if="message" class="p-3 rounded-lg" :class="success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const message = ref('')
const success = ref(false)

const clearAndRedirect = () => {
  try {
    // Clear all cookies
    const authToken = useCookie('admin_auth_token')
    const adminInfo = useCookie('admin_user_info')
    
    authToken.value = null
    adminInfo.value = null
    
    message.value = 'Cookies cleared! Redirecting to login...'
    success.value = true
    
    setTimeout(() => {
      navigateTo('/login')
    }, 1500)
  } catch (error) {
    message.value = 'Error clearing cookies: ' + error.message
    success.value = false
  }
}
</script>

