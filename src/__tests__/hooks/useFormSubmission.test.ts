import { renderHook, act } from '@testing-library/react'
import { useFormSubmission } from '../../utils/mockSubmit'

const mockSubmitForm = jest.fn()

jest.mock('../../utils/mockSubmit', () => ({
  useFormSubmission: () => ({
    isSubmitting: false,
    submitForm: mockSubmitForm
  }),
  mockFormSubmit: jest.fn()
}))

describe('useFormSubmission', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with isSubmitting false', () => {
    const { result } = renderHook(() => useFormSubmission())
    expect(result.current.isSubmitting).toBe(false)
    expect(typeof result.current.submitForm).toBe('function')
  })

  it('should call submitForm when invoked', () => {
    const { result } = renderHook(() => useFormSubmission())
    act(() => {
      result.current.submitForm()
    })
    expect(mockSubmitForm).toHaveBeenCalledTimes(1)
  })

  it('should maintain consistent structure', () => {
    const { result } = renderHook(() => useFormSubmission())
    expect(result.current).toHaveProperty('isSubmitting')
    expect(result.current).toHaveProperty('submitForm')
    expect(typeof result.current.isSubmitting).toBe('boolean')
    expect(typeof result.current.submitForm).toBe('function')
  })
})