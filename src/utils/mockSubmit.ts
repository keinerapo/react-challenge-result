import { useState } from 'react'

export const mockFormSubmit = async (): Promise<{ success: boolean; message: string }> => {
  const delay = Math.random() * 2000 + 1000
  await new Promise(resolve => setTimeout(resolve, delay))
  const random = Math.random()
  const isSuccess = random < 0.7

  if (isSuccess) {
    return {
      success: true,
      message: 'Form submitted successfully! Your accommodation has been registered.'
    }
  } else {
    const errorMessages = [
      'Network error. Please check your connection and try again.',
      'Server is temporarily unavailable. Please try again later.',
      'Invalid data format. Please review your information.',
      'Upload limit exceeded. Please reduce file sizes.',
      'Validation failed. Please check all required fields.'
    ]
    
    const randomErrorIndex = Math.floor(Math.random() * errorMessages.length)
    
    return {
      success: false,
      message: errorMessages[randomErrorIndex]
    }
  }
}

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitForm = async (): Promise<{ success: boolean; message: string }> => {
    setIsSubmitting(true)
    try {
      const result = await mockFormSubmit()
      return result
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    submitForm
  }
}