/********************************************************************************
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

import { useTranslation } from 'react-i18next'
import { AboutCard } from './AboutCard'
import legalJson from '../notice/legal-notice.json'
import Footer from './footer'
import Header from './cax-header'
import { Container, Row, Col } from 'react-bootstrap'
import { Box } from '@mui/material'
import { withRouter } from 'react-router-dom'

export const About = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Header />
      <Row className="footer-content">
        <Col>
          <Box
            sx={{
              maxWidth: '800px',
              margin: 'auto',
              paddingBottom: '100px',
            }}
          >
            <div className="mx-auto col-10">
              <h4>{t('about.title')}</h4>
              <AboutCard {...legalJson} />
            </div>
          </Box>
        </Col>
      </Row>
      <Footer />
    </Container>
  )
}

export default withRouter(About)

