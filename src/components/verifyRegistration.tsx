import { Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import { connect, useDispatch, useSelector } from 'react-redux'
import { IState } from '../state/features/user/redux.store.types'
import { addCurrentStep } from '../state/features/user/action'
import { withRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { Dispatch } from 'redux'
import { ToastContainer, toast } from 'react-toastify'
import {
  fetchRegistrationData,
  saveRegistration,
} from '../state/features/applicationVerifyRegister/actions'
import { applicationSelector } from '../state/features/application/slice'
import { stateSelector } from '../state/features/applicationVerifyRegister/slice'
import { stateSelector as documentSelector } from '../state/features/applicationDocuments/slice'

interface VerifyRegistrationProps {
  currentActiveStep: number
  addCurrentStep: (step: number) => void
}

export const VerifyRegistration = ({
  currentActiveStep,
  addCurrentStep,
}: VerifyRegistrationProps) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { status, error, companyDetails } = useSelector(applicationSelector)
  const { registrationData } = useSelector(stateSelector)
  const { documents } = useSelector(documentSelector)

  const obj = status[status.length - 1]
  const applicationId = obj['applicationId']
  if (error) {
    toast.error(error)
  }

  useEffect(() => {
    dispatch(fetchRegistrationData(applicationId))
  }, [dispatch])

  const backClick = () => {
    addCurrentStep(currentActiveStep - 1)
  }

  const nextClick = () => {
    dispatch(saveRegistration())
  }

  const getTooltip = () => {
    if (!hasCompanyData()) {
      return t('ErrorMessage.error1')
    }
    if (!hasRoles()) {
      return t('ErrorMessage.error2')
    }
    if (!hasDocuments()) {
      return t('ErrorMessage.error3')
    }
    return null
  }
  const hasCompanyData = () => {
    return companyDetails.bpn ? true : false
    // return true
  }
  const hasRoles = () => {
    return true
  }
  const hasDocuments = () => {
    return documents && documents.length > 0 ? true : false
  }

  return (
    <>
      <div className="mx-auto col-9 container-registration">
        <div className="head-section">
          <div className="mx-auto step-highlight d-flex align-items-center justify-content-center">
            5
          </div>
          <h4 className="mx-auto d-flex align-items-center justify-content-center">
            {t('verifyRegistration.title')}
          </h4>
          <div className="mx-auto text-center col-9">
            {t('verifyRegistration.subtitle')}
          </div>
        </div>
        <div className="companydata-form mx-auto col-9">
          <Row>
            <ul className="list-group-cax px-2">
              <li className="list-group-item-cax list-header">
                <Row>
                  <span className="col-11">
                    {t('verifyRegistration.heading1')}
                  </span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">{t('verifyRegistration.bpn')}</span>
                  <span className="col-6">{registrationData?.bpn}</span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">
                    {t('verifyRegistration.legalEntity')}
                  </span>
                  <span className="col-6">{registrationData?.name}</span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">
                    {t('verifyRegistration.registeredName')}
                  </span>
                  <span className="col-6">{registrationData?.name}</span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">
                    {t('verifyRegistration.street')}
                  </span>
                  <span className="col-6">
                    {registrationData?.streetName}{' '}
                    {registrationData?.streetNumber}
                  </span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">{t('verifyRegistration.city')}</span>
                  <span className="col-6">
                    {registrationData?.zipCode} {registrationData?.city}
                  </span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">
                    {t('verifyRegistration.country')}
                  </span>
                  <span className="col-6">{registrationData?.countryDe}</span>
                </Row>
              </li>
            </ul>
          </Row>
          <Row>
            <ul className="list-group-cax px-2">
              <li className="list-group-item-cax list-header">
                <Row>
                  <span className="col-11">
                    {t('verifyRegistration.ActiveRole')}
                  </span>
                </Row>
              </li>
              {registrationData.companyRoles.map((role, index) => (
                <li key={index} className="list-group-item-cax">
                  <Row>
                    <span className="col-12">{role}</span>
                  </Row>
                </li>
              ))}
            </ul>
          </Row>
          <Row>
            <ul className="list-group-cax px-2">
              <li className="list-group-item-cax list-header">
                <Row>
                  <span className="col-11">
                    {t('verifyRegistration.UploadedCertificates')}
                  </span>
                </Row>
              </li>
              {registrationData.documents.map((file, index) => {
                return (
                  <li key={index} className="list-group-item-cax">
                    <Row>
                      <span className="col-12">{file.documentName}</span>
                    </Row>
                  </li>
                )
              })}
            </ul>
          </Row>
        </div>
        <ToastContainer />
      </div>

      <FooterButton
        labelBack={t('button.back')}
        labelNext={t('button.submit')}
        handleBackClick={() => backClick()}
        handleNextClick={() => nextClick()}
        tooltip={getTooltip()}
      />
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addCurrentStep: (step: number) => {
    dispatch(addCurrentStep(step))
  },
})

export default withRouter(
  connect(
    (state: IState) => ({
      currentActiveStep: state.user.currentStep,
    }),
    mapDispatchToProps
  )(VerifyRegistration)
)
