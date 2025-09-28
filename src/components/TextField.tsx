import React, { useEffect, useState } from "react"

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'required'> {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  minLength?: number
  maxLength?: number
  noNumbers?: boolean
  onValidationChange?: (fieldName: string, isValid: boolean, hasError: boolean) => void
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
  minLength,
  maxLength,
  noNumbers,
  onValidationChange,
  ...props
}) => {
  const [localError, setLocalError] = useState<string | undefined>(undefined)
  const fieldError = localError || error
  const shouldShowError = !!fieldError
  const baseStyles = "w-full border border-grey-500 rounded-md px-2 py-1"
  const inputStyles = shouldShowError ? `${baseStyles} border-red-500` : baseStyles
  
  useEffect(() => {
    const hasError = !!fieldError
    const isValid = Boolean(!hasError && (!required || false))
    onValidationChange?.(name, isValid, hasError)
  }, [name, required, onValidationChange, fieldError])

  return (
    <div className="mb-3">
      <label className="block text-sm mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={inputStyles}
        aria-invalid={!!shouldShowError}
        onBlur={async (e) => {
          const value = e.target.value
          let errorMessage: string | undefined = undefined
          if (required && (!value || value.trim() === '')) {
            errorMessage = `${label} is required`
          } else if (minLength && value && value.length < minLength) {
            errorMessage = `${label} must be at least ${minLength} characters`
          } else if (maxLength && value && value.length > maxLength) {
            errorMessage = `${label} must be at most ${maxLength} characters`
          } else if (noNumbers && value && /\d/.test(value)) {
            errorMessage = `${label} cannot contain numbers`
          }
          setLocalError(errorMessage)
          const hasError = !!errorMessage
          const isValid = Boolean(!hasError && (!required || (value && value.trim() !== '')))
          onValidationChange?.(name, isValid, hasError)
          props.onBlur?.(e)
        }}
        {...props}
      />
      {shouldShowError && <p className="mt-1 text-xs text-red-600">{fieldError}</p>}
    </div>
  )
}

export default TextField




