export type ApplicationStatus = {
  id: string
  status: string
}

export type CompanyDetails = {
  bpn: string
  city: string
  countryDe: string
  zipcode: string
  name: string
  shortname: string
  streetadditional?: string
  streetname: string
  streetnumber: string
}

export interface ApplicationState {
  status: Array<ApplicationStatus>
  companyDetails: CompanyDetails | null
  loading: boolean
  error: string
}

export const InitialCompanyDetail = {
  bpn: '',
  city: '',
  countryDe: '',
  zipcode: '',
  name: '',
  shortname: '',
  streetname: '',
  streetnumber: '',
}

export const ADD_COMPANY_DATA = 'ADD_COMPANY_DATA';
export const CREATED = 'CREATED';
