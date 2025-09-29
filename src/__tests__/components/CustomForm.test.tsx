import { render, screen } from '@testing-library/react'
import CustomForm from '../../components/CustomForm'

describe('CustomForm', () => {
  it('should render step 1 initially', () => {
    render(<CustomForm />)
    
    expect(screen.getByText('Accommodation')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Address')).toBeInTheDocument() 
    expect(screen.getByText('Property Type')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
  })

  it('should show Next button as disabled initially', () => {
    render(<CustomForm />)
    
    const nextButton = screen.getByRole('button', { name: 'Next' })
    expect(nextButton).toBeDisabled()
  })

  it('should render photos section', () => {
    render(<CustomForm />)
    
    expect(screen.getByText('Photos')).toBeInTheDocument()
    expect(screen.getByText('Photo 1')).toBeInTheDocument()
    expect(screen.getByText('Photo 2')).toBeInTheDocument()
    expect(screen.getByText('Add Photo')).toBeInTheDocument()
  })
})