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
              {{ isEditMode ? 'Edit Guide' : 'Add Guide' }}
            </h1>
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
            @click="saveGuide"
            :disabled="isLoading"
            class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {{ isLoading ? (isEditMode ? 'Updating...' : 'Saving...') : (isEditMode ? 'Update' : 'Save Changes') }}
          </button>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white w-full dark:bg-[#09090B] rounded-xl border border-gray-200 dark:border-gray-800 py-[30px] px-[34px]">
        <div class="space-y-6">
          <!-- Basic Information Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Basic Information
            </h3>
            <div class="flex flex-col gap-4">
              <!-- Title Input -->
              <div>
                <label
                  for="title"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Title <span class="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  v-model="guideForm.title"
                  type="text"
                  placeholder="Enter guide title"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>

              <!-- Slug Input -->
              <div>
                <label
                  for="slug"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Slug <span class="text-red-500">*</span>
                </label>
                <input
                  id="slug"
                  v-model="guideForm.slug"
                  type="text"
                  placeholder="guide-slug-url"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  URL-friendly version of the title (e.g., "visa-application-guide")
                </p>
              </div>

              <!-- Description Input -->
              <div>
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Description <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  v-model="guideForm.description"
                  rows="3"
                  placeholder="Enter a brief description of the guide"
                  class="w-full border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                ></textarea>
              </div>

              <!-- Category Input -->
              <div>
                <label
                  for="category"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Category <span class="text-red-500">*</span>
                </label>
                <input
                  id="category"
                  v-model="guideForm.category"
                  type="text"
                  placeholder="e.g., Visa Application, Travel Tips"
                  class="w-full h-[36px] border rounded-[6px] border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18181B] text-[#111] dark:text-white placeholder-[#737373] py-1 px-3 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:shadow-sm hover:shadow-sm"
                />
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Content
            </h3>
            <div class="flex flex-col gap-4">
              <!-- Content (Rich Text Editor) -->
              <div>
                <label
                  for="content"
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Content <span class="text-red-500">*</span>
                </label>
                <RichTextEditor
                  ref="richTextEditor"
                  v-model="guideForm.content"
                  :on-image-insert="triggerContentImageInput"
                />
                <input
                  ref="contentImageInput"
                  type="file"
                  accept="image/*"
                  @change="handleContentImageSelect"
                  class="hidden"
                />
                <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Use the toolbar to format your content. Add headings, lists, links, and images.
                </p>
                <span v-if="contentImageError" class="text-xs text-red-600 dark:text-red-400 block mt-1">
                  {{ contentImageError }}
                </span>
              </div>
            </div>
          </div>

          <!-- Media Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Media
            </h3>
            <div class="flex flex-col gap-4">
              <!-- Featured Image Upload -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                >
                  Featured Image
                </label>
                <div class="space-y-3">
                  <!-- Image Preview -->
                  <div v-if="featuredImagePreview" class="relative w-full max-w-md">
                    <img
                      :src="featuredImagePreview"
                      alt="Featured image preview"
                      class="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
                    />
                    <button
                      @click="removeFeaturedImage"
                      class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <!-- Upload Button -->
                  <div class="flex items-center gap-3">
                    <input
                      ref="featuredImageInput"
                      type="file"
                      accept="image/*"
                      @change="handleFeaturedImageSelect"
                      class="hidden"
                    />
                    <button
                      @click="triggerFeaturedImageInput"
                      :disabled="isUploadingFeaturedImage"
                      class="px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {{ isUploadingFeaturedImage ? 'Uploading...' : (featuredImagePreview ? 'Change Image' : 'Upload Image') }}
                    </button>
                    <span v-if="featuredImageError" class="text-xs text-red-600 dark:text-red-400">
                      {{ featuredImageError }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Upload an image file (max 5MB). Supported formats: JPG, PNG, GIF, WebP
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Publication Status -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Settings
            </h3>
            <div class="flex flex-col gap-4">
              <!-- Published Status -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Publication Status
                </label>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="guideForm.isPublished"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                  <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                    {{ guideForm.isPublished ? 'Published' : 'Draft' }}
                  </span>
                </label>
              </div>

              <!-- Featured Status -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Featured Guide
                </label>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="guideForm.isFeatured"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-500"
                  ></div>
                  <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                    {{ guideForm.isFeatured ? '⭐ Featured' : 'Not Featured' }}
                  </span>
                </label>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Featured guides will be highlighted and can be filtered on the frontend
                </p>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fade-in">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800 dark:text-red-400">{{ errorMessage }}</p>
              </div>
              <button 
                @click="errorMessage = ''" 
                class="ml-auto flex-shrink-0 text-red-400 hover:text-red-600 dark:hover:text-red-300"
              >
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fade-in">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-800 dark:text-green-400">{{ successMessage }}</p>
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
import RichTextEditor from "~/components/ui/RichTextEditor.vue";
import { ArrowLeft } from "lucide-vue-next";
import { useGuidesApi } from "~/composables/useGuidesApi";

useHead({
  title: "Add Guide - iVisa",
});

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const isEditMode = computed(() => route.query.mode === 'edit');
const guideId = computed(() => route.query.id ? Number(route.query.id) : null);

const { createGuide, updateGuide, getGuideById } = useGuidesApi();

const guideForm = ref({
  slug: "",
  title: "",
  description: "",
  content: "",
  category: "",
  featuredImage: "",
  isPublished: false,
  isFeatured: false,
});

const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

// Featured Image Upload
const featuredImageInput = ref<HTMLInputElement | null>(null);
const featuredImagePreview = ref("");
const featuredImageFile = ref<File | null>(null);
const isUploadingFeaturedImage = ref(false);
const featuredImageError = ref("");

// Content Image Upload
const contentImageInput = ref<HTMLInputElement | null>(null);
const richTextEditor = ref<InstanceType<typeof RichTextEditor> | null>(null);
const isUploadingContentImage = ref(false);
const contentImageError = ref("");

// Auto-dismiss error messages after 5 seconds
watch(errorMessage, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      errorMessage.value = "";
    }, 5000);
  }
});

