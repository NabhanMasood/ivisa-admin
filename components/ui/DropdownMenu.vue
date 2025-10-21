<template>
  <div class="relative inline-block text-left">
    <button
      @click="toggleDropdown"
      class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    >
      <slot name="trigger" />
    </button>
    
    <div
      v-if="isOpen"
      class="absolute right-0 z-10 mt-1 origin-top-right rounded-md border bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style="border: none; border-radius: 6px;"
    >
      <div class="">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
      isOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>
