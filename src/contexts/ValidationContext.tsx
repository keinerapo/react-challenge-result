import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ValidationContextType {
  fieldErrors: Record<string, string | undefined>
  setFieldError: (fieldName: string, error: string | undefined) => void
  isFormValid: boolean
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined)

export const useValidation = () => {
  const context = useContext(ValidationContext)
  return context
}

interface ValidationProviderProps {
  children: ReactNode
  requiredFields: string[]
}

export const ValidationProvider: React.FC<ValidationProviderProps> = ({ 
  children, 
  requiredFields 
}) => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({})

  const setFieldError = (fieldName: string, error: string | undefined) => {
    setFieldErrors(prev => ({ ...prev, [fieldName]: error }))
  }

  const isFormValid = requiredFields.every(field => 
    fieldErrors[field] === undefined && fieldErrors.hasOwnProperty(field)
  )

  return (
    <ValidationContext.Provider value={{ fieldErrors, setFieldError, isFormValid }}>
      {children}
    </ValidationContext.Provider>
  )
}