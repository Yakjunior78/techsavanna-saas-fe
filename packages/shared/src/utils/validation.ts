export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  // Strip spaces, dashes, and leading +
  const digits = phone.replace(/[\s\-+]/g, '')
  // Must be between 7 and 15 digits (E.164 standard)
  return /^[0-9]{7,15}$/.test(digits)
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

export function validateName(value: string, fieldName = 'Name'): string {
  if (!value.trim()) return `${fieldName} is required`
  if (value.trim().length < 2) return `${fieldName} must be at least 2 characters`
  if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`
  return ''
}

export function validateEmail(value: string): string {
  if (!value.trim()) return 'Email is required'
  if (!isValidEmail(value)) return 'Please enter a valid email address'
  return ''
}

export function validatePhone(value: string): string {
  if (!value.trim()) return 'Phone number is required'
  if (!isValidPhone(value)) return 'Please enter a valid phone number'
  return ''
}

export function validatePasswordField(value: string): string {
  if (!value) return 'Password is required'
  const result = isValidPassword(value)
  if (!result.valid) return result.errors[0]
  return ''
}

export function validateConfirmPassword(password: string, confirmPassword: string): string {
  if (!confirmPassword) return 'Please confirm your password'
  if (password !== confirmPassword) return 'Passwords do not match'
  return ''
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
