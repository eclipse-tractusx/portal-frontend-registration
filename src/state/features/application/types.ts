export type ApplicationStatus = {
  id: string
  status: string
}

export type CompanyDetails = {
  companyId: string
  bpn: string
  name: string
  shortname: string
  city: string
  region: string
  streetadditional: string
  streetname: string
  streetnumber: string
  zipcode: number
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
  invitedUsers: Array<ApplicationInvitedUsers>
  loading: boolean
  error: string
}

export const InitialCompanyDetail = {
  companyId: '',
  bpn: '',
  name: '',
  shortname: '',
  city: '',
  region: '',
  streetadditional: '',
  streetname: '',
  streetnumber: '',
  zipcode: 0,
  countryAlpha2Code: '',
  countryDe: '',
  taxId: '',
}

export const ADD_COMPANY_DATA = 'ADD_COMPANY_DATA';
export const CREATED = 'CREATED';
