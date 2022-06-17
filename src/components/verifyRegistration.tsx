import { Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import { connect, useDispatch, useSelector } from 'react-redux'
import { IState } from '../state/features/user/redux.store.types'
import { addCurrentStep } from '../state/features/user/action'
import { withRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Dispatch } from 'redux'
import { FaEdit } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { fetchRegistrationData, saveRegistration } from '../state/features/applicationVerifyRegister/actions'
import { applicationSelector } from '../state/features/application/slice'
import { stateSelector } from '../state/features/applicationVerifyRegister/slice'

interface VerifyRegistrationProps {
  currentActiveStep: number
  addCurrentStep: (step: number) => void
  fileNames: string[]
}

export const VerifyRegistration = ({
  currentActiveStep,
  addCurrentStep,
  fileNames,
}: VerifyRegistrationProps) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { status, error, companyDetails } = useSelector(applicationSelector)
  const { registrationData, loading } = useSelector(stateSelector)
  console.log('registrationData', registrationData)
  
  const obj = status[status.length-1] //.find(o => o['applicationStatus'] === CREATED);
  const applicationId = obj['applicationId'];
  if (error) {
    toast.error(error)
  }

  useEffect(() => {
    dispatch(fetchRegistrationData(applicationId));
  }, [dispatch])

  const editClick = (n) => {
    // setcurrentActiveStep(n);
  }
  // const companyRoleChecked =  new Map();

  const backClick = () => {
    addCurrentStep(currentActiveStep - 1)
  }

  const nextClick = () => {
    dispatch(saveRegistration())
    console.log("next click")
  }

  const getTooltip = () => {
    // if (!hasCompanyData()) {
    //   return t('ErrorMessage.error1')
    // }
    // if (!hasRoles()) {
    //   return t('ErrorMessage.error2')
    // }
    // if (!hasDocuments()) {
    //   return t('ErrorMessage.error3')
    // }
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
    return fileNames && fileNames.length > 0 ? true : false
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
                  <span className="col-1" onClick={() => editClick(1)}>
                    <FaEdit className="editIcon" />
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
                  <span className="col-6">
                    {registrationData?.name}
                  </span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">
                    {t('verifyRegistration.registeredName')}
                  </span>
                  <span className="col-6">
                    {registrationData?.name}
                  </span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">
                    {t('verifyRegistration.street')}
                  </span>
                  <span className="col-6">{registrationData?.streetName}{' '}{registrationData?.streetNumber}</span>
                </Row>
              </li>
              <li className="list-group-item-cax">
                <Row>
                  <span className="col-6">{t('verifyRegistration.city')}</span>
                  <span className="col-6">{registrationData?.zipCode}{' '}{registrationData?.city}</span>
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
                  <span className="col-1" onClick={() => editClick(2)}>
                    <FaEdit className="editIcon" />
                  </span>
                </Row>
              </li>
              {registrationData.companyRoles.map((role, index) => {
                return (
                  <li key={index} className="list-group-item-cax">
                    <Row>
                      <span className="col-12">
                        { role }
                      </span>
                    </Row>
                  </li>
                )
              })}
            </ul>
          </Row>
          <Row>
            <ul className="list-group-cax px-2">
              <li className="list-group-item-cax list-header">
                <Row>
                  <span className="col-11">
                    {t('verifyRegistration.UploadedCertificates')}
                  </span>
                  <span className="col-1" onClick={() => editClick(3)}>
                    <FaEdit className="editIcon" />
                  </span>
                </Row>
              </li>
              {registrationData.documents.map((file, index) => {
                return (
                  <li key={index} className="list-group-item-cax">
                    <Row>
                      <span className="col-12">
                        { file.documentName }
                      </span>
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
      fileNames: state.user.fileNames,
    }),
    mapDispatchToProps
  )(VerifyRegistration)
)
