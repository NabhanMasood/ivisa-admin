<template>
  <DashboardLayout>
    <div class="flex flex-col gap-4 max-w-[796px] items-center justify-center mx-auto">
      <!-- Page Header with Back Button -->
      <div class="flex flex-row items-center justify-between w-full gap-2 sm:gap-4">
        <div class="flex items-center gap-3">
          <button
            @click="goBack"
            class="p-2 hover:bg-[#E4E4E8] dark:hover:bg-[#2F2F31] transition-colors border border-gray-200 dark:border-gray-800 w-[42px] h-[36px] flex items-center justify-center"
            style="border-radius: 5px"
            title="Go back"
          >
            <ArrowLeft class="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>
          <div class="flex-1 min-w-0">
            <h1
              class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white"
            >
              {{ isEditMode ? "Edit Additional Info Form" : "Add Additional Info Form" }}
            </h1>
            <label
              v-if="isEditMode && visaProductName"
              class="text-[#475467] dark:text-white text-[10px] sm:text-base leading-[12px] sm:leading-6"
              style="font-weight: 400; letter-spacing: 0%"
            >
              {{ visaProductName }}
            </label>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="goBack"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 bg-[#F1F1F1] dark:bg-[#18181B] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2F2F31] transition-colors"
          >
            Discard
          </button>
          <button
            @click="saveForm"
            :disabled="isLoading || (!isEditMode && !selectedVisaProductId)"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span v-if="isLoading" class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            {{ isLoading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
      >
        <p class="text-sm text-red-800 dark:text-red-200">{{ errorMessage }}</p>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
      >
        <p class="text-sm text-green-800 dark:text-green-200">{{ successMessage }}</p>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoadingFields"
        class="w-full bg-white dark:bg-[#09090B] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden flex items-center justify-center py-12"
        style="border-radius: 7px"
      >
        <div class="flex flex-col items-center gap-3">
          <div class="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin"></div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Loading form fields...</p>
        </div>
      </div>

      <!-- Form Section -->
      <div v-if="!isLoadingFields" class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 py-[30px] px-[34px]">
        <div class="space-y-6">
          <!-- Visa Product Selection (only for add mode) -->
          <div v-if="!isEditMode">
            <h3 class="text-base font-medium text-gray-900 dark:text-white mb-[30px]">
              Select Visa Product
            </h3>
            <div class="flex flex-col gap-6">
              <div>
                <CustomDropdown
                  id="visaProduct"
                  label="Visa Product"
                  v-model="selectedVisaProductId"
                  :options="visaProductOptions"
                  placeholder="Select a visa product"
                  search-placeholder="Search visa product"
                />
                <p v-if="fieldErrors.visaProduct" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fieldErrors.visaProduct }}</p>
              </div>
            </div>
          </div>

          <!-- Visa Product Info (Read-only for edit mode) -->
          <div v-if="isEditMode">
            <h3 class="text-base font-medium text-gray-900 dark:text-white mb-[30px]">
              Visa Product
            </h3>
            <div class="flex flex-col gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Selected Visa Product
                </label>
                <input
                  :value="visaProductName"
                  type="text"
                  disabled
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm cursor-not-allowed"
                  style="border-radius: 7px"
                />
              </div>
            </div>
          </div>

          <!-- Fields Section -->
          <div v-if="isEditMode || selectedVisaProductId">
            <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div class="flex flex-col gap-1">
                <h3 class="text-base font-medium text-gray-900 dark:text-white">
                  Form Fields
                  <span v-if="isEditMode && fields.length > 0" class="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ({{ fields.length }} field{{ fields.length !== 1 ? 's' : '' }})
                  </span>
                </h3>
                <p v-if="isEditMode && fields.length > 1" class="text-xs text-gray-500 dark:text-gray-400">
                  Drag the <GripVertical class="inline h-3 w-3" /> icon to reorder fields
                </p>
              </div>
              <div class="flex items-center gap-2">
                <!-- Expand All / Collapse All buttons (only in edit mode with fields) -->
                <template v-if="isEditMode && fields.length > 0">
                  <button
                    v-if="expandedFields.size < fields.length"
                    @click="expandAllFields"
                    class="px-3 py-1.5 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                    title="Expand all fields"
                  >
                    <ChevronDown class="h-4 w-4" />
                    Expand All
                  </button>
                  <button
                    v-else-if="expandedFields.size > 0"
                    @click="collapseAllFields"
                    class="px-3 py-1.5 text-sm font-medium rounded-[6px] text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                    title="Collapse all fields"
                  >
                    <ChevronUp class="h-4 w-4" />
                    Collapse All
                  </button>
                </template>
                <button
                  @click="addField"
                  class="px-3 py-1.5 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Plus class="h-4 w-4" />
                  Add Field
                </button>
              </div>
            </div>

            <div v-if="fields.length === 0" class="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <div class="flex flex-col items-center gap-4">
                <p class="text-base text-gray-600 dark:text-gray-400">No fields added yet.</p>
                <button
                  @click="addField"
                  class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Plus class="h-4 w-4" />
                  Add Your First Field
                </button>
              </div>
            </div>

            <div v-if="fields.length > 0" class="space-y-4">
              <div
                v-for="(field, index) in fields"
                :key="field.tempId || field.id"
                @dragover="handleDragOver(index, $event)"
                @dragleave="handleDragLeave"
                @drop="handleDrop(index, $event)"
                class="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#18181B] transition-all relative group"
                :class="{
                  'opacity-50 scale-95 shadow-lg': draggedFieldIndex === index,
                  'ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 bg-blue-50/50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600': dragOverIndex === index && draggedFieldIndex !== index && draggedFieldIndex !== null,
                  'cursor-pointer': !isEditMode
                }"
              >
                <!-- Drag Handle (only in edit mode when collapsed) -->
                <div
                  v-if="isEditMode && !isFieldExpanded(field)"
                  :draggable="true"
                  @dragstart="handleDragStart(index, $event)"
                  @dragend="handleDragEnd($event)"
                  @mousedown.stop
                  @click.stop
                  class="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 z-10 transition-colors p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Drag to reorder"
                  role="button"
                  tabindex="0"
                  @keydown.enter.prevent
                  @keydown.space.prevent
                >
                  <GripVertical class="h-5 w-5" />
                </div>

                <!-- Field Header (always visible) -->
                <div 
                  class="flex items-center justify-between p-4 transition-colors"
                  :class="{
                    'border-b border-gray-200 dark:border-gray-700': isEditMode && !isFieldExpanded(field),
                    'hover:bg-gray-100 dark:hover:bg-[#2F2F31]': !isEditMode || (isEditMode && draggedFieldIndex === null),
                    'pl-10': isEditMode,
                    'cursor-pointer': !isEditMode || (isEditMode && field.question && draggedFieldIndex === null)
                  }"
                  @click="isEditMode && field.question && draggedFieldIndex === null && toggleField(field)"
                >
                  <div class="flex items-center gap-3 flex-1 min-w-0">
                    <div class="flex-shrink-0">
                      <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                        #{{ index + 1 }}
                      </span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {{ field.question || 'Untitled Field' }}
                        </span>
                        <span 
                          v-if="field.id" 
                          class="px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                        >
                          Existing
                        </span>
                        <span 
                          v-else 
                          class="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded"
                        >
                          New
                        </span>
                        <span 
                          class="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded capitalize"
                        >
                          {{ field.fieldType }}
                        </span>
                        <span 
                          v-if="field.isRequired"
                          class="px-2 py-0.5 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded"
                        >
                          Required
                        </span>
                        <span 
                          v-if="isEditMode && !field.isActive"
                          class="px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                        >
                          Inactive
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 flex-shrink-0 ml-4">
                    <!-- Expand/Collapse Button (only in edit mode) -->
                    <button
                      v-if="isEditMode"
                      @click.stop="toggleField(field)"
                      class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                      :title="isFieldExpanded(field) ? 'Collapse' : 'Expand to edit'"
                    >
                      <ChevronDown 
                        v-if="!isFieldExpanded(field)"
                        class="h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform"
                      />
                      <ChevronUp 
                        v-else
                        class="h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform"
                      />
                    </button>
                    <!-- Edit Button (only in edit mode when collapsed) -->
                    <button
                      v-if="isEditMode && !isFieldExpanded(field)"
                      @click.stop="toggleField(field)"
                      class="px-3 py-1.5 text-sm font-medium rounded-[6px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center gap-2"
                      title="Edit field"
                    >
                      <Edit2 class="h-4 w-4" />
                      Edit
                    </button>
                    <!-- Delete Button -->
                    <button
                      @click.stop="removeField(index)"
                      class="px-3 py-1.5 text-sm font-medium rounded-[6px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center gap-2"
                      title="Delete field"
                    >
                      <Trash2 class="h-4 w-4" />
                      <span v-if="!isEditMode || isFieldExpanded(field)">Delete</span>
                    </button>
                  </div>
                </div>

                <!-- Field Details (expanded in add mode, or when expanded in edit mode) -->
                <div 
                  v-if="!isEditMode || isFieldExpanded(field)"
                  class="p-4 pt-0 space-y-4"
                  :class="{ 'border-t border-gray-200 dark:border-gray-700 mt-0': isEditMode }"
                >
                  <!-- Question/Statement -->
                  <div>
                    <label
                      :for="`question-${getFieldId(field)}`"
                      class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                    >
                      Question/Statement <span class="text-red-500">*</span>
                    </label>
                    <input
                      :id="`question-${getFieldId(field)}`"
                      v-model="field.question"
                      type="text"
                      placeholder="e.g. What is your passport number?"
                      class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                      :data-field-id="getFieldId(field)"
                    />
                    <p v-if="fieldErrors[`field-${getFieldId(field)}-question`]" class="text-xs text-red-600 dark:text-red-400 mt-1">
                      {{ fieldErrors[`field-${getFieldId(field)}-question`] }}
                    </p>
                  </div>

                  <!-- Field Type -->
                  <div>
                    <label
                      :for="`type-${getFieldId(field)}`"
                      class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                    >
                      Field Type <span class="text-red-500">*</span>
                    </label>
                    <CustomDropdown
                      :id="`type-${getFieldId(field)}`"
                      v-model="field.fieldType"
                      :options="fieldTypeOptions"
                      placeholder="Select field type"
                    />
                    <p v-if="fieldErrors[`field-${getFieldId(field)}-type`]" class="text-xs text-red-600 dark:text-red-400 mt-1">
                      {{ fieldErrors[`field-${getFieldId(field)}-type`] }}
                    </p>
                  </div>

                  <!-- Required Checkbox -->
                  <div class="flex items-center gap-2">
                    <input
                      :id="`required-${getFieldId(field)}`"
                      v-model="field.isRequired"
                      type="checkbox"
                      class="w-4 h-4 border-gray-300 rounded"
                    />
                    <label
                      :for="`required-${getFieldId(field)}`"
                      class="text-sm text-gray-700 dark:text-white"
                    >
                      Required field
                    </label>
                  </div>

                  <!-- Active Checkbox (only for edit mode) -->
                  <div v-if="isEditMode" class="flex items-center gap-2">
                    <input
                      :id="`active-${getFieldId(field)}`"
                      v-model="field.isActive"
                      type="checkbox"
                      class="w-4 h-4 border-gray-300 rounded"
                    />
                    <label
                      :for="`active-${getFieldId(field)}`"
                      class="text-sm text-gray-700 dark:text-white"
                    >
                      Active
                    </label>
                  </div>

                  <!-- Display Order -->
                  <div>
                    <label
                      :for="`order-${getFieldId(field)}`"
                      class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                    >
                      Display Order
                    </label>
                    <input
                      :id="`order-${getFieldId(field)}`"
                      v-model.number="field.displayOrder"
                      type="number"
                      min="0"
                      placeholder="0"
                      class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                    />
                  </div>

                  <!-- Dropdown Options (only for dropdown type) -->
                  <div v-if="field.fieldType === 'dropdown'">
                    <label
                      :for="`options-${getFieldId(field)}`"
                      class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                    >
                      Options <span class="text-red-500">*</span>
                      <span class="text-xs text-gray-500">(comma-separated)</span>
                    </label>
                    <input
                      :id="`options-${getFieldId(field)}`"
                      v-model="field.optionsText"
                      type="text"
                      placeholder="e.g. Option 1, Option 2, Option 3"
                      class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                    />
                    <p v-if="fieldErrors[`field-${getFieldId(field)}-options`]" class="text-xs text-red-600 dark:text-red-400 mt-1">
                      {{ fieldErrors[`field-${getFieldId(field)}-options`] }}
                    </p>
                  </div>

                  <!-- Min/Max Length (for text and number) -->
                  <div v-if="field.fieldType === 'text' || field.fieldType === 'number' || field.fieldType === 'textarea'" class="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        :for="`minLength-${getFieldId(field)}`"
                        class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                      >
                        Min Length
                      </label>
                      <input
                        :id="`minLength-${getFieldId(field)}`"
                        v-model.number="field.minLength"
                        type="number"
                        min="0"
                        placeholder="0"
                        class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                      />
                    </div>
                    <div>
                      <label
                        :for="`maxLength-${getFieldId(field)}`"
                        class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                      >
                        Max Length
                      </label>
                      <input
                        :id="`maxLength-${getFieldId(field)}`"
                        v-model.number="field.maxLength"
                        type="number"
                        min="0"
                        placeholder="0"
                        class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                      />
                    </div>
                  </div>

                  <!-- File Upload Settings (for upload type) -->
                  <div v-if="field.fieldType === 'upload'" class="space-y-4">
                    <div>
                      <label
                        :for="`fileTypes-${getFieldId(field)}`"
                        class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                      >
                        Allowed File Types
                        <span class="text-xs text-gray-500">(comma-separated, e.g. pdf,jpg,png)</span>
                      </label>
                      <input
                        :id="`fileTypes-${getFieldId(field)}`"
                        v-model="field.allowedFileTypesText"
                        type="text"
                        placeholder="pdf, jpg, png"
                        class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                      />
                    </div>
                    <div>
                      <label
                        :for="`maxFileSize-${getFieldId(field)}`"
                        class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                      >
                        Max File Size (MB)
                      </label>
                      <input
                        :id="`maxFileSize-${getFieldId(field)}`"
                        v-model.number="field.maxFileSizeMB"
                        type="number"
                        min="0"
                        placeholder="5"
                        class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "~/components/DashboardLayout.vue";
import { ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp, Edit2, GripVertical } from "lucide-vue-next";
import { useVisaProductFieldsApi, type CreateVisaProductFieldDto, type UpdateVisaProductFieldDto, type VisaProductField } from "~/composables/useVisaProductFieldsApi";
import { useVisaProductsApi } from "~/composables/useVisaProductsApi";
import CustomDropdown from "~/components/ui/CustomDropdown.vue";

const route = useRoute();
const router = useRouter();

// Determine mode based on route query parameters
const isEditMode = computed(() => route.query.mode === "edit");
const visaProductId = computed(() => {
  if (isEditMode.value) {
    const id = route.query.visaProductId || route.query.id;
    return id ? String(id) : null;
  }
  return null;
});

// Set page title
const pageTitle = computed(() => {
  return isEditMode.value ? "Edit Additional Info Form - iVisa" : "Add Additional Info Form - iVisa";
});

useHead({
  title: pageTitle,
});

// Initialize APIs
const { createVisaProductField, getVisaProductFieldsByVisaProduct, updateVisaProductField, deleteVisaProductField } = useVisaProductFieldsApi();
const { getVisaProducts, getVisaProductById } = useVisaProductsApi();

// Reactive state
const isLoading = ref(false);
const isLoadingFields = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const fieldErrors = ref<Record<string, string>>({});
const selectedVisaProductId = ref<string | number | null>(null);
const visaProductOptions = ref<Array<{ value: string | number; label: string }>>([]);
const visaProductName = ref("");
const fields = ref<Array<{
  id?: number;
  tempId?: string;
  question: string;
  fieldType: string;
  isRequired: boolean;
  isActive: boolean;
  displayOrder: number;
  optionsText?: string;
  minLength?: number;
  maxLength?: number;
  allowedFileTypesText?: string;
  maxFileSizeMB?: number;
}>>([]);

