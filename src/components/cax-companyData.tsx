import { Row } from 'react-bootstrap'
import { getCompanyDetails } from '../helpers/utils'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import SearchInput from 'react-search-input'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { FooterButton } from './footerButton'
import { connect, useDispatch, useSelector } from 'react-redux'
import { IState } from '../state/features/user/redux.store.types'
import { addCurrentStep, addCompanyData } from '../state/features/user/action'
import { withRouter } from 'react-router-dom'
import { Dispatch } from 'redux'
import { DataErrorCodes } from '../helpers/DataError'
import { toast } from 'react-toastify'
import { getCompanyDetailsWithAddress, saveCompanyDetailsWithAddress } from '../state/features/application/actions'
import { applicationSelector } from '../state/features/application/slice'
import { CompanyDetails, CREATED } from '../state/features/application/types'

interface CompanyDataProps {
  currentActiveStep: number
  addCurrentStep: (step: number) => void
  addCompanyData: (companydata: CompanyDetails) => void
}

export const CompanyDataCax = ({
  currentActiveStep,
  addCurrentStep,
  addCompanyData,
}: CompanyDataProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { status, error, companyDetails } = useSelector(applicationSelector)
  const obj = status[status.length-1] //.find(o => o['applicationStatus'] === CREATED);
  const applicationId = obj['applicationId'];
  if (error) {
    toast.error(error)
  }

  useEffect(() => {
    dispatch(getCompanyDetailsWithAddress(applicationId));
  }, [dispatch])

  useEffect(() => {
    setBpn(companyDetails?.bpn)
    setLegalEntity(companyDetails?.shortname)
    setRegisteredName(companyDetails?.name)
    setStreetHouseNumber(companyDetails?.streetnumber)
    setPostalCode(companyDetails?.zipcode)
    setCity(companyDetails?.city)
    setCountry(companyDetails?.countryAlpha2Code)
  }, [companyDetails])

  const [search, setSearch] = useState('')
  const [bpn, setBpn] = useState(companyDetails?.bpn)
  const [bpnErrorMsg, setBpnErrorMessage] = useState('')
  const [legalEntity, setLegalEntity] = useState(companyDetails.shortname)
  const [registeredName, setRegisteredName] = useState(companyDetails.name)
  const [streetHouseNumber, setStreetHouseNumber] = useState(companyDetails.streetnumber)
  const [postalCode, setPostalCode] = useState(companyDetails.zipcode)
  const [city, setCity] = useState(companyDetails.city)
  const [country, setCountry] = useState(companyDetails.countryAlpha2Code)

  const fetchData = async (expr: string) => {
    const companyDetails = await getCompanyDetails(expr)
    setBpn(companyDetails?.[0]?.bpn)
    setLegalEntity(companyDetails?.[0]?.names?.[0]?.value)
    setRegisteredName(companyDetails?.[0]?.names?.[0]?.value)
    setStreetHouseNumber(
      companyDetails?.[0]?.addresses?.[0]?.thoroughfares[0]?.value
    )
    setPostalCode(parseInt(companyDetails?.[0]?.addresses?.[0]?.postCodes[0]?.value))
    setCity(companyDetails?.[0]?.addresses?.[0]?.localities[0]?.value)
    setCountry(companyDetails?.[0]?.addresses?.[0]?.country?.name)
  }

  const onSearchChange = (expr: string) => {
    const bpnPattern = /^BPNL[a-z0-9]{12}$/i
    if (bpnPattern.test(expr.trim())) {
      fetchData(expr)
        // make sure to catch any error
        .catch((errorCode: number) => {
          setBpnErrorMessage(t('registrationStepOne.bpnNotExistError'))
          const message = DataErrorCodes.includes(errorCode)
            ? t(`ErrorMessage.${errorCode}`)
            : t(`ErrorMessage.default`)
          //   alert(message)

          toast.error(message)
          //  history.push("/finish");
        })
      setBpnErrorMessage('')
    } else {
      setBpnErrorMessage(t('registrationStepOne.bpnInvalidError'))
    }
  }

  const backClick = () => {
    addCurrentStep(currentActiveStep - 1)
  }

  const nextClick = () => {
    addCurrentStep(currentActiveStep + 1)
    const companyData = {...companyDetails}
    companyData.name = legalEntity
    companyData.shortname = registeredName
    companyData.streetname = streetHouseNumber
    companyData.city = city
    companyData.zipcode = postalCode
    companyData.countryAlpha2Code = country
    //addCompanyData(companyData)
    dispatch(saveCompanyDetailsWithAddress({applicationId, companyData}))
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
            <div className={`form-search ${bpnErrorMsg ? 'error' : ''}`}>
              <label> {t('registrationStepOne.seachDatabase')}</label>
              <SearchInput
                className="search-input"
                value={search}
                onChange={(expr) => onSearchChange(expr)}
              />
              <label>{bpnErrorMsg}</label>
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
              <input
                type="text"
                value={legalEntity}
                onChange={(e) => setLegalEntity(e.target.value)}
              />
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
              <input
                type="text"
                value={registeredName}
                onChange={(e) => setRegisteredName(e.target.value)}
              />
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
              <input
                type="text"
                value={streetHouseNumber}
                onChange={(e) => setStreetHouseNumber(e.target.value)}
              />
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div className="col-4 form-data">
              <label> {t('registrationStepOne.postalCode')} </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(parseInt(e.target.value))}
              />
            </div>

            <div className="col-8 form-data">
              <label>{t('registrationStepOne.city')}</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div className="form-data">
              <label>{t('registrationStepOne.country')}</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
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
  addCompanyData: (companyData: CompanyDetails) => {
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
