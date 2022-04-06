import { Container, Row, Col } from 'react-bootstrap'
import Footer from './footer'
import BulletList from './bulletList'
import Header from './cax-header'
import Button from './button'
import { useTranslation } from 'react-i18next'
import { withRouter, useHistory, Link } from 'react-router-dom'

export const Landing = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const onClick = () => {
    history.push('/form')
  }
  return (
    <Container>
      <Header />
      <Row>
        <Col>
          <div className="mx-auto col-9 container-body">
            <h4>{t('landing.greetingMsg')}</h4>
            <h6 className="col-8">{t('landing.heading1')}</h6>
            <Row className="content">
              <Col>
                <BulletList text={t('landing.point1')} />
                <BulletList text={t('landing.point2')} />
                <BulletList text={t('landing.point3')} />
                <Button
                  label={t('landing.buttonText1')}
                  styleClass="button btn-primaryCax"
                  handleClick={() => onClick()}
                />
              </Col>
              <Col className="d-flex align-items-center justify-content-center">
                <img src="/ID_Card.png" alt="" />
              </Col>
            </Row>
          </div>
          <div className="mx-auto col-9 d-flex align-items-center justify-content-center info small-info">
            <span className="">
              {t('landing.footerText1')}{' '}
              <Link to="/form">{t('landing.footerText2')}</Link>.
            </span>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  )
}
export default withRouter(Landing)
