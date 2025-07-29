/********************************************************************************
 * Copyright (c) 2025 Cofinity-X GmbH
 *
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
import { useTranslation } from 'react-i18next'
import { useState, useCallback, useEffect } from 'react'
import { FooterButton } from './footerButton'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'
import {
  addCurrentStep,
  getCurrentStep,
} from '../state/features/user/userApiSlice'
import { Notify } from './Snackbar'
import StepHeader from './StepHeader'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { useValidateDidMutation } from '../state/features/applicationWallet/applicationWalletApiSlice'
import { DataErrorCodes } from '../helpers/DataError'

export const WalletCax = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [message, setMessage] = useState('')

  const currentActiveStep = useSelector(getCurrentStep)

  const [nextClicked, setNextClicked] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [did, setDid] = useState('')
  const [
    validateDidTrigger,
    { error: didValidationError, isLoading: isValidating },
  ] = useValidateDidMutation()
  const didTrimmed = did.trim()
  const isNextDisabled = isChecked && didTrimmed.length === 0
  const LS_KEY_WALLET_DID = 'registration.wallet.did'

  const backClick = useCallback(() => {
    dispatch(addCurrentStep(currentActiveStep - 1))
  }, [dispatch, currentActiveStep])

  const handleCheckboxChange = useCallback((e) => {
    const checked = e.target.checked
    setIsChecked(checked)
    if (!checked) {
      setDid('')
    }
  }, [])

  const handleDidChange = useCallback((e) => {
    setDid(e.target.value)
  }, [])

  useEffect(() => {
    const stored = window.localStorage.getItem(LS_KEY_WALLET_DID) || ''
    setDid(stored)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(LS_KEY_WALLET_DID, did)
  }, [did])

  const nextClick = useCallback(async () => {
    if (isNextDisabled) return
    if (loading) return
    setNextClicked(true)
    try {
      if (isChecked) {
        setLoading(true)
        await validateDidTrigger(didTrimmed).unwrap()
      }
      dispatch(addCurrentStep(currentActiveStep + 1))
    } catch (err) {
      //backend is sending 400 as response whenever an invalid DID is being given
      if (err.status == 400) {
        setMessage(t('wallet.didValidationFailed'))
      }

      DataErrorCodes.includes(err.status)
        ? setMessage(t(`ErrorMessage.${err.status}`))
        : setMessage(t('ErrorMessage.default'))
      setApiError(true)
      setLoading(false)
    }
  }, [
    isNextDisabled,
    validateDidTrigger,
    didTrimmed,
    dispatch,
    currentActiveStep,
  ])

  const [notifyError, setNotifyError] = useState(false)
  useEffect(() => {
    if (nextClicked && (didValidationError || apiError)) {
      setNotifyError(true)
    } else {
      setNotifyError(false)
    }
  }, [nextClicked, didValidationError, apiError])

  const renderSnackbar = () => {
    return <Notify message={message} />
  }

  const issuerId = (ENV as any).ISSUER_ID

  return (
    <>
      <div className="mx-auto col-9 container-registration">
        <StepHeader
          step={currentActiveStep}
          stepName={t('wallet.title')}
          stepDescription={t('wallet.subtitle')}
          additionalDescription={t('wallet.optional')}
          className="wallet-header"
        />
        <div className="mx-auto col-9">
          <FormGroup className="col-12 wallet-page-checkbox">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  inputProps={{ 'aria-label': t('wallet.userAgreementText') }}
                />
              }
              label={t('wallet.userAgreementText')}
            />
          </FormGroup>
          <Row className="col-12">
            <label htmlFor="wallet-did" className="did-label">
              {t('wallet.didLabel')}
            </label>
            <TextField
              id="wallet-did"
              value={did}
              onChange={handleDidChange}
              disabled={!isChecked}
              placeholder="did:web:<URI>"
              variant="filled"
              className="did-input"
              error={false}
              helperText=" "
              fullWidth
            />
            {isChecked && (
              <div className="issuer-cred-info-container">
                <div className="issuer-cred-info">
                  {t('wallet.issuerCredsInfo')}
                </div>
                <span className="issuer-cred-id">{issuerId}</span>{' '}
              </div>
            )}
          </Row>
        </div>
      </div>

      <FooterButton
        labelNext={loading ? t('button.validating') : t('button.next')}
        labelBack={t('button.back')}
        handleBackClick={backClick}
        handleNextClick={nextClick}
        loading={loading}
        disabled={isNextDisabled || isValidating}
        helpUrl={
          '/documentation/?path=user%2F01.+Onboarding%2F02.+Registration%2F02.+Add+Company+Data.md'
        }
      />
      {notifyError && renderSnackbar()}
    </>
  )
}
