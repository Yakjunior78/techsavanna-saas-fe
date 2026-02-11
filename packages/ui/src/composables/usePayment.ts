import { ref, onUnmounted } from 'vue'
import { apiPost, apiGet, API_ENDPOINTS } from '@techsavanna/shared'
import type {
  PaymentInitiateRequest,
  PaymentInitiateResponse,
  Payment,
  PaymentStatusResponse
} from '@techsavanna/shared'

function formatPhoneNumber(phone: string): string {
  // Strip all non-digit characters (spaces, +, dashes, etc.)
  let digits = phone.replace(/\D/g, '')
  // If starts with 0, replace with 254
  if (digits.startsWith('0')) {
    digits = '254' + digits.slice(1)
  }
  // If doesn't start with 254, prepend it
  if (!digits.startsWith('254')) {
    digits = '254' + digits
  }
  return digits
}

export function usePayment() {
  const payment = ref<Payment | null>(null)
  const isInitiating = ref(false)
  const isPolling = ref(false)
  const error = ref<string | null>(null)
  let pollTimer: ReturnType<typeof setInterval> | null = null

  async function initiatePayment(data: PaymentInitiateRequest): Promise<PaymentInitiateResponse> {
    isInitiating.value = true
    error.value = null
    try {
      const res = await apiPost<PaymentInitiateResponse>(API_ENDPOINTS.PAYMENTS.INITIATE, {
        ...data,
        phoneNumber: formatPhoneNumber(data.phoneNumber)
      })
      startPolling(res.paymentId)
      return res
    } catch (e) {
      error.value = (e as any).message || 'Payment initiation failed'
      throw e
    } finally {
      isInitiating.value = false
    }
  }

  function startPolling(paymentId: string) {
    stopPolling()
    isPolling.value = true
    error.value = null

    pollTimer = setInterval(async () => {
      try {
        const res = await apiGet<PaymentStatusResponse>(
          `${API_ENDPOINTS.PAYMENTS.STATUS}/${paymentId}`
        )
        payment.value = res.payment

        if (res.payment.status.includes('SUCCESS') || res.payment.status.includes('COMPLETED')) {
          stopPolling()
        } else if (res.payment.status.includes('FAILED')) {
          error.value = res.payment.failureReason || 'Payment failed'
          stopPolling()
        }
      } catch (e) {
        error.value = (e as any).message || 'Failed to check payment status'
        stopPolling()
      }
    }, 3000)
  }

  function stopPolling() {
    if (pollTimer) {
      clearInterval(pollTimer)
      pollTimer = null
    }
    isPolling.value = false
  }

  onUnmounted(() => stopPolling())

  return { payment, isInitiating, isPolling, error, initiatePayment, stopPolling }
}
