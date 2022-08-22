import { Dispatch } from 'redux'

export enum FileUploadStatus {
  DONE = 'done',
  UPLOADING = 'uploading',
  ERROR_UPLOAD = 'error_upload',
  ERROR_UPLOAD_PARAMS = 'error_upload_params',
}

export enum FileUploadVariant {
  SUCCESS = 'success',
  PRIMARY = 'primary',
  DANGER = 'danger',
}

export enum RequestState {
  NONE = 'none',
  SUBMIT = 'submit',
  OK = 'ok',
  ERROR = 'error',
}

export type FileStatus =
  | { stats: 'done'; file: File }
  | { stats: 'rejected_file_type'; remove?: () => void }
  | { stats: 'error_file_size'; remove: () => void }
  | { stats: 'rejected_max_files'; remove: () => void }

export type FileStatusValue = 'done' | 'rejected_file_type' | 'error_file_size'

export interface ProgressType {
  loaded: number
  total: number
}

export interface PostDocumentType {
  applicationId: string
  documentTypeId: string
  file: File
  handleUpdateProgress: (
    progress: ProgressType,
    dispatch: Dispatch,
    temporaryId: string
  ) => void
  dispatch: Dispatch
  temporaryId: string
}
