import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import Footer from './footer'
import Header from './cax-header'
import Button from './button'
import UserService from '../services/UserService'

export const RegistrationClosed = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Header />
      <Row>
        <Col>
          <div className="mx-auto container-body registration-close-content">
            <h6 className='mb-4'>{t('registrationClosed.heading1')}</h6>
            <h6>{t('registrationClosed.heading2')}</h6>
            <Row className="content">
              <Col>
                <Button
                  label={t('registrationClosed.close')}
                  styleClass="button btn-primaryCax"
                  handleClick={() => UserService.doLogout()}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  )
}
export default withRouter(RegistrationClosed)