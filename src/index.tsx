import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import UserService from './helpers/UserService'
import { BrowserRouter } from 'react-router-dom'

UserService.initKeycloak(() => {
  const rootDiv = document.getElementById('root') as HTMLElement
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    rootDiv
  )
})

reportWebVitals()
