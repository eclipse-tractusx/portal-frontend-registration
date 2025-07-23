/********************************************************************************
 * Copyright (c) 2022 BMW Group AG
 * Copyright (c) 2022 Contributors to the Eclipse Foundation
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

import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userApiSlice from './user/userApiSlice'
import { apiSlice as applicationApiSlice } from './application/applicationApiSlice'
import { apiSlice as applicationInviteUserSlice } from './applicationInviteUser/applicationInviteUserApiSlice'
import { apiSlice as applicationCompanyRoleApiSlice } from './applicationCompanyRole/applicationCompanyRoleApiSlice'
import { apiSlice as applicationDocumentsApiSlice } from './applicationDocuments/applicationDocumentsApiSlice'
import { apiSlice as applicationVerifyRegisterApiSlice } from './applicationVerifyRegister/applicationVerifyRegisterApiSlice'
import { applicationWalletApiSlice }  from './applicationWallet/applicationWalletApiSlice'

export const reducers = {
  user: userApiSlice.reducer,
  [applicationApiSlice.reducerPath]: applicationApiSlice.reducer,
  [applicationInviteUserSlice.reducerPath]: applicationInviteUserSlice.reducer,
  [applicationCompanyRoleApiSlice.reducerPath]:
    applicationCompanyRoleApiSlice.reducer,
  [applicationDocumentsApiSlice.reducerPath]:
    applicationDocumentsApiSlice.reducer,
  [applicationVerifyRegisterApiSlice.reducerPath]:
    applicationVerifyRegisterApiSlice.reducer,
    [applicationWalletApiSlice.reducerPath]: applicationWalletApiSlice.reducer,
}

export const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(applicationApiSlice.middleware)
      .concat(applicationInviteUserSlice.middleware)
      .concat(applicationCompanyRoleApiSlice.middleware)
      .concat(applicationDocumentsApiSlice.middleware)
      .concat(applicationVerifyRegisterApiSlice.middleware)
      .concat(applicationWalletApiSlice.middleware)
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
