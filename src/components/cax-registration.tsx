import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Footer from './footer'
import Header from './cax-header'
import ReactTooltip from 'react-tooltip'
import { useDispatch, useSelector, connect } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css'
import CompanyDataCax from './cax-companyData'
import ResponsibilitiesCax from './cax-responsibilities'
import DragDropUploadFiles from './dragdrop'
import CompanyRoleCax from './cax-companyRole'
import { IState } from '../state/features/user/redux.store.types'
import { useTranslation } from 'react-i18next'
import { useHistory, withRouter } from 'react-router-dom'
import Stepper from './stepper'
import VerifyRegistration from './verifyRegistration'
import { applicationSelector } from '../state/features/application/slice'
import {
  fetchId,
  updateInvitation,
} from '../state/features/application/actions'
import {
  SUBMITTED,
  CONFIRMED,
  DECLINED,
} from '../state/features/application/types'
interface RegistrationCaxProps {
  currentActiveStep: number
}

export const RegistrationCax = ({
  currentActiveStep,
}: RegistrationCaxProps) => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const { status, error } = useSelector(applicationSelector)

  if (error) {
    toast.error(error)
  }

  useEffect(() => {
    if (
      status &&
      status[0] &&
      (status[0]['applicationStatus'] === SUBMITTED ||
        status[0]['applicationStatus'] === CONFIRMED ||
        status[0]['applicationStatus'] === DECLINED)
    ) {
      history.push('/registration-closed')
    }
  }, [status])

  useEffect(() => {
    if (status.length <= 0) {
      dispatch(updateInvitation())
      dispatch(fetchId())
    }
  }, [dispatch])

  return (
    <Container>
      <Header />
      <Row>
        {status && status[0] && (
          <Col>
            <div className="mx-auto col-9 registration-header">
              <h4>{t('registration.registration')}</h4>
              <div>{t('registration.regiStep')}.</div>
              <div>{t('registration.regiSubHeading')}</div>
            </div>
            <Stepper></Stepper>
            {currentActiveStep === 1 ? (
              <CompanyDataCax />
            ) : currentActiveStep === 2 ? (
              <ResponsibilitiesCax />
            ) : currentActiveStep === 3 ? (
              <CompanyRoleCax />
            ) : currentActiveStep === 4 ? (
              <DragDropUploadFiles />
            ) : (
              <VerifyRegistration />
            )}
          </Col>
        )}
      </Row>
      <Footer />
      <ReactTooltip />
    </Container>
  )
}

export default withRouter(
  connect((state: IState) => ({
    currentActiveStep: state.user.currentStep,
  }))(RegistrationCax)
)
