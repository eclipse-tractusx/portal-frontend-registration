import Button from './button'
import { Container, Row, Col } from 'react-bootstrap'
import Footer from './footer'
import Header from './cax-header'
import { useHistory, withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Contact = () => {
    const { t } = useTranslation()
    const history = useHistory()

    return (
        <Container>
            <Header />
            <Row className="footer-content">
                <Col>
                    <div className="mx-auto col-10">
                        <h4>{t('contact.title')}</h4>
                        <p>{t('contact.contactText1')}.</p>
                        <div>{t('contact.contactText2')}</div>
                        <div className="button-section">
                            <Button
                                label={t('footerPages.Back')}
                                styleClass="button btn-primaryCax"
                                handleClick={() => history.goBack()}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            <Footer />
        </Container>
    )
}

export default withRouter(Contact)