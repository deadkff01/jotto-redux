import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

export const middlewares = [thunk]

const store = applyMiddleware(thunk)(createStore)(rootReducer)

export default store
