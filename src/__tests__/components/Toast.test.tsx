import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Toast from '../../components/Toast'

describe('Toast', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('should not render when isVisible is false', () => {
    render(
      <Toast 
        type="success" 
        message="Test message"
        isVisible={false}
        onClose={mockOnClose}
      />
    )
    
    expect(screen.queryByText('Success!')).not.toBeInTheDocument()
    expect(screen.queryByText('Test message')).not.toBeInTheDocument()
  })

  it('should render when isVisible is true', () => {
    render(
      <Toast 
        type="success" 
        message="Test message"
        isVisible={true}
        onClose={mockOnClose}
      />
    )
    
    expect(screen.getByText('Success!')).toBeInTheDocument()
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    render(
      <Toast 
        type="success" 
        message="Test message"
        isVisible={true}
        onClose={mockOnClose}
      />
    )
    
    const closeButton = screen.getAllByRole('button')[0]
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})