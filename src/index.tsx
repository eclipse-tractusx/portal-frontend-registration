import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import UserService from './services/UserService'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/store'

UserService.initKeycloak(() => {
  const rootDiv = document.getElementById('root') as HTMLElement
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    rootDiv
  )
})

reportWebVitals()
