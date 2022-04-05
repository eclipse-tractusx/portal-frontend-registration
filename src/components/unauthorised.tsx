import * as React from 'react'
import '../styles/unauthorised.css'

class UnauthorisedPage extends React.Component {
  public render() {
    return (
      <div className="wrapper">
        <img src="/Catena-X_Logo_mit_Zusatz_2021.svg" alt="logo" />
        <div className="pageBody">
          <div className="infoBackground">
            <div className="infoContent">
              <div>
                <h1>Access Denied</h1>
                <span>
                  You do not have the required access for this service.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UnauthorisedPage
