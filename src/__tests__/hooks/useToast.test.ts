import { renderHook, act } from '@testing-library/react'
import { useToast } from '../../hooks/useToast'

describe('useToast', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should initialize with hidden toast', () => {
    const { result } = renderHook(() => useToast())
    expect(result.current.toast.isVisible).toBe(false)
    expect(result.current.toast.type).toBe('success')
    expect(result.current.toast.message).toBe('')
  })

  it('should show success toast', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.showSuccess('Success message')
    })
    expect(result.current.toast.isVisible).toBe(true)
    expect(result.current.toast.type).toBe('success')
    expect(result.current.toast.message).toBe('Success message')
  })

  it('should show error toast', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.showError('Error message')
    })
    expect(result.current.toast.isVisible).toBe(true)
    expect(result.current.toast.type).toBe('error')
    expect(result.current.toast.message).toBe('Error message')
  })

  it('should auto-hide success toast after 5 seconds', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.showSuccess('Success message')
    })
    expect(result.current.toast.isVisible).toBe(true)
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(result.current.toast.isVisible).toBe(false)
  })
})