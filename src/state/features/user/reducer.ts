/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import produce from 'immer'
import { handleActions } from 'redux-actions'
import userActions, {
  addToInviteListAction,
  addCurrentStepAction,
  removeFromInviteListAction,
  addCompanyDataAction,
  addrolesCompositeAction,
} from './action'
import { IUserData } from './types'

// empty userInvite list
export const initialState = {
  userInviteList: [],
  currentStep: 1,
  companyData: undefined,
  roleComposite: [],
  fileNames: [],
}

export default handleActions<IUserData, any>(
  {
    [userActions.ADD_TO_INVITE_LIST]: produce(
      (state: IUserData, action: addToInviteListAction) => ({
        ...state,
        userInviteList: [...state.userInviteList, action.payload],
      })
    ),

    [userActions.REMOVE_FROM_INVITE_LIST]: produce(
      (state: IUserData, action: removeFromInviteListAction) => ({
        ...state,
        userInviteList: [
          ...state.userInviteList.filter(
            (userItem) => userItem.uiId !== action.payload
          ),
        ],
      })
    ),

    [userActions.ADD_CURRENT_STEP]: produce(
      (state: IUserData, action: addCurrentStepAction) => ({
        ...state,
        currentStep: action.payload,
      })
    ),

    [userActions.ADD_COMPANY_DATA]: produce(
      (state: IUserData, action: addCompanyDataAction) => ({
        ...state,
        companyData: action.payload,
      })
    ),

    [userActions.ADD_ROLES_COMPOSITE]: produce(
      (state: IUserData, action: addrolesCompositeAction) => ({
        ...state,
        roleComposite: action.payload,
      })
    ),
  },
  initialState
)
