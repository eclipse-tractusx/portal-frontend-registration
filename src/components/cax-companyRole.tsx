/********************************************************************************
 * Copyright (c) 2021, 2023 Microsoft and BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import { useDispatch, useSelector } from 'react-redux'
import { companyRole } from '../state/features/applicationCompanyRole/types'
import { download } from '../helpers/utils'
import UserService from '../services/UserService'
import { getApiBase } from '../services/EnvironmentService'
import { Notify } from './Snackbar'
import {
  useFetchAgreementConsentsQuery,
  useFetchAgreementDataQuery,
  useUpdateAgreementConsentsMutation,
} from '../state/features/applicationCompanyRole/applicationCompanyRoleApiSlice'
import { useFetchApplicationsQuery } from '../state/features/application/applicationApiSlice'
import {
  addCurrentStep,
  getCurrentStep,
} from '../state/features/user/userApiSlice'
import '../styles/newApp.css'

export const CompanyRoleCax = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()

  const currentActiveStep = useSelector(getCurrentStep)
  const [companyRoleChecked, setCompanyRoleChecked] = useState({})
  const [agreementChecked, setAgreementChecked] = useState({})
  const [submitError, setSubmitError] = useState(false)

  const { data: status } = useFetchApplicationsQuery()

  const obj = status[status.length - 1]
  const applicationId = obj['applicationId']

  const {
    data: allConsentData,
    error: allConsentError
  } = useFetchAgreementDataQuery()
  const {
    data: consentData,
    error: consentError,
  } = useFetchAgreementConsentsQuery(applicationId)
  const [updateAgreementConsents] = useUpdateAgreementConsentsMutation()

  useEffect(() => {
    updateSelectedRolesAndAgreement()
  }, [consentData])

  const updateSelectedRolesAndAgreement = () => {
    setCompanyRoleChecked(
      consentData?.companyRoles.reduce((prev, next) => {
        return { ...prev, [next]: true }
      }, {})
    )

    setAgreementChecked(
      consentData?.agreements.reduce((prev, next) => {
        return { ...prev, [next.agreementId]: true }
      }, {})
    )
  }

  const handleAgreementCheck = (id) => {
    const updatedMap = { ...agreementChecked }
    updatedMap[id] = !updatedMap[id]
    setAgreementChecked(updatedMap)
  }

  const handleCompanyRoleCheck = (id) => {
    const updatedMap = { ...companyRoleChecked }
    updatedMap[id] = !updatedMap[id]

    if (!updatedMap[id]) {
      const companyRoleIndex = allConsentData?.companyRoles.findIndex(
        (item) => item.companyRole === id
      )

      const updatedAgreementIds = allConsentData?.companyRoles[
        companyRoleIndex
      ].agreementIds.reduce((prev, next) => {
        return { ...prev, [next]: false }
      }, {})

      setAgreementChecked((prevState) => ({
        ...prevState,
        ...updatedAgreementIds,
      }))
    }

    setCompanyRoleChecked(updatedMap)
  }

  const handleDownloadClick = async (
    documentId: string,
    documentName: string
  ) => {
    if (!documentId) return
    try {
      fetch(
        `${getApiBase()}/api/registration/registrationDocuments/${documentId}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${UserService.getToken()}`,
          },
        }
      )
        .then(async (res) => {
          const fileType = res.headers.get('content-type')
          const file = await res.blob()
          return download(file, fileType, documentName)
        })
        .catch((error) => console.log(error))
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const renderTermsSection = (role: companyRole) => {
    if (role.agreementIds.length === 0) return null
    return (
      <div>
        <ul className="agreement-check-list">
          {role.agreementIds.map((id, key) => (
            <li key={key} className="agreement-li">
              <input
                type="checkbox"
                name={id}
                className="regular-checkbox agreement-check"
                onChange={() => handleAgreementCheck(id)}
                checked={agreementChecked?.[id]}
              />
              {allConsentData?.agreements.map((agreement) => {
                if (agreement.agreementId == id)
                  return (
                    <p className="agreement-text" key={agreement.agreementId}>
                      {agreement.documentId ? (
                        <>
                          {t('companyRole.TermsAndCondSpan1')}{' '}
                          <span
                            className={
                              agreement.documentId ? 'agreement-span' : ''
                            }
                            onClick={() =>
                              handleDownloadClick(
                                agreement.documentId,
                                agreement.name
                              )
                            }
                            onKeyDown={() => {
                              // do nothing
                            }}
                          >
                            {agreement.name}
                          </span>{' '}
                          {t('companyRole.TermsAndCondSpan3')}
                        </>
                      ) : (
                        <span>{agreement.name}</span>
                      )}
                    </p>
                  )
              })}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const backClick = () => {
    dispatch(addCurrentStep(currentActiveStep - 1))
  }

  const nextClick = async () => {
    const companyRoles = Object.keys(companyRoleChecked).filter(
      (item) => companyRoleChecked[item]
    )

    const agreements = Object.keys(agreementChecked)
      .filter(agreementId => agreementChecked[agreementId])
      .map((agreementId) => {
        return {
          agreementId: agreementId,
          consentStatus: 'ACTIVE'
        }
      })

    const data = {
      companyRoles: companyRoles,
      agreements: agreements,
    }

    await updateAgreementConsents({ applicationId, data })
      .unwrap()
      .then(() => {
        dispatch(addCurrentStep(currentActiveStep + 1))
      })
      .catch((errors) => {
        console.log('errors', errors)
        setSubmitError(true)
      })
  }

  const renderSnackbar = (message: string) => {
    return (
      <Notify message={message} />
    )
  }

  return (
    <>
      <div className="mx-auto col-9 container-registration">
        <div className="head-section">
          <div className="mx-auto step-highlight d-flex align-items-center justify-content-center">
            3
          </div>
          <h4 className="mx-auto d-flex align-items-center justify-content-center">
            {t('companyRole.title')}
          </h4>
          <div className="mx-auto text-center col-9">
            {t('companyRole.subTitle')}
          </div>
        </div>
        <div className="companydata-form mx-auto col-9">
          {allConsentData?.companyRoles.map((role, index) => (
            <div className="company-role-section" key={index}>
              <Row>
                <div className="col-1">
                  <input
                    type="checkbox"
                    name={role.companyRole}
                    className="regular-checkbox"
                    onChange={() => handleCompanyRoleCheck(role.companyRole)}
                    checked={companyRoleChecked?.[role.companyRole]}
                  />
                </div>
                <div className="col-11">
                  <h6>{t(`companyRole.${role.companyRole}`)}</h6>
                  <p>{role.descriptions[i18n.language]}</p>
                  {companyRoleChecked?.[role.companyRole] &&
                    renderTermsSection(role)}
                </div>
              </Row>
            </div>
          ))}
        </div>
      </div>
      {
        (consentError || allConsentError) && renderSnackbar(t('registration.apiError'))
      }
      {
        submitError && renderSnackbar(t('companyRole.submitError'))
      }
      <FooterButton
        labelBack={t('button.back')}
        labelNext={t('button.confirm')}
        handleBackClick={() => backClick()}
        handleNextClick={() => nextClick()}
        helpUrl={
          '/documentation/?path=user%2F01.+Onboarding%2F02.+Registration%2F04.+Company+Role+%26+Consent.md'
        }
      />
    </>
  )
}
