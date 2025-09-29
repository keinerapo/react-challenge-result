import { z } from 'zod'

export const step1Schema = z.object({
  name: z
    .string()
    .min(4, 'Name must be at least 4 characters')
    .max(128, 'Name must be at most 128 characters')
    .refine((value) => !/\d/.test(value), {
      message: 'Name cannot contain numbers'
    }),
  address: z
    .string()
    .min(4, 'Address must be at least 4 characters')
    .max(128, 'Address must be at most 128 characters'),
  description: z
    .string()
    .min(128, 'Description must be at least 128 characters')
    .max(2048, 'Description must be at most 2048 characters')
    .optional(),
  type: z.enum(['Apartment', 'Villa', 'House'], {
        message: 'Please select a type'
    }),
  photos: z
    .array(z.instanceof(File))
    .max(2, 'Maximum 2 photos allowed')
    .refine(async (files) => {
      if (!files || files.length === 0) return true
      const checks = files.map(file => {
        return new Promise<boolean>((resolve) => {
          const img = new Image()
          img.onload = () => {
            resolve(img.width <= 500 && img.height <= 500)
          }
          img.onerror = () => resolve(false)
          img.src = URL.createObjectURL(file)
        })
      })
      
      const results = await Promise.all(checks)
      return results.every(result => result === true)
    }, {
      message: 'All photos must be maximum 500x500 pixels'
    })
})

export const step2Schema = z.object({
  name: z
    .string()
    .min(4, 'Name must be at least 4 characters')
    .max(64, 'Name must be at most 64 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\d*$/, { message: "Phone number must contain only digits" })
    .max(9, { message: "Phone number must be at most 9 digits" })
    .optional()
    .or(z.literal(''))
})

export const customFormSchema = z.object({
  step1: step1Schema,
  step2: step2Schema
})

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type CustomFormData = z.infer<typeof customFormSchema>

export const getStepSchema = (step: number) => {
  switch (step) {
    case 1:
      return step1Schema
    case 2:
      return step2Schema
    default:
      return z.object({})
  }
}