export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  // Supports various African phone formats
  const phoneRegex = /^(\+?[0-9]{1,3})?[0-9]{9,12}$/
  return phoneRegex.test(phone.replace(/[\s-]/g, ''))
}

export function isValidPassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return { valid: errors.length === 0, errors }
}

export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

export interface ValidationRule {
  validator: (value: unknown) => boolean
  message: string
}

export function validate(value: unknown, rules: ValidationRule[]): string[] {
  const errors: string[] = []
  for (const rule of rules) {
    if (!rule.validator(value)) {
      errors.push(rule.message)
    }
  }
  return errors
}
