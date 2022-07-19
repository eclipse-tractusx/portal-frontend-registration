import Dropzone, { IFileWithMeta } from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { IState } from '../state/features/user/redux.store.types'
import { addCurrentStep, addFileNames } from '../state/features/user/action'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DragdropFiles } from './dragdropFiles'
import { applicationSelector } from '../state/features/application/slice'
import { stateSelector } from '../state/features/applicationDocuments/slice'
import { fetchDocuments, saveDocument } from '../state/features/applicationDocuments/actions'
import '../styles/newApp.css'
import { DocumentData } from '../state/features/applicationDocuments/types'

interface DragDropProps {
  currentActiveStep: number
}

export const DragDrop = ({
  currentActiveStep
}: DragDropProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { status, error } = useSelector(applicationSelector)
  const obj = status[status.length-1] //.find(o => o['applicationStatus'] === CREATED);
  const applicationId = obj['applicationId'];
  if (error) {
    toast.error(error)
  }

  const { documents } = useSelector(stateSelector)

  console.log('documents', documents)

  useEffect(() => {
    dispatch(fetchDocuments(applicationId));
  }, [dispatch])

  // Return the current status of files being uploaded
  const handleChangeStatus = ({ meta, file }, stats) => {
    console.log(stats, meta, file)
    stats === 'done' ? 
    (
      file.type !== 'application/pdf' 
      ?
      toast.error('Only .pdf files are allowed') 
      : ''
    )
    : ''
  }

  // Return array of uploaded files after submit button is clicked
  const handleSubmit = async (files: IFileWithMeta[], allFiles) => {
    console.log('allFiles', allFiles)
    if (files.length > 2) {
      toast.error('Cannot upload more than two files')
      return
    }
    files.forEach((document) => dispatch(saveDocument({applicationId, document})))
    dispatch(addFileNames(files.map((file) => file.file.name)))
    toast.success('All files uploaded')
  }

  const backClick = () => {
    dispatch(addCurrentStep(currentActiveStep - 1))
  }

  const nextClick = () => {
    dispatch(addCurrentStep(currentActiveStep + 1))
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
            onSubmit={handleSubmit}
            accept="image/*,.pdf"
            inputContent={t('documentUpload.dragDropMessage')}
            inputWithFilesContent={t('documentUpload.title')}
            submitButtonContent={t('documentUpload.upload')}
            maxFiles={3}
            PreviewComponent={props => <DragdropFiles props={props} />}
          />
        </div>
        <div className="documentsData mx-auto col-9 mt-4">
          {
            documents.map((document: DocumentData, index) => 
              <div className="dropzone-overview-files" key={index}>
                <div className="dropzone-overview-file">
                    <div className="dropzone-overview-file-name">{document.documentName}</div>
                    <div className="dropzone-overview-file-status">Completed</div>
                    <div className="dropzone-overview-file-progress progress">
                    <div role="progressbar" className="progress-bar bg-success"></div></div>
                </div>
                <div className="dropzone-overview-remove"></div>
              </div>
            )
          }
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
  connect(
    (state: IState) => ({
      currentActiveStep: state.user.currentStep,
    })
  )(DragDrop)
)
