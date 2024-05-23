/********************************************************************************
 * Copyright (c) 2022 BMW Group AG
 * Copyright (c) 2022 Contributors to the Eclipse Foundation
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

import { type RequestState } from '../../../types/MainTypes'

export type InviteNewUser = {
  userName?: string
  firstName?: string
  lastName?: string
  email: string
  roles: string[]
  message: string
}

export type InvitedUser = {
  invitationStatus: string
  emailId: string
  invitedUserRoles: Array<string>
}

export type InviteUserState = {
  roles: string[]
  invitedUsers: InvitedUser[]
  newUser: InviteNewUser | null
  request: RequestState
  sendRequest: RequestState
  error: string
}

export const InitialInvitedUser = {
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  roles: [],
  message: '',
}
