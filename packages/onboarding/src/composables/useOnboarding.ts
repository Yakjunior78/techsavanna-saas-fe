import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useOnboardingStore } from '../stores/onboarding'
import type { OnboardingConfig, OnboardingFormData } from '@techsavanna/shared'

export function useOnboarding(config?: OnboardingConfig) {
  const store = useOnboardingStore()

  if (config) {
    store.initialize(config)
  }

  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    completionPercentage,
    isComplete,
    isLoading,
    error,
    formData,
    progress,
    canGoBack,
    canSkip
  } = storeToRefs(store)

  // Computed property for completed steps array
  const completedSteps = computed(() => progress.value?.completedSteps ?? [])

  return {
    // Reactive state
    currentStep,
    currentStepIndex,
    totalSteps,
    completionPercentage,
    completedSteps,
    isComplete,
    isLoading,
    error,
    formData,
    progress,
    canGoBack,
    canSkip,
    // Actions
    initialize: store.initialize,
    completeStep: store.completeStep,
    goToStep: store.goToStep,
    goBack: store.goBack,
    skipStep: store.skipStep,
    resetProgress: store.resetProgress,
    clearProgress: store.clearProgress,
    updateFormData: store.updateFormData
  }
}
