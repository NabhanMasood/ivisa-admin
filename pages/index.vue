<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">
        iVisa Frontend
      </h1>
      <p class="text-xl text-gray-600">
        Welcome to your Project Management System
      </p>
    </div>
  </div>
</template>

<script setup>
// Page metadata
useHead({
  title: 'iVisa Frontend - Home',
  meta: [
    { name: 'description', content: 'IVisa Frontend - Management System' }
  ]
})

// Redirect to login page after a short delay
onMounted(() => {
  setTimeout(() => {
    navigateTo('/login')
  }, 2000) // 2 second delay to show the welcome message
})
</script>