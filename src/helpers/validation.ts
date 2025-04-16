/********************************************************************************
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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

export const utfNormalize = (value: string) => {
  return value.normalize('NFC')
}

export const validateLegalEntity = (
  value: string,
  setLegalEntity: (value: string) => void,
  setErrors: (errors) => void
): void => {
  setLegalEntity(value)
  validate(utfNormalize(value), Patterns.legalEntityPattern, 'legalEntityError', (error) => {
    setErrors((prevState) => ({
      ...prevState,
      legalEntity: error,
    }))
  })
}

export const validateRegisteredName = (
  value: string,
  setRegisteredName: (value: string) => void,
  setErrors: (errors) => void
) => {
  setRegisteredName(value)
  validate(
    utfNormalize(value),
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
  setPostalCode: (value: string) => void,
  setErrors: (errors) => void
) => {
  setPostalCode(value)
  validate(utfNormalize(value), Patterns.postalCodePattern, 'postalCodeError', (error) => {
    setErrors((prevState) => ({
      ...prevState,
      postalCode: error,
    }))
  })
}

export const validateCity = (value: string, setCity: (value: string) => void, setErrors: (errors)=>void) => {
  setCity(value)
  validate(utfNormalize(value), Patterns.CITY, 'cityError', (error) => {
    setErrors((prevState) => ({
      ...prevState,
      city: error,
    }))
  })
}

export const validateStreetHouseNumber = (
  value: string,
  setStreetHouseNumber: (value: string) => void,
  setErrors: (errors) => void
) => {
  setStreetHouseNumber(value)
  validate(utfNormalize(value), Patterns.STREET, 'streetHouseNumberError', (error) => {
    setErrors((prevState) => ({
      ...prevState,
      streetHouseNumber: error,
    }))
  })
}
