<template>
  <td 
    :class="cellClasses"
    class="p-4 align-middle [&:has([role=checkbox])]:pr-0"
  >
    <slot />
  </td>
</template>

<script setup>
const props = defineProps({
  class: {
    type: String,
    default: ''
  }
})

const cellClasses = computed(() => {
  return props.class
})
</script>
