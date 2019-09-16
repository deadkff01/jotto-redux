import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../../../test/testUtils'
import GuessedWords from './GuessedWords'

const defaultProps = {
  guessedWords: [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'agile', letterMatchCount: 1 },
    { guessedWord: 'party', letterMatchCount: 5 }
  ]
}

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  return shallow(<GuessedWords {...setupProps} />)
}

test('does not throw warning with expected props', () => {
  checkProps(GuessedWords, defaultProps)
})

describe('if there are no words guessed', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] })
  })
  test('render without error', () => {
    //checkProps(GuessedWords, defaultProps)
    const component = findByTestAttr(wrapper, 'component-guessed-words')
    expect(component.length).toBe(1)
  })
  test('render instructions to guess a word', () => {
    //checkProps(GuessedWords, defaultProps)
    const instructions = findByTestAttr(wrapper, 'guess-instructions')
    expect(instructions.text().length).not.toBe(0)
  })
})

describe('if there are words guessed', () => {
  const guessedWords2 = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'agile', letterMatchCount: 1 },
    { guessedWord: 'party', letterMatchCount: 5 }
  ]
  let wrapper
  beforeEach(() => {
    wrapper = setup({ guessedWords: guessedWords2 })
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words')
    expect(component.length).toBe(1)
  })
  test('renders "guessed words" section', () => {
    const component = findByTestAttr(wrapper, 'guessed-words')
    expect(component.length).toBe(1)
  })
  test('correct number of guessed words', () => {
    const component = findByTestAttr(wrapper, 'guessed-word')
    expect(component.length).toBe(guessedWords2.length)
  })
})
