// import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk'
import rootReducer from './rootReducer.js'

/**
 * @description Commenting for introduction of RTK
 */
// const middleware = [thunk]
// const intialState = {}
// const store = createStore(rootReducer, intialState, applyMiddleware(...middleware))

const store = configureStore({ reducer: rootReducer })

export default store
