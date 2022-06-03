import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import { connect } from 'react-redux'
import { IState } from '../state/features/user/redux.store.types'
import { addCurrentStep } from '../state/features/user/action'
import { withRouter } from 'react-router-dom'
import { Dispatch } from 'redux'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAgreementData, fetchAgreementConsents } from '../state/features/applicationCompanyRole/actions'
import { applicationSelector } from '../state/features/application/slice'
import { stateSelector } from '../state/features/applicationCompanyRole/slice'

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
  const {agreementData, roleData, error } = useSelector(stateSelector)

  const checkIfEnabled = (id) => 
  roleData.agreements.filter((agreement: any) => 
    agreement.agreementId === id 
  )
  .length > 0

  const map = new Map();
  roleData.agreements.map((item: any) => 
    map[item.agreementId] = checkIfEnabled(item.agreementId)
  )
  
  const [companyRoleChecked, setcompanyRoleChecked] = useState(map)
  console.log('companyRoleChecked-- ', companyRoleChecked)

  const obj = status[status.length - 1]
  const applicationId = obj['applicationId']
  if (error) {
    toast.error(error)
  }
  console.log('agreementData', agreementData)
  console.log('roleData', roleData)

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
    addCurrentStep(currentActiveStep + 1)
  }

  const handleCheck = (id) => {
    console.log('**',id)
    const updatedMap = {...map}
    updatedMap[id] = !updatedMap[id]
    setcompanyRoleChecked(updatedMap)
    // if (e.target.checked === false && companyRoleChecked.has(e.target.name)) {
    //   const roleCheckedcopy = new Map(companyRoleChecked)
    //   roleCheckedcopy.delete(e.target.name)
    //   setcompanyRoleChecked(roleCheckedcopy)
    // } else {
    //   setcompanyRoleChecked(
    //     new Map(companyRoleChecked.set(e.target.name, e.target.checked))
    //   )
    // }

    // console.log(e.target.checked, e.target.name)
    // console.log(companyRoleChecked)

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
            agreementData.companyRoles.map((role: any, index) => (
              <div className="company-role-section" key={index}>
                <Row>
                  <div className="col-1">
                    <input
                      type="checkbox"
                      name={role.companyRole}
                      className="regular-checkbox"
                      onChange={(e) => handleCheck(e)}
                      checked={true}
                    />
                  </div>
                  <div className="col-11">
                    <label>{role.descriptions.en}</label>
                    <div>
                      <ul>
                        {
                          role.agreementIds.map((id, index) => (
                            <li key={index}>
                              <input
                                type="checkbox"
                                name={id}
                                className="regular-checkbox"
                                onChange={(e) => handleCheck(id)}
                                checked={companyRoleChecked[id]}
                              />
                              {agreementData.agreements.map((agreement: any) => { if(agreement.agreementId == id) return agreement.name} )}
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
