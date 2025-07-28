/********************************************************************************
 * Copyright (c) 2025 Cofinity-X GmbH
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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

export interface ValidateDidResponse {
  valid: boolean
  message?: string
}

export const applicationWalletApiSlice = createApi({
  reducerPath: 'rtk/applicationWallet',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    validateDid: builder.mutation<ValidateDidResponse, string>({
      query: (did) => ({
        url: `api/registration/bringYourOwnWallet/${encodeURIComponent(did)}/validateDid`,
        method: 'POST',
        body: did,
      }),
      transformResponse: (response: any): ValidateDidResponse => {
        if (typeof response === 'object' && response !== null) {
          const { valid, message } = response
          return { valid: Boolean(valid), message }
        }
        // fallback: treat any truthy response as valid
        return { valid: Boolean(response) }
      },
    }),
    saveHolderDid: builder.mutation<string, { companyId: string; did: string }>(
      {
        query: ({ companyId, did }) => ({
          url: `api/registration/bringYourOwnWallet/${companyId}/saveHolderDid/${encodeURIComponent(did)}`,
          method: 'POST',
          body: { companyId, did },
        }),
      }
    ),
  }),
})

export const { useValidateDidMutation, useSaveHolderDidMutation } =
  applicationWalletApiSlice
