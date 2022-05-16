import { createAction } from 'redux-actions'
import { CompanyDetailsData } from '../../../data/companyDetails'
import { IUserItem } from './types'

export enum UserActions {
  ADD_TO_INVITE_LIST = 'USER/ADD_TO_INVITE_LIST',
  REMOVE_FROM_INVITE_LIST = 'USER/REMOVE_FROM_INVITE_LIST',
  ADD_CURRENT_STEP = 'USER/ADD_CURRENT_STEP',
  ADD_COMPANY_DATA = 'USER/ADD_COMPANY_DATA',
  ADD_ROLES_COMPOSITE = 'USER/ADD_ROLES_COMPOSITE',
  ADD_FILE_NAMES = 'USER/ADD_FILE_NAMES',
}

export const addToInviteList = createAction(
  UserActions.ADD_TO_INVITE_LIST,
  (userItem: IUserItem) => userItem
)
export const removeFromInviteList = createAction(
  UserActions.REMOVE_FROM_INVITE_LIST,
  (userUiId: string) => userUiId
)
export const addCurrentStep = createAction(
  UserActions.ADD_CURRENT_STEP,
  (step: number) => step
)
export const addCompanyData = createAction(
  UserActions.ADD_COMPANY_DATA,
  (companydata: CompanyDetailsData) => companydata
)
export const addrolesComposite = createAction(
  UserActions.ADD_ROLES_COMPOSITE,
  (roleComposite: string[]) => roleComposite
)
export const addFileNames = createAction(
  UserActions.ADD_FILE_NAMES,
  (fileNames: string[]) => fileNames
)

export type addToInviteListAction = ReturnType<typeof addToInviteList>
export type removeFromInviteListAction = ReturnType<typeof removeFromInviteList>
export type addCurrentStepAction = ReturnType<typeof addCurrentStep>
export type addCompanyDataAction = ReturnType<typeof addCompanyData>
export type addrolesCompositeAction = ReturnType<typeof addrolesComposite>
export type addFileNamesAction = ReturnType<typeof addFileNames>

export default UserActions
