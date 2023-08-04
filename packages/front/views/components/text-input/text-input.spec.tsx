import { render, screen } from 'front/utils/test-helper'

import { TextInput } from '.'

describe('TextInput component', () => {
  it('should be able to render', () => {
    render(<TextInput placeholder="Your name" />)
    expect(screen.getByPlaceholderText('Your name')).toBeTruthy()
  })

  it('should be able to render with helper message', () => {
    render(<TextInput placeholder="Your name" helper="Your full name" />)
    const helperMsg = screen.getByText('Your full name')
    expect(helperMsg).toBeTruthy()
  })

  it('should be able to render with error message', () => {
    render(<TextInput placeholder="Your name" error="Name is required" />)
    const errorMsg = screen.getByText('Name is required')
    expect(errorMsg).toBeTruthy()
  })

  it('should be able to render as password input', () => {
    render(<TextInput placeholder="Your password" secureEntry />)
    const pwdInput = screen.getByPlaceholderText('Your password')
    expect(pwdInput.props.secureTextEntry).toBeTruthy()
  })
})
