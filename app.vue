<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// Redirect to dashboard if on root pathh
onMounted(() => {
  const route = useRoute()
  if (route.path === '/') {
    navigateTo('/dashboard')

  }
})
</script>
