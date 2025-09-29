import React from 'react'

export interface ToastProps {
  type: 'success' | 'error'
  message: string
  isVisible: boolean
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ type, message, isVisible, onClose }) => {
  if (!isVisible) return null

  const baseClasses = "fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform max-w-sm"
  const typeClasses = type === 'success' 
    ? "bg-green-500 text-white border-l-4 border-green-700" 
    : "bg-red-500 text-white border-l-4 border-red-700"
  
  const animationClasses = isVisible 
    ? "opacity-100 translate-x-0" 
    : "opacity-0 translate-x-full"

  return (
    <div className={`${baseClasses} ${typeClasses} ${animationClasses}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3">
            {type === 'success' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <div>
            <p className="font-semibold">
              {type === 'success' ? 'Success!' : 'Error!'}
            </p>
            <p className="text-sm opacity-90">{message}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Toast