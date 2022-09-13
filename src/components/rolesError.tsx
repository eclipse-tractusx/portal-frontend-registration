import React from 'react'
import { useTranslation } from 'react-i18next'

function RolesError() {
  const { t } = useTranslation()

  return (
    <div className="roles-error-container">
      <h4>{t('companyRole.NoRolesError1')}</h4>
      <h4>
        {t('companyRole.Please')} <span>{t('companyRole.Retry')}</span>{' '}
        {t('companyRole.NoRolesError2')}{' '}
      </h4>
    </div>
  )
}

export default RolesError
