import * as types from '../ConfigConstants/constants'
import * as actions from '../ApiIntegration/Actions'
const data = {
  value: 'test'
}
describe('actions for ownderDetails', () => {
  it('should create REQUEST_OWNER_DATA', () => {
    const expectedAction = {
      type: types.REQUEST_OWNER_DATA
    }
    expect(actions.requestOwnerDetails()).toEqual(expectedAction)
  })
  it('should create RECEIVE_OWNER_DATA', () => {
    const expectedAction = {
      type: types.RECEIVE_OWNER_DATA,
      payload: data
    }

    expect(actions.receiveOwnerDetails(data)).toEqual(expectedAction)
  })
  it('should create FAILURE_OWNER_DATA', () => {
    const expectedAction = {
      type: types.FAILURE_OWNER_DATA,
      payload: data
    }

    expect(actions.failureOwnerDetails(data)).toEqual(expectedAction)
  })
})
