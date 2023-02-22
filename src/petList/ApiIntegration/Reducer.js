import {
  REQUEST_OWNER_DATA,
  RECEIVE_OWNER_DATA,
  FAILURE_OWNER_DATA
} from '../ConfigConstants/constants'

const initialState = {
  isFetchOwnerDataInitiated: false,
  isFetchOwnerDataSuccessful: false,
  isFetchOwnerDataError: false,
  ownerDetails: null,
  errorDetails: null
}
/**
 * @description Reducer Pure fuction to update the store
 */
const ownerDetailsStore = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case REQUEST_OWNER_DATA:
      return {
        ...state,
        isFetchOwnerDataInitiated: true
      }
    case RECEIVE_OWNER_DATA:
      return {
        ...state,
        isFetchOwnerDataInitiated: false,
        isFetchOwnerDataSuccessful: true,
        ownerDetails: payload
      }
    case FAILURE_OWNER_DATA:
      return {
        ...state,
        isFetchOwnerDataInitiated: false,
        isFetchOwnerDataError: true,
        errorDetails:payload
      }
    default:
      return {
        ...state
      }
  }
}
export default ownerDetailsStore
