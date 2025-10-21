<template>
  <div :class="avatarClasses">
    <img 
      v-if="src" 
      :src="src" 
      :alt="alt"
      class="h-full w-full rounded-full object-cover"
    />
    <div 
      v-else-if="fallback"
      class="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium"
    >
      {{ fallback }}
    </div>
    <div 
      v-else
      class="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  fallback: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['sm', 'default', 'lg', 'xl'].includes(value)
  }
})

const avatarClasses = computed(() => {
  const sizes = {
    sm: 'h-8 w-8',
    default: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }
  
  return `relative flex shrink-0 overflow-hidden rounded-full ${sizes[props.size]}`
})
</script>
