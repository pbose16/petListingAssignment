import axios from 'axios'
import {
  requestOwnerDetails,
  receiveOwnerDetails,
  failureOwnerDetails
} from '../ApiIntegration/Actions'
import { apiEndpoint } from '../ConfigConstants/constants'

/**
 * @description ActionCreator to retirve the api details
 */
export const getOwnerDetails = () => (dispatch) => {
  dispatch(requestOwnerDetails())
  return axios
    .get(apiEndpoint)
    .then((response) => {
      dispatch(receiveOwnerDetails(response.data))
    })
    .catch((err) => {
      dispatch(failureOwnerDetails(err))
    })
}
