import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { storeFactory } from '../test/testUtils'
import App, { mapDispatchToProps, UnconnectedApp } from './App'

/**
 * @function setup
 * @param {object} state - State for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (state = {}) => {
  const store = storeFactory(state)
  const wrapper = mount(
    <Provider store={store}>
      <App lost="canvas" />
    </Provider>
  )

  return wrapper
}

describe('redux properties', () => {
  test('has access to `success` state', () => {
    const success = true
    const wrapper = setup({ success })
    const wrapperProps = wrapper.props().store
    const storeState = wrapperProps.getState()
    expect(storeState.success).toBe(success)
  })
  test('has access to `secretWord` state', () => {
    const secretWord = 'party'
    const wrapper = setup({ secretWord })
    const wrapperProps = wrapper.props().store
    const secretWordProp = wrapperProps.getState().secretWord
    expect(secretWordProp).toBe(secretWord)
  })
  test('has access to `guessedWords` state', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }]
    const wrapper = setup({ guessedWords })
    const wrapperProps = wrapper.props().store
    const guessedWordsProp = wrapperProps.getState().guessedWords
    expect(guessedWordsProp).toEqual(guessedWords)
  })
  test('`getSecretWord` action creator is a function on the props', () => {
    expect(mapDispatchToProps().getSecretWord).toBeInstanceOf(Function)
  })
})

test('`getSecretWord` runs on App mount', () => {
  const getSecretWordMock = jest.fn()

  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: []
  }

  // set up app component with getSecretWordMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />)

  // run lifecycle method
  wrapper.instance().componentDidMount()

  // check to see if mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length

  expect(getSecretWordCallCount).toBe(1)
})
