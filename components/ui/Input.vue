<template>
  <div class="space-y-1">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :class="inputClasses"
      :style="computedInputStyle"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <!-- Fixed height error container to prevent layout shift -->
    <div class="">
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    </div>
    <!-- Fixed height help container to prevent layout shift -->
   
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  help: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  inputStyle: {
    type: [String, Object],
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => {
  const baseClasses = 'block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200'
  const stateClasses = props.error 
    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 hover:border-red-400' 
    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 focus:border-blue-500'
  const disabledClasses = props.disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
  
  return `${baseClasses} ${stateClasses} ${disabledClasses}`
})

const computedInputStyle = computed(() => {
  const baseStyle = {
    borderRadius: '8px',
    border: '1px solid #D0D5DD',
    opacity: 1,
    gap: '8px',
    padding: '12px 16px',
    color: '#101828',
    background: '#FFFFFF',
    boxShadow: '0px 1px 2px 0px #1018280D',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0%',
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  }
  
  // Merge with custom inputStyle if provided
  if (props.inputStyle && typeof props.inputStyle === 'object') {
    return { ...baseStyle, ...props.inputStyle }
  }
  
  return baseStyle
})
</script>

<style scoped>
input::placeholder {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: #667085;
  opacity: 1;
}

input:focus {
  border-color: #3B82F6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

input:hover:not(:focus) {
  border-color: #60A5FA !important;
}
</style>
