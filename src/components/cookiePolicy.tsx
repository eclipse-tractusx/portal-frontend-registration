/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
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

import Button from './button'
import { Container, Row, Col } from 'react-bootstrap'
import Footer from './footer'
import Header from './cax-header'
import { useHistory, withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const CookiePolicy = () => {
  const { t } = useTranslation()
  const history = useHistory()

  return (
    <Container>
      <Header />
      <Row className="footer-content">
        <Col>
          <div className="mx-auto col-10">
            <h4>{t('cookiePolicy.title')}</h4>
            <p>{t('cookiePolicy.cookiePolicyText1')}.</p>
            <div>{t('cookiePolicy.cookiePolicyText2')}</div>
            <div className="button-section">
              <Button
                label={t('footerPages.Back')}
                styleClass="button btn-primaryCax"
                handleClick={() => history.goBack()}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  )
}

export default withRouter(CookiePolicy)
