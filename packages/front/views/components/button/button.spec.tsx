import { fireEvent, render } from 'src/utils/test-helper'

import { Button } from '.'

describe('<Button />', () => {
  const onPressMock = jest.fn()

  afterEach(() => {
    onPressMock.mockClear()
  })

  describe('When the button is ENABLED', () => {
    it('should render the title', () => {
      const { getByText } = render(<Button title="Enabled" isDisabled />)
      expect(getByText('Enabled')).toBeTruthy()
    })
    it('should call the function when pressed', () => {
      const { getByText } = render(<Button title="Enabled" onPress={onPressMock} />)
      fireEvent.press(getByText('Enabled'))
      expect(onPressMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('When the button is DISABLED', () => {
    it('should render the title', () => {
      const { getByText } = render(<Button title="Disabled" isDisabled />)
      expect(getByText('Disabled')).toBeTruthy()
    })
    it('should NOT call the function when pressed', () => {
      const { getByText } = render(
        <Button title="Disabled" isDisabled onPress={onPressMock} />
      )
      fireEvent.press(getByText('Disabled'))
      expect(onPressMock).toHaveBeenCalledTimes(0)
    })
  })

  describe('When the button is DISABLED', () => {
    it('should render the title', () => {
      const { getByText } = render(<Button title="Disabled" isDisabled />)
      expect(getByText('Disabled')).toBeTruthy()
    })

    it('should NOT call the function when pressed', () => {
      const { getByText } = render(
        <Button title="Disabled" isDisabled onPress={onPressMock} />
      )
      fireEvent.press(getByText('Disabled'))
      expect(onPressMock).toHaveBeenCalledTimes(0)
    })
  })

  describe('When the button is LOADING', () => {
    it('should render the spinner', () => {
      const { getByTestId } = render(<Button title="Loading" isLoading />)
      expect(getByTestId('ActivityIndicator')).toBeTruthy()
    })
  })
})