let tempIdCounter = 0;

// Track expanded fields by their unique ID (only for edit mode)
const expandedFields = ref<Set<string | number>>(new Set());

// Drag and drop state
const draggedFieldIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);

// Get field unique ID
const getFieldId = (field: { id?: number; tempId?: string }) => {
  return field.id || field.tempId || '';
};

// Toggle field expansion
const toggleField = (field: { id?: number; tempId?: string }) => {
  const fieldId = getFieldId(field);
  if (expandedFields.value.has(fieldId)) {
    expandedFields.value.delete(fieldId);
  } else {
    expandedFields.value.add(fieldId);
  }
};

// Check if field is expanded
const isFieldExpanded = (field: { id?: number; tempId?: string }) => {
  const fieldId = getFieldId(field);
  return expandedFields.value.has(fieldId);
};

// Expand all fields
const expandAllFields = () => {
  fields.value.forEach((field) => {
    const fieldId = getFieldId(field);
    expandedFields.value.add(fieldId);
  });
};

// Collapse all fields
const collapseAllFields = () => {
  expandedFields.value.clear();
};

// Drag and drop handlers
const handleDragStart = (index: number, event: DragEvent) => {
  if (!isEditMode.value) return;
  draggedFieldIndex.value = index;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(index));
    // Create a custom drag image (optional - browser will use default)
    if (event.target && event.dataTransfer) {
      const target = event.target as HTMLElement;
      // Set drag image opacity
      event.dataTransfer.setDragImage(target, 0, 0);
    }
  }
};

