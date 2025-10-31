<template>
  <div class="flex flex-col gap-2">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700 dark:text-white"
    >
      {{ label }}
    </label>
    <div class="relative">
      <button 
        @click="toggleDropdown"
        :class="[
          'w-full h-[36px] bg-white dark:bg-[#18181B] border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white px-3 py-2 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors flex items-center justify-between text-sm rounded-[6px]',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        ]"
        :disabled="disabled"
      >
        <span>{{ selectedLabel || placeholder || 'Select' }}</span>
        <ChevronDown class="h-4 w-4 text-gray-400" />
      </button>

      <div v-if="isOpen"
        :class="[
          'absolute left-0 z-10 w-full bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg',
          dropdownPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
        ]"
        style="border-radius: 5px"
        ref="dropdownRef">
  
        <div v-if="searchable" class="p-1 border-b border-gray-200 dark:border-[#27272B]">
          <div class="relative">
            <Search class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input 
              v-model="searchQuery"
              type="text" 
              :placeholder="searchPlaceholder"
              class="w-full h-8 pl-[33px] text-sm border-none dark:border-gray-600 bg-white dark:bg-[#09090B] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#09090B]"
              style="border-radius: 5px" />
          </div>
        </div>

        <div class="py-1 max-h-48 overflow-y-auto">
          <button
            v-for="option in filteredOptions"
            :key="getOptionValue(option)"
            @click="selectOption(option)"
            class="w-full text-left px-3 py-2 hover:bg-[#E4E4E8] dark:hover:bg-[#18181B] cursor-pointer text-sm text-gray-900 dark:text-white"
            style="border-radius: 5px; margin: 3px"
          >
            {{ getOptionLabel(option) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDown, Search } from "lucide-vue-next";

// Props
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number, Object],
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Select'
  },
  searchable: {
    type: Boolean,
    default: true
  },
  searchPlaceholder: {
    type: String,
    default: 'Search...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  optionLabel: {
    type: String,
    default: 'label'
  },
  optionValue: {
    type: String,
    default: 'value'
  }
});

// Emits
const emit = defineEmits(['update:modelValue', 'change']);

// Reactive data
const isOpen = ref(false);
const searchQuery = ref('');
const dropdownPosition = ref('bottom');
const dropdownRef = ref(null);

// Computed
const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options;
  }
  
  return props.options.filter(option => {
    const label = getOptionLabel(option).toLowerCase();
    return label.includes(searchQuery.value.toLowerCase());
  });
});

const selectedLabel = computed(() => {
  if (!props.modelValue) return '';
  
  const selectedOption = props.options.find(option => 
    getOptionValue(option) === props.modelValue
  );
  
  return selectedOption ? getOptionLabel(selectedOption) : props.modelValue;
});

// Methods
const calculatePosition = () => {
  if (!dropdownRef.value) return;
  
  const rect = dropdownRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const spaceBelow = viewportHeight - rect.bottom;
  const spaceAbove = rect.top;
  
  // If there's not enough space below (less than 200px) and more space above, position on top
  if (spaceBelow < 200 && spaceAbove > spaceBelow) {
    dropdownPosition.value = 'top';
  } else {
    dropdownPosition.value = 'bottom';
  }
};

const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  
  if (isOpen.value) {
    // Use nextTick to ensure DOM is updated before calculating position
    nextTick(() => {
      calculatePosition();
    });
  }
};

const getOptionLabel = (option) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option;
  }
  return option[props.optionLabel] || option.label || option.name || option;
};

const getOptionValue = (option) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option;
  }
  return option[props.optionValue] || option.value || option.id || option;
};

const selectOption = (option) => {
  const value = getOptionValue(option);
  emit('update:modelValue', value);
  emit('change', value);
  isOpen.value = false;
  searchQuery.value = '';
};

// Click outside to close
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isOpen.value = false;
  }
};

// Handle window resize to recalculate position
const handleResize = () => {
  if (isOpen.value) {
    calculatePosition();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', handleResize);
});
</script>
