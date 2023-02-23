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
    isBPN, isCity, isStreet,
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
    },
    STREET: {
        valid: [
            'Dorfstraße',
            'Hauptstrasse',
            'Bahnhofstr.',
            'Gmeiner Weg',
            '701 FIFTH AVE',
            'HOLLYWOOD, FL 33022-2480',
            '111 MONUMENT CIRCLE, SUITE 3700',
            'P.O. BOX 2903',
            'P.O. Box 12345 Los Angeles',
            '1441 SEAMIST DR.',
            '2000 PENNSYLVANIA AVENUE, N.W.',
            'Gertrud-Grunow-Str. 09',
            'Gertrud-Grunow-Straße 09',
            'Rue d\'Alger',
            'Rue de l\'Amiral-de-Coligny',
            'Allée André-Breton',
        ],
        invalid: [
            ' Hauptstr',
            'Einbahnstr. ',
            'Rotkehlchenweg ',
            ',',
            '.',
            '--',
            'Finken  weg',
            'Rue de l\'\'este',
        ]
    }
}

const validate = (data, check) => {
    data.valid.forEach((expr) => expect(check(expr)).toBe(true))
    data.invalid.forEach((expr) => expect(check(expr)).toBe(false))
}

describe('Input Pattern Tests', () => {
    it('validates BPNs', () => validate(TESTDATA.BPN, isBPN))
    it('validates cities', () => validate(TESTDATA.CITY, isCity))
    it('validates streets', () => validate(TESTDATA.STREET, isStreet))
})
