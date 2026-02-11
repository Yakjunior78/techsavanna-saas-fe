<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { COUNTRIES } from '@techsavanna/shared'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  defaultCountry?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Enter phone number',
  defaultCountry: 'KE'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:country': [code: string]
  blur: []
}>()

const isOpen = ref(false)
const searchQuery = ref('')
const dropdownRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const selectedCountry = ref(
  COUNTRIES.find(c => c.code === props.defaultCountry) || COUNTRIES[0]
)
const phoneNumber = ref('')

// Parse initial value
onMounted(() => {
  if (props.modelValue) {
    const country = COUNTRIES.find(c => props.modelValue.startsWith(c.dialCode))
    if (country) {
      selectedCountry.value = country
      phoneNumber.value = props.modelValue.slice(country.dialCode.length).trim()
    } else {
      phoneNumber.value = props.modelValue
    }
  }
})

const filteredCountries = computed(() => {
  if (!searchQuery.value) return COUNTRIES
  const query = searchQuery.value.toLowerCase()
  return COUNTRIES.filter(
    c => c.name.toLowerCase().includes(query) ||
         c.dialCode.includes(query) ||
         c.code.toLowerCase().includes(query)
  )
})

const fullPhoneNumber = computed(() => {
  if (!phoneNumber.value) return ''
  return `${selectedCountry.value.dialCode} ${phoneNumber.value}`.trim()
})

watch(fullPhoneNumber, (value) => {
  emit('update:modelValue', value)
})

watch(selectedCountry, (country) => {
  emit('update:country', country.code)
}, { immediate: true })

function selectCountry(country: typeof COUNTRIES[number]) {
  selectedCountry.value = country
  isOpen.value = false
  searchQuery.value = ''
  inputRef.value?.focus()
}

function handleInput() {
  phoneNumber.value = phoneNumber.value.replace(/[^0-9]/g, '')
}

function handleKeydown(event: KeyboardEvent) {
  // Allow: backspace, delete, tab, escape, enter, arrows, home, end
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End']
  if (allowedKeys.includes(event.key)) return
  // Allow Ctrl/Cmd+A, C, V, X
  if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) return
  // Block non-digit keys
  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault()
  }
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
    searchQuery.value = ''
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

    <div class="relative" ref="dropdownRef">
      <div
        class="flex overflow-hidden rounded-lg border transition-all duration-150"
        :class="[
          error
            ? 'border-red-300 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100'
            : 'border-gray-300 hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100',
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        ]"
      >
        <!-- Country Selector -->
        <button
          type="button"
          class="flex shrink-0 cursor-pointer items-center gap-1 border-r border-gray-200 bg-gray-50 px-2 py-1.5 text-sm hover:bg-gray-100 focus:outline-none"
          :disabled="disabled"
          @click.stop="isOpen = !isOpen"
        >
          <span class="text-sm">{{ selectedCountry.flag }}</span>
          <span class="text-xs text-gray-600">{{ selectedCountry.dialCode }}</span>
          <svg
            class="size-3 text-gray-400 transition-transform"
            :class="isOpen ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <!-- Phone Input -->
        <input
          ref="inputRef"
          v-model="phoneNumber"
          type="tel"
          inputmode="numeric"
          :placeholder="placeholder"
          :disabled="disabled"
          class="flex-1 rounded-r-lg px-3 py-1.5 text-sm placeholder:text-xs placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
          @input="handleInput"
          @keydown="handleKeydown"
          @blur="emit('blur')"
        />
      </div>

      <!-- Country Dropdown -->
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          class="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          <!-- Search -->
          <div class="border-b border-gray-100 p-2">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search country..."
              class="w-full rounded border border-gray-200 px-2.5 py-1.5 text-sm placeholder-gray-400 focus:border-gray-400 focus:outline-none"
              @click.stop
            />
          </div>

          <!-- Country List -->
          <div class="max-h-48 overflow-y-auto py-1">
            <button
              v-for="country in filteredCountries"
              :key="country.code"
              type="button"
              class="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm hover:bg-gray-50"
              :class="selectedCountry.code === country.code ? 'bg-gray-50' : ''"
              @click="selectCountry(country)"
            >
              <span class="text-base">{{ country.flag }}</span>
              <span class="flex-1 text-gray-900">{{ country.name }}</span>
              <span class="text-gray-500">{{ country.dialCode }}</span>
            </button>
            <div v-if="filteredCountries.length === 0" class="px-3 py-2 text-sm text-gray-500">
              No countries found
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <p v-if="hint && !error" class="mt-1 text-xs text-gray-400">{{ hint }}</p>
    <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
  </div>
</template>
