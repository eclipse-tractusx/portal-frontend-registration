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
      // https://find-and-update.company-information.service.gov.uk/company/03249311
      'CENTRE FOR HEALTH SCIENCES, TRAINING, RESEARCH AND DEVELOPMENT (CHESTRAD) INTERNATIONAL.',
      // https://find-and-update.company-information.service.gov.uk/company/04120480
      'THIS IS THE COMPANY WITH THE LONGEST NAME SO FAR INCORPORATED AT THE REGISTRY OF COMPANIES IN ENGLAND AND WALES AND ENCOMPASSING THE REGISTRIES BASED IN SCOTLAN',
      'Bayerische Motoren Werke Aktiengesellschaft',
      '7-ELEVEN INTERNATIONAL LLC',
      '5N Plus Lübeck GmbH',
      'Recht 24/7 Schröder Rechtsanwaltsgesellschaft mbH',
      '+SEN Inc.', // leading special character
      'La Poste S.A.',
      'JPMORGAN ASIA-PACIFIC ADVANTAGE HYBRID FUND (QDII)',
      '摩根亚太优势混合型证券投资基金 (QDII)',
      'Adis Tachov, zpracování plastů s.r.o.',
      'BURY SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
      'GAMMO Europe Korlátolt Felelősségű Társaság',
      'Currency £$€¥¢₫฿',
      'Brackets []()',
      'Punctuation !?,.;:',
      'Double "Quote" Company S.A.', // special character "" in name
      'Single \'Quote\' Company LLC', // special character '' in name
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
      'ACE 9 SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
      '摩根亚太优势混合型证券投资基金 (QDII)',
      '삼성', // Samsung
      '三', // Samsung
      'Czech: ČĎŇŘŠŤŽ',
      'Estonian: ÄÖÜŠŽ',
      'Slovak: ĽĹŔŠŤŽ',
      'Polish: ĄĆĘŁŃÓŚŹŻ',
      'Hungarian: ÁÉÍÓÖŐÚÜŰ',
      'Romanian: ÂÎŞŢ',
      'Bulgarian: ЙЪЬ',
      'Greek: ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
      'Turkish: ÇĞİıÖŞÜ',
      'Arabic: ابتثجحخدذرزسشصضطظعغفقكلمنهوي',
      'Hebrew: שלום עולם',
      'Hindi: अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषस',
      'Tamil: அஆஇஈஉஊஎஏஐஒஓஔகஙசஞடணதநனபமயரலவழளஷஸஹ',
      'Japanese: あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん',
      'Chinese: 你好 世界',
      'Korean: 안녕하세요 세계',
      'Thai: สวัสดีชาวโลก', // Thai does not seem to work even with /p{L} and required additional range
      'Vietnamese: ăâắáấàằầảẳẩãẵẫạặậđêéếèềẻểẽễẹệíìỉĩịôơóốớòồờỏổởõỗỡọộợưúứùừủửũữụựýỳỷỹỵ',
      'Singapore: 你好 世界',
    ],
    invalid: [
      ' Bayerische Motoren Werke Aktiengesellschaft', // leading space
      'Bayerische Motoren Werke Aktiengesellschaft ', // trailing space
      'Bayerische Motoren Werke  Aktiengesellschaft', // double space
      'Bayerische Motoren Werke Aktiengesellschaft\n', // newline
      'W'.repeat(161), // 161 characters
      '', // empty
    ],
  },
}
