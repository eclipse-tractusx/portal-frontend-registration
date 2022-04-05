import { withRouter, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const FooterHeadline = () => {
  const { t } = useTranslation()

  return (
    <div className="col12 d-flex align-items-center justify-content-center">
      {t('FooterContent.Footer1')} {t('FooterContent.Footer2')} &nbsp;
      <Link to="/help"> {t('FooterContent.FooterLink')}</Link>
      {t('FooterContent.Footer3')}
    </div>
  )
}
export default withRouter(FooterHeadline)
