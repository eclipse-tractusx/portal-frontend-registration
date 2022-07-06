import { Container, Row, Col } from 'react-bootstrap'
import Footer from './footer'
import Header from './cax-header'
import SearchInput from 'react-search-input'
import { withRouter } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Help = () => {
    const { t } = useTranslation()
    const [search, setSearch] = useState('')

    const onSearchChange = (value: string) => {
        console.log('value', value)
    }

    return (
        <Container>
            <Header />
            <Row>
                <Col>
                    <div className="mx-auto col-10">
                        <h4 className="text-center">{t('help.title')}</h4>
                        <p>{t('help.helpText1')}.</p>
                        <div>{t('help.helpText2')}</div>
                        <div>{t('help.help')}</div>
                    </div>
                </Col>
            </Row>
            <Row className="mx-auto col-6">
                <SearchInput
                    className="input-search"
                    value={search}
                    onChange={(value) => onSearchChange(value)}
                />
            </Row>
            <Footer />
        </Container >
    )
}

export default withRouter(Help)