/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { createAction as action } from 'redux-actions'
import { CompanyDetails } from '../application/types'
import { IUserItem } from './types'

export enum UserActions {
  ADD_TO_INVITE_LIST = 'USER/ADD_TO_INVITE_LIST',
  REMOVE_FROM_INVITE_LIST = 'USER/REMOVE_FROM_INVITE_LIST',
  ADD_CURRENT_STEP = 'USER/ADD_CURRENT_STEP',
  ADD_COMPANY_DATA = 'USER/ADD_COMPANY_DATA',
  ADD_ROLES_COMPOSITE = 'USER/ADD_ROLES_COMPOSITE',
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

export type addToInviteListAction = ReturnType<typeof addToInviteList>
export type removeFromInviteListAction = ReturnType<typeof removeFromInviteList>
export type addCurrentStepAction = ReturnType<typeof addCurrentStep>
export type addCompanyDataAction = ReturnType<typeof addCompanyData>
export type addrolesCompositeAction = ReturnType<typeof addrolesComposite>

export default UserActions
