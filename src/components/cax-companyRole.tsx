import { useState } from 'react'
import { Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import { connect } from 'react-redux'
import { IState } from '../state/features/user/redux.store.types'
import { addCurrentStep } from '../state/features/user/action'
import { withRouter } from 'react-router-dom'
import { Dispatch } from 'redux'

interface CompanyRoleProps {
  currentActiveStep: number
  addCurrentStep: (step: number) => void
}

export const CompanyRoleCax = ({
  currentActiveStep,
  addCurrentStep,
}: CompanyRoleProps) => {
  const { t } = useTranslation()
  const [companyRoleChecked, setcompanyRoleChecked] = useState(new Map())

  // const companyRoleChecked =  new Map();

  const backClick = () => {
    addCurrentStep(currentActiveStep - 1)
  }

  const nextClick = () => {
    addCurrentStep(currentActiveStep + 1)
  }

  const handleCheck = (e) => {
    console.log(e)
    if (e.target.checked === false && companyRoleChecked.has(e.target.name)) {
      const roleCheckedcopy = new Map(companyRoleChecked)
      roleCheckedcopy.delete(e.target.name)
      setcompanyRoleChecked(roleCheckedcopy)
    } else {
      setcompanyRoleChecked(
        new Map(companyRoleChecked.set(e.target.name, e.target.checked))
      )
    }

    console.log(e.target.checked, e.target.name)
    console.log(companyRoleChecked)
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
          <div className="company-role-section">
            <Row>
              <div className="col-1">
                <input
                  type="checkbox"
                  name="activeParticipant"
                  className="regular-checkbox"
                  onChange={(e) => handleCheck(e)}
                />
              </div>
              <div className="col-11">
                <label>{t('companyRole.role1Label')}</label>
                <div
                  className={
                    !companyRoleChecked.has('activeParticipant') ||
                    !companyRoleChecked.get('activeParticipant')
                      ? 'companyRoleVisible'
                      : 'companyRoleHidden'
                  }
                >
                  <div>{t('companyRole.role1')}</div>
                  <ul>
                    <li>{t('companyRole.role1li1')}</li>
                    <li>{t('companyRole.role1li2')}</li>
                  </ul>
                </div>
                <div
                  className={
                    !companyRoleChecked.has('activeParticipant') ||
                    !companyRoleChecked.get('activeParticipant')
                      ? 'companyRoleHidden'
                      : 'companyRoleVisible companyRoleTnc'
                  }
                >
                  <div>{t('companyRole.TermsAndCond')}</div>
                  <ul>
                    <li>
                      <input type="checkbox" className="regular-checkbox" />
                      <span>
                        {t('companyRole.TermsAndCondSpan1')}{' '}
                        <span className="underlineTnc">
                          {t('companyRole.TermsAndCondSpan2')}
                        </span>{' '}
                        {t('companyRole.TermsAndCondSpan3')}
                      </span>
                    </li>
                    <li>
                      <input type="checkbox" className="regular-checkbox" />
                      <span>
                        {t('companyRole.TermsAndCond2Span1')}{' '}
                        <span className="underlineTnc">
                          {t('companyRole.TermsAndCond2Span2')}
                        </span>{' '}
                        {t('companyRole.TermsAndCond2Span3')}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Row>
          </div>
          <div className="company-role-section">
            <Row>
              <div className="col-1">
                <input
                  type="checkbox"
                  name="appProvider"
                  className="regular-checkbox"
                  onChange={(e) => handleCheck(e)}
                />
              </div>
              <div className="col-11">
                <label>{t('companyRole.role2Label')}</label>
                <div
                  className={
                    !companyRoleChecked.has('appProvider') ||
                    !companyRoleChecked.get('appProvider')
                      ? 'companyRoleVisible'
                      : 'companyRoleHidden'
                  }
                >
                  <div>{t('companyRole.role2')}</div>
                  <ul>
                    <li>{t('companyRole.role2li1')}</li>
                  </ul>
                </div>
                <div
                  className={
                    !companyRoleChecked.has('appProvider') ||
                    !companyRoleChecked.get('appProvider')
                      ? 'companyRoleHidden'
                      : 'companyRoleVisible companyRoleTnc'
                  }
                >
                  <div>{t('companyRole.TermsAndCond')}</div>
                  <ul>
                    <li>
                      <input type="checkbox" className="regular-checkbox" />
                      <span>
                        {t('companyRole.TermsAndCondSpan1')}{' '}
                        <span className="underlineTnc">
                          {t('companyRole.TermsAndCondSpan2')}
                        </span>{' '}
                        {t('companyRole.TermsAndCondSpan3')}
                      </span>
                    </li>
                    <li>
                      <input type="checkbox" className="regular-checkbox" />
                      <span>
                        {t('companyRole.TermsAndCond2Span1')}{' '}
                        <span className="underlineTnc">
                          {t('companyRole.TermsAndCond2Span2')}
                        </span>{' '}
                        {t('companyRole.TermsAndCond2Span3')}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Row>
          </div>
          <div className="company-role-section">
            <Row>
              <div className="col-1">
                <input
                  type="checkbox"
                  name="operationAndInfra"
                  className="regular-checkbox"
                  onChange={(e) => handleCheck(e)}
                />
              </div>
              <div className="col-11">
                <label>{t('companyRole.role3Label')}</label>
                <div
                  className={
                    !companyRoleChecked.has('operationAndInfra') ||
                    !companyRoleChecked.get('operationAndInfra')
                      ? 'companyRoleVisible'
                      : 'companyRoleHidden'
                  }
                >
                  <div>{t('companyRole.role3')}</div>
                  <ul>
                    <li>{t('companyRole.role3li1')}</li>
                  </ul>
                </div>
                <div
                  className={
                    !companyRoleChecked.has('operationAndInfra') ||
                    !companyRoleChecked.get('operationAndInfra')
                      ? 'companyRoleHidden'
                      : 'companyRoleVisible companyRoleTnc'
                  }
                >
                  <div>{t('companyRole.TermsAndCond')}</div>
                  <ul>
                    <li>
                      <input type="checkbox" className="regular-checkbox" />
                      <span>
                        {t('companyRole.TermsAndCondSpan1')}{' '}
                        <span className="underlineTnc">
                          {t('companyRole.TermsAndCondSpan2')}
                        </span>{' '}
                        {t('companyRole.TermsAndCondSpan3')}
                      </span>
                    </li>
                    <li>
                      <input type="checkbox" className="regular-checkbox" />
                      <span>
                        {t('companyRole.TermsAndCond2Span1')}{' '}
                        <span className="underlineTnc">
                          {t('companyRole.TermsAndCond2Span2')}
                        </span>{' '}
                        {t('companyRole.TermsAndCond2Span3')}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Row>
          </div>
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
