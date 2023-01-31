/********************************************************************************
 * Copyright (c) 2021,2022 Microsoft and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

export class FetchBusinessPartnerDto {
  public bpn: string
  public relations: object[]
  public identifiers: Identifier[]
  public names: Name[]
  public legalForm: Legalform
  public status: string
  public addresses: Address[]
  public profile: Profile
  public types: string[]
  public bankAccounts: Bankaccount[]
  public roles: string[]
  public uniqueIds: UniqueId[]
}

export class UniqueId {
  public type: string
  public value: string
}

export class Legalform {
  public type: string
  public value: string
  public shortName: string
  public number: number
}

export class Profile {
  public classifications: Classification[]
}

export class Classification {
  public type: string
  public value: string
  public shortName: string
  public number: number
}

export class Identifier {
  public type: string
  public registration: Registration
  public value: string
  public shortName: string
  public number: number
}

export class Registration {
  public hardeningGrade: string
  public issuingAgency: Issuingagency
  public status: string
  public initialRegistration: string
  public lastUpdate: string
}

export class Issuingagency {
  public value: string
  public shortName: string
  public number: number
}

export class Name {
  public type: string
  public value: string
  public shortName: string
  public number: number
}

export class Address {
  public bpn: string
  public identifiers: Identifier[]
  public careOf: Careof
  public countryCode: string
  public administrativeAreas: Administrativearea[]
  public postCodes: Postcode[]
  public localities: Locality[]
  public thoroughfares: Thoroughfare[]
  public premises: Premis[]
  public postalDeliveryPoints: Postaldeliverypoint[]
  public type: string
  public versions: Version[]
  public country: Country
}

export class Country {
  public technicalKey: string
  public name: string
}

export class Careof {
  public value: string
  public shortName: string
  public number: number
}

export class Administrativearea {
  public name: string
  public codes: object[]
  public type: string
}

export class Postcode {
  public type: string
  public value: string
  public shortName: string
  public number: number
}

export class Locality {
  public type: string
  public value: string
  public shortName: string
  public number: number
}

export class Thoroughfare {
  public type: string
  public value: string
  public shortName: string
  public number: number
}

export class Premis {
  public type: string
  public value: string
  public shortName: string
  public number: number
}

export class Postaldeliverypoint {
  public type: string
  public value: string
  public shortName: string
  public number: number
}

export class Version {
  public characterSet: string
  public languageCode: string
}

export class Bankaccount {
  public trustScores: string
  public currencyCode: string
  public internationalBankAccountIdentifier: string
  public internationalBankIdentifier: string
  public nationalBankAccountIdentifier: string
  public nationalBankIdentifier: string
}
