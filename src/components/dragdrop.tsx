import Dropzone, { IFileWithMeta } from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import { connect } from 'react-redux'
import { IState } from '../types/store/redux.store.types'
import { addCurrentStep, addFileNames } from '../actions/user.action'
import { withRouter } from 'react-router-dom'
import { Dispatch } from 'redux'
import { uploadDocument } from '../helpers/utils'
import { toast } from 'react-toastify'
import { DataErrorCodes } from '../helpers/DataError'
import { DragdropFiles } from './dragdropFiles'

interface DragDropProps {
  currentActiveStep: number
  addCurrentStep: (step: number) => void
  addFileNames: (fileNames: string[]) => void
}

export const DragDrop = ({
  currentActiveStep,
  addCurrentStep,
  addFileNames,
}: DragDropProps) => {
  const { t } = useTranslation()

  // Return the current status of files being uploaded
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file)
  }

  // Return array of uploaded files after submit button is clicked
  const handleSubmit = async (files: IFileWithMeta[], allFiles) => {
    if (files.length > 2) {
      toast.error('Cannot upload more than two files')
      return
    }
    console.log(files.map((f) => f.meta))
    const uploadRequests = files.map(async (file) => await uploadDocument(file))
    try {
      const values = await Promise.all<Response>(uploadRequests)
      if (values.every((value) => value.ok)) {
        toast.success('All files uploaded')
        addFileNames(files.map((file) => file.file.name))
      } else {
        if (values.every((val) => val.status === values[0].status)) {
          const errorCode = values[0].status
          const message = DataErrorCodes.includes(errorCode)
            ? t(`ErrorMessage.${errorCode}`)
            : t(`ErrorMessage.default`)

          toast.error(message)
        } else {
          toast.error('Failed to upload files')
        }
      }
    } catch (ex) {
      console.log(ex)
      toast.error('Failed to upload files')
    }
  }

  const backClick = () => {
    addCurrentStep(currentActiveStep - 1)
  }

  const nextClick = () => {
    addCurrentStep(currentActiveStep + 1)
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addCurrentStep: (step: number) => {
    dispatch(addCurrentStep(step))
  },

  addFileNames: (fileNames: string[]) => {
    dispatch(addFileNames(fileNames))
  },
})

export default withRouter(
  connect(
    (state: IState) => ({
      currentActiveStep: state.user.currentStep,
    }),
    mapDispatchToProps
  )(DragDrop)
)