const handleDragEnd = (event: DragEvent) => {
  // Small delay to ensure drop animation completes
  setTimeout(() => {
    draggedFieldIndex.value = null;
    dragOverIndex.value = null;
  }, 100);
};

const handleDragOver = (index: number, event: DragEvent) => {
  if (!isEditMode.value || draggedFieldIndex.value === null) return;
  event.preventDefault();
  event.stopPropagation();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
  // Update dragOverIndex to show visual feedback
  if (dragOverIndex.value !== index) {
    dragOverIndex.value = index;
  }
};

const handleDragLeave = () => {
  dragOverIndex.value = null;
};

const handleDrop = (targetIndex: number, event: DragEvent) => {
  if (!isEditMode.value || draggedFieldIndex.value === null) return;
  event.preventDefault();
  event.stopPropagation();
  
  const sourceIndex = draggedFieldIndex.value;
  
  if (sourceIndex === targetIndex) {
    dragOverIndex.value = null;
    draggedFieldIndex.value = null;
    return;
  }
  
  // Get the field being moved and its expanded state
  const fieldToMove = fields.value[sourceIndex];
  const wasExpanded = isFieldExpanded(fieldToMove);
  const fieldId = getFieldId(fieldToMove);
  
  // Reorder fields
  fields.value.splice(sourceIndex, 1);
  fields.value.splice(targetIndex, 0, fieldToMove);
  
  // Update display orders
  fields.value.forEach((field, index) => {
    // Use index for displayOrder but keep field.id for identification
    field.displayOrder = index;
  });
  
  // Restore expanded state if it was expanded
  if (wasExpanded) {
    expandedFields.value.add(fieldId);
  }
  
  // Clean up drag state
  dragOverIndex.value = null;
  draggedFieldIndex.value = null;
};

