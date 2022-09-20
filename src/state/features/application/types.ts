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

export type ApplicationStatus = {
  id: string
  status: string
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
  countryDe: string
  taxId: string
}

export type ApplicationInvitedUsers = {
  invitationStatus: string
  emailId: string
  invitedUserRoles: Array<string>
}

export type ApplicationInvitedFormUsers = {
  email: string
  status: string
  role: Array<string>
}

export interface ApplicationState {
  status: Array<ApplicationStatus>
  companyDetails: CompanyDetails | null
  loading: boolean
  error: string
}

export const InitialCompanyDetail = {
  companyId: '',
  bpn: '',
  name: '',
  shortName: '',
  city: '',
  region: '',
  streetAdditional: '',
  streetName: '',
  streetNumber: '',
  zipCode: '',
  countryAlpha2Code: '',
  countryDe: '',
  taxId: '',
}

export const ADD_COMPANY_DATA = 'ADD_COMPANY_DATA'
export const CREATED = 'CREATED'
export const SUBMITTED = 'SUBMITTED'
export const CONFIRMED = 'CONFIRMED'
export const DECLINED = 'DECLINED'
export const VERIFY = 'VERIFY'
