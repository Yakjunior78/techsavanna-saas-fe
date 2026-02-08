<script setup lang="ts">
import type { OnboardingStep } from '@techsavanna/shared'

interface Props {
  steps: OnboardingStep[]
  currentStepId: string
  completedSteps: string[]
}

defineProps<Props>()

defineEmits<{
  stepClick: [stepId: string]
}>()

function getStepStatus(step: OnboardingStep, currentId: string, completed: string[]): 'completed' | 'current' | 'upcoming' {
  if (completed.includes(step.id)) return 'completed'
  if (step.id === currentId) return 'current'
  return 'upcoming'
}
</script>

<template>
  <nav aria-label="Progress" class="w-full">
    <ol class="flex items-center">
      <li
        v-for="(step, index) in steps"
        :key="step.id"
        class="relative"
        :class="index !== steps.length - 1 ? 'flex-1 pr-8' : ''"
      >
        <div class="flex items-center">
          <!-- Step Circle -->
          <button
            class="relative flex size-10 items-center justify-center rounded-full border-2 transition-all"
            :class="{
              'border-blue-600 bg-blue-600 text-white': getStepStatus(step, currentStepId, completedSteps) === 'completed',
              'border-blue-600 bg-white text-blue-600': getStepStatus(step, currentStepId, completedSteps) === 'current',
              'border-gray-300 bg-white text-gray-400': getStepStatus(step, currentStepId, completedSteps) === 'upcoming'
            }"
            :disabled="getStepStatus(step, currentStepId, completedSteps) === 'upcoming'"
            @click="$emit('stepClick', step.id)"
          >
            <svg
              v-if="getStepStatus(step, currentStepId, completedSteps) === 'completed'"
              class="size-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span v-else class="text-sm font-semibold">{{ index + 1 }}</span>
          </button>

          <!-- Connector Line -->
          <div
            v-if="index !== steps.length - 1"
            class="ml-4 h-0.5 flex-1 transition-colors"
            :class="completedSteps.includes(step.id) ? 'bg-blue-600' : 'bg-gray-200'"
          />
        </div>

        <!-- Step Label -->
        <div class="mt-3">
          <span
            class="text-sm font-medium"
            :class="{
              'text-blue-600': getStepStatus(step, currentStepId, completedSteps) === 'current',
              'text-gray-900': getStepStatus(step, currentStepId, completedSteps) === 'completed',
              'text-gray-500': getStepStatus(step, currentStepId, completedSteps) === 'upcoming'
            }"
          >
            {{ step.title }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>
