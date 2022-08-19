import { ApplicationInvitedUsers, ApplicationInvitedFormUsers } from './types'

export const inviteUsersData = (
  data: ApplicationInvitedUsers
): ApplicationInvitedFormUsers => ({
  ...data,
  email: data.emailId,
  status: data.invitationStatus,
  role: data.invitedUserRoles,
})
