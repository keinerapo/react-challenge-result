import React from "react"

export interface InputSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isFormValid?: boolean
}

const InputSubmit = React.forwardRef<HTMLButtonElement, InputSubmitProps>(
  ({ label, isFormValid = false, ...props }, ref) => {

    return (
      <button
        ref={ref}
        type="submit"
        disabled={!isFormValid}
        className={`w-full font-bold py-2 rounded-md mt-4 ${
          isFormValid
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
