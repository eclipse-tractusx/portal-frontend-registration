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

const caseEmptyString = '';
const caseWhitespace = ' ';
const caseMultipleWhitespace = '12345  6789';
const caseTrailingSpace = '123456789 ';
const caseLeadingSpace = ' 123456789';
const caseThreeCharacters = '123';
const caseOnlyNumbers = '123456789';
const caseNotOnlyNumbers = '123456789A';
const caseFourteenNumbers = '12345678901234';

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
      'HRB 42',
      'HRA 3679 FL',
      'HRB 209459 B',
      // Identifier with court is recommended but has some chance of failing automatic validation
      'Mannheim HRB 42',
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
      caseEmptyString,
      caseWhitespace,
      caseTrailingSpace,
      caseLeadingSpace,
      caseMultipleWhitespace,
      caseThreeCharacters,
      'Ludwigshafen a.Rhein (Ludwigshafen) HRB1234567890123456789',
      caseOnlyNumbers,
    ],
  },
  FR: {
    valid: [
      // Valid records found at https://www.sirene.fr/sirene/public/recherche
      '834496812',
      '443061841',
      '383474814',
    ],
    invalid: [
      caseEmptyString,
      caseWhitespace,
      caseTrailingSpace,
      caseLeadingSpace,
      caseMultipleWhitespace,
      caseThreeCharacters,
      caseNotOnlyNumbers,
      caseFourteenNumbers,
    ],
  },
  MX: {
    valid: [
      // No valid records found
      'ABC20010101AAA',
      'XYZ19991231Z5A',
    ],
    invalid: [
      caseEmptyString,
      caseWhitespace,
      caseTrailingSpace,
      caseLeadingSpace,
      caseMultipleWhitespace,
    ],
  },
  IN: {
    valid: [
      // Valid GST found at https://services.gst.gov.in/services/searchtp
      '27AASCS2460H1Z0',
      '37AAACP2678Q1ZP',
    ],
    invalid: [
      caseEmptyString,
      caseWhitespace,
      caseTrailingSpace,
      caseLeadingSpace,
      caseMultipleWhitespace,
    ],
  },
  Worldwide: {
    valid: [
      'ABC20010101AAA',
      '10BBBCH5678G1Z9',
      '37AAACP2678Q1ZP',
      'CHE-123.456.788',
      'CHE-116.281.710',
    ],
    invalid: [
      caseEmptyString,
      caseWhitespace,
      caseTrailingSpace,
      caseLeadingSpace,
      caseMultipleWhitespace,
    ],
  },
}
