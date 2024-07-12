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

export const LEGAL_ENTITY_DATA = {
  LEGAL_ENTITY: {
    valid: [
      'A', // 1 characters
      '1234567890'.repeat(16), // 160 characters
      'Bayerische Motoren Werke Aktiengesellschaft',
      '7-ELEVEN INTERNATIONAL LLC',
      '5N Plus Lübeck GmbH',
      'Recht 24/7 Schröder Rechtsanwaltsgesellschaft mbH',
      '+SEN Inc.', // leading special character
      'La Poste S.A.',
      'JPMORGAN ASIA-PACIFIC ADVANTAGE HYBRID FUND (QDII)',
      'Currency £$€¥¢',
      'Brackets []()',
      'Punctuation !?,.;:',
      'Special Characters ^&%#@*/_-\\',
      'German: ÄÖÜß',
      'French: ÀÉÈÊË',
      'Spanish: ÁÉÍÓÚÑÜ',
      'Portuguese: ÃÕÂÊÇ',
      'Italian: ÀÈÉÌÒÙ',
      'Danish: ÆØÅ',
      'Swedish: ÅÄÖ',
      'Norwegian: ÅÆØ',
      'Finnish: ÄÖ',
      'Icelandic: ÆÐÞ',
      'Dutch: ÏËÏ',
      // -- not supported by the pattern
      // 'ACE 9 SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
      // '摩根亚太优势混合型证券投资基金 (QDII)',
      // '삼성', // Samsung
      // '三', // Samsung
      // 'Czech: ČĎŇŘŠŤŽ',
      // 'Estonian: ÄÖÜŠŽ',
      // 'Slovak: ĽĹŔŠŤŽ',
      // 'Polish: ĄĆĘŁŃÓŚŹŻ',
      // 'Hungarian: ÁÉÍÓÖŐÚÜŰ',
      // 'Romanian: ÂÎŞŢ',
      // 'Bulgarian: ЙЪЬ',
      // 'Greek: ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
      // 'Turkish: ÇĞİıÖŞÜ',
      // 'Arabic: ابتثجحخدذرزسشصضطظعغفقكلمنهوي',
      // 'Hebrew: שלום עולם',
      // 'Hindi: अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषस',
      // 'Japanese: あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん',
      // 'Chinese: 你好 世界',
      // 'Korean: 안녕하세요 세계',
      // 'Thai: สวัสดีชาวโลก', // Thai does not seem to work even with /p{L}
    ],
    invalid: [
      ' Bayerische Motoren Werke Aktiengesellschaft', // leading space
      'Bayerische Motoren Werke Aktiengesellschaft ', // trailing space
      'Bayerische Motoren Werke  Aktiengesellschaft', // double space
      '', // empty
    ],
  },
}
