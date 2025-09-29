import { render, screen, fireEvent } from '@testing-library/react'
import InputSubmit from '../../components/InputSubmit'

describe('InputSubmit', () => {
  it('should render with correct label', () => {
    render(
      <InputSubmit 
        label="Submit Form"
        isFormValid={true}
      />
    )
    
    expect(screen.getByRole('button', { name: 'Submit Form' })).toBeInTheDocument()
  })

  it('should be enabled when isFormValid is true', () => {
    render(
      <InputSubmit 
        label="Submit"
        isFormValid={true}
      />
    )
    
    const button = screen.getByRole('button')
    expect(button).not.toBeDisabled()
    expect(button).toHaveClass('bg-blue-500', 'text-white', 'hover:bg-blue-600')
  })

  it('should be disabled when isFormValid is false', () => {
    render(
      <InputSubmit 
        label="Submit"
        isFormValid={false}
      />
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('bg-gray-300', 'text-gray-500', 'cursor-not-allowed')
  })

  it('should call onClick handler when clicked and enabled', () => {
    const handleClick = jest.fn()
    render(
      <InputSubmit 
        label="Submit"
        isFormValid={true}
        onClick={handleClick}
      />
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})