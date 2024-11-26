/********************************************************************************
 * Copyright (c) 2022 Microsoft and BMW Group AG
 * Copyright (c) 2022 Contributors to the Eclipse Foundation
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
import { Patterns } from '../types/Patterns'

const validate = (
  value: string,
  pattern: RegExp,
  errorKey: string,
  setError: (error: string) => void
) => {
  setError(pattern.test(value?.trim()) ? '' : errorKey)
}

export const validateLegalEntity = (
  value: string,
  setLegalEntity: any,
  setErrors: any
) => {
  setLegalEntity(value)
  validate(value, Patterns.legalEntityPattern, 'legalEntityError', (error) => {
    setErrors((prevState) => ({
      ...prevState,
      legalEntity: error,
    }))
  })
}

export const validateRegisteredName = (
  value: string,
  setRegisteredName: any,
  setErrors: any
) => {
  setRegisteredName(value)
  validate(
    value,
    Patterns.registeredNamePattern,
    'registeredNameError',
    (error) => {
      setErrors((prevState) => ({
        ...prevState,
        registeredName: error,
      }))
    }
  )
}

export const validatePostalCode = (
  value: string,
  setPostalCode: any,
  setErrors: any
) => {
  setPostalCode(value)
  validate(value, Patterns.postalCodePattern, 'postalCodeError', (error) => {
    setErrors((prevState) => ({
      ...prevState,
      postalCode: error,
    }))
  })
}

export const validateCity = (value: string, setCity: any, setErrors: any) => {
  setCity(value)
  validate(value, Patterns.CITY, 'cityError', (error) => {
    setErrors((prevState) => ({
      ...prevState,
      city: error,
    }))
  })
}

export const validateStreetHouseNumber = (
  value: string,
  setStreetHouseNumber: any,
  setErrors: any
) => {
  setStreetHouseNumber(value)
  validate(value, Patterns.STREET, 'streetHouseNumberError', (error) => {
    setErrors((prevState) => ({
      ...prevState,
      streetHouseNumber: error,
    }))
  })
}