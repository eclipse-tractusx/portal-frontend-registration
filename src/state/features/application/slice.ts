/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
  fetchId,
  updateInvitation,
  getCompanyDetailsWithAddress,
  saveCompanyDetailsWithAddress,
  getUniqueIdentifier,
} from './actions'
import { ApplicationState, InitialCompanyDetail } from './types'

const initialState: ApplicationState = {
  status: [],
  companyDetails: InitialCompanyDetail,
  identifierDetails: [],
  loading: false,
  error: null,
  saveError: null,
}

const applicationSlice = createSlice({
  name: 'registration/application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchId.pending, (state) => ({
      ...state,
      status: [],
      loading: true,
      error: null,
    }))
    builder.addCase(fetchId.fulfilled, (state, { payload }) => ({
      ...state,
      status: payload || [],
      loading: false,
      error: null,
    }))
    builder.addCase(fetchId.rejected, (state, action) => ({
      ...state,
      status: [],
      loading: false,
      error: action.error.message as string,
    }))
    builder.addCase(updateInvitation.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    builder.addCase(updateInvitation.fulfilled, (state) => ({
      ...state,
      loading: false,
      error: null,
    }))
    builder.addCase(updateInvitation.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error.message as string,
    }))
    builder.addCase(getCompanyDetailsWithAddress.pending, (state) => ({
      ...state,
      companyDetails: InitialCompanyDetail,
      loading: true,
      error: null,
    }))
    builder.addCase(
      getCompanyDetailsWithAddress.fulfilled,
      (state, { payload }) => ({
        ...state,
        companyDetails: payload,
        loading: false,
        error: null,
      })
    )
    builder.addCase(getCompanyDetailsWithAddress.rejected, (state, action) => ({
      ...state,
      companyDetails: InitialCompanyDetail,
      loading: false,
      error: action.error.message as string,
    }))
    builder.addCase(getUniqueIdentifier.pending, (state) => ({
      ...state,
      identifierDetails: [],
      loading: true,
      error: null,
    }))
    builder.addCase(getUniqueIdentifier.fulfilled, (state, { payload }) => ({
      ...state,
      identifierDetails: payload,
      loading: false,
      error: null,
    }))
    builder.addCase(getUniqueIdentifier.rejected, (state, action) => ({
      ...state,
      identifierDetails: [],
      loading: false,
      error: action.error.message as string,
    }))
    builder.addCase(saveCompanyDetailsWithAddress.pending, (state) => ({
      ...state,
      loading: true,
      saveError: null,
    }))
    builder.addCase(saveCompanyDetailsWithAddress.fulfilled, (state) => ({
      ...state,
      loading: false,
      saveError: null,
    }))
    builder.addCase(
      saveCompanyDetailsWithAddress.rejected,
      (state, action) => ({
        ...state,
        loading: false,
        saveError: action.error.message as string,
      })
    )
  },
})

export const applicationSelector = (state: RootState): ApplicationState =>
  state.application

export default applicationSlice
