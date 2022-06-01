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
  zipCode: number
  countryAlpha2Code: string
  countryDe: string
  taxId: string
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
  zipCode: 0,
  countryAlpha2Code: '',
  countryDe: '',
  taxId: '',
}

export const ADD_COMPANY_DATA = 'ADD_COMPANY_DATA';
export const CREATED = 'CREATED';
