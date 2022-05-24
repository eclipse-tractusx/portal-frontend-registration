import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { fetchId, updateStatus, getCompanyDetailsWithAddress, getInvitedUsers } from './actions'
import { ApplicationInvitedFormUsers, ApplicationState, InitialCompanyDetail } from './types'
import { inviteUsersData } from './mapper'

const initialState: ApplicationState = {
  status: [],
  companyDetails: InitialCompanyDetail,
  invitedUsers: [],
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
    builder.addCase(getInvitedUsers.pending, (state) => ({
      ...state,
      invitedUsers: [],
      loading: true,
      error: null,
    }))
    builder.addCase(getInvitedUsers.fulfilled, (state, { payload }) => ({
      ...state,
      invitedUsers: payload,
      loading: false,
      error: null,
    }))
    builder.addCase(getInvitedUsers.rejected, (state, action) => ({
      ...state,
      invitedUsers: [],
      loading: false,
      error: action.error.message as string,
    }))
  },
})

export const applicationSelector = (state: RootState): ApplicationState =>
  state.application

export const invitedUserSelector = (state: RootState): Array<ApplicationInvitedFormUsers> => 
  state.application.invitedUsers.map((data) => inviteUsersData(data))

export default applicationSlice
