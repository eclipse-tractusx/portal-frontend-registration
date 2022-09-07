import Dropzone, { IFileWithMeta } from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { IState } from '../state/features/user/redux.store.types'
import { addCurrentStep } from '../state/features/user/action'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DragdropFiles } from './dragdropFiles'
import DragdropLayout from './dragdropLayout'
import DragdropInput from './dragdropInput'
import DragdropContent from './dragdropContent'
import { applicationSelector } from '../state/features/application/slice'
import { stateSelector } from '../state/features/applicationDocuments/slice'
import {
  fetchDocuments,
  saveDocument,
  deleteDocument,
  fetchDocumentByDocumentId,
} from '../state/features/applicationDocuments/actions'
import '../styles/newApp.css'
import { DocumentData } from '../state/features/applicationDocuments/types'
import { FileStatus, FileStatusValue, RequestState } from '../types/MainTypes'
import { VERIFY } from '../state/features/application/types'
import { updateStatus } from '../state/features/application/actions'
import { v4 as uuidv4 } from 'uuid'

interface DragDropProps {
  currentActiveStep: number
}

const getClassNameByStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 'primary'
    case 'error':
      return 'danger'
    default:
      return 'success'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Uploading...'
    case 'error':
      return 'Error'
    default:
      return 'Completed'
  }
}

export const DragDrop = ({ currentActiveStep }: DragDropProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { status, error } = useSelector(applicationSelector)
  const [fileError, setFileError] = useState(false)
  const obj = status[status.length - 1]
  const applicationId = obj['applicationId']

  if (error) {
    toast.error(error)
  }

  const { documents, uploadRequest, deleteRequest } = useSelector(stateSelector)

  if (deleteRequest === RequestState.OK) {
    toast.success(t('documentUpload.deleteSuccess'))
  } else if (deleteRequest === RequestState.ERROR) {
    toast.error(t('documentUpload.deleteError'))
  }

  useEffect(() => {
    dispatch(fetchDocuments(applicationId))
  }, [dispatch, deleteRequest, uploadRequest])

  const manageFileStatus = (fileDetails: FileStatus) => {
    switch (fileDetails.stats) {
      case 'done':
        setFileError(false)
        dispatch(
          saveDocument({
            applicationId,
            document: fileDetails.file,
            temporaryId: uuidv4(),
          })
        )
        break
      case 'rejected_file_type':
      case 'error_file_size':
        setFileError(true)
        fileDetails.remove && fileDetails.remove()
        break
      default:
        break
    }
  }

  // Return the current status of files being uploaded
  const handleChangeStatus = (
    { file, remove }: IFileWithMeta,
    stats: FileStatusValue
  ) => {
    manageFileStatus({ stats, file, remove })
  }

  const backClick = () => {
    dispatch(addCurrentStep(currentActiveStep - 1))
  }

  const nextClick = () => {
    if (obj) {
      const statusData = { id: obj['applicationId'], status: VERIFY }
      dispatch(updateStatus(statusData))
    }
    dispatch(addCurrentStep(currentActiveStep + 1))
  }

  const deleteDocumentFn = (documentId) => {
    dispatch(deleteDocument(documentId))
  }

  const handleDownloadDocument = async (
    documentId: string,
    documentName: string
  ) => {
    dispatch(fetchDocumentByDocumentId({ documentId, documentName }))
  }

  return (
    <>
      <div className="mx-auto col-9 container-registration">
        <div className="head-section">
          <div className="mx-auto step-highlight d-flex align-items-center justify-content-center">
            4
          </div>
          <h4 className="mx-auto d-flex align-items-center justify-content-center">
            {t('documentUpload.title')}
          </h4>
          <div className="mx-auto text-center col-9">
            {t('documentUpload.subTitle')}
          </div>
        </div>
        <div className="companydata-form mx-auto col-9">
          <Dropzone
            onChangeStatus={handleChangeStatus}
            LayoutComponent={(props) => (
              <DragdropLayout {...props} error={fileError} />
            )}
            inputContent={<DragdropContent />}
            inputWithFilesContent={t('documentUpload.title')}
            submitButtonContent={t('documentUpload.upload')}
            maxFiles={3}
            accept=".pdf"
            maxSizeBytes={8000000}
            InputComponent={DragdropInput}
            PreviewComponent={(props) => <DragdropFiles props={props} />}
          />
        </div>
        <div className="documentsData mx-auto col-9 mt-4">
          {documents.map((document: DocumentData) => (
            <div className="dropzone-overview-files" key={uuidv4()}>
              <div className="dropzone-overview-file">
                <div
                  onClick={() =>
                    handleDownloadDocument(
                      document.documentId,
                      document.documentName
                    )
                  }
                  className="dropzone-overview-file-name"
                >
                  {document.documentName}
                </div>
                <div className="dropzone-overview-file-status">
                  {`${getStatusText(document.status)} ${
                    document.progress && document?.progress !== 100
                      ? document?.progress
                      : ''
                  }`}
                </div>
                <div className="progress">
                  <div
                    role="progressbar"
                    className={`progress-bar bg-${getClassNameByStatus(
                      document.status
                    )}`}
                    style={{
                      width: `${document?.progress}%`,
                      animationDirection: 'reverse',
                    }}
                  ></div>
                </div>
              </div>
              <div
                className="dropzone-overview-remove"
                onClick={() => deleteDocumentFn(document.documentId)}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <FooterButton
        labelBack={t('button.back')}
        labelNext={t('button.next')}
        handleBackClick={() => backClick()}
        handleNextClick={() => nextClick()}
      />
    </>
  )
}

export default withRouter(
  connect((state: IState) => ({
    currentActiveStep: state.user.currentStep,
  }))(DragDrop)
)
