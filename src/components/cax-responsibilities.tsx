import { Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlineUser } from 'react-icons/ai'
import Button from './button'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import { connect, useDispatch, useSelector } from 'react-redux'
import { IUserItem } from '../state/features/user/types'
import { IState } from '../state/features/user/redux.store.types'
import { Dispatch } from 'redux'
import {
  addToInviteList,
  removeFromInviteList,
  addCurrentStep,
} from '../state/features/user/action'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { FooterButton } from './footerButton'
import { applicationSelector } from '../state/features/application/slice'
import {
  invitedUserSelector,
  rolesSelector,
} from '../state/features/applicationInviteUser/slice'
import {
  fetchInvited,
  fetchRolesComposite,
  sendInvite,
  setUserToInvite,
} from '../state/features/applicationInviteUser/actions'

interface ResponsibilitiesCaxProps {
  addToInviteList: (userItem: IUserItem) => void
  removeFromInviteList: (userItem: string) => void
  userInviteList: IUserItem[]
  currentActiveStep: number
  addCurrentStep: (step: number) => void
}

export const ResponsibilitiesCax = ({
  currentActiveStep,
  addCurrentStep,
  removeFromInviteList,
}: ResponsibilitiesCaxProps) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState<string | null>('')
  const [role, setRole] = useState<string | null>('')
  const [message, setMessage] = useState<string | null>('')
  const [availableUserRoles, setavailableUserRoles] = useState([])
  const [appError, setError] = useState<{ email: string; role: string }>({
    email: '',
    role: '',
  })

  const dispatch = useDispatch()

  const { status, error } = useSelector(applicationSelector)
  const rolesComposite = useSelector(rolesSelector)
  const invitedUsers = useSelector(invitedUserSelector)

  const obj = status[status.length - 1] //.find(o => o['applicationStatus'] === CREATED);
  const applicationId = obj['applicationId']
  if (error) {
    toast.error(error)
  }

  useEffect(() => {
    dispatch(fetchRolesComposite())
    dispatch(fetchInvited(applicationId))
  }, [dispatch])

  useEffect(() => {
    setavailableUserRoles(rolesComposite)
    if (rolesComposite && rolesComposite.length > 0) setRole(rolesComposite[0])
  }, [rolesComposite])

  const onRoleChange = (e) => {
    setRole(e.target.value)
  }

  const validateEmail = (email) =>
    //eslint-disable-next-line
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

  const handleSendInvite = () => {
    if (email && validateEmail(email)) {
      const user = {
        email: email,
        roles: [role],
        message: message,
      }
      dispatch(setUserToInvite(user))
      dispatch(
        sendInvite({
          applicationId,
          user,
        })
      )
    }
  }

  const validateEmailOnChange = (email) => {
    setEmail(email)
    if (email === '')
      setError({ email: 'Email is required', role: appError.role })
    else if (!validateEmail(email))
      setError({
        email: t('Responsibility.emailErrorMessage'),
        role: appError.role,
      })
    else setError({ email: '', role: appError.role })
  }

  const backClick = () => {
    addCurrentStep(currentActiveStep - 1)
  }

  const nextClick = () => {
    addCurrentStep(currentActiveStep + 1)
  }

  return (
    <>
      <div className="mx-auto col-9 container-registration">
        <div className="head-section">
          <div className="mx-auto step-highlight d-flex align-items-center justify-content-center">
            2
          </div>
          <h4 className="mx-auto d-flex align-items-center justify-content-center">
            {t('Responsibility.responsAndAdmin')}
          </h4>
          <div className="mx-auto text-center col-9">
            {t('Responsibility.subTitle')}
          </div>
        </div>
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
            <div className="form-data">
              <label>{t('Responsibility.note')}</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="company-hint">{t('Responsibility.hint')}</div>
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div>
              <Button
                styleClass="button btn-primaryCax"
                label={t('Responsibility.sentInvite')}
                handleClick={handleSendInvite}
                icon={true}
              />
            </div>
            <ToastContainer />
          </Row>

          {invitedUsers.length > 0 && invitedUsers && (
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
      <FooterButton
        labelBack={t('button.back')}
        labelNext={t('button.next')}
        handleBackClick={() => backClick()}
        handleNextClick={() => nextClick()}
      />
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addToInviteList: (userItem: IUserItem) => {
    dispatch(addToInviteList(userItem))
  },
  removeFromInviteList: (userUiId: string) => {
    dispatch(removeFromInviteList(userUiId))
  },
  addCurrentStep: (step: number) => {
    dispatch(addCurrentStep(step))
  },
})

export default withRouter(
  connect(
    (state: IState) => ({
      userInviteList: state.user.userInviteList,
      currentActiveStep: state.user.currentStep,
      roleComposite: state.user.roleComposite,
    }),
    mapDispatchToProps
  )(ResponsibilitiesCax)
)