// Field type options
const fieldTypeOptions = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'upload', label: 'Upload' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'textarea', label: 'Textarea' },
];

// Load visa products (only for add mode)
const loadVisaProducts = async () => {
  if (isEditMode.value) return;
  
  try {
    const response = await getVisaProducts();
    if (response.success && response.data) {
      visaProductOptions.value = response.data.map(product => ({
        value: product.id!,
        label: `${product.productName} (${product.country})`,
      }));
    }
  } catch (error) {
    console.error('Failed to load visa products:', error);
  }
};

// Load existing fields (for edit mode)
const loadFields = async () => {
  if (!isEditMode.value || !visaProductId.value) return;
  
  try {
    isLoadingFields.value = true;
    errorMessage.value = '';

    // Load visa product name
    try {
      const productResponse = await getVisaProductById(visaProductId.value);
      if (productResponse.success && productResponse.data) {
        visaProductName.value = `${productResponse.data.productName} (${productResponse.data.country})`;
        selectedVisaProductId.value = productResponse.data.id!;
      }
    } catch (error) {
      console.error('Failed to load visa product:', error);
    }

    // Load fields
    const fieldsResponse = await getVisaProductFieldsByVisaProduct(visaProductId.value);
    
    if (fieldsResponse.success && fieldsResponse.data && fieldsResponse.data.length > 0) {
      fields.value = fieldsResponse.data
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
        .map(field => ({
          id: field.id,
          question: field.question,
          fieldType: field.fieldType,
          isRequired: field.isRequired || false,
          isActive: field.isActive !== undefined ? field.isActive : true,
          displayOrder: field.displayOrder || 0,
          optionsText: field.options ? field.options.join(', ') : '',
          minLength: field.minLength,
          maxLength: field.maxLength,
          allowedFileTypesText: field.allowedFileTypes ? field.allowedFileTypes.join(', ') : '',
          maxFileSizeMB: field.maxFileSize ? Math.round(field.maxFileSize / 1024 / 1024) : undefined,
        }));
    } else {
      // No fields found - start with empty array so user can add fields
      fields.value = [];
    }
  } catch (error) {
    console.error('Error loading fields:', error);
    fields.value = [];
  } finally {
    isLoadingFields.value = false;
  }
};

