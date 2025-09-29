import { render, screen, fireEvent } from '@testing-library/react'
import TextField from '../../components/TextField'

describe('TextField', () => {
  it('should render with label and placeholder', () => {
    render(
      <TextField 
        label="Name" 
        name="name" 
        placeholder="Enter name"
      />
    )
    
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument()
  })

  it('should show error message when error prop is provided', () => {
    render(
      <TextField 
        label="Name" 
        name="name" 
        error="Name is required"
      />
    )
    
    expect(screen.getByText('Name is required')).toBeInTheDocument()
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-500')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('should handle input changes', () => {
    const handleChange = jest.fn()
    render(
      <TextField 
        label="Name" 
        name="name"
        onChange={handleChange}
      />
    )
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('test value')
  })
})