import { RequestState } from "../../../types/MainTypes"

export type agreementData = {
  companyRoles: Array<string>
  agreements: Array<string>
}

export type roleData = {
  agreements: Array<string>
  companyRoles: Array<string>
}

export const agreementDataValue = {
  companyRoles: [],
  agreements: []
}

export type roleAggrementState = {
  agreementData: agreementData,
  roleData: roleData,
  request: RequestState
  error: string
} 