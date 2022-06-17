import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { fetchRegistrationData, saveRegistration } from './actions'
import { RegistrationState, InitialRegistrationValue } from './types'

const initialState: RegistrationState = {
  registrationData: InitialRegistrationValue,
  loading: false,
  error: null,
}

const applicationSlice = createSlice({
  name: 'registration/application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegistrationData.pending, (state) => ({
      ...state,
      registrationData: InitialRegistrationValue,
      loading: true,
      error: null,
    }))
    builder.addCase(fetchRegistrationData.fulfilled, (state, { payload }) => ({
      ...state,
      registrationData: payload || InitialRegistrationValue,
      loading: false,
      error: null,
    }))
    builder.addCase(fetchRegistrationData.rejected, (state, action) => ({
      ...state,
      registrationData: InitialRegistrationValue,
      loading: false,
      error: action.error.message as string,
    }))
    builder.addCase(saveRegistration.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    builder.addCase(saveRegistration.fulfilled, (state) => ({
      ...state,
      loading: false,
      error: null,
    }))
    builder.addCase(saveRegistration.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): RegistrationState =>
  state.registrationData

export default applicationSlice
