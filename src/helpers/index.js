/**
 * @method getLetterMatchCount
 * @param {*} guessedWord - Guessed word
 * @param {*} secretWord- Secret word
 * @returns {number} Number of letters matched between guessed word and secret word
 */
export const getLetterMatchCount = (guessedWord, secretWord) =>
  secretWord.split('').filter(l => guessedWord.indexOf(l) !== -1).length
