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

export const EORI_TEST_DATA = {
  DE: {
    valid: [
      "DE123456789012345",
      "DE987654321098765",
    ],
    invalid: [
      'DE123456789012345 ', // trailing space
      ' DE123456789012345', // leading space
    ],
  },
  FR: {
    valid: [
      "FR123456789012345",
      "FR987654321098765",
    ],
    invalid: [
      'FR123456789012345 ', // trailing space
      ' FR123456789012345', // leading space
    ],
  },
  MX: {
    valid: [
      "MX123456789012345",
      "MX987654321098765",
    ],
    invalid: [
      'MX123456789012345 ', // trailing space
      ' MX123456789012345', // leading space
    ],
  },
  IN: {
    valid: [
      "IN123456789012345",
      "IN987654321098765",
    ],
    invalid: [
      'IN123456789012345 ', // trailing space
      ' IN123456789012345', // leading space
    ],
  },
  Worldwide: {
    valid: [
      "GB123456789012345",
      "GB987654321098765",
    ],
    invalid: [
      'GB123456789012345 ', // trailing space
      ' GB123456789012345', // leading space
    ],
  },
}
