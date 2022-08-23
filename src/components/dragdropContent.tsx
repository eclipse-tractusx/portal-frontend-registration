import React from 'react'
import { useTranslation } from 'react-i18next'

function DragdropContent() {
  const { t } = useTranslation()

  return (
    <div>
      <div>{t('documentUpload.dragDropMessage')}</div>
      <div className="dragdrop-subtitle">
        {t('documentUpload.or')}{' '}
        <span>{t('documentUpload.dragDropSpanCaption')}</span>{' '}
        {t('documentUpload.dragDropCaption')}
      </div>
    </div>
  )
}

export default DragdropContent
