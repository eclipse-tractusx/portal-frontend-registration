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

export interface RegistrationState {
  registrationData: RegistrationDetails | null
  loading: boolean
  success: boolean,
  error: string
}

export type AgreementData = {
  agreementId: string
  consentStatus: string
}

export type DocumentData = {
  documentName: string
}

export type IdentifierData = {
  type: string
  value: string
}

export type RegistrationDetails = {
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
  companyRoles: Array<string>
  agreements: Array<AgreementData>
  documents: Array<DocumentData>
  uniqueIds: Array<IdentifierData>
}

export const InitialRegistrationValue = {
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
  taxId: '',
  companyRoles: [],
  agreements: [],
  documents: [],
  uniqueIds: [],
}

export const ADD_COMPANY_DATA = 'ADD_COMPANY_DATA'
export const CREATED = 'CREATED'
