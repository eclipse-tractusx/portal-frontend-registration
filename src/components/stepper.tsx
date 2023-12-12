/********************************************************************************
 * Copyright (c) 2021, 2023 Microsoft and BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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
import 'react-datepicker/dist/react-datepicker.css'
import React, { FC, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { IState } from '../state/features/user/redux.store.types'
import { stepNames } from '../helpers/steps'
import { getCurrentStep } from '../state/features/user/userApiSlice'

export const Stepper = () => {
  const currentActiveStep = useSelector(getCurrentStep)
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentActiveStep])

  return (
    <div className="mx-auto col-11 reg-steps">
      <Row className="stepper-wrapper row-cols-5">
        {Object.entries(stepNames).map((element, index) => {
          const stepNumber = +element[0]
          const stepName = element[1]
          return (
            <div key={index} className="stepper-item col">
              <Row className="stepper-row">
                <div
                  className={
                    currentActiveStep >= stepNumber
                      ? 'step-counter step-active col-3'
                      : 'step-counter col-3'
                  }
                >
                  {currentActiveStep > stepNumber ? (
                    <span className="step-tick">
                      <img src="/registration/tick.svg" alt="tick" />
                    </span>
                  ) : (
                    stepNumber
                  )}
                </div>
                <div className="step-name col-9">{stepName}</div>
              </Row>
              <Row>
                <div
                  className={
                    currentActiveStep === stepNumber
                      ? 'step-border col-10 mx-auto'
                      : ''
                  }
                ></div>
              </Row>
            </div>
          )
        })}
      </Row>
    </div>
  )
}