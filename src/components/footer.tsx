import { Row, Navbar, Nav, Container } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <Row>
      <div className="footer-container flex-column d-flex align-items-center justify-content-center">
        <div>
          <Navbar collapseOnSelect expand="lg">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/help">
                    {t('FooterLink.link1')}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/contact">
                    {t('FooterLink.link2')}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/imprint">
                    {t('FooterLink.link3')}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/privacy">
                    {t('FooterLink.link4')}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/termsOfService">
                    {t('FooterLink.link5')}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cookiePolicy">
                    {t('FooterLink.link6')}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/thirdPartyLicenseNotes">
                    {t('FooterLink.link7')}
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div>{t('FooterLink.copyright')}</div>
      </div>
    </Row>
  )
}

export default withRouter(Footer)
