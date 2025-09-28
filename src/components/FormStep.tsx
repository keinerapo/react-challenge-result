import React, { useEffect, useRef, useState } from "react"
import { FieldConfig, SUBMIT_BUTTON_ATTRIBUTES } from "../types/fieldTypes"

export type FormStepProps = {
  fields: FieldConfig[]
  title?: string
  onSubmit?: (data: any) => void
}

export function FormStep({ fields, title = "Form" }: FormStepProps) {
  const formRef = useRef<HTMLDivElement>(null)
  const requiredFields = ['name', 'address', 'type']
  const [fieldValidation, setFieldValidation] = useState<Record<string, {isValid: boolean, hasError: boolean}>>(() => {
    const initialState: Record<string, {isValid: boolean, hasError: boolean}> = {}
    requiredFields.forEach(fieldName => {
      initialState[fieldName] = { isValid: false, hasError: false }
    })
    return initialState
  })
  
  const isFormValid = requiredFields.every(fieldName => fieldValidation[fieldName]?.isValid === true)
  
  useEffect(() => {
    const handleFieldValidation = (event: CustomEvent) => {
      const { fieldName, isValid, hasError } = event.detail
      setFieldValidation(prev => ({
        ...prev,
        [fieldName]: { isValid, hasError }
      }))
    }
    document.addEventListener('field-validation', handleFieldValidation as EventListener)
    
    return () => {
      document.removeEventListener('field-validation', handleFieldValidation as EventListener)
    }
  }, [])
  
  useEffect(() => {
    const reactContainer = formRef.current?.parentElement
    const rcFormStep = reactContainer?.parentElement
    const submitButton = rcFormStep?.querySelector('rc-input-submit')
    if (submitButton) {
      submitButton.setAttribute(SUBMIT_BUTTON_ATTRIBUTES.FORM_VALID, isFormValid.toString())
      submitButton.dispatchEvent(new CustomEvent('form-validation-change', {
        detail: { isFormValid }
      }))
    }
  }, [isFormValid])

  return (
    <div ref={formRef}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
    </div>
  )
}

