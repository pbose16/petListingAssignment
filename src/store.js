import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer.js'

const middleware = [thunk]
const intialState = {}
const store = createStore(rootReducer,intialState,applyMiddleware(...middleware));

export default store;