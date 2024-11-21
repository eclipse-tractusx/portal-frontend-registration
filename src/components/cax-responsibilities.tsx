/********************************************************************************
 * Copyright (c) 2022 Microsoft and BMW Group AG
 * Copyright (c) 2022 Contributors to the Eclipse Foundation
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

import { Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlineUser } from 'react-icons/ai'
import Button from './button'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import {
  addCurrentStep,
  getCurrentStep,
} from '../state/features/user/userApiSlice'
import { useFetchApplicationsQuery } from '../state/features/application/applicationApiSlice'
import {
  useFetchInvitedUsersQuery,
  useFetchRolesCompositeQuery,
  useUpdateInviteNewUserMutation,
} from '../state/features/applicationInviteUser/applicationInviteUserApiSlice'
import { Notify, SeverityType } from './Snackbar'
import StepHeader from './StepHeader'

export const ResponsibilitiesCax = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState<string | null>('')
  const [role, setRole] = useState<string | null>('')
  const [message, setMessage] = useState<string | null>('')
  const [availableUserRoles, setAvailableUserRoles] = useState<string[]>([])
  const [appError, setError] = useState<{
    email: string
    role: string
    personalNote: string
  }>({
    email: '',
    role: '',
    personalNote: '',
  })
  const dispatch = useDispatch()
  const currentActiveStep = useSelector(getCurrentStep)

  const [loading, setLoading] = useState<boolean>()
  const [invitedResponse, setInvitedResponse] = useState({
    severity: SeverityType.ERROR,
    message: '',
  })

  const { data: status } = useFetchApplicationsQuery()

  const obj = status?.[status.length - 1] //.find(o => o['applicationStatus'] === CREATED);
  const applicationId = obj?.applicationId

  const [updateInviteNewUser] = useUpdateInviteNewUserMutation()
  const { data: rolesComposite, error: rolesError } =
    useFetchRolesCompositeQuery()
  const {
    data: invitedUsers,
    error: invitedUsersError,
    refetch,
  } = useFetchInvitedUsersQuery(applicationId)

  useEffect(() => {
    setAvailableUserRoles(rolesComposite ?? [])
    if (rolesComposite && rolesComposite.length > 0) setRole(rolesComposite[0])
  }, [rolesComposite])

  const onRoleChange = (e) => {
    setRole(e.target.value)
  }

  const validateEmail = (email) =>
    //eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*))@(([a-z0-9-]+\.)+[a-z]{2,})$/.test(
      email
    )

  const validatePersonalNote = (note: string) =>
    /^[a-zA-Z][a-zA-Z0-9 !#'$@&%()*+\r\n,\-_./:;=<>?[\]\\^]{0,255}$/.test(note)

  const handleSendInvite = () => {
    setInvitedResponse({ severity: SeverityType.ERROR, message: '' })
    if (email && validateEmail(email)) {
      setLoading(true)
      const user = {
        email,
        message,
        roles: [role],
      }
      updateInviteNewUser({
        applicationId,
        user,
      })
        .unwrap()
        .then(() => {
          setEmail('')
          setMessage('')
          refetch()
          setInvitedResponse({
            severity: SeverityType.SUCCESS,
            message: t('Responsibility.sendInviteSuccessMsg'),
          })
          setLoading(false)
        })
        .catch((errors: any) => {
          setInvitedResponse({
            severity: SeverityType.ERROR,
            message: errors.data.errors.unknown[0],
          })
          setLoading(false)
        })
    }
  }

  const validateEmailOnChange = (email) => {
    setEmail(email)
    if (email === '')
      setError({ ...appError, email: t('Responsibility.emailRequired') })
    else if (!validateEmail(email))
      setError({
        ...appError,
        email: t('Responsibility.emailErrorMessage'),
      })
    else setError({ ...appError, email: '' })
  }

  const validatePersonalNoteOnChange = (note: string) => {
    setMessage(note)

    if (note.length === 0) {
      setError((prevState) => ({ ...prevState, personalNote: '' }))
      return
    }

    if (!validatePersonalNote(note)) {
      setError((prevState) => ({
        ...prevState,
        personalNote: t('Responsibility.personalNoteError'),
      }))
      return
    }

    setError((prevState) => ({ ...prevState, personalNote: '' }))
  }

  const backClick = () => {
    dispatch(addCurrentStep(currentActiveStep - 1))
  }

  const nextClick = () => {
    dispatch(addCurrentStep(currentActiveStep + 1))
  }

  const renderSnackbar = () => {
    let message = t('registration.apiError')
    if (invitedResponse.message) message = invitedResponse.message
    return <Notify message={message} />
  }

  return (
    <>
      <div className="mx-auto col-9 container-registration">
        <StepHeader
          step={currentActiveStep}
          stepName={t('Responsibility.responsAndAdmin')}
          stepDescription={t('Responsibility.subTitle')}
        />
        <div className="companydata-form">
          <Row className="mx-auto col-9">
            <div
              className={
                appError.email !== ''
                  ? 'form-data error calender'
                  : 'form-data calender'
              }
            >
              <label>{t('Responsibility.email')}</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => validateEmailOnChange(e.target.value)}
              />
              <AiOutlineExclamationCircle className="error-icon" />
              <div className="error-message">{appError.email}</div>
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div className="form-data">
              <label>{t('Responsibility.role')}</label>
              <select value={role} onChange={(e) => onRoleChange(e)}>
                {availableUserRoles &&
                  availableUserRoles.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
              </select>
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div className={`form-data ${appError.personalNote && 'error'}`}>
              <label>{t('Responsibility.note')}</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => validatePersonalNoteOnChange(e.target.value)}
              />
              <div className="error-message">{appError.personalNote}</div>
              <div className="company-hint">{t('Responsibility.hint')}</div>
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div>
              <Button
                styleClass="button btn-primaryCax"
                label={
                  loading ? t('button.sending') : t('Responsibility.sentInvite')
                }
                handleClick={handleSendInvite}
                icon={true}
                loading={loading}
              />
            </div>
          </Row>

          {invitedUsers && invitedUsers?.length > 0 && (
            <Row className="mx-auto col-9 send-invite">
              <h5>{t('Responsibility.titleInvite')}</h5>
              <Row>
                <ul className="list-group-cax px-2">
                  {invitedUsers.map((d, index) => {
                    return (
                      <li key={index} className="list-group-item-cax">
                        <Row>
                          <span className="col-1">
                            <AiOutlineUser />
                          </span>
                          <span className="col-5 list-group-item-email">
                            {d.emailId}
                          </span>
                          <span className="col-4 p-0">
                            {d.invitedUserRoles.map((role) => (
                              <span className="list-group-item-role" key={role}>
                                {role}
                              </span>
                            ))}
                          </span>
                          <span className="col-2 list-group-item-status">
                            {d.invitationStatus || (
                              <span className="pending-status">
                                {'PENDING'}
                              </span>
                            )}
                          </span>
                        </Row>
                      </li>
                    )
                  })}
                </ul>
              </Row>
            </Row>
          )}
        </div>
      </div>
      {(rolesError || invitedUsersError || invitedResponse.message) &&
        renderSnackbar()}
      <FooterButton
        labelBack={t('button.back')}
        labelNext={t('button.next')}
        handleBackClick={() => backClick()}
        handleNextClick={() => nextClick()}
        helpUrl={
          '/documentation/?path=user%2F01.+Onboarding%2F02.+Registration%2F03.+Add+Additional+User%28s%29.md'
        }
      />
    </>
  )
}
