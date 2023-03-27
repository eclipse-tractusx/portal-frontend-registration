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

import { RouteComponentProps } from 'react-router-dom'
import { CompanyRole, ConsentForCompanyRoles } from '../data/companyDetails'
import { FetchBusinessPartnerDto } from '../data/companyDetailsById'
import UserService from '../services/UserService'
import { getApiBase } from '../services/EnvironmentService'
import {
  SUBMITTED,
  CONFIRMED,
  DECLINED,
} from '../state/features/application/types'

export function getCompanyDetails(
  oneId: string
): Promise<FetchBusinessPartnerDto[]> {
  console.log('API called getCompanyDetails')
  const token = UserService.getToken()
  const u = `${getApiBase()}/api/registration/legalEntityAddress/${oneId}`
  const myResponseData: FetchBusinessPartnerDto[] = []
  const promise = new Promise<FetchBusinessPartnerDto[]>((resolve, reject) => {
    fetch(u, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) =>
        res.text().then((data) => {
          if (res.ok) {
            Object.assign(myResponseData, data ? JSON.parse(data) : {})
            resolve(myResponseData)
          } else {
            reject(res.status)
          }
        })
      )
      .catch((error) => {
        // alert(error);
        console.log(error, error.message, error.status)
        reject(error.status)
      })
  })

  return promise
}
export function submitSendInvites(userInviteList: any): Promise<any> {
  const tenant = UserService.getTenant()
  const token = UserService.getToken()
  const u = `${getApiBase()}/api/registration/tenant/${tenant}/users`
  const promise = new Promise<any>((resolve, reject) => {
    fetch(u, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInviteList),
    })
      .then((res) =>
        res.text().then(() => {
          if (res.ok) {
            resolve('Sent Invite')
          } else {
            reject(res.status)
          }
        })
      )
      .catch((error) => {
        // alert(error);
        console.log(error, error.message, error.status)
        reject(error.status)
      })
  })
  return promise
}

export function getCompanyRoles(): Promise<CompanyRole[]> {
  const token = UserService.getToken()
  const u = `${getApiBase()}/api/registration/companyRoles`
  const companyRolesRes: CompanyRole[] = []
  const promise = new Promise<CompanyRole[]>((resolve, reject) => {
    fetch(u, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((val) =>
        val.json().then((data) => {
          if (val.ok) {
            Object.assign(companyRolesRes, data)
            resolve(companyRolesRes)
          } else {
            reject(val.statusText)
          }
        })
      )
      .catch((error) => {
        alert(error)
        console.log(error, error.message, error.status)
        reject(error.message)
      })
  })

  return promise
}
export function getConsentForCompanyRoles(
  roleId: number
): Promise<ConsentForCompanyRoles[]> {
  const token = UserService.getToken()
  const u = `${getApiBase()}/api/registration/consentsForCompanyRole/${roleId}`
  const myConsentResponseData: ConsentForCompanyRoles[] = []
  const promise = new Promise<ConsentForCompanyRoles[]>((resolve, reject) => {
    fetch(u, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((val) =>
        val.json().then((data) => {
          if (val.ok) {
            Object.assign(myConsentResponseData, data)
            resolve(myConsentResponseData)
          } else {
            reject(val.statusText)
          }
        })
      )
      .catch((error) => {
        alert(error)
        console.log(error, error.message, error.status)
        reject(error.message)
      })
  })
  return promise
}
export function getClientRolesComposite(): Promise<string[]> {
  const token = UserService.getToken()
  const u = `${getApiBase()}/api/registration/rolesComposite`
  const userRolesRes: string[] = []
  const promise = new Promise<string[]>((resolve, reject) => {
    fetch(u, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) =>
        res.text().then((data) => {
          if (res.ok) {
            Object.assign(userRolesRes, data ? JSON.parse(data) : {})
            resolve(userRolesRes)
          } else {
            reject(res.status)
          }
        })
      )
      .catch((error) => {
        // alert(error);
        console.log(error, error.message, error.status)
        reject(error.status)
      })
  })

  return promise
}

export function uploadDocument(file): Promise<any> {
  const token = UserService.getToken()
  const u = `${getApiBase()}/api/registration/documents`
  const formdata = new FormData()
  formdata.append('document', file.file)
  return fetch(u, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  })
}

export const downloadDocument = (
  file,
  fileType = 'application/pdf',
  fileName = `${new Date().toDateString()}.pdf`
) => {
  const blobFile = new Blob([file], {
    type: fileType,
  })
  const url = URL.createObjectURL(blobFile)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
}

export const PATTERNS = {
  legalEntityPattern:
    /^[a-zA-ZÀ-ÿ\d][a-zA-ZÀ-ÿ\d !#'$@&%()*+,\-_./:;=<>?[\]\\^]{2,50}$/,
  registeredNamePattern:
    /^[a-zA-ZÀ-ÿ\d][a-zA-ZÀ-ÿ\d !#'$@&%()*+,\-_./:;=<>?[\]\\^]{2,60}$/,
  streetHouseNumberPattern: /^[a-zÀ-ÿA-Z\d][a-zA-ZÀ-ÿ\d -]{2,60}$/,
  regionPattern: /^[a-zA-Z,"\s()']*$/,
  postalCodePattern: /^(?=[a-zA-Z\d]*[-\s]?[a-zA-Z\d]*$)[a-zA-Z\d-\s]{2,10}$/,
  countryPattern: /^[A-Za-zÀ-ÿ]{2,3}$/,
  IN: {
    COMMERCIAL_REG_NUMBER: /^[a-zA-Z\d-]{6,21}$/,
    VAT_ID: /^[a-zA-Z\d-]{5,6}$/,
    LEI_CODE: /^[a-zA-Z\d]{20}$/,
    VIES: /.*/,
    EORI: /.*/
  },
  DE: {
    COMMERCIAL_REG_NUMBER: /^[a-zA-Z\d-\s]{9}$/,
    VAT_ID: /^DE\d{9}$/,
    LEI_CODE: /^[a-zA-Z\d]{20}$/,
    VIES: /.*/,
    EORI: /.*/
  },
  FR: {
    COMMERCIAL_REG_NUMBER: /^[a-zA-Z\d\s]{14,17}$/,
    VAT_ID: /^[a-zA-Z\d-\s]{8,15}$/,
    LEI_CODE: /^[a-zA-Z\d]{20}$/,
    VIES: /.*/,
    EORI: /.*/
  },
  MX: {
    COMMERCIAL_REG_NUMBER: /^[a-zA-Z\d-]{6,21}$/,
    VAT_ID: /^[a-zA-Z\d-&]{12,13}$/,
    LEI_CODE: /^[a-zA-Z\d]{20}$/,
    VIES: /.*/,
    EORI: /.*/
  },
  Worldwide: {
    COMMERCIAL_REG_NUMBER: /^[a-zA-Z\d]{6,21}$/,
    VAT_ID: /^[a-zA-Z\d-\s]{8,15}$/,
    LEI_CODE: /^[a-zA-Z\d]{20}$/,
    VIES: /.*/,
    EORI: /^[a-zA-Z\d\s]{18}$/,
  }
}

export function download(file: Blob, fileType: string, fileName: string) {
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
}

export function handleStatusRedirect (status: string, history: RouteComponentProps["history"]) {
  switch (status) {
    case SUBMITTED:
      return history.push('/registration-closed?param=validate')
    case CONFIRMED:
      return window.location.replace('/home')
    case DECLINED:
      return history.push('/registration-closed')
    default:
      return history.push('/landing')
  }
}