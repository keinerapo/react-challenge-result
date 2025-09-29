import React, { FC, forwardRef } from "react"

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'required'> {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  error?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  name,
  placeholder,
  required = false,
  error,
  ...props
}, ref) => {
  const shouldShowError = !!error
  const baseStyles = "w-full border border-gray-500 [border-style:solid] rounded-md px-2 py-1 h-20"
  const inputStyles = shouldShowError ? `${baseStyles} border-red-500` : baseStyles
  


  return (
    <div className="mb-3">
      <label className="block text-sm mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        ref={ref}
        placeholder={placeholder}
        className={inputStyles}
        aria-invalid={!!shouldShowError}
        rows={4}
        {...props}
      />
      {shouldShowError && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
})

TextArea.displayName = 'TextArea'

export default TextArea