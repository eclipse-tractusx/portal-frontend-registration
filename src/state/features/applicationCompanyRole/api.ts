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

import { HttpClient } from '../../../helpers/HttpClient'
import { getApiBase } from '../../../services/EnvironmentService'
import RequestService from '../../../services/RequestService'
import { agreementData } from './types'

export class API extends HttpClient {
  private static classInstance?: API

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new API()
    }
    return this.classInstance
  }

  public companyRoleAgreementData = () =>
    this.instance.get<any>(
      `/api/registration/companyRoleAgreementData`,
      RequestService.getHeaders()
    )

  public companyRoleAgreementConsents = (applicationId: string) =>
    this.instance.get<any>(
      `/api/registration/application/${applicationId}/companyRoleAgreementConsents`,
      RequestService.getHeaders()
    )

  public putAgreementConsent = (applicationId: string, data: agreementData) =>
    this.instance.post<any>(
      `/api/registration/application/${applicationId}/companyRoleAgreementConsents`,
      data,
      RequestService.getHeaders()
    )
}
