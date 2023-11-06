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

import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { withRouter, Link } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { BsCheck2Circle, BsArrowCounterclockwise } from 'react-icons/bs'
import Header from './cax-header'
import Footer from './footer'

export const Finish = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Header />
      <Row>
        <Col>
          <div className="mx-auto col-9 container-body">
            <h4 className="col-10">{t('finish.congratulationsMsg')}</h4>
            <h4 className="col-10 mb-60">{t('finish.greetingMsg')}</h4>
            <h6 className="col-8">{t('finish.heading1')}</h6>
            <Row className="content">
              <Col>
              {[
                {
                  "icon": AiOutlineMail,
                  "text": t('finish.point1')
                },
                {
                  "icon": BsCheck2Circle,
                  "text": t('finish.point2')
                },
                {
                  "icon": BsArrowCounterclockwise,
                  "text": t('finish.point3')
                }
              ].map(item => (
                <div className="content-items" key={item.text}>
                  <div className="row">
                    <div className="col-1">
                      <item.icon className='icons-bullets' />
                    </div>
                    <div className="col-11 bullet-points">
                      { item.text }
                    </div>
                  </div>
                </div>
              ))
              }
              </Col>
              <Col className="d-flex align-items-center justify-content-center">
                <img src="/registration/mail.png" alt="" />
              </Col>
            </Row>
          </div>
          <div className="mx-auto col-9 d-flex align-items-center justify-content-center info small-info">
            <span className="">
              {t('landing.footerText1')}{' '}
              <a href={window.location.pathname.replace(window.location.pathname, '/documentation/?path=docs%2F01.+Onboarding%2F02.+Registration%2F07.+FAQ.md#what-will-happen-after-the-registration')}
                target="_blank" rel='noreferrer'> {t('landing.footerText2')}.</a>
            </span>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  )
}
export default withRouter(Finish)
