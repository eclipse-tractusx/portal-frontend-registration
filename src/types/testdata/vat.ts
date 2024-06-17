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

export const VAT_TEST_DATA = {
  GERMAN_VAT: {
    valid: ['DE123456789', 'DE987654321', 'DE000000000'],
    invalid: [
      'DE1234567890', // too long
      'DE12345678', // too short
      'DE123456789 ', // trailing space
      ' DE123456789', // leading space
      'DE12345678A', // invalid character
      'DE12345678-', // invalid character
      'FR123456789', // invalid country code
    ],
  },
  FRENCH_VAT: {
    valid: ['FR12345678901', 'FR98765432109', 'FR00000000000'],
    invalid: [
      'FR12345678901 ', // trailing space
      ' FR12345678901', // leading space
    ],
  },
}
