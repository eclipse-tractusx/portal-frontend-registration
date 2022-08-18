import React from 'react'
import { ILayoutProps } from 'react-dropzone-uploader'
import { useTranslation } from 'react-i18next'

interface CustomLayoutProps extends ILayoutProps {
  error: boolean
}

function DragdropLayout(props: CustomLayoutProps) {
  const { t } = useTranslation()

  return (
    <div>
      <div {...props.dropzoneProps}>{props.input}</div>
      {props.error && (
        <div className="text-danger ms-4 mt-2 fw-bold">
          {t('documentUpload.dragDropErrorMessage')}
        </div>
      )}
    </div>
  )
}

export default DragdropLayout
