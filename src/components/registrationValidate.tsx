/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import Footer from './footer'
import Header from './cax-header'
import Button from './button'
import UserService from '../services/UserService'

export const RegistrationValidate = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Header />
      <Row>
        <Col>
          <div className="mx-auto container-body registration-close-content">
            <h6 className="mb-4">{t('registrationValidation.heading1')}</h6>
            <h6>{t('registrationValidation.heading2')}</h6>
            <Row className="content">
              <Col>
                <Button
                  label={t('registrationValidation.close')}
                  styleClass="button btn-primaryCax"
                  handleClick={() => UserService.doLogout()}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  )
}
export default withRouter(RegistrationValidate)
