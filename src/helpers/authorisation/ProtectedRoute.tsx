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

import { Redirect, Route } from 'react-router-dom'
import UserService from '../../services/UserService'

export const isRoleAllowed = (userRoles, rolesAllowedForTheRoute) => {
  return rolesAllowedForTheRoute.some((allowed) => userRoles.includes(allowed))
}

const ProtectedRoute = (props) => {
  const userRoles = UserService.getRoles()
  const { component: Component, rolesAllowedForTheRoute } = props

  return (
    <Route
      render={(props) => {
        return userRoles &&
          isRoleAllowed(userRoles, rolesAllowedForTheRoute) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/403',
            }}
          />
        )
      }}
    />
  )
}

export default ProtectedRoute
