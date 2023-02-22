import ownerReducer from '../ApiIntegration/Reducer'
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
const payload = initialState

describe('ownerReducer store', () => {
  it('should return the initial state', () => {
    expect(ownerReducer(undefined, {})).toEqual(initialState)
  })
  it('should handle REQUEST_OWNER_DATA', () => {
    expect(
        ownerReducer([], {
        type: REQUEST_OWNER_DATA
      })
    ).toEqual({
        isFetchOwnerDataInitiated: true
    })
  })

  it('should handle RECEIVE_OWNER_DATA', () => {
    expect(
        ownerReducer([], {
        type: RECEIVE_OWNER_DATA,
        payload
      })
    ).toEqual({
        isFetchOwnerDataInitiated: false,
        isFetchOwnerDataSuccessful: true,
        ownerDetails: payload
    })
  })

  it('should handle FAILURE_OWNER_DATA', () => {
    expect(
        ownerReducer([], {
        type: FAILURE_OWNER_DATA,
        payload
      })
    ).toEqual({
        isFetchOwnerDataInitiated: false,
        isFetchOwnerDataError: true,
        errorDetails:payload
    })
  })
})
