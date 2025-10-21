<template>
  <div class="flex items-center">
    <input
      :id="checkboxId"
      v-model="isChecked"
      type="checkbox"
      :class="checkboxClasses"
      :disabled="disabled"
      @change="$emit('update:modelValue', isChecked)"
    />
    <label v-if="label" :for="checkboxId" class="ml-2 text-sm text-gray-700">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const checkboxId = computed(() => `checkbox-${Math.random().toString(36).substr(2, 9)}`)

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const checkboxClasses = computed(() => {
  const baseClasses = 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  return `${baseClasses} ${disabledClasses}`
})
</script>

