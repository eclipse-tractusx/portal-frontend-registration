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

import React, { useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { TextField, Autocomplete } from '@mui/material'
import {
  validateCity,
  validatePostalCode,
  validateStreetHouseNumber,
} from 'helpers/validation'
import { CountryType } from 'types/MainTypes'
import { useTranslation } from 'react-i18next'
import { Patterns } from 'types/Patterns'

interface AddressFormProps {
  country: string
  city: string
  postalCode: string
  region: string
  countryArr: CountryType[]
  defaultSelectedCountry: CountryType | null
  errors: any
  streetHouseNumber: string
  changedCountryValue: boolean
  setCity: (city: string) => void
  setPostalCode: (postalCode: string) => void
  setRegion: (region: string) => void
  setErrors: (errors: any) => void
  setStreetHouseNumber: (value: string) => void
  setShowIdentifiers: (value: boolean) => void
  setChangedCountryValue: (value: boolean) => void
  setCountry: (value: string) => void
  refetch: () => void
}

const AddressForm: React.FC<AddressFormProps> = ({
  country,
  city,
  postalCode,
  region,
  countryArr,
  defaultSelectedCountry,
  errors,
  streetHouseNumber,
  changedCountryValue,
  setCity,
  setPostalCode,
  setRegion,
  setErrors,
  setStreetHouseNumber,
  setShowIdentifiers,
  setChangedCountryValue,
  setCountry,
  refetch,
}) => {
  const { t } = useTranslation()
  const validateCountry = (value: string) => {
    setChangedCountryValue(true)
    setCountry(value?.toUpperCase())
    if (!Patterns.countryPattern.test(value?.trim())) {
      setShowIdentifiers(false)
      setErrors((prevState) => ({ ...prevState, country: 'countryError' }))
    } else {
      setErrors((prevState) => ({ ...prevState, country: '' }))
    }
  }

  const validateRegion = (value: string) => {
    setRegion(value)
    const isRequiredCountry = ['MX', 'CZ', 'US'].includes(country)
    const isValidRegion = value && Patterns.regionPattern.test(value?.trim())
    setErrors((prevState) => ({
      ...prevState,
      region:
        (!value && isRequiredCountry) || (!isValidRegion && value)
          ? 'regionError'
          : '',
    }))
  }

  useEffect(() => {
    if (errors.country === '' && country && changedCountryValue) {
      refetch()
      validateRegion(region)
    }
  }, [country])

  return (
    <>
      <Row className="mx-auto col-9">
        <span className="form-heading">
          {t('registrationStepOne.organizationAdd')}
        </span>
      </Row>
      <Row className="mx-auto col-9">
        <div className={`form-data ${errors.streetHouseNumber && 'error'}`}>
          <label>
            {t('registrationStepOne.streetHouseNumber')}{' '}
            <span className="mandatory-asterisk">*</span>
          </label>
          <input
            type="text"
            value={streetHouseNumber}
            onChange={(e) => {
              validateStreetHouseNumber(
                e.target.value,
                setStreetHouseNumber,
                setErrors
              )
            }}
            onBlur={(e) => {
              setStreetHouseNumber(e.target.value.trim())
            }}
          />
          {errors.streetHouseNumber && (
            <label>
              {t(`registrationStepOne.${errors.streetHouseNumber}`)}
            </label>
          )}
        </div>
      </Row>
      <Row className="mx-auto col-9">
        <div className={`col-4 form-data ${errors.postalCode && 'error'}`}>
          <label> {t('registrationStepOne.postalCode')} </label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => {
              validatePostalCode(e.target.value, setPostalCode, setErrors)
            }}
            onBlur={(e) => {
              setPostalCode(e.target.value.trim())
            }}
          />
          {errors.postalCode && (
            <label>{t(`registrationStepOne.${errors.postalCode}`)}</label>
          )}
        </div>

        <div className={`col-8 form-data ${errors.city && 'error'}`}>
          <label>
            {t('registrationStepOne.city')}{' '}
            <span className="mandatory-asterisk">*</span>
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              validateCity(e.target.value, setCity, setErrors)
            }}
            onBlur={(e) => {
              setCity(e.target.value.trim())
            }}
          />
          {errors.city && (
            <label>{t(`registrationStepOne.${errors.city}`)}</label>
          )}
        </div>
      </Row>
      <Row className="mx-auto col-9">
        <div className={`col-4 form-data ${errors.country && 'error'}`}>
          <label>
            {t('registrationStepOne.country')}{' '}
            <span className="mandatory-asterisk">*</span>
          </label>
          {(countryArr?.length || errors.country) && (
            <Autocomplete
              id="selectList"
              options={countryArr}
              value={defaultSelectedCountry}
              renderInput={(params) => (
                <TextField variant="standard" {...params} />
              )}
              onChange={(_e, values) => {
                validateCountry(values?.id)
              }}
              sx={{
                '.MuiInput-input': {
                  height: '31px',
                },
              }}
            />
          )}
          {errors.country && (
            <label>{t(`registrationStepOne.${errors.country}`)}</label>
          )}
        </div>

        <div className={`col-8 form-data ${errors.region && 'error'}`}>
          <label> {t('registrationStepOne.region')} </label>
          <input
            type="text"
            value={region}
            onChange={(e) => {
              validateRegion(e.target.value)
            }}
            onBlur={(e) => {
              setRegion(e.target.value.trim())
            }}
          />
          {errors.region && (
            <label>{t(`registrationStepOne.${errors.region}`)}</label>
          )}
        </div>
      </Row>
    </>
  )
}

export default AddressForm