/********************************************************************************
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { Row } from 'react-bootstrap'
import SearchInput from 'react-search-input'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'

interface CompanyDataFormProps {
  bpn: string
  bpnErrorMsg: string | null
  legalEntity: string
  registeredName: string
  errors: {
    legalEntity: string | null
    registeredName: string | null
  }
  validateLegalEntity: (
    value: string,
    setLegalEntity: (value: string) => void,
    setErrors: (errors: any) => void
  ) => void
  validateRegisteredName: (
    value: string,
    setRegisteredName: (value: string) => void,
    setErrors: (errors: any) => void
  ) => void
  setLegalEntity: (value: string) => void
  setRegisteredName: (value: string) => void
  setErrors: (errors: any) => void
  isBPN: (expr: string) => boolean
  fetchData: (expr: string) => Promise<void>
  setFields: (fields: any) => void
  setBpnErrorMessage: (message: string) => void
}
const CompanyDataForm: React.FC<CompanyDataFormProps> = ({
  bpn,
  bpnErrorMsg,
  legalEntity,
  registeredName,
  errors,
  validateLegalEntity,
  validateRegisteredName,
  setLegalEntity,
  setRegisteredName,
  setErrors,
  isBPN,
  fetchData,
  setFields,
  setBpnErrorMessage,
}) => {
  const { t } = useTranslation()
  const onSearchChange = (expr: string) => {
    if (isBPN(expr?.trim())) {
      fetchData(expr).catch((errorCode: number) => {
        setFields(null)
        setBpnErrorMessage(t('registrationStepOne.bpnNotExistError'))
      })
      setBpnErrorMessage('')
    } else {
      setBpnErrorMessage(t('registrationStepOne.bpnInvalidError'))
    }
  }
  return (
    <>
      <Row className="mx-auto col-9">
        <div className={`form-search ${bpnErrorMsg ? 'error' : ''}`}>
          <label> {t('registrationStepOne.seachDatabase')}</label>
          <SearchInput
            className="search-input"
            value={''}
            onChange={(expr) => {
              onSearchChange(expr)
            }}
          />
          <label className="error-message">{bpnErrorMsg}</label>
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
              data-tip={t('registrationStepOne.bpnTooltip')}
            />
          </label>
          <input type="text" disabled value={bpn} />
          <div className="company-hint">
            {t('registrationStepOne.helperText')}
          </div>
        </div>
      </Row>

      <Row className="mx-auto col-9">
        <div className={`form-data ${errors.legalEntity && 'error'}`}>
          <label>
            {' '}
            {t('registrationStepOne.legalEntity')}{' '}
            <span className="mandatory-asterisk">*</span>
            <AiOutlineQuestionCircle
              color="#939393"
              data-tip={t('registrationStepOne.legalEntityTooltip')}
            />{' '}
          </label>
          <input
            type="text"
            value={legalEntity}
            onChange={(e) => {
              validateLegalEntity(e.target.value, setLegalEntity, setErrors)
            }}
            onBlur={(e) => {
              setLegalEntity(e.target.value.trim())
            }}
          />
          {errors.legalEntity && (
            <label>{t(`registrationStepOne.${errors.legalEntity}`)}</label>
          )}
        </div>
      </Row>

      <Row className="mx-auto col-9">
        <div className={`form-data ${errors.registeredName && 'error'}`}>
          <label>
            {' '}
            {t('registrationStepOne.registeredName')}{' '}
            <span className="mandatory-asterisk">*</span>
          </label>
          <input
            type="text"
            value={registeredName}
            onChange={(e) => {
              validateRegisteredName(
                e.target.value,
                setRegisteredName,
                setErrors
              )
            }}
            onBlur={(e) => {
              setRegisteredName(e.target.value.trim())
            }}
          />
          {errors.registeredName && (
            <label>{t(`registrationStepOne.${errors.registeredName}`)}</label>
          )}
        </div>
      </Row>
    </>
  )
}

export default CompanyDataForm
