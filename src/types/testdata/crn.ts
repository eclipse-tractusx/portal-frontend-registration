/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

export const CRN_TEST_DATA = {
  DE: {
    valid: [ // Valid records found at https://www.unternehmensregister.de/ureg/ (German Handelsregister)
      'HRB 209459',
      'HRB 86891',
      'HRA 5778',
      'HRB 112676',
      'HRB 92821',
      'VR 9277',
      'HRB 42', // Südzucker AG 
      'HRA 3679 FL'
    ],
    invalid: [
      '', // empty
      ' ', // whitespace
      'HRB 209459 ', // trailing whitespace
      ' HRB 209459', // leading whitespace
      'HRB  2094590', // invalid character (double whitespace)
    ],
  },
  FR: {
    valid: [ // Valid records found at https://www.sirene.fr/sirene/public/recherche
      '83449681200035',
      '44306184100047',
      '38347481400100',
    ],
    invalid: [
      '', // empty
      ' ', // whitespace
      '83449681200035 ', // trailing whitespace
      ' 83449681200035', // leading whitespace
    ],
  },
  MX: {
    valid: [ // No valid records found
      'ABC20010101AAA',
      'XYZ19991231Z5A',
    ],
    invalid: [
      'ABC20010101AAA ', // trailing space
      ' ABC20010101AAA', // leading space
    ],
  },
  IN: {
    valid: [ // Valid GST found at https://services.gst.gov.in/services/searchtp
      '27AASCS2460H1Z0',
      '37AAACP2678Q1ZP',
    ],
    invalid: [
      '27AASCS2460H1Z0 ', // trailing space
      ' 27AASCS2460H1Z0', // leading space
    ],
  },
  Worldwide: {
    valid: [
      'DE123456789',
      'FR12345678901',
      'ABC20010101AAA',
      '10BBBCH5678G1Z9',
      '37AAACP2678Q1ZP',
      'CHE-123.456.788 TVA', // Swiss TVA ??
      'CHE-116.281.710 MWST', // Swiss MWST ??
      'CHE-105.909.036' // Swiss UID ??
    ],
    invalid: [
      ' DE123456789', // leading space
      'DE123456789 ', // trailing space
    ],
  },
}
