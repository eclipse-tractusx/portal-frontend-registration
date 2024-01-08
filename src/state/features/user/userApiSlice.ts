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
import type { RootState } from '../store'

const name = 'user/add'

export interface UserRoleState {
  currentStep: number
}

export const initialState: UserRoleState = {
  currentStep: 1,
}

const slice = createSlice({
  name,
  initialState,
  reducers: {
    addCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },
  },
})

export const getCurrentStep = (state: RootState): number => {
  return state.user.currentStep
}

export const { addCurrentStep } = slice.actions
export default slice
