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
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchId } from '../state/features/application/actions'
import { applicationSelector } from '../state/features/application/slice'
import {
  CREATED,
  ADD_COMPANY_DATA,
  INVITE_USER,
  SELECT_COMPANY_RESP,
  UPLOAD_DOCUMENTS,
  VERIFY,
  SUBMITTED,
  CONFIRMED,
  DECLINED,
} from '../state/features/application/types'
import '../styles/newApp.css'

export const InitialLoader = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { status, error } = useSelector(applicationSelector)

  if (error) {
    toast.error(error)
  }

  useEffect(() => {
    if (status && status.length) {
      if (
        status[0] &&
        (status[0]['applicationStatus'] === CREATED ||
          status[0]['applicationStatus'] === ADD_COMPANY_DATA ||
          status[0]['applicationStatus'] === INVITE_USER ||
          status[0]['applicationStatus'] === SELECT_COMPANY_RESP ||
          status[0]['applicationStatus'] === UPLOAD_DOCUMENTS ||
          status[0]['applicationStatus'] === VERIFY)
      ) {
        history.push('/landing')
      }else if (
        status[0] &&
        (status[0]['applicationStatus'] === SUBMITTED)
      ){
        history.push('/registration-validate')
      } else if (
        status[0] &&
        (status[0]['applicationStatus'] === CONFIRMED)
      ){
        history.push('/home')
      }else if (
        status[0] &&
        (status[0]['applicationStatus'] === DECLINED)
      ){
        history.push('/registration-closed')
      }
    }
  }, [status])

  useEffect(() => {
    dispatch(fetchId())
  }, [dispatch])

  return <div className="initial-loader"></div>
}
export default withRouter(InitialLoader)
