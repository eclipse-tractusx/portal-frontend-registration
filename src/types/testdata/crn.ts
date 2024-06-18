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
      'HRA 12345 B',
      'HRB 178881 B',
      'HRA 350654',
    ],
    invalid: [
      'HRA 12345 B ', // trailing space
      ' HRA 12345 B', // leading space
    ],
  },
  FR: {
    valid: [
      'RCS PARIS 453 983 245',
      'RC NANTES 234 987 456',
    ],
    invalid: [
      'RCS PARIS 453 983 245 ', // trailing space
      ' RCS PARIS 453 983 245', // leading space
    ],
  },
  MX: {
    valid: [
      'ABC20010101AAA',
      'XYZ19991231Z5A',
    ],
    invalid: [
      'ABC20010101AAA ', // trailing space
      ' ABC20010101AAA', // leading space
    ],
  },
  IN: {
    valid: [
      '27AAAAC1234F1Z5',
      '10BBBCH5678G1Z9',
      '36DDDEE9012H1Z1',
    ],
    invalid: [
      '27AAAAC1234F1Z5 ', // trailing space
      ' 27AAAAC1234F1Z5', // leading space
    ],
  },
  Worldwide: {
    valid: [
      'DE123456789',
      'FR12345678901',
      'ABC20010101AAA',
      '10BBBCH5678G1Z9',
    ],
    invalid: [
      ' DE123456789', // leading space
      'DE123456789 ', // trailing space
    ],
  },
}
