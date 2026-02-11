export type ToastType = 'success' | 'error' | 'warning'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration: number
}

export interface ToastOptions {
  type?: ToastType
  message: string
  duration?: number
}
