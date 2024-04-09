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
import { createBrowserHistory } from 'history'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import './styles/newApp.css'
import './styles/dropzone.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import Landing from './components/landing'
import InitialLoader from './components/initial-loader'
import { RegistrationCax } from './components/cax-registration'
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
import About from './components/about'

createBrowserHistory()

const App = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <BrowserRouter basename="/registration">
      <Routes>
        <ProtectedRoute
          path="/load"
          rolesAllowedForTheRoute={['view_registration']}
          component={() => <InitialLoader />}
        />
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
        <Route path="/authinfo" children={<Authinfo />} />
        <Route path="/403" children={<UnauthorisedPage />} />
        <Route path="/help" children={<Help />} />
        <Route path="/contact" children={<Contact />} />
        <Route path="/imprint" children={<Imprint />} />
        <Route path="/privacy" children={<Privacy />} />
        <Route path="/termsOfService" children={<TermsOfService />} />
        <Route path="/cookiePolicy" children={<CookiePolicy />} />
        <Route path="/about" children={<About />} />
        <Route path="/" children={<Navigate replace to="/load" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
