// Payment initiation
export interface PaymentInitiateRequest {
  tenantId: string
  phoneNumber: string
  product: string
}

export interface PaymentInitiateResponse {
  paymentId: string
  checkoutRequestId: string
  status: string
  message: string
}

// Payment status (polling)
export interface Payment {
  id: string
  tenantId: string
  phoneNumber: string
  amount: number
  currency: string
  status: string
  product: string
  mpesaReceiptNumber: string
  checkoutRequestId: string
  failureReason: string
  paidAt: string
  createdAt: string
  productSubscriptionId: string
}

export interface PaymentStatusResponse {
  payment: Payment
}

// Provisioning status
export interface ProvisioningStepInfo {
  name: string
  stepNumber: number
  status: string
  startedAt: string
  completedAt: string
  errorMessage: string
}

export interface ProvisioningStatusResponse {
  tenantId: string
  status: string
  currentStep: string
  currentStepNumber: number
  totalSteps: number
  progressPercent: number
  steps: ProvisioningStepInfo[]
  errorMessage: string
}
