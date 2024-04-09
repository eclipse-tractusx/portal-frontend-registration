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
import { withRouter, useHistory } from 'react-router-dom'
import '../styles/newApp.css'
import { handleStatusRedirect } from '../helpers/utils'
import { ErrorPage } from './ErrorPage'
import { useFetchApplicationsQuery } from '../state/features/application/applicationApiSlice'

export const InitialLoader = () => {
  const history = useHistory()

  const { data: status, error } = useFetchApplicationsQuery()

  useEffect(() => {
    status &&
      status.length > 0 &&
      handleStatusRedirect(
        status[0].applicationStatus,
        status[0].applicationType,
        history
      )
  }, [status])

  return error ? <ErrorPage /> : <div className="initial-loader"></div>
}
export default withRouter(InitialLoader)
