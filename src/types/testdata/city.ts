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

export const CITY_TEST_DATA = {
  CITY: {
    valid: [
      'Munich',
      'Toronto',
      'San Francisco',
      'St. Catharines',
      // eslint-disable-next-line
      "Val-d'Or",
      // eslint-disable-next-line
      "Presqu'ile",
      'Niagara on the Lake',
      'Niagara-on-the-Lake',
      'München',
      'Villes du Québec',
      // eslint-disable-next-line
      "Provence-Alpes-Côte d'Azur",
      'Île-de-France',
      'Kópavogur',
      'Garðabær',
      'Sauðárkrókur',
      'Þorlákshöfn',
    ],
    invalid: [
      '', // empty
      ' ', // whitespace
      ' Munich', // leading whitespace
      'Munich ', // trailing whitespace
      ',',
      '.',
      '--',
      'Niagara--on-the-Lake',
      // eslint-disable-next-line
      "Presqu''ile",
    ],
  },
}
