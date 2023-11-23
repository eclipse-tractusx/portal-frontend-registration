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

import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Footer from './footer'
import Header from './cax-header'
import ReactTooltip from 'react-tooltip'
import { useDispatch, useSelector, connect } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css'
import CompanyDataCax from './cax-companyData'
import ResponsibilitiesCax from './cax-responsibilities'
import DragDropUploadFiles from './dragdrop'
import CompanyRoleCax from './cax-companyRole'
import { IState } from '../state/features/user/redux.store.types'
import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import Stepper from './stepper'
import VerifyRegistration from './verifyRegistration'
import { applicationSelector } from '../state/features/application/slice'
import {
  fetchId,
  updateInvitation,
} from '../state/features/application/actions'
interface RegistrationCaxProps {
  currentActiveStep: number
}

export const RegistrationCax = ({
  currentActiveStep,
}: RegistrationCaxProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { status, error } = useSelector(applicationSelector)

  if (error) {
    toast.error(error)
  }

  useEffect(() => {
    if (status.length <= 0) {
      dispatch(updateInvitation())
      dispatch(fetchId())
    }
  }, [dispatch])

  return (
    <Container>
      <Header />
      <Row>
        {status && status[0] && (
          <Col>
            <div className="mx-auto col-9 registration-header">
              <h4>{t('registration.registration')}</h4>
              <div>{t('registration.regiStep')}.</div>
              <div>{t('registration.regiSubHeading')}</div>
            </div>
            <Stepper></Stepper>
            {currentActiveStep === 1 ? (
              <CompanyDataCax />
            ) : currentActiveStep === 2 ? (
              <ResponsibilitiesCax />
            ) : currentActiveStep === 3 ? (
              <CompanyRoleCax />
            ) : currentActiveStep === 4 ? (
              <DragDropUploadFiles />
            ) : (
              <VerifyRegistration />
            )}
          </Col>
        )}
      </Row>
      <Footer />
      <ReactTooltip />
    </Container>
  )
}

export default withRouter(
  connect((state: IState) => ({
    currentActiveStep: state.user.currentStep,
  }))(RegistrationCax)
)
