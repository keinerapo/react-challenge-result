import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step1Schema, step2Schema, Step1Data, Step2Data } from '../schemas/customFormSchemas'
import TextField from './TextField'
import SelectList from './SelectList'
import PhotoUploader, { PhotoUploaderRef } from './PhotoUploader'
import InputSubmit from './InputSubmit'
import TextContent from './TextContent'
import PhotoPreviewGrid from './PhotoPreviewGrid'
import Toast from './Toast'
import { useToast } from '../hooks/useToast'
import { useFormSubmission } from '../utils/mockSubmit'


const CustomForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null)
  const { toast, showSuccess, showError, hideToast } = useToast()
  const { isSubmitting, submitForm } = useFormSubmission()

  const {
    control: step1Control,
    handleSubmit: handleStep1Submit,
    formState: { errors: step1Errors, isValid: step1IsValid }
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: 'onBlur',
    defaultValues: {
      name: undefined,
      address: undefined,
      description: undefined,  
      type: undefined,
      photos: []
    }
  })

  const {
    control: step2Control,
    handleSubmit: handleStep2Submit,
    formState: { errors: step2Errors, isValid: step2IsValid }
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: 'onBlur',
    defaultValues: {
      name: undefined,
      email: undefined,
      phone: undefined
    }
  })

  const onStep1Submit = (data: Step1Data) => {
    setStep1Data(data)
    setCurrentStep(2)
  }

  const onStep2Submit = (data: Step2Data) => {
    setStep2Data(data)
    setCurrentStep(3)
  }

  const handleFinalSubmit = async () => {
    if (!step1Data || !step2Data) return

    try {
      const result = await submitForm()
      
      if (result.success) {
        showSuccess(result.message)
      } else {
        showError(result.message)
      }
    } catch (error) {
      showError('An unexpected error occurred. Please try again.')
    }
  }

  const renderStep1 = () => (
    <div className="w-[393px] min-h-screen bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Accommodation</h2>
      
      <Controller
        name="name"
        control={step1Control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            placeholder="Enter the accommodation name"
            required={true}
            error={step1Errors.name?.message}
          />
        )}
      />

      <Controller
        name="address"
        control={step1Control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Address"
            placeholder="Enter the accommodation address"
            required={true}
            error={step1Errors.address?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={step1Control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            placeholder="Enter the accommodation description"
            error={step1Errors.description?.message}
          />
        )}
      />

      <Controller
        name="type"
        control={step1Control}
        render={({ field }) => (
          <SelectList
            {...field}
            label="Property Type"
            options={['Apartment', 'Villa', 'House']}
            required={true}
            error={step1Errors.type?.message}
          />
        )}
      />

      <Controller
        name="photos"
        control={step1Control}
        render={({ field }) => (
          <PhotoUploader
            {...field}
            name="photos"
            label="Photos"
            error={step1Errors.photos?.message}
          />
        )}
      />

      <InputSubmit
        label="Next"
        isFormValid={step1IsValid}
        onClick={handleStep1Submit(onStep1Submit)}
      />
    </div>
  )

  const renderStep2 = () => (
    <div className="w-[392px] min-h-screen bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Owner</h2>
      
      <Controller
        name="name"
        control={step2Control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            placeholder="Enter owner name"
            required={true}
            error={step2Errors.name?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={step2Control}
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            label="Email"
            placeholder="Enter your email address"
            required={true}
            error={step2Errors.email?.message}
          />
        )}
      />

      <Controller
        name="phone"
        control={step2Control}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label="Phone"
            placeholder="Enter phone number"
            error={step2Errors.phone?.message}
          />
        )}
      />

      <InputSubmit
          label="Next"
          isFormValid={step2IsValid}
          onClick={handleStep2Submit(onStep2Submit)}
        />
    </div>
  )

  const renderStep3 = () => (
    <div className="w-[392px] min-h-screen bg-white rounded-lg p-6">      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Accommodation</h2>
        <TextContent
          label="Name"
          value={step1Data?.name || ''}
        />
        <TextContent
          label="Address"
          value={step1Data?.address || ''}
        />
        <TextContent
          label="Description"
          value={step1Data?.description || ''}
        />
        <TextContent
          label="Type"
          value={step1Data?.type || ''}
        />
        <PhotoPreviewGrid 
            label='Photos' 
            photos={step1Data?.photos?.map(photo => URL.createObjectURL(photo))}>
        </PhotoPreviewGrid>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Owner</h2>
        <TextContent
          label="Name"
          value={step2Data?.name || ''}
        />
        <TextContent
          label="Email"
          value={step2Data?.email || ''}
        />
        <TextContent
          label="Phone"
          value={step2Data?.phone || ''}
        />
      </div>

      <InputSubmit
        label={isSubmitting ? "Submitting..." : "Submit"}
        isFormValid={!isSubmitting}
        onClick={handleFinalSubmit}
      />
    </div>
  )

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>

      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  )
}

export default CustomForm