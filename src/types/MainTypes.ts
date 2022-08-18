import { IFileWithMeta } from 'react-dropzone-uploader'

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
  | { stats: 'done'; file: IFileWithMeta }
  | { stats: 'rejected_file_type'; remove?: () => void }
  | { stats: 'error_file_size'; remove: () => void }
