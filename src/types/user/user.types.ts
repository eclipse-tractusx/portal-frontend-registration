import { CompanyDetailsData } from '../../data/companyDetails'

export interface IUserItem {
  uiId: string
  email: string
  role: string
  message: string
}

export interface IUserData {
  userInviteList: IUserItem[]
  currentStep: number
  companyData: CompanyDetailsData
  roleComposite: string[]
  fileNames: string[]
}

export interface IUserResponsibilities {
  uiId: number
  eMail: string
  role: string
  message: string
}
