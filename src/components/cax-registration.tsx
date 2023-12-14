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
import { Header } from './cax-header'
import ReactTooltip from 'react-tooltip'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css'
import { CompanyDataCax } from './cax-companyData'
import { ResponsibilitiesCax } from './cax-responsibilities'
import { DragDrop } from './dragdrop'
import { CompanyRoleCax } from './cax-companyRole'
import { useTranslation } from 'react-i18next'
import { Stepper } from './stepper'
import { VerifyRegistration } from './verifyRegistration'
import {
  useFetchApplicationsQuery,
  useUpdateInvitationMutation,
} from '../state/features/application/applicationApiSlice'
import { getCurrentStep } from '../state/features/user/userApiSlice'

export const RegistrationCax = () => {
  const { t } = useTranslation()
  const currentActiveStep = useSelector(getCurrentStep)
  const { data: status, error: statusError } = useFetchApplicationsQuery()
  const [updateInvitation] = useUpdateInvitationMutation()

  if (statusError) {
    toast.error(t('registration.statusApplicationError'))
  }

  useEffect(() => {
    if (status.length <= 0) {
      updateInvitation()
    }
  }, [])

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
              <DragDrop />
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
