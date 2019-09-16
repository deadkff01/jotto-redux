import { getLetterMatchCount } from './'

describe('getLetterMatchCount', () => {
  const secretWord = 'party'
  test('return correct count when there are no matching letters', () => {
    const letterMathCount = getLetterMatchCount('bones', secretWord)
    expect(letterMathCount).toBe(0)
  })
  test('return the correct count where there are 3 matching letters', () => {
    const letterMathCount = getLetterMatchCount('train', secretWord)
    expect(letterMathCount).toBe(3)
  })
  test('return correct count when there are duplicate letters in the guess', () => {
    const letterMathCount = getLetterMatchCount('parka', secretWord)
    expect(letterMathCount).toBe(3)
  })
})
