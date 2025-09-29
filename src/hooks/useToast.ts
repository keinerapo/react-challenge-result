import { useState, useCallback } from 'react'

export interface ToastState {
  type: 'success' | 'error'
  message: string
  isVisible: boolean
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    type: 'success',
    message: '',
    isVisible: false
  })

  const showToast = useCallback((type: 'success' | 'error', message: string) => {
    setToast({
      type,
      message,
      isVisible: true
    })

    setTimeout(() => {
      setToast(prev => ({
        ...prev,
        isVisible: false
      }))
    }, 4000)
  }, [])

  const hideToast = useCallback(() => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }))
  }, [])

  const showSuccess = useCallback((message: string) => {
    showToast('success', message)
  }, [showToast])

  const showError = useCallback((message: string) => {
    showToast('error', message)
  }, [showToast])

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError
  }
}