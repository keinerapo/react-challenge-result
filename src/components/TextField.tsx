import React, { forwardRef } from "react"
import { FIELD_KINDS } from "../types/fieldTypes"

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'required'> {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  label,
  name,
  type = FIELD_KINDS.TEXT,
  placeholder,
  required = false,
  error,
  ...props
}, ref) => {
  const shouldShowError = !!error
  const baseStyles = "w-full border border-gray-500 [border-style:solid] rounded-md px-2 py-1"
  const inputStyles = shouldShowError ? `${baseStyles} border-red-500` : baseStyles

  return (
    <div className="mb-3">
      <label className="block text-sm mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={inputStyles}
        aria-invalid={!!shouldShowError}
        {...props}
      />
      {shouldShowError && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
})

TextField.displayName = 'TextField'

export default TextField




