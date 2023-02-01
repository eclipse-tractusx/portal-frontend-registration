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

import Button from './button'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import Footer from './footer'
import Header from './cax-header'
import SearchInput from 'react-search-input'
import { useRef, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Help = () => {
  const { t } = useTranslation('help', { keyPrefix: 'help' })
  const history = useHistory()
  const [search, setSearch] = useState('')

  const headerRef = useRef(null)
  const generalRef = useRef(null)
  const invitePeopleRef = useRef(null)
  const uploadDocumentsRef = useRef(null)
  const registrationWorkflowRef = useRef(null)
  const userAccountRef = useRef(null)
  const sectionRefs = [
    { section: 'general', ref: generalRef },
    { section: 'invitePeople', ref: invitePeopleRef },
    { section: 'uploadDocuments', ref: uploadDocumentsRef },
    { section: 'registrationWorkflow', ref: registrationWorkflowRef },
    { section: 'userAccount', ref: userAccountRef },
  ]
  const [visibleSection, setVisibleSection] = useState(sectionRefs[0].section)

  const onSearchChange = (value: string) => {
    setSearch(value)
  }

  const scrollTo = (e: any) => {
    e.current.scrollIntoView({
      behavior: 'smooth',
    })
    setVisibleSection(e.current.id)
  }

  return (
    <Container>
      <Header />
      <Row>
        <div className="mx-auto col-10">
          <h4 className="text-center">{t('title')}</h4>
          <p>{t('helpText1')}.</p>
          <div>{t('helpText2')}</div>
        </div>
      </Row>
      <Row className="mx-auto col-6">
        <SearchInput
          className="input-search"
          value={search}
          onChange={(value) => onSearchChange(value)}
        />
      </Row>
      <Row>
        <Col>
          <div className="mx-auto col-10 container-body help-section">
            <Row>
              <div className="col-sm-3 sticky-top">
                <Nav>
                  <div ref={headerRef}>
                    {sectionRefs.map((item, index) => {
                      return (
                        <Nav.Link
                          key={index}
                          className={`${
                            visibleSection === item.section ? 'selected' : ''
                          } help-menu`}
                          onClick={() => scrollTo(item.ref)}
                        >
                          {t(`helpLink.link${index + 1}`)}
                        </Nav.Link>
                      )
                    })}
                  </div>
                </Nav>
              </div>

              <div className="col-sm-9 offset-sm-3 data-section">
                <div className="navContainer">
                  {sectionRefs.map((item, index) => {
                    return (
                      <div key={index} id={item.section} ref={item.ref}>
                        <div>{t(`${item.section}.questionHeadline`)}</div>
                        <div>{t(`${item.section}.question`)}</div>
                        <div className="answer">
                          {t(`${item.section}.answer`)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
      <div className="button-section col-10 mx-auto">
        <Button
          label={t('footerPages.Back')}
          styleClass="button btn-primaryCax"
          handleClick={() => history.goBack()}
        />
      </div>
      <Footer />
    </Container>
  )
}

export default withRouter(Help)
