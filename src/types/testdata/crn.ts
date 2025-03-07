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
    valid: [
      // Valid records found at https://www.unternehmensregister.de/ureg/ (German Handelsregister)
      // Identifier without court is discouraged - can lead to duplicate findings
      'HRB 209459',
      'HRB 86891',
      'HRA 5778',
      'HRB 112676',
      'HRB 92821',
      'VR 9277',
      'HRB 42', // Südzucker AG
      'HRA 3679 FL',
      'HRB 209459 B',
      // Identifier with court is recommended but has some chance of failing automatic validation
      'Mannheim HRB 42', // Südzucker AG
      'München HRB 175450',
      'Frankfurt am Main HRB 134317',
      'Oldenburg (Oldenburg) VR 1706',
      'Ludwigshafen a.Rhein (Ludwigshafen) VR 60423',
      'Weiden i. d. OPf. HRB 4339',
      'Berlin-Charlottenburg HRB 98814',
      // Identifier with unique court code has the highest probability of success
      'F1103R_HRB98814',
      'F1103R_HRB241059',
      'T2408V_HRB46288',
    ],
    invalid: [
      '', // empty
      ' ', // whitespace
      '123456789 ', // trailing whitespace
      ' 123456789', // leading whitespace
      '12345  6789', // invalid character (double whitespace)
    ],
  },
  FR: {
    valid: [
      // Valid records found at https://www.sirene.fr/sirene/public/recherche
      '83449681200035',
      '44306184100047',
      '38347481400100',
    ],
    invalid: [
      '', // empty
      ' ', // whitespace
      '83449681200035 ', // trailing whitespace
      ' 83449681200035', // leading whitespace
      '8344968  1200035', // invalid character (double whitespace)
    ],
  },
  MX: {
    valid: [
      // No valid records found
      'ABC20010101AAA',
      'XYZ19991231Z5A',
    ],
    invalid: [
      '', // empty
      ' ', // whitespace
      'ABC20010101AAA ', // trailing space
      ' ABC20010101AAA', // leading space
      'ABC200  10101AAA', // invalid character (double whitespace)
    ],
  },
  IN: {
    valid: [
      // Valid GST found at https://services.gst.gov.in/services/searchtp
      '27AASCS2460H1Z0',
      '37AAACP2678Q1ZP',
    ],
    invalid: [
      '', // empty
      ' ', // whitespace
      '27AASCS2460H1Z0 ', // trailing space
      ' 27AASCS2460H1Z0', // leading space
      '27AASCS  2460H1Z0', // invalid character (double whitespace)
    ],
  },
  Worldwide: {
    valid: [
      'ABC20010101AAA',
      '10BBBCH5678G1Z9',
      '37AAACP2678Q1ZP',
      'CHE-123.456.788', // Swiss
      'CHE-116.281.710', // Swiss
    ],
    invalid: [
      '', // empty
      ' ', // whitespace
      ' ABC20010101AAA', // leading space
      'ABC20010101AAA ', // trailing space
      'ABC  20010101AAA', // invalid character (double whitespace)
    ],
  },
}
