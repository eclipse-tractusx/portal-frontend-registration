/********************************************************************************
 * Copyright (c) 2022 Microsoft and BMW Group AG
 * Copyright (c) 2022 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import Dropzone, { type IFileWithMeta } from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './footerButton'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DragdropFiles } from './dragdropFiles'
import DragdropLayout from './dragdropLayout'
import DragdropInput from './dragdropInput'
import DragdropContent from './dragdropContent'
import '../styles/newApp.css'
import { type DocumentData } from '../state/features/applicationDocuments/types'
import { type FileStatus, type FileStatusValue } from '../types/MainTypes'
import { v4 as uuidv4 } from 'uuid'
import {
  ApplicationStatus,
  useFetchApplicationsQuery,
  useUpdateStatusMutation,
} from '../state/features/application/applicationApiSlice'
import {
  addCurrentStep,
  getCurrentStep,
} from '../state/features/user/userApiSlice'
import {
  useFetchDocumentByDocumentIdMutation,
  useFetchDocumentsQuery,
  useRemoveDocumentMutation,
  useUpdateDocumentMutation,
} from '../state/features/applicationDocuments/applicationDocumentsApiSlice'
import { downloadDocument } from '../helpers/utils'
import { Notify, SeverityType } from './Snackbar'
import StepHeader from './StepHeader'

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

export const DragDrop = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { data: status } = useFetchApplicationsQuery()
  const obj = status?.[status.length - 1]
  const applicationId = obj?.applicationId
  const MAX_FILES = 3
  const [fileError, setFileError] = useState('')
  const [deleteDocResponse, setDeleteDocResponse] = useState({
    severity: SeverityType.ERROR,
    message: '',
  })

  const currentActiveStep = useSelector(getCurrentStep)
  const { data: documents, error: documentError } =
    useFetchDocumentsQuery(applicationId)
  const [fetchDocumentByDocumentId] = useFetchDocumentByDocumentIdMutation()
  const [updateStatus] = useUpdateStatusMutation()
  const [updateDocument] = useUpdateDocumentMutation()
  const [removeDocument] = useRemoveDocumentMutation()
  const [maxFiles, setMaxFiles] = useState(MAX_FILES)

  useEffect(() => {
    if (documents?.length >= 0) {
      const currentMaxFiles =
        documents?.length > 0 ? MAX_FILES - documents?.length : MAX_FILES
      setMaxFiles(currentMaxFiles)

      documents?.length === MAX_FILES &&
        setFileError(
          t('documentUpload.dragDropExceedFilesCountErrorMsg', { MAX_FILES })
        )
    }
  }, [documents])

  const manageFileStatus = async (fileDetails: FileStatus) => {
    switch (fileDetails.stats) {
      case 'done':
        setFileError('')
        await updateDocument({
          applicationId,
          body: { file: fileDetails.file },
        }).unwrap()
        setMaxFiles((prev) => prev - 1)
        break
      case 'rejected_file_type':
        setFileError(t('documentUpload.dragDropDocumentTypeErrorMsg'))
        break
      case 'error_file_size':
        setFileError(t('documentUpload.dragDropExceedSizeErrorMsg'))
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

  const nextClick = async () => {
    if (obj) {
      const statusData = {
        id: obj.applicationId,
        status: ApplicationStatus.VERIFY,
      }
      await updateStatus(statusData).unwrap()
    }
    dispatch(addCurrentStep(currentActiveStep + 1))
  }

  const deleteDocumentFn = async (documentId) => {
    setDeleteDocResponse({ severity: SeverityType.ERROR, message: '' })
    await removeDocument(documentId)
      .unwrap()
      .then(() => {
        setDeleteDocResponse({
          severity: SeverityType.SUCCESS,
          message: t('documentUpload.deleteSuccess'),
        })
        setMaxFiles((prev) => prev + 1)
        setFileError('')
      })
      .catch((errors: any) => {
        console.log('errors', errors)
        setDeleteDocResponse({
          severity: SeverityType.ERROR,
          message: t('documentUpload.deleteError'),
        })
      })
  }

  const handleDownloadDocument = async (
    documentId: string,
    documentName: string
  ) => {
    try {
      const response = await fetchDocumentByDocumentId(documentId).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data

      downloadDocument(file, fileType, documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const renderSnackbar = () => {
    let message = t('registration.apiError')
    if (deleteDocResponse.message) message = deleteDocResponse.message
    return <Notify message={message} />
  }

  return (
    <>
      <div className="mx-auto col-9 container-registration">
        <StepHeader
          step={currentActiveStep}
          stepName={t('documentUpload.title')}
          stepDescription={t('documentUpload.subTitle')}
        />
        <div className="companydata-form mx-auto col-9">
          <Dropzone
            onChangeStatus={handleChangeStatus}
            LayoutComponent={(props) => (
              <DragdropLayout
                {...props}
                error={fileError}
              />
            )}
            inputContent={<DragdropContent />}
            inputWithFilesContent={t('documentUpload.title')}
            submitButtonContent={t('documentUpload.upload')}
            maxFiles={maxFiles}
            accept=".pdf"
            maxSizeBytes={1000000}
            InputComponent={DragdropInput}
            PreviewComponent={(props) => <DragdropFiles props={props} />}
            disabled={maxFiles === 0}
          />
        </div>
        <div className="documentsData mx-auto col-9 mt-4">
          {documents?.map((document: DocumentData) => (
            <div className="dropzone-overview-files" key={uuidv4()}>
              <div className="dropzone-overview-file">
                <div
                  className="dropzone-overview-file-name"
                  onClick={() =>
                    handleDownloadDocument(
                      document.documentId,
                      document.documentName
                    )
                  }
                  onKeyDown={() => {
                    // do nothing
                  }}
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
                onKeyDown={() => {
                  // do nothing
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      {(documentError ?? deleteDocResponse.message) && renderSnackbar()}
      <FooterButton
        labelBack={t('button.back')}
        labelNext={t('button.next')}
        handleBackClick={() => {
          backClick()
        }}
        disabled={documents?.length === 0}
        handleNextClick={() => nextClick()}
        helpUrl={
          '/documentation/?path=user%2F01.+Onboarding%2F02.+Registration%2F05.+Document+Upload.md'
        }
      />
    </>
  )
}
