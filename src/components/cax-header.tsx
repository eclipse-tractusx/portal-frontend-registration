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

import i18n from '../i18n'
import { Row, Col } from 'react-bootstrap'
import UserService from '../services/UserService'
import { getClientRolesComposite } from '../helpers/utils'
import { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DataErrorCodes } from '../helpers/DataError'
import { ToastContainer, toast } from 'react-toastify'
import { addrolesComposite } from '../state/features/user/action'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IState } from '../state/features/user/redux.store.types'
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
          <img src="/registration/logo_cx.svg" alt="logo" />
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
            <Link to="/help" target="_blank">{t('header.help')}</Link>
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
