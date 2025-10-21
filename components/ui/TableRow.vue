<template>
  <tr 
    :class="rowClasses"
    class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
  >
    <slot />
  </tr>
</template>

<script setup>
const props = defineProps({
  selected: {
    type: Boolean,
    default: false
  }
})

const rowClasses = computed(() => {
  return props.selected ? 'data-[state=selected]:bg-muted' : ''
})
</script>
