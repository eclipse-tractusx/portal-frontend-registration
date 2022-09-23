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

import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from './api'

const fetchAgreementData = createAsyncThunk(
  'registration/application/user/fetchAgreementData',
  async () => {
    try {
      return await API.getInstance().companyRoleAgreementData()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchCompanyRole api call error')
    }
  }
)

const fetchAgreementConsents = createAsyncThunk(
  'registration/application/user/fetchAgreementConsents',
  async (appId: string) => {
    try {
      return await API.getInstance().companyRoleAgreementConsents(appId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchCompanyRole api call error')
    }
  }
)

const updateAgreementConsents = createAsyncThunk(
  'registration/application/user/updateAgreementConsents',
  async ({ applicationId, data }: { applicationId: string; data: any }) => {
    try {
      return await API.getInstance().putAgreementConsent(applicationId, data)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(
        'Application ID not existing. Please contact the administrator.'
      )
    }
  }
)

export { fetchAgreementData, fetchAgreementConsents, updateAgreementConsents }
