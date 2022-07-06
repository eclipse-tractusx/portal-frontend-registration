import { RequestState } from "../../../types/MainTypes"

export type DocumentData = {
  documentId: string
  documentName: string
}

export type DocumentsState = {
  documents: DocumentData[]
  request: RequestState
  uploadRequest: string
  error: string
}

export const DocumentDataValue = {
  documentId: '',
  documentName: ''
}