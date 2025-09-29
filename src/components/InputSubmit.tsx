import React, { forwardRef } from "react"
import { FIELD_KINDS } from "../types/fieldTypes"

export interface InputSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isFormValid?: boolean
}

const InputSubmit = forwardRef<HTMLButtonElement, InputSubmitProps>(
  ({ label, isFormValid = false, disabled, ...props }, ref) => {
    const isDisabled = disabled || !isFormValid

    return (
      <button
        ref={ref}
        type={FIELD_KINDS.SUBMIT}
        disabled={isDisabled}
        className={`w-full font-bold py-2 rounded-md mt-4 ${
          !isDisabled
            ? "bg-blue-500 text-white hover:bg-blue-600" 
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        {...props}
      >
        {label}
      </button>
    )
  }
)

export default InputSubmit
