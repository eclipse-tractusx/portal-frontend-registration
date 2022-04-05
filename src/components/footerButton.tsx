import * as React from 'react'
import { Row } from 'react-bootstrap'
import Button from './button'
import FooterHeadline from './footerHeadline'

export const FooterButton = ({
  labelBack,
  labelNext,
  handleBackClick,
  handleNextClick,
  tooltip = null,
}) => {
  return (
    <div className="mx-auto col-9 info">
      <Row>
        <FooterHeadline />
        <div className="col12 d-flex align-items-center justify-content-center button-section">
          <Button
            styleClass="button btn-default"
            label={labelBack}
            handleClick={handleBackClick}
          />
          <Button
            label={labelNext}
            styleClass={
              tooltip ? 'button btn-disabledCax' : 'button btn-primaryCax'
            }
            handleClick={handleNextClick}
            showTooltip={tooltip ? true : false}
            tooltipText={tooltip}
          />
        </div>
      </Row>
    </div>
  )
}

export default FooterButton
