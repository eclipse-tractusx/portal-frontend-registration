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
import { isBPN, isCity, isStreet, Patterns } from '../types/Patterns'
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

type CountryType = {
  id: string
  label: string
}

const initialErrors = {
  legalEntity: '',
  registeredName: '',
  streetHouseNumber: '',
  region: '',
  postalCode: '',
  city: '',
  country: '',
  identifierNumber: '',
}

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
    if (country) {
      const countryCodeValue = countryArr?.find((code) => code.id === country)
      if (countryCodeValue) {
        setDefaultSelectedCountry(countryCodeValue)
      }
    } else {
      setDefaultSelectedCountry(null)
    }
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
    setFields(companyDetails);
  }, [companyDetails])

  const setFields = (bpnDetails: any) =>{
    setBpn(bpnDetails?.bpn ?? '')
    setLegalEntity(bpnDetails?.name ?? '')
    setRegisteredName(bpnDetails?.name ?? '')
    setStreetHouseNumber(bpnDetails?.streetName ?? '')
    setRegion(bpnDetails?.region ?? '')
    setPostalCode(bpnDetails?.zipCode ?? '')
    setCity(bpnDetails?.city ?? '')
    setCountry(bpnDetails?.countryAlpha2Code ?? '')
    setUniqueIds(bpnDetails?.uniqueIds ?? '')
    setIdentifierNumber(bpnDetails?.uniqueIds?.[0]?.value ?? '')
    setIdentifierType(bpnDetails?.uniqueIds?.[0]?.type ?? '')
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
      fetchData(expr)
        // make sure to catch any error
        .catch((errorCode: number) => {
          setFields(null)
          console.log('errorCode', errorCode)
          setBpnErrorMessage(t('registrationStepOne.bpnNotExistError'))
        })
      setBpnErrorMessage('')
    } else {
      setBpnErrorMessage(t('registrationStepOne.bpnInvalidError'))
    }
  }

  const validateLegalEntity = (value: string) => {
    setLegalEntity(value)

    if (!Patterns.legalEntityPattern.test(value?.trim())) {
      setErrors((prevState) => ({
        ...prevState,
        legalEntity: 'legalEntityError',
      }))
      return
    }

    setErrors((prevState) => ({ ...prevState, legalEntity: '' }))
  }

  const validateRegisteredName = (value: string) => {
    setRegisteredName(value)

    if (!Patterns.registeredNamePattern.test(value?.trim())) {
      setErrors((prevState) => ({
        ...prevState,
        registeredName: 'registerdNameError',
      }))
      return
    }

    setErrors((prevState) => ({ ...prevState, registeredName: '' }))
  }

  const validateStreetHouseNumber = (value: string) => {
    setStreetHouseNumber(value)

    if (!isStreet(value?.trim())) {
      setErrors((prevState) => ({
        ...prevState,
        streetHouseNumber: 'streetHouseNumberError',
      }))
      return
    }

    setErrors((prevState) => ({ ...prevState, streetHouseNumber: '' }))
  }

  const validatePostalCode = (value: string) => {
    setPostalCode(value)

    if (!value) {
      setErrors((prevState) => ({ ...prevState, postalCode: '' }))
      return
    }

    if (!Patterns.postalCodePattern.test(value?.trim())) {
      setErrors((prevState) => ({
        ...prevState,
        postalCode: 'postalCodeError',
      }))
      return
    }

    setErrors((prevState) => ({ ...prevState, postalCode: '' }))
  }

  const validateCity = (value: string) => {
    setCity(value)

    if (!isCity(value?.trim())) {
      setErrors((prevState) => ({
        ...prevState,
        city: 'cityError',
      }))
      return
    }

    setErrors((prevState) => ({ ...prevState, city: '' }))
  }

  const validateCountry = (value: string) => {
    setChangedCountryValue(true)
    setCountry(value?.toUpperCase())
    if (!Patterns.countryPattern.test(value?.trim())) {
      setShowIdentifiers(false)
      setErrors((prevState) => ({
        ...prevState,
        country: 'countryError',
      }))
      return
    }
    setErrors((prevState) => ({ ...prevState, country: '' }))
  }

  const validateRegion = (value: string) => {
    setRegion(value)

    if (!value && (country === 'MX' || country === 'CZ' || country === 'US')) {
      setErrors((prevState) => ({ ...prevState, region: 'regionError' }))
      return
    } else {
      setErrors((prevState) => ({ ...prevState, region: '' }))
    }

    if (value && !Patterns.regionPattern.test(value?.trim())) {
      setErrors((prevState) => ({
        ...prevState,
        region: 'regionError',
      }))
      return
    }

    setErrors((prevState) => ({ ...prevState, region: '' }))
  }

  const validateIdentifierNumber = (value) => {
    setChangedCountryValue(false)
    setIdentifierNumber(value)
    const countryCode =
      country === 'DE' ||
      country === 'FR' ||
      country === 'IN' ||
      country === 'MX'
        ? country
        : 'Worldwide'
    if (
      identifierType &&
      !Patterns[countryCode][identifierType].test(value?.trim())
    ) {
      setErrors((prevState) => ({
        ...prevState,
        identifierNumber: countryCode + '_' + identifierType,
      }))
      return
    }
    setErrors((prevState) => ({ ...prevState, identifierNumber: '' }))
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
    const companyData = { ...companyDetails }
    companyData.bpn = bpn?.trim()
    companyData.name = legalEntity?.trim()
    companyData.shortName = registeredName?.trim()
    companyData.streetName = streetHouseNumber?.trim()
    companyData.region = region?.trim()
    companyData.city = city?.trim()
    companyData.zipCode = postalCode?.trim()
    companyData.countryAlpha2Code = country?.trim()
    companyData.uniqueIds = [
      {
        type: identifierType,
        value: identifierNumber?.trim(),
      },
    ]
    //addCompanyData(companyData)
    addCompanyDetailsWithAddress({ applicationId, companyData })
    setNextClicked(true)
  }

  const renderSnackbar = () => {
    let message = t('registration.apiError')
    if (identifierError) {
      message = t('registrationStepOne.identifierError')
    } else if (submitError) {
      message = t('registrationStepOne.submitError')
    }
    return <Notify message={message} />
  }

  return (
    <>
      <div className="mx-auto col-9 container-registration">
        <div className="head-section">
          <div className="mx-auto step-highlight d-flex align-items-center justify-content-center">
            1
          </div>
          <h4 className="mx-auto d-flex align-items-center justify-content-center">
            {t('registrationStepOne.verifyCompayDataHeading')}
          </h4>
          <div className="mx-auto text-center col-9">
            {t('registrationStepOne.verifyCompayDataSubHeading')}
          </div>
        </div>
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
                  validateLegalEntity(e.target.value)
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
                  validateRegisteredName(e.target.value)
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
                  validateStreetHouseNumber(e.target.value)
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
                  validatePostalCode(e.target.value)
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
                  validateCity(e.target.value)
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
                    className={`form-data ${
                      errors.identifierNumber && 'error'
                    }`}
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
