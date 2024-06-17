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

import { isPattern, Patterns } from './Patterns'
import { BPN_TEST_DATA } from './testdata/bpn'
import { CITY_TEST_DATA } from './testdata/city'
import { STREET_TEST_DATA } from './testdata/street'
import { VAT_TEST_DATA } from './testdata/vat'

const validate = (data, check) => {
  data.valid.forEach((expr) => {
    expect(check(expr)).toBe(true)
  })
  data.invalid.forEach((expr) => {
    expect(check(expr)).toBe(false)
  })
}

describe('Input Pattern Tests', () => {
  it('validates BPN pattern', () => {
    validate(BPN_TEST_DATA.BPN, (expr: string) => isPattern(Patterns.BPN, expr))
  }),
    it('validates City pattern', () => {
      validate(CITY_TEST_DATA.CITY, (expr: string) =>
        isPattern(Patterns.CITY, expr)
      )
    }),
    it('validates Street pattern', () => {
      validate(STREET_TEST_DATA.STREET, (expr: string) =>
        isPattern(Patterns.STREET, expr)
      )
    }),
    it('validates German VAT', () => {
      validate(VAT_TEST_DATA.GERMAN_VAT, (expr: string) =>
        isPattern(Patterns.DE.VAT_ID, expr)
      )
    })
  it('validates French VAT', () => {
    validate(VAT_TEST_DATA.FRENCH_VAT, (expr) =>
      isPattern(Patterns.FR.VAT_ID, expr)
    )
  })
})
