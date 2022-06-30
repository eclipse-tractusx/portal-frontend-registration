import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import { connect, useDispatch, useSelector } from 'react-redux'
import { IState } from '../state/features/user/redux.store.types'
import { addCurrentStep } from '../state/features/user/action'
import { withRouter } from 'react-router-dom'
import { Dispatch } from 'redux'
import { toast } from 'react-toastify'
import { fetchAgreementData, fetchAgreementConsents, updateAgreementConsents } from '../state/features/applicationCompanyRole/actions'
import { applicationSelector } from '../state/features/application/slice'
import { stateSelector } from '../state/features/applicationCompanyRole/slice'
import '../styles/newApp.css'

interface CompanyRoleProps {
  currentActiveStep: number
  addCurrentStep: (step: number) => void
}

export const CompanyRoleCax = ({
  currentActiveStep,
  addCurrentStep,
}: CompanyRoleProps) => {
  const { t } = useTranslation()

  const { status } = useSelector(applicationSelector)
  const { allConsentData, consentData, error } = useSelector(stateSelector)

  if (error) {
    toast.error(error)
  }

  console.log('allConsentData', allConsentData)
  console.log('consentData', consentData)

  const checkIfAgreementEnabled = (id) => 
    allConsentData.agreements.filter((agreement: any) => 
      agreement.agreementId === id 
    )
    .length >= 0

  const checkIfRoleEnabled = (item) => 
    consentData.companyRoles.filter((role) => 
      role === item 
    )
    .length >= 0

  const agreementMap = new Map();
  consentData.agreements.length && consentData.agreements.map((item: any) => 
    agreementMap[item.agreementId] = checkIfAgreementEnabled(item.agreementId)
  )

  console.log('agreementMap', agreementMap)

  const roleMap = new Map();
  consentData.companyRoles.length && consentData.companyRoles.map((item: any) => 
    roleMap[item] = checkIfRoleEnabled(item)
  )

  console.log('roleMap', roleMap)
  
  const [companyRoleChecked, setCompanyRoleChecked] = useState(roleMap) 
  const [agreementChecked, setAgreementChecked] = useState(agreementMap)

  console.log('companyRoleChecked', companyRoleChecked)
  console.log('agreementChecked', agreementChecked)

  const obj = status[status.length - 1]
  const applicationId = obj['applicationId']

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAgreementData())
    dispatch(fetchAgreementConsents(applicationId))
  },[dispatch]);

  // const companyRoleChecked =  new Map();

  const backClick = () => {
    addCurrentStep(currentActiveStep - 1)
  }

  const nextClick = () => {
    const companyRoles = Object.keys(companyRoleChecked).filter(item => companyRoleChecked[item]);
    const agreements = Object.keys(agreementChecked)
                      .map((agreementId) => {
                        return {
                          "agreementId": agreementId,
                          "consentStatus": agreementChecked[agreementId] === true ? 'ACTIVE' : 'INACTIVE'
                        }
                      })
    
    const data = {
      "companyRoles": companyRoles,
      "agreements": agreements
    }

    console.log('data', data)
    dispatch(updateAgreementConsents({applicationId, data}))
    addCurrentStep(currentActiveStep + 1)
  }

  const handleAgreementCheck = (id) => {
    const updatedMap = {...agreementChecked}
    updatedMap[id] = !updatedMap[id]
    setAgreementChecked(updatedMap)
  }

  const handleCompanyRoleCheck = (id) => {
    const updatedMap = {...companyRoleChecked}
    updatedMap[id] = !updatedMap[id]
    setCompanyRoleChecked(updatedMap)
  }

  return (
    <>
      <div className="mx-auto col-9 container-registration">
        <div className="head-section">
          <div className="mx-auto step-highlight d-flex align-items-center justify-content-center">
            3
          </div>
          <h4 className="mx-auto d-flex align-items-center justify-content-center">
            {t('companyRole.title')}
          </h4>
          <div className="mx-auto text-center col-9">
            {t('companyRole.subTitle')}
          </div>
        </div>
        <div className="companydata-form mx-auto col-9">
          {
            allConsentData.companyRoles.map((role: any, index) => (
              <div className="company-role-section" key={index}>
                <Row>
                  <div className="col-1">
                    <input
                      type="checkbox"
                      name={role.companyRole}
                      className="regular-checkbox"
                      onChange={() => handleCompanyRoleCheck(role.companyRole)}
                      checked={companyRoleChecked[role.companyRole]}
                    />
                  </div>
                  <div className="col-11">
                    <label>{role.descriptions.en}</label>
                    <div>
                      <ul>
                        {
                          role.agreementIds.map((id, key) => (
                            <li key={key} className="agreement-li">
                              <input
                                type="checkbox"
                                name={id}
                                className="regular-checkbox agreement-check"
                                onChange={() => handleAgreementCheck(id)}
                                checked={agreementChecked[id]}
                              />
                              {allConsentData.agreements.map((agreement: any) => { if(agreement.agreementId == id) return agreement.name} )}
                            </li>
                          ))
                          }
                      </ul>
                    </div>
                  </div>
                </Row>
              </div>
            ))
          }
        </div>
      </div>
      <FooterButton
        labelBack={t('button.back')}
        labelNext={t('button.confirm')}
        handleBackClick={() => backClick()}
        handleNextClick={() => nextClick()}
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
  )(CompanyRoleCax)
)
