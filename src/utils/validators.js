// src/utils/validators.js
export const validateEmail = (email) => {
  if (!email) return 'Email is required'
  if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format'
  if (email.length > 254) return 'Email is too long'
  return ''
}

export const validatePassword = (password) => {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (password.length > 128) return 'Password is too long'
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter'
  if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter'
  if (!/[0-9]/.test(password)) return 'Password must contain a number'
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain a special character'
  return ''
}

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password'
  if (password !== confirmPassword) return 'Passwords do not match'
  return ''
}

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`
  }
  return ''
}

export const validateMinLength = (value, min, fieldName) => {
  if (value && value.length < min) {
    return `${fieldName} must be at least ${min} characters`
  }
  return ''
}

export const validateMaxLength = (value, max, fieldName) => {
  if (value && value.length > max) {
    return `${fieldName} must be less than ${max} characters`
  }
  return ''
}

export const validateUrl = (url) => {
  if (!url) return ''
  try {
    new URL(url)
    return ''
  } catch {
    return 'Invalid URL format'
  }
}

export const validateNumber = (value, fieldName) => {
  if (value === '' || value === null || value === undefined) return ''
  if (isNaN(Number(value))) return `${fieldName} must be a number`
  return ''
      }
