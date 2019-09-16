import { actionTypes } from '../actions'

/**
 * @function secretWordReducer
 * @param {string} state - State before reducer
 * @param {object} action - action to be reduced
 * @returns {string} - new state (secret word payload from action)
 */
export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_SECRET_WORD:
      return action.payload
    default:
      return state
  }
}
