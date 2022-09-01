import { RequestState } from '../../../types/MainTypes'

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
  agreements: [],
}

export type roleAggrementState = {
  consentData: agreementData
  allConsentData: roleData
  request: RequestState
  error: string
}

export type AgreementType = {
  agreementId: string
  name: string
}
