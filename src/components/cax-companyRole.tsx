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

import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import RolesError from './rolesError'
import { connect, useDispatch, useSelector } from 'react-redux'
import { IState } from '../state/features/user/redux.store.types'
import { addCurrentStep } from '../state/features/user/action'
import { withRouter } from 'react-router-dom'
import { Dispatch } from 'redux'
import {
  fetchAgreementData,
  fetchAgreementConsents,
  updateAgreementConsents,
} from '../state/features/applicationCompanyRole/actions'
import { applicationSelector } from '../state/features/application/slice'
import { stateSelector } from '../state/features/applicationCompanyRole/slice'
import '../styles/newApp.css'
import { companyRole } from '../state/features/applicationCompanyRole/types'

interface CompanyRoleProps {
  currentActiveStep: number
  addCurrentStep: (step: number) => void
}

export const CompanyRoleCax = ({
  currentActiveStep,
  addCurrentStep,
}: CompanyRoleProps) => {
  const { t, i18n } = useTranslation()

  const { status } = useSelector(applicationSelector)
  const { allConsentData, consentData, error } = useSelector(stateSelector)
  const [companyRoleChecked, setCompanyRoleChecked] = useState({})
  const [agreementChecked, setAgreementChecked] = useState({})

  const obj = status[status.length - 1]
  const applicationId = obj['applicationId']

  const dispatch = useDispatch()

  const updateSelectedRolesAndAgreement = () => {
    setCompanyRoleChecked(
      consentData.companyRoles.reduce((prev, next) => {
        return { ...prev, [next]: true }
      }, {})
    )

    setAgreementChecked(
      consentData.agreements.reduce((prev, next) => {
        return { ...prev, [next.agreementId]: true }
      }, {})
    )
  }

  useEffect(() => {
    dispatch(fetchAgreementData())
    dispatch(fetchAgreementConsents(applicationId))
  }, [dispatch])

  useEffect(() => {
    updateSelectedRolesAndAgreement()
  }, [consentData])

  const backClick = () => {
    addCurrentStep(currentActiveStep - 1)
  }

  const nextClick = () => {
    const companyRoles = Object.keys(companyRoleChecked).filter(
      (item) => companyRoleChecked[item]
    )
    const agreements = Object.keys(agreementChecked).map((agreementId) => {
      return {
        agreementId: agreementId,
        consentStatus:
          agreementChecked[agreementId] === true ? 'ACTIVE' : 'INACTIVE',
      }
    })

    const data = {
      companyRoles: companyRoles,
      agreements: agreements,
    }

    dispatch(updateAgreementConsents({ applicationId, data }))
    addCurrentStep(currentActiveStep + 1)
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
      const companyRoleIndex = allConsentData.companyRoles.findIndex(
        (item) => item.companyRole === id
      )

      const updatedAgreementIds = allConsentData.companyRoles[
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

  const retry = () => {
    dispatch(fetchAgreementData())
    dispatch(fetchAgreementConsents(applicationId))
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
                checked={agreementChecked[id]}
              />
              {allConsentData.agreements.map((agreement) => {
                if (agreement.agreementId == id)
                  return (
                    <p className="agreement-text">
                      {t('companyRole.TermsAndCondSpan1')}{' '}
                      <span>{agreement.name}</span>{' '}
                      {t('companyRole.TermsAndCondSpan3')}
                    </p>
                  )
              })}
            </li>
          ))}
        </ul>
      </div>
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
          {error ? (
            <RolesError retry={retry} />
          ) : (
            allConsentData.companyRoles.map((role, index) => (
              <div className="company-role-section" key={index}>
                <Row>
                  <div className="col-1">
                    <input
                      type="checkbox"
                      name={role.companyRole}
                      className="regular-checkbox"
                      onChange={() => handleCompanyRoleCheck(role.companyRole)}
                      checked={companyRoleChecked[role.companyRole]}
                    />
                  </div>
                  <div className="col-11">
                    <h6>{t(`companyRole.${role.companyRole}`)}</h6>
                    <p>{role.descriptions[i18n.language]}</p>
                    {companyRoleChecked[role.companyRole] &&
                      renderTermsSection(role)}
                  </div>
                </Row>
              </div>
            ))
          )}
        </div>
      </div>
      <FooterButton
        labelBack={t('button.back')}
        labelNext={t('button.confirm')}
        handleBackClick={() => backClick()}
        handleNextClick={() => nextClick()}
      />
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addCurrentStep: (step: number) => {
    dispatch(addCurrentStep(step))
  },
})

export default withRouter(
  connect(
    (state: IState) => ({
      currentActiveStep: state.user.currentStep,
    }),
    mapDispatchToProps
  )(CompanyRoleCax)
)
