export type ApplicationStatus = {
  id: string
  status: string
}
export interface ApplicationState {
  status: Array<ApplicationStatus>
  loading: boolean
  error: string
}

export const ADD_COMPANY_DATA = 'ADD_COMPANY_DATA';
export const CREATED = 'CREATED';
