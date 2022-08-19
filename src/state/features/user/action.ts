import { createAction } from '@reduxjs/toolkit'
import { createAction as action } from 'redux-actions'
import { CompanyDetails } from '../application/types'
import { IUserItem } from './types'

export enum UserActions {
  ADD_TO_INVITE_LIST = 'USER/ADD_TO_INVITE_LIST',
  REMOVE_FROM_INVITE_LIST = 'USER/REMOVE_FROM_INVITE_LIST',
  ADD_CURRENT_STEP = 'USER/ADD_CURRENT_STEP',
  ADD_COMPANY_DATA = 'USER/ADD_COMPANY_DATA',
  ADD_ROLES_COMPOSITE = 'USER/ADD_ROLES_COMPOSITE',
  ADD_FILE_NAMES = 'USER/ADD_FILE_NAMES',
}

export const addToInviteList = action(
  UserActions.ADD_TO_INVITE_LIST,
  (userItem: IUserItem) => userItem
)
export const removeFromInviteList = action(
  UserActions.REMOVE_FROM_INVITE_LIST,
  (userUiId: string) => userUiId
)
export const addCurrentStep = action(
  UserActions.ADD_CURRENT_STEP,
  (step: number) => step
)
export const addCompanyData = action(
  UserActions.ADD_COMPANY_DATA,
  (companydata: CompanyDetails) => companydata
)
export const addrolesComposite = action(
  UserActions.ADD_ROLES_COMPOSITE,
  (roleComposite: string[]) => roleComposite
)

export const addFileNames = createAction<string[]>('userData/addFileNames')

export type addToInviteListAction = ReturnType<typeof addToInviteList>
export type removeFromInviteListAction = ReturnType<typeof removeFromInviteList>
export type addCurrentStepAction = ReturnType<typeof addCurrentStep>
export type addCompanyDataAction = ReturnType<typeof addCompanyData>
export type addrolesCompositeAction = ReturnType<typeof addrolesComposite>
export type addFileNamesAction = ReturnType<typeof addFileNames>

export default UserActions
