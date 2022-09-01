import { IPreviewProps } from 'react-dropzone-uploader'
import { ProgressBar } from 'react-bootstrap'
import { FileUploadStatus, FileUploadVariant } from '../types/MainTypes'
import { useTranslation } from 'react-i18next'

interface DragdropFilesProps {
  props: IPreviewProps
}

export const DragdropFiles = ({ props }: DragdropFilesProps) => {
  const { t } = useTranslation()

  const getStatusText = (status: string, percent?: number) => {
    switch (status) {
      case FileUploadStatus.DONE:
        return t('documentUpload.uploadStatusDone')
      case FileUploadStatus.UPLOADING:
        return `${t('documentUpload.uploadStatusUploading')} ${percent}%`
      case FileUploadStatus.ERROR_UPLOAD:
        return t('documentUpload.uploadStatusError')
      case FileUploadStatus.ERROR_UPLOAD_PARAMS:
        return t('documentUpload.uploadStatusError')
      default:
        return ''
    }
  }

  const getStatusTextColor = (status: string) => {
    if (
      status === FileUploadStatus.ERROR_UPLOAD ||
      status === FileUploadStatus.ERROR_UPLOAD_PARAMS
    ) {
      return ' dropzone-overview-file-progress-error'
    } else {
      return ''
    }
  }

  const getProgressVariant = (status: string) => {
    switch (status) {
      case FileUploadStatus.DONE:
        return FileUploadVariant.SUCCESS
      case FileUploadStatus.UPLOADING:
        return FileUploadVariant.PRIMARY
      case FileUploadStatus.ERROR_UPLOAD:
        return FileUploadVariant.DANGER
      case FileUploadStatus.ERROR_UPLOAD_PARAMS:
        return FileUploadVariant.DANGER
      default:
        return ''
    }
  }

  const statusClassName = 'dropzone-overview-file-status'
  const statusTextColor = statusClassName.concat(
    getStatusTextColor(props.meta.status)
  )
  const progressVariant = getProgressVariant(props.meta.status)
  const hasError =
    props.meta.status === 'error_upload' ||
    props.meta.status === 'error_upload_params'
  return (
    <div className="dropzone-overview-files">
      <div className="dropzone-overview-file">
        <div className="dropzone-overview-file-name">{props.meta.name}</div>
        <div className={statusTextColor}>
          {getStatusText(props.meta.status, props.meta.percent)}
        </div>
        <ProgressBar
          variant={progressVariant}
          now={props.meta.percent ? props.meta.percent : 100}
          className="dropzone-overview-file-progress"
        />
      </div>
      <div
        className={
          !hasError ? 'dropzone-overview-remove' : 'dropzone-overview-restart'
        }
        onClick={
          !hasError ? props.fileWithMeta.remove : props.fileWithMeta.restart
        }
      ></div>
    </div>
  )
}

export default DragdropFiles
