<template>
  <th 
    :class="headClasses"
    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
  >
    <slot />
  </th>
</template>

<script setup>
const props = defineProps({
  class: {
    type: String,
    default: ''
  }
})

const headClasses = computed(() => {
  return props.class
})
</script>
