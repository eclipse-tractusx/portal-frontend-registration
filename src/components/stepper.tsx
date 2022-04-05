import { Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { IState } from '../types/store/redux.store.types'
import { stepNames } from '../helpers/steps'
interface StepperProps {
  currentActiveStep: number
}

export const Stepper: FC<StepperProps> = ({ currentActiveStep }) => {
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
                      <img src="./tick.svg" alt="tick" />
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

export default connect((state: IState) => ({
  currentActiveStep: state.user.currentStep,
}))(Stepper)
