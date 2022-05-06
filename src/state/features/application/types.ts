export type ApplicationStatus = {
  id: string
  status: string
}
export interface ApplicationState {
  status: Array<ApplicationStatus>
  loading: boolean
  error: string
}
