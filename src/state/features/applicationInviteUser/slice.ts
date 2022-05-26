import { createSlice } from '@reduxjs/toolkit'
import { RequestState } from '../../../types/MainTypes'
import { RootState } from '../../store'
import { fetchInvited, fetchRolesComposite, setUserToInvite, sendInvite } from './actions'
import { InvitedUser, InviteUserState, InitialInvitedUser } from './types'

const initialState: InviteUserState = {
  roles: [],
  invitedUsers: [],
  newUser: InitialInvitedUser,
  request: RequestState.NONE,
  error: null,
}

const inviteSlice = createSlice({
  name: 'registration/application/user',
  initialState,
  reducers: {
    setUsersToAdd: (state, action) => ({
      ...state,
      newUser: action.payload,
    }),
  },
  extraReducers: (builder) => {

    // fetch roles
    builder.addCase(fetchRolesComposite.pending, (state) => ({
      ...state,
      roles: [],
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchRolesComposite.fulfilled, (state, { payload }) => ({
      ...state,
      roles: payload || [],
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchRolesComposite.rejected, (state, action) => ({
      ...state,
      roles: [],
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
    
    // fetch invited
    builder.addCase(fetchInvited.pending, (state) => ({
      ...state,
      invitedUsers: [],
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchInvited.fulfilled, (state, { payload }) => ({
      ...state,
      invitedUsers: payload || [],
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchInvited.rejected, (state, action) => ({
      ...state,
      invitedUsers: [],
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
    builder.addCase(setUserToInvite.fulfilled, (state, { payload }) => ({
      ...state,
      // newUser: {
      //   invitationStatus: 'PENDING',
      //   emailId: payload.email,
      //   invitedUserRoles: payload.roles
      // },
      request: RequestState.OK,
      error: '',
    }))
    // invite new
    builder.addCase(sendInvite.pending, (state) => ({
      ...state,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(sendInvite.fulfilled, (state) => ({
      ...state,
      invitedUsers: [...state.invitedUsers, {
        invitationStatus: 'PENDING',
        emailId: state.newUser.email,
        invitedUserRoles: state.newUser.roles
      }],
      newUser: null,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(sendInvite.rejected, (state, action) => ({
      ...state,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): InviteUserState =>
  state.invite

export const rolesSelector = (state: RootState): string[] => 
  state.invite.roles

export const invitedUserSelector = (state: RootState): InvitedUser[] => 
  state.invite.invitedUsers

export default inviteSlice
