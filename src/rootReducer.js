import { combineReducers } from 'redux'
import ownerDetails from './petList/ApiIntegrationRTK/ownerSlice'
const rootReducer = combineReducers({
  ownerDetails
})
export default rootReducer
