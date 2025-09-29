import { render, screen, fireEvent } from '@testing-library/react'
import SelectList from '../../components/SelectList'

describe('SelectList', () => {
  const mockOptions = ['Option 1', 'Option 2', 'Option 3']

  it('should render all provided options', () => {
    render(
      <SelectList 
        label="Type" 
        name="type" 
        options={mockOptions}
      />
    )
    
    mockOptions.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument()
    })
  })

  it('should show error message when error prop is provided', () => {
    render(
      <SelectList 
        label="Type" 
        name="type" 
        options={mockOptions}
        error="Type is required"
      />
    )
    
    expect(screen.getByText('Type is required')).toBeInTheDocument()
    const select = screen.getByRole('combobox')
    expect(select).toHaveClass('border-red-500')
    expect(select).toHaveAttribute('aria-invalid', 'true')
  })

  it('should handle selection changes', () => {
    const handleChange = jest.fn()
    render(
      <SelectList 
        label="Type" 
        name="type" 
        options={mockOptions}
        onChange={handleChange}
      />
    )
    
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'Option 2' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(select).toHaveValue('Option 2')
  })
})