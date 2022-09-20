/********************************************************************************
 * Copyright (c) 2021,2022 Microsoft and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { withRouter, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const FooterHeadline = () => {
  const { t } = useTranslation()

  return (
    <div className="col12 d-flex align-items-center justify-content-center">
      {t('FooterContent.Footer1')} {t('FooterContent.Footer2')} &nbsp;
      <Link to="/help"> {t('FooterContent.FooterLink')}</Link>
      {t('FooterContent.Footer3')}
    </div>
  )
}
export default withRouter(FooterHeadline)
