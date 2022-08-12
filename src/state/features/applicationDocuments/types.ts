import { RequestState } from '../../../types/MainTypes'

export type DocumentData = {
  documentId: string
  documentName: string
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
