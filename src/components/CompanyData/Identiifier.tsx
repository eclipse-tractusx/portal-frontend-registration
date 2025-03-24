/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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
import React, { useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { UniqueIdentifier } from 'state/features/application/applicationApiSlice'
import { Patterns } from 'types/Patterns'
import { utfNormalize } from 'helpers/validation'

interface IdentifierFormProps {
  uniqueIds: { type: string; value: string }[]
  showIdentifiers: boolean
  identifierType: string
  identifierNumber: string
  errors: { identifierNumber: string }
  identifierDetails: UniqueIdentifier[]
  country: string
  onIdentifierTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  setIdentifierNumber: (value: string) => void
  setChangedCountryValue: (value: boolean) => void
  setErrors: (errors: any) => void
  handleIdentifierSelect: (type: string, value: string) => void
}

export const IdentifierForm: React.FC<IdentifierFormProps> = ({
  uniqueIds,
  showIdentifiers,
  identifierType,
  identifierNumber,
  errors,
  identifierDetails,
  country,
  onIdentifierTypeChange,
  setIdentifierNumber,
  setChangedCountryValue,
  setErrors,
  handleIdentifierSelect,
}) => {
  const { t } = useTranslation()

  const validateIdentifierNumber = (value) => {
    setChangedCountryValue(false)
    setIdentifierNumber(value)
    const countryCode = ['DE', 'FR', 'IN', 'MX'].includes(country)
      ? country
      : 'Worldwide'
    if (
      identifierType &&
      !Patterns[countryCode][identifierType].test(value?.trim())
    ) {
      setErrors((prevState) => ({
        ...prevState,
        identifierNumber: `${countryCode}_${identifierType}`,
      }))
    } else {
      setErrors((prevState) => ({ ...prevState, identifierNumber: '' }))
    }
  }

  useEffect(() => {
    identifierNumber &&
      identifierType &&
      validateIdentifierNumber(utfNormalize(identifierNumber))
  }, [identifierType, identifierNumber])

  return (
    <>
      {uniqueIds && uniqueIds?.length > 1 ? (
        <>
          <Row className="mx-auto col-9">
            <span className="form-heading">
              {t('registrationStepOne.countryIdentifier')}
              <div className="company-hint">
                {t('registrationStepOne.identifierhelperText')}
              </div>
            </span>
          </Row>
          <Row className="mx-auto col-9">
            <ul className="agreement-check-list">
              {uniqueIds?.map((id) => (
                <li key={id.type} className="agreement-li">
                  <input
                    type="radio"
                    name="uniqueIds"
                    value={id.type}
                    className="regular-radio agreement-check"
                    onChange={() => {
                      handleIdentifierSelect(id.type, id.value)
                    }}
                    defaultChecked={uniqueIds[0].type === id.type}
                  />
                  <label>
                    {t(`registrationStepOne.identifierTypes.${id.type}`) +
                      ' : ' +
                      id.value}
                  </label>
                </li>
              ))}
            </ul>
          </Row>
        </>
      ) : (
        showIdentifiers && (
          <>
            <Row className="mx-auto col-9">
              <span className="form-heading">
                {t('registrationStepOne.countryIdentifier')}
              </span>
            </Row>
            <Row className="mx-auto col-9">
              <div className={'form-data'}>
                <label>
                  {t('registrationStepOne.identifierType')}{' '}
                  <span className="mandatory-asterisk">*</span>
                </label>
                <select
                  value={identifierType}
                  onChange={(e) => {
                    onIdentifierTypeChange(e)
                  }}
                >
                  <option value="">
                    {t('registrationStepOne.pleaseSelect')}
                  </option>
                  {identifierDetails?.map((identifier) => (
                    <option key={identifier.id} value={identifier.label}>
                      {t(
                        `registrationStepOne.identifierTypes.${identifier.label}`
                      )}
                    </option>
                  ))}
                </select>
              </div>
            </Row>
            <Row className="mx-auto col-9">
              <div
                className={`form-data ${errors.identifierNumber && 'error'}`}
              >
                <label>
                  {t('registrationStepOne.identifierNumber')}{' '}
                  <span className="mandatory-asterisk">*</span>
                </label>
                <input
                  type="text"
                  value={identifierNumber}
                  onChange={(e) => {
                    validateIdentifierNumber(e.target.value)
                  }}
                  onBlur={(e) => {
                    setIdentifierNumber(e.target.value.trim())
                  }}
                />
                {errors.identifierNumber && (
                  <label>
                    {t(`registrationStepOne.${errors.identifierNumber}`)}
                  </label>
                )}
              </div>
            </Row>
          </>
        )
      )}
    </>
  )
}