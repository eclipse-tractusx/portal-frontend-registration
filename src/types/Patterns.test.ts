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

import {
    isBPN, isCity,
} from './Patterns'

const TESTDATA = {
    BPN: {
        valid: ['BPNL000000015OHJ', 'bpnl000000000001', 'bpnlaaaaaaaaaaaa'],
        invalid: [
            '',
            'word',
            'some string',
            '    BPNL000000000001  ',
            'BPNL00000000000015OHJ',
            'BPNL01',
        ],
    },
    CITY: {
        valid: [
            'Munich',
            'Toronto',
            'San Francisco',
            'St. Catharines',
            'Val-d\'Or',
            'Presqu\'ile',
            'Niagara on the Lake',
            'Niagara-on-the-Lake',
            'München',
            'Villes du Québec',
            'Provence-Alpes-Côte d\'Azur',
            'Île-de-France',
            'Kópavogur',
            'Garðabær',
            'Sauðárkrókur',
            'Þorlákshöfn',
        ],
        invalid: [
            ' Munich',
            'Munich ',
            ',',
            '.',
            '--',
            'Niagara--on-the-Lake',
            'Presqu\'\'ile',
        ],
    }
}

describe('Input Pattern Tests', () => {
    it('validates BPNs', () => {
        TESTDATA.BPN.valid.forEach((expr) => expect(isBPN(expr)).toBe(true))
        TESTDATA.BPN.invalid.forEach((expr) => expect(isBPN(expr)).toBe(false))
    })
    it('validates cities', () => {
        TESTDATA.CITY.valid.forEach((expr) => expect(isCity(expr)).toBe(true))
        TESTDATA.CITY.invalid.forEach((expr) => expect(isCity(expr)).toBe(false))
    })
})
