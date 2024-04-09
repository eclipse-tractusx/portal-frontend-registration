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

import {
  getCentralIdp,
  getClientIdRegistration,
  getRealm,
} from './EnvironmentService'
import Keycloak from 'keycloak-js'

const searchParams = new URLSearchParams(window.location.search)
let realm = searchParams.get('company')
if (!realm) {
  realm = localStorage.getItem('company')
}
if (!realm) {
  realm = getRealm()
}
localStorage.setItem('company', realm)

const searchParamsClientId = new URLSearchParams(window.location.search)
let clientId = searchParamsClientId.get('clientId')
if (!clientId) {
  clientId = localStorage.getItem('clientId') ?? ''
}
if (!clientId || clientId === 'null') {
  clientId = getClientIdRegistration() ?? ''
}
localStorage.setItem('clientId', clientId)

const _kc = new Keycloak({
  url: getCentralIdp(),
  realm,
  clientId,
  'ssl-required': 'external',
  'public-client': true,
})

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  const url =
    window.location.pathname === '/registration/help'
      ? '/registration/help'
      : '/registration/load'
  _kc
    .init({
      onLoad: 'login-required',
      silentCheckSsoRedirectUri:
        window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
      redirectUri: `${window.location.origin}/${url}`,
    })
    .then(() => {
      onAuthenticatedCallback()
    })
}

const doLogin = _kc.login

const doLogout = _kc.logout

// forward as header "authentication: Bearer ${getToken()}"
const getToken = () => _kc.token

const getParsedToken = () => _kc.tokenParsed

const isLoggedIn = () => !!_kc.token

const updateToken = async (successCallback) =>
  await _kc.updateToken(5).then(successCallback).catch(doLogin)

const getUsername = () =>
  `${_kc.tokenParsed?.given_name} ${_kc.tokenParsed?.family_name}`
const getTenant = () => _kc.tokenParsed?.tenant

const getInitials = () =>
  _kc.tokenParsed?.preferred_username
    .split(/[.@]/)
    .reduce((a, b) => a + b[0], '')
    .substring(0, 2)
    .toUpperCase()

const getDomain = () => realm

const getRoles = () =>
  _kc.tokenParsed?.resource_access[getClientIdRegistration()]?.roles

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role))

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getParsedToken,
  updateToken,
  getUsername,
  getInitials,
  getDomain,
  hasRole,
  realm,
  clientId,
  getTenant,
  getRoles,
}

export default UserService
