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

import { isBPN, isCity, isLegalEntity, isPattern, isStreet, Patterns } from './Patterns'
import { BPN_TEST_DATA } from './testdata/bpn'
import { CITY_TEST_DATA } from './testdata/city'
import { STREET_TEST_DATA } from './testdata/street'
import { VAT_TEST_DATA } from './testdata/vat'
import { EORI_TEST_DATA } from './testdata/eori'
import { LEI_TEST_DATA } from './testdata/lei'
import { VIES_TEST_DATA } from './testdata/vies'
import { CRN_TEST_DATA } from './testdata/crn'
import { LEGAL_ENTITY_DATA } from './testdata/legalentity'

const validate = (data, check) => {
  data.valid.forEach((expr) => {
    expect(check(expr)).toBe(true)
  })
  data.invalid.forEach((expr) => {
    expect(check(expr)).toBe(false)
  })
}

// Validate pattern with test data for each matching country in the test data
const validateIdentifierPattern = (pattern: string, testData: any) => {
  it.each(Object.keys(testData))('validate pattern for %s', (country) => {
    validate(testData[country], (expr: string) =>
      isPattern(Patterns[country][pattern], expr)
    )
  })
}

describe('Input Pattern Tests', () => {
  it('validates BPN pattern', () => {
    validate(BPN_TEST_DATA.BPN, (expr: string) =>
      isBPN(expr)
    )
  })
  it('validates City pattern', () => {
    validate(CITY_TEST_DATA.CITY, (expr: string) =>
      isCity(expr)
    )
  })
  it('validates Street pattern', () => {
    validate(STREET_TEST_DATA.STREET, (expr: string) =>
      isStreet(expr)
    )
  })
  it('validates legalEntityPattern pattern', () => {
    validate(LEGAL_ENTITY_DATA.LEGAL_ENTITY, (expr: string) =>
      isLegalEntity(expr)
    )
  })

  // Same Pattern for all European countries
  describe('validates EORI pattern', () => {
    validateIdentifierPattern('EORI', EORI_TEST_DATA)
  })

  // Same Pattern for all countries
  describe('validates LEI pattern', () => {
    validateIdentifierPattern('LEI_CODE', LEI_TEST_DATA)
  })

  describe('validates VAT ID pattern', () => {
    validateIdentifierPattern('VAT_ID', VAT_TEST_DATA)
  })

  describe('validates VIES pattern', () => {
    validateIdentifierPattern('VIES', VIES_TEST_DATA)
  })

  describe('validates Commercial Registration Number pattern', () => {
    validateIdentifierPattern('COMMERCIAL_REG_NUMBER', CRN_TEST_DATA)
  })
})
