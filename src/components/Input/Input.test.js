import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { findByTestAttr, storeFactory } from '../../../test/testUtils'
import Input, { UnconnectedInput, mapDispatchToProps } from './Input'

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {object} initialState - Initial state of this setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState)
  const wrapper = mount(
    <Provider store={store}>
      <Input lost="canvas" />
    </Provider>
  )
  return wrapper
}

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper

    beforeEach(() => {
      const initialState = { success: false }
      wrapper = setup(initialState)
    })

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input')
      expect(component.length).toBe(1)
    })

    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box')
      expect(inputBox.length).toBe(1)
    })

    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      expect(submitButton.length).toBe(1)
    })
  })

  describe('word has been guessed', () => {
    let wrapper
    beforeEach(() => {
      const initialState = { success: true }
      wrapper = setup(initialState)
    })

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input')
      expect(component.length).toBe(1)
    })

    test('does not renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box')
      expect(inputBox.length).toBe(0)
    })

    test('does renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      expect(submitButton.length).toBe(0)
    })
  })
})

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true
    const wrapper = setup({ success })
    const wrapperProps = wrapper.props().store
    const storeState = wrapperProps.getState()
    expect(storeState.success).toBe(success)
  })
  test('`guessword` action creator is a function prop', () => {
    expect(mapDispatchToProps().guessWord).toBeInstanceOf(Function)
  })
})

describe('`guessWord` action creator call', () => {
  let guessWordMock = null
  let wrapper = {}
  const guessedWord = 'train'
  beforeEach(() => {
    // create a mock function for `getSecretWord`
    guessWordMock = jest.fn()

    // set up Input, with guessWordMock as a prop
    wrapper = shallow(<UnconnectedInput guessWord={guessWordMock} />)

    // add value to input box
    wrapper.setState({ currentGuess: guessedWord })

    // simulate click on submit button
    const submit = findByTestAttr(wrapper, 'submit-button')
    submit.simulate('click', { preventDefault() {} })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('calls `guessWord` when button is clicked', () => {
    // check to see if mock ran
    const guessWordCallCount = guessWordMock.mock.calls.length
    expect(guessWordCallCount).toBe(1)
  })

  test('calls `guessWord with input value as argument`', () => {
    const guessWordArg = guessWordMock.mock.calls[0][0]
    expect(guessWordArg).toBe(guessedWord)
  })

  test('input box clears on submit', () => {
    expect(wrapper.state('currentGuess')).toBe('')
  })
})
