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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseQuery } from '../../utils/rtkUtil'

export const DocumentType = {
  CX_FRAME_CONTRACT: 'CX_FRAME_CONTRACT',
  COMMERCIAL_REGISTER_EXTRACT: 'COMMERCIAL_REGISTER_EXTRACT',
  APP_CONTRACT: 'APP_CONTRACT',
  DATA_CONTRACT: 'DATA_CONTRACT',
}

export type DocumentResponse = {
  documentId: string
  documentName: string
}

enum Tags {
  DOCUMENT = 'Document',
}

export const apiSlice = createApi({
  reducerPath: 'rtk/applicationDocument',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  tagTypes: [Tags.DOCUMENT],
  endpoints: (builder) => ({
    fetchDocuments: builder.query<DocumentResponse[], string>({
      query: (applicationId) =>
        `/api/registration/application/${applicationId}/documentType/${DocumentType.COMMERCIAL_REGISTER_EXTRACT}/documents`,
      providesTags: [Tags.DOCUMENT],
    }),
    fetchDocumentByDocumentId: builder.mutation({
      query: (documentId) => ({
        url: `/api/registration/documents/${documentId}`,
        responseHandler: async (response) => ({
          headers: response.headers,
          data: await response.blob(),
        }),
      }),
    }),
    updateDocument: builder.mutation({
      async queryFn(
        data: { applicationId: string; body: { file: File } },
        _queryApi,
        _extraOptions,
        fetchWithBaseQuery
      ) {
        const formData = new FormData()
        formData.append('document', data.body.file)

        const response = await fetchWithBaseQuery({
          url: `/api/registration/application/${data.applicationId}/documentType/${DocumentType.COMMERCIAL_REGISTER_EXTRACT}/documents`,
          method: 'POST',
          body: formData,
        })
        return response.data
          ? { data: response.data }
          : { error: response.error }
      },
      invalidatesTags: [Tags.DOCUMENT],
    }),
    removeDocument: builder.mutation<string, string>({
      query: (documentId) => ({
        url: `/api/registration/documents/${documentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [Tags.DOCUMENT],
    }),
  }),
})

export const {
  useFetchDocumentsQuery,
  useFetchDocumentByDocumentIdMutation,
  useUpdateDocumentMutation,
  useRemoveDocumentMutation,
} = apiSlice
