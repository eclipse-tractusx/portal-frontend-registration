import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { fetchId, updateInvitation, updateStatus, getCompanyDetailsWithAddress } from './actions'
import { ApplicationState, InitialCompanyDetail } from './types'

const initialState: ApplicationState = {
  status: [],
  companyDetails: InitialCompanyDetail,
  loading: false,
  error: null,
}

const applicationSlice = createSlice({
  name: 'registration/application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchId.pending, (state) => ({
      ...state,
      status: [],
      loading: true,
      error: null,
    }))
    builder.addCase(fetchId.fulfilled, (state, { payload }) => ({
      ...state,
      status: payload || [],
      loading: false,
      error: null,
    }))
    builder.addCase(fetchId.rejected, (state, action) => ({
      ...state,
      status: [],
      loading: false,
      error: action.error.message as string,
    }))
    builder.addCase(updateInvitation.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    builder.addCase(updateInvitation.fulfilled, (state) => ({
      ...state,
      loading: false,
      error: null,
    }))
    builder.addCase(updateInvitation.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error.message as string,
    }))
    builder.addCase(updateStatus.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    builder.addCase(updateStatus.fulfilled, (state) => ({
      ...state,
      loading: false,
      error: null,
    }))
    builder.addCase(updateStatus.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error.message as string,
    }))
    builder.addCase(getCompanyDetailsWithAddress.pending, (state) => ({
      ...state,
      companyDetails: InitialCompanyDetail,
      loading: true,
      error: null,
    }))
    builder.addCase(getCompanyDetailsWithAddress.fulfilled, (state, { payload }) => ({
      ...state,
      companyDetails: payload,
      loading: false,
      error: null,
    }))
    builder.addCase(getCompanyDetailsWithAddress.rejected, (state, action) => ({
      ...state,
      companyDetails: InitialCompanyDetail,
      loading: false,
      error: action.error.message as string,
    }))
  },
})

export const applicationSelector = (state: RootState): ApplicationState =>
  state.application

export default applicationSlice
