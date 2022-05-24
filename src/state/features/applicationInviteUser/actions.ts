import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { InviteNewUser } from './types'

const setUserToInvite = createAction<InviteNewUser>(
  'registration/application/user/setUserToInvite'
)

const fetchRolesComposite = createAsyncThunk(
  'registration/application/user/fetchRoles',
  async () => {
    try {
      return await Api.getInstance().getRolesComposite()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Unable to load roles. Please contact the administrator.')
    }
  }
)

const fetchInvited = createAsyncThunk(
  'registration/application/user/fetchInvited',
  async (applicationId: string) => {
    try {
      return await Api.getInstance().getInvitedUsers(applicationId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(
        'Application ID not existing. Please contact the administrator.'
      )
    }
  }
)

const sendInvite = createAsyncThunk(
  'registration/application/user/sendInvite',
  async ({
    applicationId,
    user,
  }: {
    applicationId: string
    user: InviteNewUser
  }) => {
    try {
      return await Api.getInstance().postInviteNewUser(applicationId, user)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Invite new user failed. Please contact the administrator.')
    }
  }
)

export { setUserToInvite, fetchRolesComposite, fetchInvited, sendInvite }
