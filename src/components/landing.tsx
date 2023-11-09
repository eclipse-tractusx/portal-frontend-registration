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
import { useTranslation } from 'react-i18next'
import { withRouter, useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Footer from './footer'
import BulletList from './bulletList'
import Header from './cax-header'
import Button from './button'
import {
  fetchId,
  updateStatus,
  updateInvitation,
} from '../state/features/application/actions'
import { applicationSelector } from '../state/features/application/slice'
import { ADD_COMPANY_DATA, CREATED } from '../state/features/application/types'

export const Landing = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()

  const { status, error } = useSelector(applicationSelector)

  if (error) {
    toast.error(error)
  }

  useEffect(() => {
    dispatch(updateInvitation())
    dispatch(fetchId())
  }, [dispatch])

  const onClick = () => {
    const obj = status.find((o) => o['applicationStatus'] === CREATED)
    if (obj) {
      const statusData = { id: obj['applicationId'], status: ADD_COMPANY_DATA }
      dispatch(updateStatus(statusData))
    }
    history.push('/form')
  }

  return (
    <Container>
      <Header />
      <Row>
        <Col>
          <div className="mx-auto col-9 container-body">
            <h4>{t('landing.greetingMsg')}</h4>
            <h6 className="col-8">{t('landing.heading1')}</h6>
            <Row className="content">
              <Col>
                <BulletList text={t('landing.point1')} />
                <BulletList text={t('landing.point2')} />
                <BulletList text={t('landing.point3')} />
                <Button
                  label={t('landing.buttonText1')}
                  styleClass="button btn-primaryCax"
                  handleClick={() => onClick()}
                />
              </Col>
              <Col className="d-flex align-items-center justify-content-center">
                <img src="/registration/ID_Card.png" alt="" />
              </Col>
            </Row>
          </div>
          <div className="mx-auto col-9 d-flex align-items-center justify-content-center info small-info">
            <span className="">
              {t('landing.footerText1')}{' '}
              <a href={window.location.pathname.replace(window.location.pathname, '/documentation/?path=docs%2F01.+Onboarding%2F02.+Registration')}
                target="_blank" rel='noreferrer'> {t('landing.footerText2')}.</a>
            </span>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  )
}
export default withRouter(Landing)
