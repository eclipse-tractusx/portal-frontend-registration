import { Container, Row, Col } from 'react-bootstrap'
import Header from './cax-header'
import Footer from './footer'
import BulletList from './bulletList'
import { useTranslation } from 'react-i18next'
import { withRouter, Link } from 'react-router-dom'

export const Finish = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Header />
      <Row>
        <Col>
          <div className="mx-auto col-9 container-body">
            <h4 className="col-10">{t('finish.greetingMsg')}</h4>
            <h6 className="col-8">{t('finish.heading1')}</h6>
            <Row className="content">
              <Col>
                <BulletList text={t('finish.point1')} icon="circle" />
                <BulletList text={t('finish.point2')} icon="circle" />
                <BulletList text={t('finish.point3')} icon="circle" />
              </Col>
              <Col className="d-flex align-items-center justify-content-center">
                <img src="/mail.png" alt="" />
              </Col>
            </Row>
          </div>
          <div className="mx-auto col-9 d-flex align-items-center justify-content-center info small-info">
            <span className="">
              {t('landing.footerText1')}{' '}
              <Link to="/">{t('landing.footerText2')}</Link>.
            </span>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  )
}
export default withRouter(Finish)
