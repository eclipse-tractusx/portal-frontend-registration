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

export const LEI_TEST_DATA = {
  Worldwide: {
    valid: [
      '529900T8BM49AURSDO55',
      '9845009B47543D8A1C80',
      '254900YLJPCHO7RQVJ69',
    ],
    invalid: [
      '529900T8BM49AURSDO55 ', // trailing space
      ' 529900T8BM49AURSDO55', // leading space
      '529900T8BM49AURSDO5', // too short
      '529900T8BM49AURSDO550', // too long
      '529900T8BM49 URSDO55', // invalid character
      '529900T8B-49AURSDO55', // invalid character
      '52990//8BM49AURSDO55', // invalid character
      '529900T8BM49AURSDO55\n', // invalid character
    ],
  },
}
