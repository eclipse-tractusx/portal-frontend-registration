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

import { Row, Navbar, Nav, Container } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <Row>
      <div className="footer-container flex-column d-flex align-items-center justify-content-center">
        <div>
          <Navbar collapseOnSelect expand="lg">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/help">
                    {t('FooterLink.link1')}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/contact">
                    {t('FooterLink.link2')}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/imprint">
                    {t('FooterLink.link3')}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/privacy">
                    {t('FooterLink.link4')}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/termsOfService">
                    {t('FooterLink.link5')}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cookiePolicy">
                    {t('FooterLink.link6')}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/thirdPartyLicenseNotes">
                    {t('FooterLink.link7')}
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div>{t('FooterLink.copyright')}</div>
      </div>
    </Row>
  )
}

export default withRouter(Footer)