// Add a new field
const addField = () => {
  const tempId = `temp-${++tempIdCounter}`;
  // Add new field at the beginning (index 0) so user doesn't have to scroll
  fields.value.unshift({
    tempId: tempId,
    question: '',
    fieldType: 'text',
    isRequired: false,
    isActive: true,
    displayOrder: 0, // Will be recalculated below
    optionsText: '',
    minLength: undefined,
    maxLength: undefined,
    allowedFileTypesText: '',
    maxFileSizeMB: undefined,
  });
  
  // Update display orders for all fields
  fields.value.forEach((f, idx) => {
    f.displayOrder = idx;
  });
  
  // Auto-expand new fields in edit mode so user can immediately edit them
  if (isEditMode.value) {
    expandedFields.value.add(tempId);
  }
  
  // Scroll to the top to show the newly added field
  nextTick(() => {
    const fieldsContainer = document.querySelector('.space-y-4');
    if (fieldsContainer) {
      fieldsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
};

// Remove a field
const removeField = async (index: number) => {
  const field = fields.value[index];
  
  // If it's an existing field, confirm deletion
  if (field.id) {
    if (!confirm(`Are you sure you want to delete the field "${field.question}"?`)) {
      return;
    }
    
    try {
      await deleteVisaProductField(field.id);
      // Remove from expandedFields if it was expanded
      const fieldId = getFieldId(field);
      expandedFields.value.delete(fieldId);
      
      fields.value.splice(index, 1);
      // Update display orders
      fields.value.forEach((f, idx) => {
        f.displayOrder = idx;
      });
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Failed to delete field';
    }
  } else {
    // Remove from expandedFields if it was expanded
    const fieldId = getFieldId(field);
    expandedFields.value.delete(fieldId);
    
    // Just remove from array if it's a new field
    fields.value.splice(index, 1);
    // Update display orders
    fields.value.forEach((f, idx) => {
      f.displayOrder = idx;
    });
  }
};

// Validate form
const validateForm = (): boolean => {
  fieldErrors.value = {};
  let isValid = true;

  if (!isEditMode.value && !selectedVisaProductId.value) {
    fieldErrors.value.visaProduct = 'Please select a visa product';
    isValid = false;
  }

  if (fields.value.length === 0) {
    errorMessage.value = 'Please add at least one field';
    isValid = false;
    return false;
  }

  fields.value.forEach((field) => {
    const fieldId = getFieldId(field);
    if (!field.question.trim()) {
      fieldErrors.value[`field-${fieldId}-question`] = 'Question is required';
      isValid = false;
    }

    if (!field.fieldType) {
      fieldErrors.value[`field-${fieldId}-type`] = 'Field type is required';
      isValid = false;
    }

    if (field.fieldType === 'dropdown' && !field.optionsText?.trim()) {
      fieldErrors.value[`field-${fieldId}-options`] = 'Options are required for dropdown fields';
      isValid = false;
    }
  });

  return isValid;
};

// Save form
const saveForm = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  fieldErrors.value = {};

  if (!validateForm()) {
    return;
  }

  const targetVisaProductId = isEditMode.value ? visaProductId.value : selectedVisaProductId.value;
  
  if (!targetVisaProductId) {
    errorMessage.value = 'Please select a visa product';
    return;
  }

  try {
    isLoading.value = true;

    // Process each field
    for (const field of fields.value) {
      if (field.id) {
        // Update existing field
        const updateData: UpdateVisaProductFieldDto = {
          question: field.question.trim(),
          fieldType: field.fieldType as any,
          isRequired: field.isRequired,
          isActive: field.isActive,
          displayOrder: field.displayOrder,
        };

        // Add dropdown options
        if (field.fieldType === 'dropdown' && field.optionsText) {
          updateData.options = field.optionsText.split(',').map(opt => opt.trim()).filter(opt => opt.length > 0);
        }

        // Add min/max length for text, number, textarea
        if ((field.fieldType === 'text' || field.fieldType === 'number' || field.fieldType === 'textarea')) {
          if (field.minLength) updateData.minLength = field.minLength;
          if (field.maxLength) updateData.maxLength = field.maxLength;
        }

        // Add file upload settings
        if (field.fieldType === 'upload') {
          if (field.allowedFileTypesText) {
            updateData.allowedFileTypes = field.allowedFileTypesText.split(',').map(t => t.trim()).filter(t => t.length > 0);
          }
          if (field.maxFileSizeMB) {
            updateData.maxFileSize = field.maxFileSizeMB * 1024 * 1024; // Convert MB to bytes
          }
        }

        await updateVisaProductField(field.id, updateData);
      } else {
        // Create new field
        const createData: CreateVisaProductFieldDto = {
          visaProductId: Number(targetVisaProductId),
          fieldType: field.fieldType as any,
          question: field.question.trim(),
          isRequired: field.isRequired,
          displayOrder: field.displayOrder,
          isActive: field.isActive,
        };

        // Add dropdown options
        if (field.fieldType === 'dropdown' && field.optionsText) {
          createData.options = field.optionsText.split(',').map(opt => opt.trim()).filter(opt => opt.length > 0);
        }

        // Add min/max length for text, number, textarea
        if ((field.fieldType === 'text' || field.fieldType === 'number' || field.fieldType === 'textarea')) {
          if (field.minLength) createData.minLength = field.minLength;
          if (field.maxLength) createData.maxLength = field.maxLength;
        }

        // Add file upload settings
        if (field.fieldType === 'upload') {
          if (field.allowedFileTypesText) {
            createData.allowedFileTypes = field.allowedFileTypesText.split(',').map(t => t.trim()).filter(t => t.length > 0);
          }
          if (field.maxFileSizeMB) {
            createData.maxFileSize = field.maxFileSizeMB * 1024 * 1024; // Convert MB to bytes
          }
        }

        await createVisaProductField(createData);
      }
    }

    successMessage.value = isEditMode.value ? 'Form updated successfully!' : 'Additional info form created successfully!';
    
    // Redirect after a short delay
    setTimeout(() => {
      router.push('/dashboard/additional-info');
    }, 1500);
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to save form. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

// Navigation
const goBack = () => {
  router.push("/dashboard/additional-info");
};

// Load data on mount
onMounted(async () => {
  if (isEditMode.value) {
    await loadFields();
  } else {
    await loadVisaProducts();
  }
});
</script>

