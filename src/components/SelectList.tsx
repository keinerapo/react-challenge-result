import React, { forwardRef } from "react"

export interface SelectListProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'name' | 'required'> {
  label: string
  name: string
  options?: string[]
  required?: boolean
  error?: string
}

const SelectList = forwardRef<HTMLSelectElement, SelectListProps>(({
  label,
  name,
  options = [],
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
            <select
        ref={ref}
        className={inputStyles}
        aria-invalid={!!shouldShowError}
        {...props}
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {shouldShowError && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
})

SelectList.displayName = 'SelectList'

export default SelectList

