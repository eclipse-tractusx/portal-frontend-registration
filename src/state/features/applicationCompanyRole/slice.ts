import { createSlice } from '@reduxjs/toolkit'
import { RequestState } from '../../../types/MainTypes'
import { RootState } from '../../store'
import {
  fetchAgreementData,
  fetchAgreementConsents,
  updateAgreementConsents,
} from './actions'
import { agreementDataValue, roleAggrementState } from './types'

const initialState: roleAggrementState = {
  consentData: agreementDataValue,
  allConsentData: agreementDataValue,
  request: RequestState.NONE,
  error: null,
}

const roleSlice = createSlice({
  name: 'registration/application/user',
  initialState,
  reducers: {
    setUsersToAdd: (state, action) => ({
      ...state,
      newUser: action.payload,
    }),
  },
  extraReducers: (builder) => {
    // fetch agreement data
    builder.addCase(fetchAgreementData.pending, (state) => ({
      ...state,
      allConsentData: agreementDataValue,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchAgreementData.fulfilled, (state, { payload }) => ({
      ...state,
      allConsentData: payload || agreementDataValue,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchAgreementData.rejected, (state, action) => ({
      ...state,
      allConsentData: agreementDataValue,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
    // fetch roles
    builder.addCase(fetchAgreementConsents.pending, (state) => ({
      ...state,
      consentData: agreementDataValue,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchAgreementConsents.fulfilled, (state, { payload }) => ({
      ...state,
      consentData: payload || agreementDataValue,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchAgreementConsents.rejected, (state, action) => ({
      ...state,
      consentData: agreementDataValue,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
    builder.addCase(updateAgreementConsents.pending, (state) => ({
      ...state,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(updateAgreementConsents.fulfilled, (state) => ({
      ...state,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(updateAgreementConsents.rejected, (state, action) => ({
      ...state,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): roleAggrementState =>
  state.role

export default roleSlice
