/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios'
import { HttpClient } from '../../../helpers/HttpClient'
import { getApiBase } from '../../../services/EnvironmentService'
import RequestService from '../../../services/RequestService'
import { PostDocumentType } from '../../../types/MainTypes'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    //custom interceptor that recieve headers as well as data for this isntance
    const successResponseInterceptorWithHeader = ({
      data,
      headers,
    }: AxiosResponse) => ({
      data,
      headers,
    })

    super(getApiBase(), successResponseInterceptorWithHeader)
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }
    return this.classInstance
  }

  public getDocuments = (applicationId: string, documentTypeId: string) =>
    this.instance.get<any>(
      `/api/registration/application/${applicationId}/documentType/${documentTypeId}/documents`,
      RequestService.getHeaders()
    )

  public getDocumentByDocumentId = async (documentId: string) =>
    this.instance.get<{ data: string; headers: AxiosResponseHeaders }>(
      `/api/registration/documents/${documentId}`,
      RequestService.getBlobHeaders()
    )

  public postDocument = async (args: PostDocumentType) => {
    const {
      applicationId,
      documentTypeId,
      file,
      handleUpdateProgress,
      dispatch,
      temporaryId,
    } = args
    const formdata = new FormData()
    formdata.append('document', file)
    try {
      await axios({
        method: 'post',
        url: `${getApiBase()}/api/registration/application/${applicationId}/documentType/${documentTypeId}/documents`,
        data: formdata,
        headers: RequestService.getHeaders().headers,
        onUploadProgress: (progress) =>
          handleUpdateProgress(progress, dispatch, temporaryId),
      })
    } catch (error) {
      throw Error(error.message)
    }
  }

  public deleteDocument = (documentId: string) =>
    this.instance.delete<string>(
      `/api/administration/Documents/${documentId}`,
      RequestService.getHeaders()
    )
}
