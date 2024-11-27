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

import { Row } from 'react-bootstrap'
import { getCompanyDetails } from '../helpers/utils'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import SearchInput from 'react-search-input'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { FooterButton } from './footerButton'
import { useDispatch, useSelector } from 'react-redux'
import { isBPN, Patterns } from '../types/Patterns'
import {
  useFetchApplicationsQuery,
  useFetchCompanyDetailsWithAddressQuery,
  useFetchUniqueIdentifierQuery,
  type UniqueIdentifier,
  useAddCompanyDetailsWithAddressMutation,
  type Identifier,
  useFetchCountryListQuery,
} from '../state/features/application/applicationApiSlice'
import {
  addCurrentStep,
  getCurrentStep,
} from '../state/features/user/userApiSlice'
import { Autocomplete, TextField } from '@mui/material'
import i18n from '../services/I18nService'
import { Notify } from './Snackbar'
import StepHeader from './StepHeader'
import {
  validateCity,
  validateLegalEntity,
  validatePostalCode,
  validateRegisteredName,
  validateStreetHouseNumber,
} from 'helpers/validation'
import { CountryType } from 'types/MainTypes'
import { initialErrors } from 'helpers/constants'
import { IdentifierForm } from './CompanyData/Identiifier'

export const CompanyDataCax = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const currentActiveStep = useSelector(getCurrentStep)

  const [nextClicked, setNextClicked] = useState(false)
  const [identifierDetails, setIdentifierDetails] =
    useState<UniqueIdentifier[]>()

  const { data: status } = useFetchApplicationsQuery()

  const obj = status?.[status.length - 1] //.find(o => o['applicationStatus'] === CREATED);
  const applicationId = obj?.applicationId

  const [bpn, setBpn] = useState('')
  const [bpnErrorMsg, setBpnErrorMessage] = useState('')
  const [legalEntity, setLegalEntity] = useState('')
  const [registeredName, setRegisteredName] = useState('')
  const [streetHouseNumber, setStreetHouseNumber] = useState('')
  const [region, setRegion] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [showIdentifiers, setShowIdentifiers] = useState(false)
  const [uniqueIds, setUniqueIds] = useState<Identifier[]>()
  const [identifierType, setIdentifierType] = useState<string>()
  const [identifierNumber, setIdentifierNumber] = useState<string>()
  const [changedCountryValue, setChangedCountryValue] = useState<boolean>(false)
  const [errors, setErrors] = useState(initialErrors)

  const [submitError, setSubmitError] = useState(false)
  const [identifierError, setIdentifierError] = useState(false)
  const [notifyError, setNotifyError] = useState(false)
  const [defaultSelectedCountry, setDefaultSelectedCountry] = useState(null)

  const {
    data: companyDetails,
    error: companyDataError,
    refetch: refetchCompanyData,
  } = useFetchCompanyDetailsWithAddressQuery(applicationId)
  const [addCompanyDetailsWithAddress, { error: saveError, isLoading }] =
    useAddCompanyDetailsWithAddressMutation()

  useEffect(() => {
    setSubmitError(false)
    nextClicked &&
      !isLoading &&
      (saveError
        ? setSubmitError(true)
        : dispatch(addCurrentStep(currentActiveStep + 1)))
  }, [nextClicked, isLoading, saveError, currentActiveStep])

  const {
    data: identifierData,
    error,
    refetch,
  } = useFetchUniqueIdentifierQuery(country)
  let { data: countryList } = useFetchCountryListQuery()

  const [countryArr, setCountryArr] = useState<CountryType[]>([])

  useEffect(() => {
    const index = i18n.language === 'de' ? 0 : 1
    if (countryList?.length > 0 && Array.isArray(countryList[0].countryName)) {
      countryList = countryList?.map((country) => ({
        id: country.alpha2Code,
        label:
          country.countryName[index]?.value + ' (' + country.alpha2Code + ')',
      }))
      setCountryArr(countryList)
    }
  }, [countryList, i18n.language])

  useEffect(() => {
    const selectedCountry = countryArr?.find((code) => code.id === country)
    setDefaultSelectedCountry(country ? selectedCountry : null)
  }, [country, countryArr])

  useEffect(() => {
    refetchCompanyData()
    setIdentifierError(false)
    setIdentifierDetails(error ? [] : identifierData)
    if (identifierData && identifierData.length > 0) {
      setShowIdentifiers(!error)
    }
    if (country?.length === 2 && error) setIdentifierError(true)
  }, [identifierData, country, error])

  useEffect(() => {
    if (errors.country === '' && country && changedCountryValue) {
      refetch()
      validateRegion(region)
    }
    identifierNumber &&
      identifierType &&
      validateIdentifierNumber(identifierNumber)
  }, [identifierType, identifierNumber, country])

  useEffect(() => {
    setFields(companyDetails)
  }, [companyDetails])

  const setFields = (bpnDetails: any) => {
    const {
      bpn,
      name,
      streetName,
      region,
      zipCode,
      city,
      countryAlpha2Code,
      uniqueIds,
    } = bpnDetails ?? {}

    setBpn(bpn ?? '')
    setLegalEntity(name ?? '')
    setRegisteredName(name ?? '')
    setStreetHouseNumber(streetName ?? '')
    setRegion(region ?? '')
    setPostalCode(zipCode ?? '')
    setCity(city ?? '')
    setCountry(countryAlpha2Code ?? '')
    setUniqueIds(uniqueIds ?? '')
    setIdentifierNumber(uniqueIds?.[0]?.value ?? '')
    setIdentifierType(uniqueIds?.[0]?.type ?? '')
  }

  useEffect(() => {
    if (companyDataError ?? submitError ?? identifierError) {
      setNotifyError(true)
    }
  }, [companyDataError, submitError, identifierError])

  const fetchData = async (expr: string) => {
    const details = await getCompanyDetails(expr)
    setFields(details)
  }

  const onSearchChange = (expr: string) => {
    if (isBPN(expr?.trim())) {
      fetchData(expr).catch((errorCode: number) => {
        setFields(null)
        console.log('errorCode', errorCode)
        setBpnErrorMessage(t('registrationStepOne.bpnNotExistError'))
      })
      setBpnErrorMessage('')
    } else {
      setBpnErrorMessage(t('registrationStepOne.bpnInvalidError'))
    }
  }

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

  const handleIdentifierSelect = (type, value) => {
    setIdentifierType(type)
    setIdentifierNumber(value)
  }

  const onIdentifierTypeChange = (e) => {
    setIdentifierType(e.target.value)
  }

  const backClick = () => {
    dispatch(addCurrentStep(currentActiveStep - 1))
  }

  const nextClick = () => {
    const companyData = {
      ...companyDetails,
      bpn: bpn?.trim(),
      name: legalEntity?.trim(),
      shortName: registeredName?.trim(),
      streetName: streetHouseNumber?.trim(),
      region: region?.trim(),
      city: city?.trim(),
      zipCode: postalCode?.trim(),
      countryAlpha2Code: country?.trim(),
      uniqueIds: [
        {
          type: identifierType,
          value: identifierNumber?.trim(),
        },
      ],
    }
    addCompanyDetailsWithAddress({ applicationId, companyData })
    setNextClicked(true)
  }

  const renderSnackbar = () => {
    const message = identifierError
      ? t('registrationStepOne.identifierError')
      : submitError
        ? t('registrationStepOne.submitError')
        : t('registration.apiError')

    return <Notify message={message} />
  }

  return (
    <>
      <div className="mx-auto col-9 container-registration">
        <StepHeader
          step={currentActiveStep}
          stepName={t('registrationStepOne.verifyCompayDataHeading')}
          stepDescription={t('registrationStepOne.verifyCompayDataSubHeading')}
        />
        <div className="companydata-form">
          <Row className="mx-auto col-9">
            <div className={`form-search ${bpnErrorMsg ? 'error' : ''}`}>
              <label> {t('registrationStepOne.seachDatabase')}</label>
              <SearchInput
                className="search-input"
                value={''}
                onChange={(expr) => {
                  onSearchChange(expr)
                }}
              />
              <label className="error-message">{bpnErrorMsg}</label>
            </div>
          </Row>

          <Row className="col-9 mx-auto">
            <div className="section-divider">
              <span className="text-center">
                {t('registrationStepOne.enterManualText')}
              </span>
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div className="form-data">
              <label>
                {' '}
                {t('registrationStepOne.bpn')}{' '}
                <AiOutlineQuestionCircle
                  color="#939393"
                  // tip data need to get moved to the locales files
                  data-tip="Displays the bpn and can't get eddited."
                />
              </label>
              <input type="text" disabled value={bpn} />
              <div className="company-hint">
                {t('registrationStepOne.helperText')}
              </div>
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div className={`form-data ${errors.legalEntity && 'error'}`}>
              <label>
                {' '}
                {t('registrationStepOne.legalEntity')}{' '}
                <span className="mandatory-asterisk">*</span>
                <AiOutlineQuestionCircle
                  color="#939393"
                  // tip data need to get moved to the locales files
                  data-tip="Legal Company Name"
                />{' '}
              </label>
              <input
                type="text"
                value={legalEntity}
                onChange={(e) => {
                  validateLegalEntity(e.target.value, setLegalEntity, setErrors)
                }}
                onBlur={(e) => {
                  setLegalEntity(e.target.value.trim())
                }}
              />
              {errors.legalEntity && (
                <label>{t(`registrationStepOne.${errors.legalEntity}`)}</label>
              )}
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div className={`form-data ${errors.registeredName && 'error'}`}>
              <label>
                {' '}
                {t('registrationStepOne.registeredName')}{' '}
                <span className="mandatory-asterisk">*</span>
              </label>
              <input
                type="text"
                value={registeredName}
                onChange={(e) => {
                  validateRegisteredName(
                    e.target.value,
                    setRegisteredName,
                    setErrors
                  )
                }}
                onBlur={(e) => {
                  setRegisteredName(e.target.value.trim())
                }}
              />
              {errors.registeredName && (
                <label>
                  {t(`registrationStepOne.${errors.registeredName}`)}
                </label>
              )}
            </div>
          </Row>

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
          <IdentifierForm
            uniqueIds={uniqueIds}
            handleIdentifierSelect={handleIdentifierSelect}
            showIdentifiers={showIdentifiers}
            identifierType={identifierType}
            identifierNumber={identifierNumber}
            errors={errors}
            onIdentifierTypeChange={onIdentifierTypeChange}
            validateIdentifierNumber={validateIdentifierNumber}
            setIdentifierNumber={setIdentifierNumber}
            identifierDetails={identifierDetails}
          />
        </div>
      </div>
      {notifyError && renderSnackbar()}
      <FooterButton
        labelNext={t('button.confirm')}
        handleBackClick={() => {
          backClick()
        }}
        handleNextClick={() => {
          nextClick()
        }}
        disabled={
          !legalEntity ||
          !registeredName ||
          !streetHouseNumber ||
          !city ||
          !country ||
          errors.streetHouseNumber !== '' ||
          errors.country !== '' ||
          errors.postalCode !== '' ||
          errors.region !== '' ||
          !identifierType ||
          identifierNumber.length === 0 ||
          !identifierDetails?.length ||
          errors.identifierNumber !== ''
        }
        helpUrl={
          '/documentation/?path=user%2F01.+Onboarding%2F02.+Registration%2F02.+Add+Company+Data.md'
        }
      />
    </>
  )
}
