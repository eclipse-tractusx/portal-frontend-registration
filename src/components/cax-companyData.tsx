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
import { getCompanyDetails } from '../helpers/utils'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { FooterButton } from './footerButton'
import { useDispatch, useSelector } from 'react-redux'
import { isBPN } from '../types/Patterns'
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
import i18n from '../services/I18nService'
import { Notify } from './Snackbar'
import StepHeader from './StepHeader'
import { validateLegalEntity, validateRegisteredName } from 'helpers/validation'
import { CountryType } from 'types/MainTypes'
import { initialErrors } from 'helpers/constants'
import { IdentifierForm } from './CompanyData/Identiifier'
import AddressForm from './CompanyData/AddressForm'
import CompanyDataForm from './CompanyData/CompanyDataForm'

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
    const getMessage = () => {
      if (identifierError) return t('registrationStepOne.identifierError')
      if (submitError) return t('registrationStepOne.submitError')
      return t('registration.apiError')
    }
    return <Notify message={getMessage()} />
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
          <CompanyDataForm
            bpn={bpn}
            bpnErrorMsg={bpnErrorMsg}
            legalEntity={legalEntity}
            registeredName={registeredName}
            errors={errors}
            validateLegalEntity={validateLegalEntity}
            validateRegisteredName={validateRegisteredName}
            setLegalEntity={setLegalEntity}
            setRegisteredName={setRegisteredName}
            setErrors={setErrors}
            isBPN={isBPN}
            fetchData={fetchData}
            setFields={setFields}
            setBpnErrorMessage={setBpnErrorMessage}
          />
          <AddressForm
            country={country}
            city={city}
            setCity={setCity}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            region={region}
            setRegion={setRegion}
            countryArr={countryArr}
            defaultSelectedCountry={defaultSelectedCountry}
            setErrors={setErrors}
            errors={errors}
            setStreetHouseNumber={setStreetHouseNumber}
            streetHouseNumber={streetHouseNumber}
            setShowIdentifiers={setShowIdentifiers}
            setChangedCountryValue={setChangedCountryValue}
            setCountry={setCountry}
            refetch={refetch}
            changedCountryValue={changedCountryValue}
          />
          <IdentifierForm
            uniqueIds={uniqueIds}
            handleIdentifierSelect={handleIdentifierSelect}
            showIdentifiers={showIdentifiers}
            identifierType={identifierType}
            identifierNumber={identifierNumber}
            errors={errors}
            onIdentifierTypeChange={onIdentifierTypeChange}
            setIdentifierNumber={setIdentifierNumber}
            identifierDetails={identifierDetails}
            country={country}
            setErrors={setErrors}
            setChangedCountryValue={setChangedCountryValue}
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
