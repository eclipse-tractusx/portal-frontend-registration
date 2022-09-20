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

import * as React from 'react'
import { useEffect } from 'react'
import { createBrowserHistory } from 'history'
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import './styles/newApp.css'
import './styles/dropzone.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import Landing from './components/landing'
import RegistrationCax from './components/cax-registration'
import Finish from './components/finish'
import Authinfo from './components/authinfo'
import ProtectedRoute from './helpers/authorisation/ProtectedRoute'
import UnauthorisedPage from './components/unauthorised'
import Help from './components/help'
import Contact from './components/contact'
import Imprint from './components/imprint'
import Privacy from './components/privacy'
import TermsOfService from './components/termsOfService'
import CookiePolicy from './components/cookiePolicy'
import ThirdPartyLicenseNotes from './components/thirdPartyLicenseNotes'
import RegistrationClosed from './components/registrationClosed'

createBrowserHistory()

const App = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <BrowserRouter basename="/registration">
      <Switch>
        <Redirect path="/" exact to="/landing" />
        <ProtectedRoute
          path="/landing"
          rolesAllowedForTheRoute={['view_registration']}
          component={(props) => <Landing {...props} />}
        />
        <ProtectedRoute
          path="/form"
          rolesAllowedForTheRoute={['view_registration']}
          component={(props) => <RegistrationCax {...props} />}
        />
        <ProtectedRoute
          path="/finish"
          rolesAllowedForTheRoute={['view_registration']}
          component={(props) => <Finish {...props} />}
        />
        <Route path="/authinfo" component={() => <Authinfo />} />
        <Route path="/403" component={() => <UnauthorisedPage />} />
        <Route path="/help" component={() => <Help />} />
        <Route path="/contact" component={() => <Contact />} />
        <Route path="/imprint" component={() => <Imprint />} />
        <Route path="/privacy" component={() => <Privacy />} />
        <Route path="/termsOfService" component={() => <TermsOfService />} />
        <Route path="/cookiePolicy" component={() => <CookiePolicy />} />
        <Route
          path="/thirdPartyLicenseNotes"
          component={() => <ThirdPartyLicenseNotes />}
        />
        <Route
          path="/registration-closed"
          component={() => <RegistrationClosed />}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App
