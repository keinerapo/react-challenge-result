import React, { FC, useEffect, useState } from "react"

export interface SelectListProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'name' | 'required'> {
  label: string
  name: string
  options?: string[]
  required?: boolean
  error?: string
  onValidationChange?: (fieldName: string, isValid: boolean, hasError: boolean) => void
}

const SelectList: FC<SelectListProps> = ({
  label,
  name,
  options = [],
  required,
  error,
  onValidationChange,
  ...props
}) => {
  const [localError, setLocalError] = useState<string | undefined>(undefined)
  const fieldError = localError || error
  const shouldShowError = !!fieldError
  const baseStyles = "w-full border-2 border-grey-500 rounded-md px-2 py-1"
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
      <select
        className={inputStyles}
        aria-invalid={!!shouldShowError}
        onBlur={(e) => {
          const value = e.target.value
          let errorMessage: string | undefined = undefined
          if (required && (!value || value.trim() === '')) {
            errorMessage = `${label} is required`
          }
          setLocalError(errorMessage)
          const hasError = !!errorMessage
          const isValid = Boolean(!hasError && (!required || (value && value.trim() !== '')))
          onValidationChange?.(name, isValid, hasError)
          props.onBlur?.(e)
        }}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {shouldShowError && <p className="mt-1 text-xs text-red-600">{fieldError}</p>}
    </div>
  )
}

export default SelectList

