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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseQuery } from '../../utils/rtkUtil'

export type ApplicationChecklist = {
  statusId: string
  typeId: string
}

export enum ApplicationStatus {
  CREATED = 'CREATED',
  ADD_COMPANY_DATA = 'ADD_COMPANY_DATA',
  INVITE_USER = 'INVITE_USER',
  SELECT_COMPANY_ROLE = 'SELECT_COMPANY_ROLE',
  UPLOAD_DOCUMENTS = 'UPLOAD_DOCUMENTS',
  VERIFY = 'VERIFY',
  SUBMITTED = 'SUBMITTED',
  DECLINED = 'DECLINED',
  CONFIRMED = 'CONFIRMED'
}

export enum ApplicationType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL'
}

export type ApplicationResponse = {
  applicationChecklist: ApplicationChecklist[]
  applicationId: string
  applicationStatus: ApplicationStatus
  applicationType: ApplicationType
}

export type ApplicationStatusType = {
  id: string
  status: string
}

export type Identifier = {
  type: string
  value: string
}

export type CompanyDetails = {
  companyId: string
  bpn: string
  name: string
  shortName: string
  city: string
  region: string
  streetAdditional: string
  streetName: string
  streetNumber: string
  zipCode: string
  countryAlpha2Code: string
  taxId: string
  uniqueIds: Identifier[]
  uniqueIdentifier: UniqueIdentifier[]
}

export type UniqueIdentifier = {
  id: number
  label: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/application',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchApplications: builder.query<ApplicationResponse[], void>({
      query: () => '/api/registration/applications',
    }),
    updateInvitation: builder.mutation<string, void>({
      query: () => ({
        url: '/api/registration/invitation/status',
        method: 'PUT',
      }),
    }),
    updateStatus: builder.mutation<string, ApplicationStatusType>({
      query: (status) => ({
        url: `/api/registration/application/${status.id}/status?status=${status.status}`,
        method: 'PUT',
      }),
    }),
    fetchCompanyDetailsWithAddress: builder.query<CompanyDetails, string>({
      query: (applicationId) =>
        `/api/registration/application/${applicationId}/companyDetailsWithAddress`,
    }),
    fetchUniqueIdentifier: builder.query<UniqueIdentifier[], string>({
      query: (alpha2Code) => {
        if (!alpha2Code || alpha2Code.length < 2) return
        return `/api/registration/company/country/${alpha2Code}/uniqueidentifiers`
      },
    }),
    fetchCountryList: builder.query<any, void>({
      query: () => '/api/registration/staticdata/countrylist',
    }),
    addCompanyDetailsWithAddress: builder.mutation<
      string,
      {
        applicationId: string
        companyData: CompanyDetails
      }
    >({
      query: (data) => ({
        url: `/api/registration/application/${data.applicationId}/companyDetailsWithAddress`,
        method: 'POST',
        body: data.companyData,
      }),
    }),
  }),
})

export const {
  useFetchApplicationsQuery,
  useUpdateInvitationMutation,
  useUpdateStatusMutation,
  useFetchCompanyDetailsWithAddressQuery,
  useFetchUniqueIdentifierQuery,
  useFetchCountryListQuery,
  useAddCompanyDetailsWithAddressMutation,
} = apiSlice
