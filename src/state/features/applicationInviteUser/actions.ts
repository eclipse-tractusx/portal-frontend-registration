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

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { InviteNewUser } from './types'

const setUserToInvite = createAction<InviteNewUser>(
  'registration/application/user/setUserToInvite'
)

const fetchRolesComposite = createAsyncThunk(
  'registration/application/user/fetchRoles',
  async () => {
    try {
      return await Api.getInstance().getRolesComposite()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Unable to load roles. Please contact the administrator.')
    }
  }
)

const fetchInvited = createAsyncThunk(
  'registration/application/user/fetchInvited',
  async (applicationId: string) => {
    try {
      return await Api.getInstance().getInvitedUsers(applicationId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(
        'Application ID not existing. Please contact the administrator.'
      )
    }
  }
)

const sendInvite = createAsyncThunk(
  'registration/application/user/sendInvite',
  async ({
    applicationId,
    user,
  }: {
    applicationId: string
    user: InviteNewUser
  }) => {
    try {
      return await Api.getInstance().postInviteNewUser(applicationId, user)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Invite new user failed. Please contact the administrator.')
    }
  }
)

export { setUserToInvite, fetchRolesComposite, fetchInvited, sendInvite }
