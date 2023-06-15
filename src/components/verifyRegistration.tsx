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

import { Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import { connect, useDispatch, useSelector } from 'react-redux'
import { IState } from '../state/features/user/redux.store.types'
import { addCurrentStep } from '../state/features/user/action'
import { useHistory, withRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Dispatch } from 'redux'
import { ToastContainer, toast } from 'react-toastify'
import {
  fetchRegistrationData,
  saveRegistration,
} from '../state/features/applicationVerifyRegister/actions'
import { applicationSelector } from '../state/features/application/slice'
import { registrationErrorSelector, registrationSuccessSelector, stateSelector } from '../state/features/applicationVerifyRegister/slice'
import { stateSelector as documentSelector } from '../state/features/applicationDocuments/slice'

interface VerifyRegistrationProps {
  currentActiveStep: number
  addCurrentStep: (step: number) => void
}

export const VerifyRegistration = ({
  currentActiveStep,
  addCurrentStep,
}: VerifyRegistrationProps) => {
  const { t } = useTranslation()
  const history = useHistory()

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [confirmState, setConfirmState] = useState(false)

  const { status, error } = useSelector(applicationSelector)
  const { registrationData } = useSelector(stateSelector)
  const registrationSuccess = useSelector(registrationSuccessSelector)
  const registrationError = useSelector(registrationErrorSelector)
  const { documents } = useSelector(documentSelector)

  if (confirmState && registrationSuccess) history.push('/finish')

  useEffect(() => {
    if(confirmState && registrationError){
      setLoading(false)
      toast.error(t('verifyRegistration.submitErrorMessage'))
    }
  }, [registrationError])

  const obj = status[status.length - 1]
  const applicationId = obj['applicationId']
  if (error) {
    toast.error(error)
  }

  useEffect(() => {
    dispatch(fetchRegistrationData(applicationId))
  }, [dispatch])

  const backClick = () => {
    addCurrentStep(currentActiveStep - 1)
  }

  const nextClick = () => {
    if (loading) return
    setLoading(true)
    setConfirmState(true)
    dispatch(saveRegistration(applicationId))
  }

  const getTooltip = () => {
    if (!hasRoles()) {
      return t('ErrorMessage.error2')
    }
    if (!hasDocuments()) {
      return t('ErrorMessage.error3')
    }
    return null
  }

  const hasRoles = () => {
    return true
  }
  const hasDocuments = () => {
    return documents && documents.length > 0 ? true : false
  }

  return (
    <>
      <div className="mx-auto col-9 container-registration">
        <div className="head-section">
          <div className="mx-auto step-highlight d-flex align-items-center justify-content-center">
            5
          </div>
          <h4 className="mx-auto d-flex align-items-center justify-content-center">
            {t('verifyRegistration.title')}
          </h4>
          <div className="mx-auto text-center col-9">
            {t('verifyRegistration.subtitle')}
          </div>
        </div>
        <div className="companydata-form mx-auto col-9">
          <Row>
            <ul className="list-group-cax px-2">
              <li className="list-group-item-cax list-header">
                <Row>
                  <span className="col-11">
                    {t('verifyRegistration.heading1')}
                  </span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">{t('verifyRegistration.bpn')}</span>
                  <span className="col-6">{registrationData?.bpn}</span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">
                    {t('verifyRegistration.legalEntity')}
                  </span>
                  <span className="col-6">{registrationData?.name}</span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">
                    {t('verifyRegistration.registeredName')}
                  </span>
                  <span className="col-6">{registrationData?.name}</span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">
                    {t('verifyRegistration.street')}
                  </span>
                  <span className="col-6">
                    {registrationData?.streetName}{' '}
                    {registrationData?.streetNumber}
                  </span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">{t('verifyRegistration.city')}</span>
                  <span className="col-6">
                    {registrationData?.zipCode} {registrationData?.city}
                  </span>
                </Row>
              </li>
              {
                registrationData?.region &&
                <li className="list-group-item-cax">
                  <Row>
                    <span className="col-6">{t('verifyRegistration.region')}</span>
                    <span className="col-6">
                      {registrationData?.region}
                    </span>
                  </Row>
                </li>
              }
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">
                    {t('verifyRegistration.country')}
                  </span>
                  <span className="col-6">{registrationData?.countryAlpha2Code}</span>
                </Row>
              </li>
              {
                registrationData?.uniqueIds.map((identifier) =>
                  <li className="list-group-item-cax" key={identifier.type}>
                    <Row>
                      <span className="col-6">
                        {t(`registrationStepOne.identifierTypes.${identifier.type}`)}
                      </span>
                      <span className="col-6">{identifier.value}</span>
                    </Row>
                  </li>
                )
              }
            </ul>
          </Row>
          <Row>
            <ul className="list-group-cax px-2">
              <li className="list-group-item-cax list-header">
                <Row>
                  <span className="col-11">
                    {t('verifyRegistration.ActiveRole')}
                  </span>
                </Row>
              </li>
              {registrationData.companyRoles.map((role, index) => (
                <li key={index} className="list-group-item-cax">
                  <Row>
                    <span className="col-12">{role}</span>
                  </Row>
                </li>
              ))}
            </ul>
          </Row>
          <Row>
            <ul className="list-group-cax px-2">
              <li className="list-group-item-cax list-header">
                <Row>
                  <span className="col-11">
                    {t('verifyRegistration.UploadedCertificates')}
                  </span>
                </Row>
              </li>
              {registrationData.documents.map((file, index) => {
                return (
                  <li key={index} className="list-group-item-cax">
                    <Row>
                      <span className="col-12">{file.documentName}</span>
                    </Row>
                  </li>
                )
              })}
            </ul>
          </Row>
        </div>
        <ToastContainer />
      </div>

      <FooterButton
        labelBack={t('button.back')}
        labelNext={loading ? t('button.submitting') : t('button.submit')}
        loading={loading}
        handleBackClick={() => backClick()}
        handleNextClick={() => nextClick()}
        tooltip={getTooltip()}
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
  )(VerifyRegistration)
)
