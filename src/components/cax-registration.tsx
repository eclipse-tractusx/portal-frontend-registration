import { Container, Row, Col } from 'react-bootstrap'
import Footer from './footer'
import Header from './cax-header'
import ReactTooltip from 'react-tooltip'
import 'react-datepicker/dist/react-datepicker.css'
import CompanyDataCax from './cax-companyData'
import ResponsibilitiesCax from './cax-responsibilities'
import DragDropUploadFiles from './dragdrop'
import CompanyRoleCax from './cax-companyRole'
import { connect } from 'react-redux'
import { IState } from '../state/features/user/redux.store.types'
import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import Stepper from './stepper'
import VerifyRegistration from './verifyRegistration'

interface RegistrationCaxProps {
  currentActiveStep: number
}

export const RegistrationCax = ({
  currentActiveStep,
}: RegistrationCaxProps) => {
  const { t } = useTranslation()

  return (
    <Container>
      <Header />
      <Row>
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
