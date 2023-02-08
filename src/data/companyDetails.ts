/********************************************************************************
 * Copyright (c) 2021, 2023 Microsoft and BMW Group AG
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

export class CompanyRole {
  public id: number
  public title: string
}

export class UserRole {
  public role: string
}

export class ConsentForCompanyRoles {
  public role_id: number
  public role_title: string
  public consent_id: number
  public consent_title: string
  public link: string
}
export abstract class CompanyTechnicalKey {
  public static International = 'INTERNATIONAL'
}

export class User {
  email: string
  role: string
  message: string
}
