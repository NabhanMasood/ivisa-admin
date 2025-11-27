<template>
  <ClientOnly>
    <div class="rich-text-editor" v-if="editor">
      <!-- Toolbar -->
      <div class="border border-gray-300 dark:border-gray-700 rounded-t-lg bg-white dark:bg-[#18181B] p-2 flex flex-wrap items-center gap-1">
        <!-- Text Formatting -->
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="[
            'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
            editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
          ]"
          type="button"
          title="Bold"
        >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
        </svg>
      </button>
      
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="[
          'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
          editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
        ]"
        type="button"
        title="Italic"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </button>

      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <!-- Headings -->
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="[
          'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-semibold',
          editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
        ]"
        type="button"
        title="Heading 1"
      >
        H1
      </button>
      
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="[
          'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-semibold',
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
        ]"
        type="button"
        title="Heading 2"
      >
        H2
      </button>
      
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="[
          'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-semibold',
          editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
        ]"
        type="button"
        title="Heading 3"
      >
        H3
      </button>

      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <!-- Lists -->
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="[
          'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
          editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''
        ]"
        type="button"
        title="Bullet List"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h13M8 12h13m-13 6h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      </button>
      
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="[
          'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
          editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''
        ]"
        type="button"
        title="Numbered List"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      </button>

      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <!-- Link -->
      <button
        @click="setLink"
        :class="[
          'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
          editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''
        ]"
        type="button"
        title="Insert Link"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>

      <!-- Image Button (if onImageInsert callback is provided) -->
      <button
        v-if="onImageInsert"
        @click="triggerImageInsert"
        class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        type="button"
        title="Insert Image"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </div>

    <!-- Editor Content -->
    <EditorContent :editor="editor" class="editor-content" />
    </div>
    <template #fallback>
      <div class="rich-text-editor border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#18181B] min-h-[300px]">
        <div class="p-4 text-center text-gray-500 dark:text-gray-400">
          Loading editor...
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

const props = defineProps<{
  modelValue: string
  onImageInsert?: () => void
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Initialize editor immediately (ClientOnly ensures we're on client)
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-[#1ECE84] underline hover:text-[#1AB876]',
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'max-w-full h-auto rounded-lg my-5',
      },
    }),
  ],
        editorProps: {
          attributes: {
            class: 'focus:outline-none min-h-[300px] p-4 border border-gray-300 dark:border-gray-700 border-t-0 rounded-b-lg bg-white dark:bg-[#18181B] text-gray-900 dark:text-white',
          },
        },
  onUpdate: ({ editor: editorInstance }) => {
    emit('update:modelValue', editorInstance.getHTML())
  },
})

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  if (editor.value && editor.value.getHTML() !== newValue) {
    editor.value.commands.setContent(newValue || '', false)
  }
}, { immediate: false })

// Set link
const setLink = () => {
  if (!editor.value) return
  const previousUrl = editor.value.getAttributes('link').href || ''
  const url = window.prompt('Enter URL', previousUrl || 'https://')

  if (url === null) {
    return
  }

  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

// Trigger image insert
const triggerImageInsert = () => {
  if (props.onImageInsert) {
    props.onImageInsert()
  }
}

// Expose method to insert image
const insertImage = (imageUrl: string) => {
  if (editor.value) {
    editor.value.chain().focus().setImage({ src: imageUrl }).run()
  }
}

defineExpose({
  insertImage,
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<style scoped>
.rich-text-editor :deep(.ProseMirror) {
  outline: none;
}

.rich-text-editor :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  color: #9ca3af;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.rich-text-editor :deep(.ProseMirror h1) {
  font-size: 2em;
  font-weight: bold;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
}

.rich-text-editor :deep(.ProseMirror h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
}

.rich-text-editor :deep(.ProseMirror h3) {
  font-size: 1.17em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 1em;
}

.rich-text-editor :deep(.ProseMirror ul) {
  list-style-type: disc;
  list-style-position: outside;
  padding-left: 1.5em;
  margin: 1em 0;
}

.rich-text-editor :deep(.ProseMirror ol) {
  list-style-type: decimal;
  list-style-position: outside;
  padding-left: 1.5em;
  margin: 1em 0;
}

.rich-text-editor :deep(.ProseMirror li) {
  margin: 0.5em 0;
  display: list-item;
  color: inherit;
}

.rich-text-editor :deep(.ProseMirror ul li) {
  list-style-type: disc;
  list-style-position: outside;
}

.rich-text-editor :deep(.ProseMirror ol li) {
  list-style-type: decimal;
  list-style-position: outside;
}

/* Ensure nested lists work properly */
.rich-text-editor :deep(.ProseMirror ul ul) {
  list-style-type: circle;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.rich-text-editor :deep(.ProseMirror ul ul ul) {
  list-style-type: square;
}

.rich-text-editor :deep(.ProseMirror a) {
  color: #1ECE84;
  text-decoration: underline;
  cursor: pointer;
}

.rich-text-editor :deep(.ProseMirror a:hover) {
  color: #1AB876;
}

.rich-text-editor :deep(.ProseMirror img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1.25em 0;
  display: block;
}

.rich-text-editor :deep(.ProseMirror strong) {
  font-weight: 700;
}

.rich-text-editor :deep(.ProseMirror em) {
  font-style: italic;
}
</style>

