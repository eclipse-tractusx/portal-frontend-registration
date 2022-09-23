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

import { HttpClient } from '../../../helpers/HttpClient'
import UserService from '../../../services/UserService'
import { getApiBase } from '../../../services/EnvironmentService'
import { ApplicationStatus, CompanyDetails } from './types'

export class ApplicationApi extends HttpClient {
  private static classInstance?: ApplicationApi

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ApplicationApi()
    }

    return this.classInstance
  }

  public getId = () => {
    return this.instance.get<ApplicationStatus[]>(
      `/api/registration/applications`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }

  public putInvitation = () => {
    return this.instance.put<string>(
      `/api/registration/invitation/status`,
      {},
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }

  public putStatus = (status: ApplicationStatus) => {
    return this.instance.put<string>(
      `/api/registration/application/${status.id}/status?status=${status.status}`,
      {},
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }

  public getCompanyDetailsWithAddress = (applicationId: string) => {
    return this.instance.get<CompanyDetails>(
      `/api/registration/application/${applicationId}/companyDetailsWithAddress`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }

  public saveCompanyDetailsWithAddress = (
    applicationId: string,
    companyData: CompanyDetails
  ) => {
    return this.instance.post<string>(
      `/api/registration/application/${applicationId}/companyDetailsWithAddress`,
      companyData,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }
}
