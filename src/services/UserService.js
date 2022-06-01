import { getCentralIdp } from './EnvironmentService'
import Keycloak from 'keycloak-js'

const searchParams = new URLSearchParams(window.location.search)
let realm = searchParams.get('company')
if (!realm) {
  realm = localStorage.getItem('company')
}
if (!realm) {
  realm = 'CX-Central'
}
localStorage.setItem('company', realm)

const searchParamsClientId = new URLSearchParams(window.location.search)
let clientId = searchParamsClientId.get('clientId')
if (!clientId) {
  clientId = localStorage.getItem('clientId')
}
if (!clientId || clientId === 'null') {
  clientId = 'Cl1-CX-Registration'
}
localStorage.setItem('clientId', clientId)

const CX_CLIENT = 'Cl1-CX-Registration'

const _kc = new Keycloak({
  url: getCentralIdp(),
  realm: realm,
  clientId: clientId,
  'ssl-required': 'external',
  'public-client': true,
})

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _kc
    .init({
      onLoad: 'login-required',
      silentCheckSsoRedirectUri:
        window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
    })
    .then((authenticated) => {
      onAuthenticatedCallback()
    })
}

const doLogin = _kc.login

const doLogout = _kc.logout

//forward as header "authentication: Bearer ${getToken()}"
const getToken = () => _kc.token

const getParsedToken = () => _kc.tokenParsed

const isLoggedIn = () => !!_kc.token

const updateToken = (successCallback) =>
  _kc.updateToken(5).then(successCallback).catch(doLogin)


const getUsername = () => `${_kc.tokenParsed?.given_name} ${_kc.tokenParsed?.family_name}`
const getTenant = () => _kc.tokenParsed?.tenant

const getInitials = () =>
  _kc.tokenParsed?.preferred_username
    .split(/[.@]/)
    .reduce((a, b) => a + b[0], '')
    .substring(0, 2)
    .toUpperCase()

const getDomain = () => realm

const getRoles = () => _kc.tokenParsed?.resource_access[CX_CLIENT]?.roles

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
