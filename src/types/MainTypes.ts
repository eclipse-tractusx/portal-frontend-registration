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
  NONE,
  SUBMIT,
  OK,
  ERROR,
}
