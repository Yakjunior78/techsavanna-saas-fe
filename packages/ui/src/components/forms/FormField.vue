<script setup lang="ts">
import Input from '../base/Input.vue'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel'
  label: string
  placeholder?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  required: false,
  disabled: false
})

defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
}>()
</script>

<template>
  <Input
    :model-value="modelValue"
    :type="type"
    :label="label"
    :placeholder="placeholder"
    :error="error"
    :hint="hint"
    :required="required"
    :disabled="disabled"
    @update:model-value="$emit('update:modelValue', $event)"
    @blur="$emit('blur', $event)"
  />
</template>
