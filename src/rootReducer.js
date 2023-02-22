import { combineReducers } from 'redux';
import ownerDetailsStore from '../src/petList/ApiIntegration/Reducer';
const rootReducer = combineReducers({
    ownerDetailsStore
});
export default rootReducer;