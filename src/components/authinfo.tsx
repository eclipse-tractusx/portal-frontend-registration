import * as React from 'react'
import UserService from '../helpers/UserService'
import '../styles/authinfo.css'

class Authinfo extends React.Component {
  public render() {
    return (
      <div>
        <pre>JWT Token - {UserService.getParsedToken().name}</pre>
        <pre>{JSON.stringify(UserService.getParsedToken(), null, 4)}</pre>
        <pre>{UserService.getToken()}</pre>
      </div>
    )
  }
}

export default Authinfo
