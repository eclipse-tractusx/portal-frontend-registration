import { RequestState } from '../../../types/MainTypes'

export type InviteNewUser = {
  userName?: string
  firstName?: string
  lastName?: string
  email: string
  roles: string[]
  message: string
}

export type InvitedUser = {
  invitationStatus: string
  emailId: string
  invitedUserRoles: Array<string>
}

export type InviteUserState = {
  roles: string[]
  invitedUsers: InvitedUser[]
  newUser: InviteNewUser | null
  request: RequestState
  error: string
}

export const InitialInvitedUser = {
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  roles: [],
  message: '',
}
