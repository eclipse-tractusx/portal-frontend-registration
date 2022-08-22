import { RequestState } from '../../../types/MainTypes'

export const DocumentType = {
  CX_FRAME_CONTRACT: 'CX_FRAME_CONTRACT',
  COMMERCIAL_REGISTER_EXTRACT: 'COMMERCIAL_REGISTER_EXTRACT',
  APP_CONTRACT: 'APP_CONTRACT',
  DATA_CONTRACT: 'DATA_CONTRACT',
}

export type DocumentData = {
  documentId: string
  documentName: string
  temporaryId?: string
  status?: string
  progress?: number
}

export type DocumentsState = {
  documents: DocumentData[]
  request: RequestState
  uploadRequest: RequestState
  deleteRequest: RequestState
  error: string
}

export const DocumentDataValue = {
  documentId: '',
  documentName: '',
}
