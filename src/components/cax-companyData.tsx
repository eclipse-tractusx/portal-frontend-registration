import { Row } from 'react-bootstrap'
import { getCompanyDetails } from '../helpers/utils'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import SearchInput from 'react-search-input'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { FooterButton } from './footerButton'
import { connect } from 'react-redux'
import { IState } from '../types/store/redux.store.types'
import { addCurrentStep, addCompanyData } from '../actions/user.action'
import { withRouter } from 'react-router-dom'
import { Dispatch } from 'redux'
import { DataErrorCodes } from '../helpers/DataError'
import { toast } from 'react-toastify'
import { CompanyDetailsData } from '../data/companyDetails'

interface CompanyDataProps {
  currentActiveStep: number
  addCurrentStep: (step: number) => void
  addCompanyData: (companydata: CompanyDetailsData) => void
}

export const CompanyDataCax = ({
  currentActiveStep,
  addCurrentStep,
  addCompanyData,
}: CompanyDataProps) => {
  const { t } = useTranslation()
  const [search, setsearch] = useState([])
  const [bpn, setbpn] = useState('')
  const [legalEntity, setlegalEntity] = useState('')
  const [registeredName, setregisteredName] = useState('')
  const [streetHouseNumber, setstreetHouseNumber] = useState('')
  const [postalCode, setpostalCode] = useState('')
  const [city, setcity] = useState('')
  const [country, setcountry] = useState('')

  const onSeachChange = (x: any) => {
    setsearch(x)
    const fetchData = async () => {
      const companyDetails = await getCompanyDetails(x)
      setbpn(companyDetails?.[0]?.bpn)
      setlegalEntity(companyDetails?.[0]?.names?.[0]?.value)
      setregisteredName(companyDetails?.[0]?.names?.[0]?.value)
      setstreetHouseNumber(
        companyDetails?.[0]?.addresses?.[0]?.thoroughfares[0]?.value
      )
      setpostalCode(companyDetails?.[0]?.addresses?.[0]?.postCodes[0]?.value)
      setcity(companyDetails?.[0]?.addresses?.[0]?.localities[0]?.value)
      setcountry(companyDetails?.[0]?.addresses?.[0]?.country?.name)
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
  }

  const backClick = () => {
    addCurrentStep(currentActiveStep - 1)
  }

  const nextClick = () => {
    addCurrentStep(currentActiveStep + 1)
    const companydata = {
      bpn: bpn,
      legalEntity: legalEntity,
      registrationName: registeredName,
      address: streetHouseNumber,
      postalCode: postalCode,
      city: city,
      country: country,
    }
    addCompanyData(companydata)
  }

  return (
    <>
      <div className="mx-auto col-9 container-registration">
        <div className="head-section">
          <div className="mx-auto step-highlight d-flex align-items-center justify-content-center">
            1
          </div>
          <h4 className="mx-auto d-flex align-items-center justify-content-center">
            {t('registrationStepOne.verifyCompayDataHeading')}
          </h4>
          <div className="mx-auto text-center col-9">
            {t('registrationStepOne.verifyCompayDataSubHeading')}
          </div>
        </div>
        <div className="companydata-form">
          <Row className="mx-auto col-9">
            <div className="form-search">
              <label> {t('registrationStepOne.seachDatabase')}</label>
              <SearchInput
                className="search-input"
                value={search}
                onChange={(search) => onSeachChange(search)}
              />
            </div>
          </Row>
          <Row className="col-9 mx-auto">
            <div className="section-divider">
              <span className="text-center">
                {t('registrationStepOne.enterManualText')}
              </span>
            </div>
          </Row>
          <Row className="mx-auto col-9">
            <div className="form-data">
              <label>
                {' '}
                {t('registrationStepOne.bpn')}{' '}
                <AiOutlineQuestionCircle
                  color="#939393"
                  data-tip="hello world"
                />
              </label>
              <input type="text" value={bpn} />
              <div className="company-hint">
                {t('registrationStepOne.helperText')}
              </div>
            </div>
          </Row>
          <Row className="mx-auto col-9">
            <div className="form-data">
              <label>
                {' '}
                {t('registrationStepOne.legalEntity')}{' '}
                <AiOutlineQuestionCircle
                  color="#939393"
                  data-tip="hello world"
                />{' '}
              </label>
              <input type="text" value={legalEntity} />
              <div className="company-hint">
                {t('registrationStepOne.helperText')}
              </div>
            </div>
          </Row>
          <Row className="mx-auto col-9">
            <div className="form-data">
              <label>
                {' '}
                {t('registrationStepOne.registeredName')}{' '}
                <AiOutlineQuestionCircle
                  color="#939393"
                  data-tip="hello world"
                />
              </label>
              <input type="text" value={registeredName} />
              <div className="company-hint">
                {t('registrationStepOne.helperText')}
              </div>
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <span className="form-heading">
              {t('registrationStepOne.organizationAdd')}
            </span>
          </Row>

          <Row className="mx-auto col-9">
            <div className="form-data">
              <label> {t('registrationStepOne.streetHouseNumber')} </label>
              <input type="text" value={streetHouseNumber} />
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div className="col-4 form-data">
              <label> {t('registrationStepOne.postalCode')} </label>
              <input type="text" value={postalCode} />
            </div>

            <div className="col-8 form-data">
              <label>{t('registrationStepOne.city')}</label>
              <input type="text" value={city} />
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div className="form-data">
              <label>{t('registrationStepOne.country')}</label>
              <input type="text" value={country} />
            </div>
          </Row>
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
  addCompanyData: (companyData: CompanyDetailsData) => {
    dispatch(addCompanyData(companyData))
  },
})

export default withRouter(
  connect(
    (state: IState) => ({
      currentActiveStep: state.user.currentStep,
    }),
    mapDispatchToProps
  )(CompanyDataCax)
)