// Featured Image Upload Functions
const triggerFeaturedImageInput = () => {
  featuredImageInput.value?.click();
};

const handleFeaturedImageSelect = async (event: any) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  featuredImageError.value = "";

  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    featuredImageError.value = "Please select an image file";
    return;
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    featuredImageError.value = "File size must be less than 5MB";
    return;
  }

  featuredImageFile.value = file;

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    featuredImagePreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
  
  // Upload to backend
  await uploadFeaturedImageToBackend(file);
};

const uploadFeaturedImageToBackend = async (file: File) => {
  try {
    isUploadingFeaturedImage.value = true;
    featuredImageError.value = '';
    
    const formData = new FormData();
    formData.append('image', file);
    
    const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '');
    const uploadEndpoint = `${baseUrl}/guides/upload`;
    
    const result = await $fetch<{
      status: boolean;
      message?: string;
      data: {
        imageUrl?: string;
        url?: string;
        cloudinaryUrl?: string;
      };
    }>(uploadEndpoint, {
      method: 'POST',
      body: formData,
    });
    
    if (!result.status || !result.data) {
      throw new Error(result.message || 'Invalid response from server');
    }
    
    const imageUrl = result.data.imageUrl || result.data.url || result.data.cloudinaryUrl;
    if (!imageUrl) {
      throw new Error('File upload succeeded but no image URL was returned');
    }
    
    guideForm.value.featuredImage = imageUrl;
    
  } catch (error: any) {
    console.error('Featured image upload error:', error);
    // Try to extract error message from response
    let errorMessage = 'Failed to upload image. Please try again.';
    if (error?.data?.message) {
      errorMessage = error.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.status === 400) {
      errorMessage = 'Bad request. Please check that the backend endpoint /guides/upload exists and accepts image uploads.';
    }
    featuredImageError.value = errorMessage;
    featuredImageFile.value = null;
    featuredImagePreview.value = '';
    if (featuredImageInput.value) {
      featuredImageInput.value.value = '';
    }
  } finally {
    isUploadingFeaturedImage.value = false;
  }
};

const removeFeaturedImage = () => {
  featuredImageFile.value = null;
  featuredImagePreview.value = '';
  guideForm.value.featuredImage = '';
  featuredImageError.value = '';
  if (featuredImageInput.value) {
    featuredImageInput.value.value = "";
  }
};

// Content Image Upload Functions
const triggerContentImageInput = () => {
  contentImageInput.value?.click();
};

const handleContentImageSelect = async (event: any) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  contentImageError.value = "";

  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    contentImageError.value = "Please select an image file";
    return;
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    contentImageError.value = "File size must be less than 5MB";
    return;
  }

  // Upload to backend
  await uploadContentImageToBackend(file);
};

const uploadContentImageToBackend = async (file: File) => {
  try {
    isUploadingContentImage.value = true;
    contentImageError.value = '';
    
    const formData = new FormData();
    formData.append('image', file);
    
    const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '');
    const uploadEndpoint = `${baseUrl}/guides/upload`;
    
    const result = await $fetch<{
      status: boolean;
      message?: string;
      data: {
        imageUrl?: string;
        url?: string;
        cloudinaryUrl?: string;
      };
    }>(uploadEndpoint, {
      method: 'POST',
      body: formData,
    });
    
    if (!result.status || !result.data) {
      throw new Error(result.message || 'Invalid response from server');
    }
    
    const imageUrl = result.data.imageUrl || result.data.url || result.data.cloudinaryUrl;
    if (!imageUrl) {
      throw new Error('File upload succeeded but no image URL was returned');
    }
    
    // Insert image tag at cursor position or at the end
    insertImageIntoContent(imageUrl);
    
  } catch (error: any) {
    console.error('Content image upload error:', error);
    // Try to extract error message from response
    let errorMessage = 'Failed to upload image. Please try again.';
    if (error?.data?.message) {
      errorMessage = error.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.status === 400) {
      errorMessage = 'Bad request. Please check that the backend endpoint /guides/upload exists and accepts image uploads.';
    }
    contentImageError.value = errorMessage;
  } finally {
    isUploadingContentImage.value = false;
    if (contentImageInput.value) {
      contentImageInput.value.value = '';
    }
  }
};

