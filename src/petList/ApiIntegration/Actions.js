import {
  REQUEST_OWNER_DATA,
  RECEIVE_OWNER_DATA,
  FAILURE_OWNER_DATA
} from '../ConfigConstants/constants.js'

/**
 * @description Request action
 */
export const requestOwnerDetails = () => ({
  type: REQUEST_OWNER_DATA
})

/**
 * @description Receive action
 */
export const receiveOwnerDetails = (payload) => ({
  type: RECEIVE_OWNER_DATA,
  payload
})

/**
 * @description Failure action
 */
export const failureOwnerDetails = (payload) => ({
  type: FAILURE_OWNER_DATA,
  payload
})
