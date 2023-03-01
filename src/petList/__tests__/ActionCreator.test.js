import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
// import mockAxios from 'axios'
import * as types from '../ConfigConstants/constants'
import * as actions from '../ApiIntegration/ActionCreators'
const mockAxios = require('axios')

jest.mock('axios')
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({})
const data = [
  { name: 'Samantha', gender: 'Female', age: 40, pets: [{ name: 'Tabby', type: 'Cat' }] }
]
describe('Action Creator for ownerDetails', () => {
  beforeEach(() => {
    /** Clear mocks and actions before each test run */
    store.clearActions()
    mockAxios.mockClear()
    jest.clearAllMocks()
  })
  it('should dispatch receiveOwnerDetails action', () => {
    mockAxios.get.mockResolvedValueOnce({ data })
    const expectedAction = [
      { type: types.REQUEST_OWNER_DATA },
      { type: types.RECEIVE_OWNER_DATA, payload: data }
    ]
    return store.dispatch(actions.getOwnerDetails()).then(() => {
      const actionList = store.getActions()
      expect(actionList).toEqual(expectedAction)
    })
  })
  it('should dispatch failureOwnerDetails action', () => {
    mockAxios.get.mockResolvedValueOnce(Promise.reject({ value: 'test' }))
    const expectedAction = [
      { type: types.REQUEST_OWNER_DATA },
      { type: types.FAILURE_OWNER_DATA, payload: data }
    ]
    return store.dispatch(actions.getOwnerDetails()).then(() => {
      const actionList = store.getActions()
      expect(actionList).toEqual(expectedAction)
    })
  })
})
