<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Option {
  label: string
  value: string | number
  icon?: string
  description?: string
}

interface Props {
  modelValue?: string | number
  options: Option[]
  label?: string
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Select an option',
  required: false,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const isOpen = ref(false)
const searchQuery = ref('')
const dropdownRef = ref<HTMLElement | null>(null)

const selectedOption = computed(() => {
  return props.options.find(opt => opt.value === props.modelValue)
})

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(opt =>
    opt.label.toLowerCase().includes(query)
  )
})

function selectOption(option: Option) {
  emit('update:modelValue', option.value)
  isOpen.value = false
  searchQuery.value = ''
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

function toggleDropdown() {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
    if (!isOpen.value) {
      searchQuery.value = ''
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="mb-1 block text-xs font-medium text-gray-600">
      {{ label }}
      <span v-if="required" class="text-red-400">*</span>
    </label>

    <div ref="dropdownRef" class="relative">
      <!-- Trigger Button -->
      <button
        type="button"
        class="flex w-full cursor-pointer items-center justify-between rounded-lg border bg-white px-3 py-2 text-left text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        :class="[
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
            : isOpen
              ? 'border-blue-500 ring-2 ring-blue-100'
              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-100'
        ]"
        :disabled="disabled"
        @click.stop="toggleDropdown"
      >
        <span :class="selectedOption ? 'text-gray-900' : 'text-gray-400 text-xs'">
          {{ selectedOption?.label || placeholder }}
        </span>
        <svg
          class="size-4 text-gray-400 transition-transform duration-200"
          :class="isOpen ? 'rotate-180' : ''"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <!-- Dropdown Panel -->
      <Transition
        enter-active-class="transition ease-out duration-150"
        enter-from-class="opacity-0 scale-95 -translate-y-1"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 -translate-y-1"
      >
        <div
          v-if="isOpen"
          class="absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50"
        >
          <!-- Search (only show if more than 5 options) -->
          <div v-if="options.length > 5" class="border-b border-gray-100 p-2">
            <div class="relative">
              <svg class="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="w-full rounded-lg border border-gray-200 py-1.5 pl-8 pr-3 text-sm placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-100"
                @click.stop
              />
            </div>
          </div>

          <!-- Options List -->
          <div class="max-h-56 overflow-y-auto py-1">
            <button
              v-for="option in filteredOptions"
              :key="option.value"
              type="button"
              class="group flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-blue-50"
              :class="modelValue === option.value ? 'bg-blue-50' : ''"
              @click="selectOption(option)"
            >
              <!-- Checkmark indicator -->
              <span
                class="flex size-4 shrink-0 items-center justify-center rounded-full transition-colors"
                :class="modelValue === option.value ? 'bg-blue-500 text-white' : 'border border-gray-300 group-hover:border-blue-300'"
              >
                <svg v-if="modelValue === option.value" class="size-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </span>

              <!-- Option content -->
              <div class="flex-1 min-w-0">
                <span class="block truncate text-gray-900" :class="modelValue === option.value ? 'font-medium' : ''">
                  {{ option.label }}
                </span>
                <span v-if="option.description" class="block truncate text-xs text-gray-500">
                  {{ option.description }}
                </span>
              </div>
            </button>

            <!-- Empty state -->
            <div v-if="filteredOptions.length === 0" class="px-3 py-4 text-center text-sm text-gray-500">
              No options found
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
  </div>
</template>
