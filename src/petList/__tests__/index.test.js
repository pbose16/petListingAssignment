/* eslint-disable */
import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { render, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import PetList from '../View'

const sampleProps = {
  isFetchOwnerDataInitiated: true,
  isFetchOwnerDataSuccessful: false,
  isFetchOwnerDataError: false,
  ownerDetails: [
    { name: 'Jennifer', gender: 'Female', age: 18, pets: [{ name: 'Garfield', type: 'Cat' }] },
    { name: 'Steve', gender: 'Male', age: 45, pets: [{ name: 'Tabby', type: 'Cat' }] }
  ]
}

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})
describe('Offer Details: UI', () => {
  it('should render loader correctly', () => {
    const defaultStore = { ownerDetailsStore: { sampleProps } }
    const store = mockStore(defaultStore)
    const { getByTestId } = render(
      <Provider store={store}>
        <PetList />
      </Provider>
    )
    expect(getByTestId('pet-display-container')).toBeInTheDocument()
    expect(getByTestId('data-fetch-loader')).toBeInTheDocument()
    expect(getByTestId('data-fetch-error')).toBeInTheDocument()
  })

  it('should render details correctly', () => {
    const newProps = {
      ...sampleProps,
      isFetchOwnerDataInitiated: false,
      isFetchOwnerDataSuccessful: true
    }
    const defaultStore = { ownerDetailsStore: { newProps } }
    const store = mockStore(defaultStore)
    const { getByTestId } = render(
      <Provider store={store}>
        <PetList />
      </Provider>
    )
    expect(getByTestId('pet-display-container')).toBeInTheDocument()
    expect(getByTestId('data-fetch-loader')).toBeInTheDocument()
    expect(getByTestId('data-fetch-error')).toBeInTheDocument()
  })

  it('should render error section correctly', () => {
    const newProps = {
      ...sampleProps,
      isFetchOwnerDataInitiated: false,
      isFetchOwnerDataError: true
    }
    const defaultStore = { ownerDetailsStore: { newProps } }
    const store = mockStore(defaultStore)
    const { getByTestId } = render(
      <Provider store={store}>
        <PetList />
      </Provider>
    )
    expect(getByTestId('pet-display-container')).toBeInTheDocument()
    expect(getByTestId('data-fetch-loader')).toBeInTheDocument()
    expect(getByTestId('data-fetch-error')).toBeInTheDocument()
  })
})
