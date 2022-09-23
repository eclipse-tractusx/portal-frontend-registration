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

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { fetchRegistrationData, saveRegistration } from './actions'
import { RegistrationState, InitialRegistrationValue } from './types'

const initialState: RegistrationState = {
  registrationData: InitialRegistrationValue,
  loading: false,
  error: null,
}

const applicationSlice = createSlice({
  name: 'registration/application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegistrationData.pending, (state) => ({
      ...state,
      registrationData: InitialRegistrationValue,
      loading: true,
      error: null,
    }))
    builder.addCase(fetchRegistrationData.fulfilled, (state, { payload }) => ({
      ...state,
      registrationData: payload || InitialRegistrationValue,
      loading: false,
      error: null,
    }))
    builder.addCase(fetchRegistrationData.rejected, (state, action) => ({
      ...state,
      registrationData: InitialRegistrationValue,
      loading: false,
      error: action.error.message as string,
    }))
    builder.addCase(saveRegistration.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    builder.addCase(saveRegistration.fulfilled, (state) => ({
      ...state,
      loading: false,
      error: null,
    }))
    builder.addCase(saveRegistration.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): RegistrationState =>
  state.registrationData

export default applicationSlice
