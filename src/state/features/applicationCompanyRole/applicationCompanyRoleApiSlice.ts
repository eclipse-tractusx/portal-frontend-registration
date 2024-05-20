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

export type CompanyRoleData = {
  companyRole: string
  descriptions: {
    de: string
    en: string
  }
  agreementIds: string[]
}

export type AgreementData = {
  agreementId: string
  name: string
  agreementLink: string
  documentId: string
  mandatory: boolean
}

export type AgreementResponse = {
  companyRoles: CompanyRoleData[]
  agreements: AgreementData[]
}

export type AgreementConsents = {
  companyRoles: string[]
  agreements: {
    agreementId: string
    consentStatus: string
  }[]
}

export const apiSlice = createApi({
  reducerPath: 'rtk/applicationCompanyRole',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchAgreementData: builder.query<AgreementResponse, void>({
      query: () => '/api/registration/companyRoleAgreementData',
    }),
    fetchAgreementConsents: builder.query<AgreementConsents, string>({
      query: (applicationId) =>
        `/api/registration/application/${applicationId}/companyRoleAgreementConsents`,
    }),
    updateAgreementConsents: builder.mutation<
      string,
      { applicationId: string; data: AgreementConsents }
    >({
      query: (body) => ({
        url: `/api/registration/application/${body.applicationId}/companyRoleAgreementConsents`,
        method: 'POST',
        body: body.data,
      }),
    }),
  }),
})

export const {
  useFetchAgreementDataQuery,
  useFetchAgreementConsentsQuery,
  useUpdateAgreementConsentsMutation,
} = apiSlice
