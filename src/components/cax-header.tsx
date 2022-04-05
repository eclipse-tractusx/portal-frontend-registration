import i18n from '../i18n'
import { Row, Col } from 'react-bootstrap'
import UserService from '../helpers/UserService'
import { getClientRolesComposite } from '../helpers/utils'
import { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DataErrorCodes } from '../helpers/DataError'
import { ToastContainer, toast } from 'react-toastify'
import { addrolesComposite } from '../actions/user.action'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IState } from '../types/store/redux.store.types'
interface HeaderCaxProps {
  addrolesComposite: (rolesComposite: string[]) => void
}

export const Header = ({ addrolesComposite }: HeaderCaxProps) => {
  const { t } = useTranslation()

  const username = UserService.getUsername()
  const tokenRoles = UserService.getRoles()
  const [userRoles, setuserRoles] = useState([])
  const [language, setlanguage] = useState(i18n.language)

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await getClientRolesComposite()
      const filterComposite = tokenRoles.filter((value: string) =>
        data.includes(value)
      )
      setuserRoles(filterComposite)
      addrolesComposite(data)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch((errorCode: number) => {
        const message = DataErrorCodes.includes(errorCode)
          ? t(`ErrorMessage.${errorCode}`)
          : t(`ErrorMessage.default`)
        //   alert(message)

        toast.error(message)
        //  history.push("/finish");
      })
  }, [tokenRoles, addrolesComposite, t])

  const changeLanguage = (lng) => {
    setlanguage(lng)
    i18n.changeLanguage(lng)
  }

  return (
    <Row className="header-container">
      <Col>
        <div className="logo">
          <img src="/logo_cx.svg" alt="logo" />
        </div>
      </Col>
      <Col>
        <div className="d-flex flex-row-reverse profile">
          <div className="profile-lang">
            <span
              className={language === 'en' ? 'lang-sel' : ''}
              onClick={() => changeLanguage('en')}
            >
              {' '}
              EN{' '}
            </span>
          </div>
          <div className="profile-lang">
            <span
              className={language === 'de' ? 'lang-sel' : ''}
              onClick={() => changeLanguage('de')}
            >
              {' '}
              DE
            </span>
          </div>
          <div className="profile-link partition"></div>
          <div className="profile-link user">
            <input id="myid" type="checkbox" />
            <label htmlFor="myid" className="user-icon"></label>
            <span className="tooltiptext">
              {' '}
              <div> {username}</div>
              <div> {UserService.getDomain()}</div>
              <div>({userRoles.join(', ')})</div>
              <div className="logout" onClick={() => UserService.doLogout()}>
                {t('header.logout')}
              </div>
            </span>
          </div>
          <div className="profile-link">
            <Link to="/help">{t('header.help')}</Link>
          </div>
        </div>
        <ToastContainer />
      </Col>
    </Row>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addrolesComposite: (rolesComposite: string[]) => {
    dispatch(addrolesComposite(rolesComposite))
  },
})

export default withRouter(
  connect(
    (state: IState) => ({
      roleComposite: state.user.roleComposite,
    }),
    mapDispatchToProps
  )(Header)
)
