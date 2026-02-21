import { ref, onUnmounted } from 'vue'
import { apiGet, API_ENDPOINTS } from '@techsavanna/shared'
import type { ProvisioningStatusResponse } from '@techsavanna/shared'

export function useProvisioning() {
  const status = ref<ProvisioningStatusResponse | null>(null)
  const isPolling = ref(false)
  const isReady = ref(false)
  const isFailed = ref(false)
  const error = ref<string | null>(null)
  let pollTimer: ReturnType<typeof setInterval> | null = null

  function startPolling(tenantId: string) {
    stopPolling()
    isPolling.value = true
    error.value = null

    // Fetch immediately, then every 5 seconds
    fetchStatus(tenantId)

    pollTimer = setInterval(() => fetchStatus(tenantId), 5000)
  }

  async function fetchStatus(tenantId: string) {
    try {
      const res = await apiGet<ProvisioningStatusResponse>(
        `${API_ENDPOINTS.TENANTS.STATUS}/${tenantId}/status`
      )
      status.value = res
      error.value = null

      if (res.status.includes('ACTIVE') || res.status.includes('READY') || res.progressPercent >= 100) {
        isReady.value = true
        stopPolling()
      } else if (res.status === 'TENANT_STATUS_FAILED') {
        isFailed.value = true
        error.value = res.errorMessage || 'Provisioning failed'
        stopPolling()
      }
    } catch (e) {
      error.value = (e as any).message || 'Failed to check provisioning status'
      // Keep polling — transient errors should not stop the process
    }
  }

  function stopPolling() {
    if (pollTimer) {
      clearInterval(pollTimer)
      pollTimer = null
    }
    isPolling.value = false
  }

  onUnmounted(() => stopPolling())

  return { status, isPolling, isReady, isFailed, error, startPolling, stopPolling }
}
