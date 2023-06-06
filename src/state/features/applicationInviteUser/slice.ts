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

import { createSlice } from '@reduxjs/toolkit'
import { RequestState } from '../../../types/MainTypes'
import { RootState } from '../../store'
import { fetchInvited, fetchRolesComposite, sendInvite } from './actions'
import { InviteUserState, InitialInvitedUser } from './types'

const initialState: InviteUserState = {
  roles: [],
  invitedUsers: [],
  newUser: InitialInvitedUser,
  request: RequestState.NONE,
  sendRequest: RequestState.NONE,
  error: null,
}

const inviteSlice = createSlice({
  name: 'registration/application/user',
  initialState,
  reducers: {
    setUserToInvite: (state, action) => ({
      ...state,
      newUser: action.payload,
    }),
  },
  extraReducers: (builder) => {
    // fetch roles
    builder.addCase(fetchRolesComposite.pending, (state) => ({
      ...state,
      roles: [],
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchRolesComposite.fulfilled, (state, { payload }) => ({
      ...state,
      roles: payload || [],
      request: RequestState.OK,
      sendRequest: RequestState.NONE,
      error: '',
    }))
    builder.addCase(fetchRolesComposite.rejected, (state, action) => ({
      ...state,
      roles: [],
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))

    // fetch invited
    builder.addCase(fetchInvited.pending, (state) => ({
      ...state,
      invitedUsers: [],
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchInvited.fulfilled, (state, { payload }) => ({
      ...state,
      invitedUsers: payload || [],
      request: RequestState.OK,
      sendRequest: RequestState.NONE,
      error: '',
    }))
    builder.addCase(fetchInvited.rejected, (state, action) => ({
      ...state,
      invitedUsers: [],
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
    // invite new
    builder.addCase(sendInvite.pending, (state) => ({
      ...state,
      sendRequest: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(sendInvite.fulfilled, (state) => ({
      ...state,
      invitedUsers: [
        ...state.invitedUsers,
        {
          invitationStatus: 'PENDING',
          emailId: state.newUser.email,
          invitedUserRoles: state.newUser.roles,
        },
      ],
      newUser: null,
      sendRequest: RequestState.OK,
      error: '',
    }))
    builder.addCase(sendInvite.rejected, (state, action) => ({
      ...state,
      sendRequest: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): InviteUserState => state.invite

export const rolesSelector = (state: RootState): string[] => state.invite.roles

export default inviteSlice
