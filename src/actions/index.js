import axios from 'axios'
import { getLetterMatchCount } from '../helpers'

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD'
}

/**
 *  Returns Redux Thunk function that dispatches GUESS_WORD action
 *  and (conditionally) CORRECT_GUESS action
 *  @function guessWord
 *  @param {string} guessWord - Guessed word
 *  @return {function} - Redux Thunk function
 */
export const guessWord = guessedWord => (dispatch, getState) => {
  const secretWord = getState().secretWord
  const letterMatchCount = getLetterMatchCount(secretWord, guessedWord)
  dispatch({ type: actionTypes.GUESS_WORD, payload: { guessedWord, letterMatchCount } })

  if (guessedWord === secretWord) {
    dispatch({ type: actionTypes.CORRECT_GUESS })
  }
}

/**
 * Returns Redux Thunk function that initiates an axios request
 *    and dispatches the response as a 'SET_SECRET_WORD' action
 * @returns {function} - Redux Thunk function.
 */
// Test without backends
// export const getSecretWord = () => async dispatch =>
//   new Promise(resolve =>
//     setTimeout(() => {
//       dispatch({ type: actionTypes.SET_SECRET_WORD, payload: 'party' })
//       resolve()
//     }, 500)
//   )

export const getSecretWord = () => async dispatch =>
  axios
    .get('http://localhost:3030')
    .then(response => dispatch({ type: actionTypes.SET_SECRET_WORD, payload: response.data }))
    .catch(() => {})
