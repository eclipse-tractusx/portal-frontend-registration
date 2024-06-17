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

export const Patterns = {
  BPN: /^BPNL[a-z0-9]{12}$/i,
  CITY: /^[A-ZÀ-ÿ0-9Śął](([ .'-]|\. )?[A-Za-zÀ-ÿ0-9Śął]{1,40}){1,10}$/,
  STREET:
    /^([a-zA-Z0-9À-ÿšŚął]{1,40}( ?[.,'/-] ?| )?){1,10}[a-zA-Z0-9À-ÿšŚął.]$/,
  legalEntityPattern:
    /^[a-zA-ZÀ-ÿ\d][a-zA-ZÀ-ÿ\d !#'$@&%()*+,\-_./:;=<>?[\]\\^]{2,50}$/,
  registeredNamePattern:
    /^[a-zA-ZÀ-ÿŚął\d][a-zA-ZÀ-ÿŚął\d !#'$@&%()*+,\-_./:;=<>?[\]\\^]{2,60}$/,
  streetHouseNumberPattern: /^[a-zÀ-ÿA-Z\d][a-zA-ZÀ-ÿ\d -]{2,60}$/,
  regionPattern: /^(?!.*\s\s)(?!^\s)(?!.*\s$)[a-zA-Z0-9À-ÿŚął,"\s()'-]*$/,
  postalCodePattern:
    /^(?!.*\s\s)(?!^\s)(?!.*\s$)(?=[a-zA-Z\d-]*[-\s]?[a-zA-Z\d-]*$)[a-zA-Z\d\s-]{2,10}$/,
  countryPattern: /^[A-Za-zÀ-ÿ]{2,3}$/,
  IN: {
    COMMERCIAL_REG_NUMBER: /^[a-zA-Z\d-]{6,21}$/,
    VAT_ID: /^[a-zA-Z\d-]{5,6}$/,
    LEI_CODE: /^[a-zA-Z\d]{20}$/,
    VIES: /^(?!.*\s\s)(?!^\s)(?!.*\s$).*$/,
    EORI: /^(?!.*\s\s)(?!^\s)(?!.*\s$).*$/,
  },
  DE: {
    COMMERCIAL_REG_NUMBER: /^(?!.*\s\s)(?!^\s)(?!.*\s$)[a-zA-Z\d-\s]{9}$/,
    VAT_ID: /^DE\d{9}$/,
    LEI_CODE: /^[a-zA-Z\d]{20}$/,
    VIES: /^(?!.*\s\s)(?!^\s)(?!.*\s$).*$/,
    EORI: /^(?!.*\s\s)(?!^\s)(?!.*\s$).*$/,
  },
  FR: {
    COMMERCIAL_REG_NUMBER: /^(?!.*\s\s)(?!^\s)(?!.*\s$)[a-zA-Z\d\s]{14,17}$/,
    VAT_ID: /^(?!.*\s\s)(?!^\s)(?!.*\s$)[a-zA-Z\d-\s]{8,15}$/,
    LEI_CODE: /^[a-zA-Z\d]{20}$/,
    VIES: /^(?!.*\s\s)(?!^\s)(?!.*\s$).*$/,
    EORI: /^(?!.*\s\s)(?!^\s)(?!.*\s$).*$/,
  },
  MX: {
    COMMERCIAL_REG_NUMBER: /^[a-zA-Z\d-]{6,21}$/,
    VAT_ID: /^[a-zA-Z\d-&]{12,13}$/,
    LEI_CODE: /^[a-zA-Z\d]{20}$/,
    VIES: /^(?!.*\s\s)(?!^\s)(?!.*\s$).*$/,
    EORI: /^(?!.*\s\s)(?!^\s)(?!.*\s$).*$/,
  },
  Worldwide: {
    COMMERCIAL_REG_NUMBER: /^[a-zA-Z\d]{6,21}$/,
    VAT_ID: /^(?!.*\s\s)(?!^\s)(?!.*\s$)[a-zA-Z\d-\s]{8,15}$/,
    LEI_CODE: /^[a-zA-Z\d]{20}$/,
    VIES: /^(?!.*\s\s)(?!^\s)(?!.*\s$).*$/,
    EORI: /^(?!.*\s\s)(?!^\s)(?!.*\s$)[a-zA-Z\d\s]{18}$/,
  },
}

export const isBPN = (expr: string) => Patterns.BPN.test(expr)
export const isCity = (expr: string) => Patterns.CITY.test(expr)
export const isStreet = (expr: string) => Patterns.STREET.test(expr)

// generic pattern check
export const isPattern = (pattern: RegExp, expr: string) => pattern.test(expr)
