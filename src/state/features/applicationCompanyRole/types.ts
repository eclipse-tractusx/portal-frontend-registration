import { RequestState } from "../../../types/MainTypes"

export type InviteNewUser = {
  userName?: string
  firstName?: string
  lastName?: string
  email: string
  roles: string[]
  message: string
}

export type roleData = {
  agreements: Array<string>
  companyRoles: Array<string>
}

export const roleDataValue = {
  agreements: [],
  companyRoles: []
}

export type roleAggrementState = {
  roleData: roleData,
  request: RequestState
  error: string
} 