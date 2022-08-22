export interface RegistrationState {
  registrationData: RegistrationDetails | null
  loading: boolean
  error: string
}

export type AgreementData = {
  agreementId: 'string'
  consentStatus: 'string'
}

export type DocumentData = {
  documentName: 'string'
}

export type RegistrationDetails = {
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
  companyRoles: Array<string>
  agreements: Array<AgreementData>
  documents: Array<DocumentData>
}

export const InitialRegistrationValue = {
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
  companyRoles: [],
  agreements: [],
  documents: [],
}

export const ADD_COMPANY_DATA = 'ADD_COMPANY_DATA'
export const CREATED = 'CREATED'