const insertImageIntoContent = (imageUrl: string) => {
  // Use the rich text editor's insertImage method if available
  if (richTextEditor.value && typeof richTextEditor.value.insertImage === 'function') {
    richTextEditor.value.insertImage(imageUrl);
  } else {
    // Fallback: append to content
    guideForm.value.content += `\n<img src="${imageUrl}" alt="Guide image" loading="lazy" />\n`;
  }
};

const loadGuide = async () => {
  if (!isEditMode.value || !guideId.value) return;

  try {
    isLoading.value = true;
    console.log('Loading guide with ID:', guideId.value, 'Type:', typeof guideId.value);
    const response = await getGuideById(guideId.value);
    console.log('Get guide by ID response:', response);
    
    if (response.success && response.data) {
      const guide = response.data;
      console.log('Loaded guide:', guide);
      console.log('Guide content value:', guide.content);
      console.log('Guide content type:', typeof guide.content);
      console.log('Guide content length:', guide.content?.length);
      
      guideForm.value.slug = guide.slug || "";
      guideForm.value.title = guide.title || "";
      guideForm.value.description = guide.description || "";
      // Handle content - check for different possible field names
      guideForm.value.content = guide.content || guide.htmlContent || guide.body || "";
      guideForm.value.category = guide.category || "";
      guideForm.value.featuredImage = guide.featuredImage || "";
      // Handle boolean or string values for isPublished
      guideForm.value.isPublished = guide.isPublished === true || guide.isPublished === 'true' || String(guide.isPublished) === 'true';
      // Handle boolean or string values for isFeatured
      guideForm.value.isFeatured = guide.isFeatured === true || guide.isFeatured === 'true' || String(guide.isFeatured) === 'true';
      
      console.log('Form content after setting:', guideForm.value.content);
      console.log('Form content length:', guideForm.value.content?.length);
      
      // Use nextTick to ensure Vue updates the DOM
      await nextTick();
      console.log('After nextTick - Form content:', guideForm.value.content);
      
      // Set featured image preview if exists
      if (guide.featuredImage) {
        featuredImagePreview.value = guide.featuredImage;
      }
    } else {
      console.error('Failed to load guide:', response.message);
      errorMessage.value = response.message || "Failed to load guide";
    }
  } catch (error) {
    console.error('Error in loadGuide:', error);
    errorMessage.value = error instanceof Error ? error.message : "Failed to load guide";
  } finally {
    isLoading.value = false;
  }
};

const saveGuide = async () => {
  // Validation
  if (!guideForm.value.title) {
    errorMessage.value = "Please enter a title";
    return;
  }

  if (!guideForm.value.slug) {
    errorMessage.value = "Please enter a slug";
    return;
  }

  if (!guideForm.value.description) {
    errorMessage.value = "Please enter a description";
    return;
  }

  if (!guideForm.value.content) {
    errorMessage.value = "Please enter content";
    return;
  }

  if (!guideForm.value.category) {
    errorMessage.value = "Please enter a category";
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    // Prepare payload
    const payload: any = {
      slug: guideForm.value.slug.trim(),
      title: guideForm.value.title.trim(),
      description: guideForm.value.description.trim(),
      content: guideForm.value.content.trim(),
      category: guideForm.value.category.trim(),
      isPublished: guideForm.value.isPublished,
      isFeatured: guideForm.value.isFeatured || false,
    };

    // Add featured image if it exists
    if (guideForm.value.featuredImage) {
      payload.featuredImage = guideForm.value.featuredImage.trim();
    }

    let response;
    if (isEditMode.value && guideId.value) {
      // Update existing guide
      response = await updateGuide(guideId.value, payload);
    } else {
      // Create new guide
      response = await createGuide(payload);
    }

    if (response.success) {
      successMessage.value = isEditMode.value ? "Guide updated successfully!" : "Guide created successfully!";
      setTimeout(() => {
        goBack();
      }, 1000);
    } else {
      errorMessage.value = response.message || "Failed to save guide";
      console.error('Save guide failed:', response.message);
    }
  } catch (error) {
    console.error('Save guide error:', error);
    errorMessage.value = error instanceof Error ? error.message : "Failed to save guide. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.push("/dashboard/guides");
};

onMounted(() => {
  if (isEditMode.value) {
    loadGuide();
  }
});
</script>

