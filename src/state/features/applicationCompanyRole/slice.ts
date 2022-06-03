import { createSlice } from '@reduxjs/toolkit'
import { RequestState } from '../../../types/MainTypes'
import { RootState } from '../../store'
import { fetchAgreementData, fetchAgreementConsents } from './actions'
import { agreementDataValue, roleAggrementState } from './types'

const initialState: roleAggrementState = {
  agreementData: agreementDataValue,
  roleData: agreementDataValue,
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
      agreementData: agreementDataValue,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchAgreementData.fulfilled, (state, { payload }) => ({
      ...state,
      agreementData: payload ||agreementDataValue,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchAgreementData.rejected, (state, action) => ({
      ...state,
      agreementData: agreementDataValue,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
    // fetch roles
    builder.addCase(fetchAgreementConsents.pending, (state) => ({
      ...state,
      roleData: agreementDataValue,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchAgreementConsents.fulfilled, (state, { payload }) => ({
      ...state,
      roleData: payload || agreementDataValue,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchAgreementConsents.rejected, (state, action) => ({
      ...state,
      roleData: agreementDataValue,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): roleAggrementState =>
  state.role

export default roleSlice