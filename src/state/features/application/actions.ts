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
import { ApplicationApi } from './api'
import { ApplicationStatus, CompanyDetails, name } from './types'

const fetchId = createAsyncThunk(
  `${name}/fetchId`,
  async () => {
    try {
      return await ApplicationApi.getInstance().getId()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(
        'Application ID not existing. Please contact the administrator.'
      )
    }
  }
)

const updateInvitation = createAsyncThunk(
  `${name}/updateInvitation`,
  async () => {
    try {
      return await ApplicationApi.getInstance().putInvitation()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Something went wrong. Please contact the administrator.')
    }
  }
)

const updateStatus = createAsyncThunk(
  `${name}/updateStatus`,
  async (status: ApplicationStatus) => {
    try {
      return await ApplicationApi.getInstance().putStatus(status)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(
        'Application ID not existing. Please contact the administrator.'
      )
    }
  }
)

const getCompanyDetailsWithAddress = createAsyncThunk(
  `${name}/companyDetailsWithAddress/get`,
  async (applicationId: string) => {
    try {
      return await ApplicationApi.getInstance().getCompanyDetailsWithAddress(
        applicationId
      )
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(
        'No active company application existing. Please contact the administrator.'
      )
    }
  }
)

const saveCompanyDetailsWithAddress = createAsyncThunk(
  `${name}/companyDetailsWithAddress/save-address`,
  async ({
    applicationId,
    companyData,
  }: {
    applicationId: string
    companyData: CompanyDetails
  }) => {
    try {
      return await ApplicationApi.getInstance().saveCompanyDetailsWithAddress(
        applicationId,
        companyData
      )
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(
        'Service is currently not available. Please try it later again.'
      )
    }
  }
)

export {
  fetchId,
  updateInvitation,
  updateStatus,
  getCompanyDetailsWithAddress,
  saveCompanyDetailsWithAddress,
}
