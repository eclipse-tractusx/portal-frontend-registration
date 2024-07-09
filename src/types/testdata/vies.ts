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

export const VIES_TEST_DATA = {
  DE: {
    valid: [
      'DE123456789',
      'DE999999999'
    ],
    invalid: [
      '', // empty
      ' ', // whitespace
      'DE123456789 ', // trailing space
      ' DE123456789', // leading space
    ],
  },
  FR: {
    valid: [
      'FRXX999999999',
    ],
    invalid: [
      '', // empty
      ' ', // whitespace
      'FRXX999999999 ', // trailing space
      ' FRXX999999999', // leading space
    ],
  },
  Worldwide: {
    valid: [
      'DE123456789',
      'FRXX999999999',
    ],
    invalid: [
      '', // empty
      ' ', // whitespace
      'DE123456789 ', // trailing space
      ' DE123456789', // leading space
      'DE123 456789', // invalid character (whitespace)
    ],
  },
}
