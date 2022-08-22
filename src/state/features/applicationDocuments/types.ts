import { RequestState } from '../../../types/MainTypes'

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
  error: string
}

export const DocumentDataValue = {
  documentId: '',
  documentName: '',
}
