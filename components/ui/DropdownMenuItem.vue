<template>
  <button
    :class="itemClasses"
    @click="handleClick"
    class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const itemClasses = computed(() => {
  return props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
})

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>
