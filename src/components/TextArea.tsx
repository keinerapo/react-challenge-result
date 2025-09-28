import React, { FC, useEffect, useState } from "react"

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'required'> {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  error?: string
  minLength?: number
  maxLength?: number
  onValidationChange?: (fieldName: string, isValid: boolean, hasError: boolean) => void
}

const TextArea: FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  required,
  error,
  minLength,
  maxLength,
  onValidationChange,
  ...props
}) => {
  const [localError, setLocalError] = useState<string | undefined>(undefined)
  const fieldError = localError || error
  const shouldShowError = !!fieldError
  const baseStyles = "w-full border-2 border-grey-500 rounded-md px-2 py-1 h-20"
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
      <textarea
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

export default TextArea