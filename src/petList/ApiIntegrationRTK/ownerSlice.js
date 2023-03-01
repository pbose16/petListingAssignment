import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiEndpoint } from '../ConfigConstants/constants'

const initialState = {
  isFetchOwnerDataInitiated: false,
  isFetchOwnerDataSuccessful: false,
  isFetchOwnerDataError: false,
  ownerDetails: null,
  errorDetails: null
}

/**
 * @description Action
 */
export const getOwnerDetails = createAsyncThunk('getOwnerDetails', () => {
  return axios.get(apiEndpoint).then((response) => response.data)
})
/**
 * @description Slice Declarations
 */
const ownerDetails = createSlice({
  name: 'ownerDetails',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getOwnerDetails.pending, (state) => {
      state.isFetchOwnerDataInitiated = true
    })
    builder.addCase(getOwnerDetails.fulfilled, (state, action) => {
      state.isFetchOwnerDataInitiated = false
      state.isFetchOwnerDataSuccessful = true
      state.ownerDetails = action?.payload ?? null
    })
    builder.addCase(getOwnerDetails.rejected, (state, action) => {
      state.isFetchOwnerDataInitiated = false
      state.isFetchOwnerDataError = true
      state.errorDetails = action?.payload ?? null
    })
  }
})

export default ownerDetails.reducer
