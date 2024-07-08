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

// Reusable Generic Identifier Pattern Definitions
// Pattern definition from https://www.gleif.org/ and ISO 17442
const LEI = /^[A-Za-z0-9]{20}$/ // same for all countries

// Pattern definition from https://taxation-customs.ec.europa.eu/
const EORI = {
  EUROPE: /^[A-Z]{2}[A-Za-z0-9]{1,15}$/, // generic pattern for Europe
}

// Pattern definition from https://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl
const VIES = {
  EUROPE: /^[A-Z]{2}[0-9A-Za-z\+\*\.]{2,12}$/, // VIES pattern
}

const VAT_ID = {
  Worldwide: /^(?!.*\s$)([A-Za-z0-9](\.|\s|-|\/)?){5,18}$/, // generic pattern
  DE: /^DE\d{9}$/,
  IN: /^[a-zA-Z\d-]{5,15}$/,
  MX: /^[a-zA-Z\d-&]{12,13}$/,
}
const COMMERCIAL_REG_NUMBER = {
  Worldwide: /^(?!.*\s$)([A-Za-z0-9](\.|\s|-)?){4,21}$/, // generic pattern
  DE: /^(?!.*\s$)([A-Za-z0-9](\s|-)?){9}$/,
  FR: /^(?!.*\s$)([A-Za-z0-9]\s?){14,17}$/,
}

// Pattern List
export const Patterns = {
  BPN: /^BPNL[a-z0-9]{12}$/i,
  CITY: /^[A-ZÀ-ÿ0-9Śął](([ .'-]|\. )?[A-Za-zÀ-ÿ0-9Śął]{1,40}){1,10}$/,
  STREET:
    /^(?!.*\s$)([a-zA-Z0-9À-ÿšŚął]{1,40}( ?[.,'/-] ?| )?){1,10}[a-zA-Z0-9À-ÿšŚął.]$/,
  legalEntityPattern:
    /^(?!.*\s$)[a-zA-ZÀ-ÿ\d][a-zA-ZÀ-ÿ\d\s!#'$@&%()*+,\-_./:;=<>?[\]\\^]{2,50}$/,
  registeredNamePattern:
    /^(?!.*\s$)[a-zA-ZÀ-ÿŚął\d][a-zA-ZÀ-ÿŚął\d\s!#'$@&%()*+,\-_./:;=<>?[\]\\^]{2,60}$/,
  regionPattern: /^(?!.*\s$)([a-zA-Z0-9À-ÿŚął,"()'-]\s?)*$/,
  postalCodePattern:
    /^(?!.*\s$)(?=[a-zA-Z\d-]*[-\s]?[a-zA-Z\d-]*$)[a-zA-Z\d\s-]{2,10}$/,
  countryPattern: /^[A-Za-zÀ-ÿ]{2,3}$/,
  Worldwide: {
    COMMERCIAL_REG_NUMBER: COMMERCIAL_REG_NUMBER.Worldwide,
    VAT_ID: VAT_ID.Worldwide,
    LEI_CODE: LEI,
    VIES: VIES.EUROPE,
    EORI: EORI.EUROPE,
  },
  DE: {
    COMMERCIAL_REG_NUMBER: COMMERCIAL_REG_NUMBER.DE,
    VAT_ID: VAT_ID.DE,
    LEI_CODE: LEI,
    VIES: VIES.EUROPE,
    EORI: EORI.EUROPE,
  },
  FR: {
    COMMERCIAL_REG_NUMBER: COMMERCIAL_REG_NUMBER.FR,
    VAT_ID: VAT_ID.Worldwide,
    LEI_CODE: LEI,
    VIES: VIES.EUROPE,
    EORI: EORI.EUROPE,
  },
  MX: {
    COMMERCIAL_REG_NUMBER: COMMERCIAL_REG_NUMBER.Worldwide,
    VAT_ID: VAT_ID.MX,
    LEI_CODE: LEI,
    VIES: VIES.EUROPE,
    EORI: EORI.EUROPE,
  },
  IN: {
    COMMERCIAL_REG_NUMBER: COMMERCIAL_REG_NUMBER.Worldwide,
    VAT_ID: VAT_ID.IN,
    LEI_CODE: LEI,
    VIES: VIES.EUROPE,
    EORI: EORI.EUROPE,
  },
}

export const isBPN = (expr: string) => Patterns.BPN.test(expr)
export const isCity = (expr: string) => Patterns.CITY.test(expr)
export const isStreet = (expr: string) => Patterns.STREET.test(expr)

// generic pattern check
export const isPattern = (pattern: RegExp, expr: string) => pattern.test(expr)
