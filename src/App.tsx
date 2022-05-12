import * as React from 'react'
import { useEffect } from 'react'
import { createBrowserHistory } from 'history'
import {
  BrowserRouter,
  Redirect,
  Route,
  Router,
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
import { Provider } from 'react-redux'
import store from './stores/store'
import Authinfo from './components/authinfo'
import ProtectedRoute from './helpers/authorisation/ProtectedRoute'
import UnauthorisedPage from './components/unauthorised'

const history = createBrowserHistory()

const App = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Provider store={store}>
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
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
