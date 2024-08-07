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

export const STREET_TEST_DATA = {
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
      // eslint-disable-next-line
      "Rue d'Alger",
      // eslint-disable-next-line
      "Rue de l'Amiral-de-Coligny",
      'Allée André-Breton',
      'Vlašská 19',
    ],
    invalid: [
      ' Hauptstr',
      'Einbahnstr. ',
      'Rotkehlchenweg ',
      ',',
      '.',
      '--',
      'Finken  weg',
      // eslint-disable-next-line
      "Rue de l''este",
    ],
  },
}
