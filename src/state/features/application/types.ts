export type ApplicationStatus = {
  id: string
  status: string
}

export type CompanyDetails = {
  companyId: string
  bpn: string
  name: string
  shortName: string
  city: string
  region: string
  streetAdditional: string
  streetName: string
  streetNumber: string
  zipCode: string
  countryAlpha2Code: string
  countryDe: string
  taxId: string
}

export type ApplicationInvitedUsers = {
  invitationStatus: string
  emailId: string
  invitedUserRoles: Array<string>
}

export type ApplicationInvitedFormUsers = {
  email: string
  status: string
  role: Array<string>
}

export interface ApplicationState {
  status: Array<ApplicationStatus>
  companyDetails: CompanyDetails | null
  loading: boolean
  error: string
}

export const InitialCompanyDetail = {
  companyId: '',
  bpn: '',
  name: '',
  shortName: '',
  city: '',
  region: '',
  streetAdditional: '',
  streetName: '',
  streetNumber: '',
  zipCode: '',
  countryAlpha2Code: '',
  countryDe: '',
  taxId: '',
}

export const ADD_COMPANY_DATA = 'ADD_COMPANY_DATA';
export const CREATED = 'CREATED';
export const SUBMITTED = 'SUBMITTED';
export const CONFIRMED = 'CONFIRMED';
export const DECLINED = 'DECLINED';
export const VERIFY = 'VERIFY';
