import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { DocumentType } from './types'

const fetchDocuments = createAsyncThunk(
  'registration/application/user/fetchDocuments',
  async (applicationId: string) => {
    try {
      return await Api.getInstance().getDocuments(
        applicationId,
        DocumentType.COMMERCIAL_REGISTER_EXTRACT,
      )
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Unable to load documents. Please contact the administrator.')
    }
  }
)

const saveDocument = createAsyncThunk(
  `registration/application/companyDetailsWithAddress/save`,
  async ({
    applicationId,
    document,
  }: {
    applicationId: string
    document: any
  }) => {
    try {
      return await Api.getInstance().postDocument(
        applicationId,
        DocumentType.COMMERCIAL_REGISTER_EXTRACT,
        document.file
      )
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Unable to save documents. Please contact the administrator.')
    }
  }
)

const deleteDocument = createAsyncThunk(
  `registration/application/document/delete`,
  async (documentId: string) => {
    try {
      return await Api.getInstance().deleteDocument(documentId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(
        'Unable to delete documents. Please contact the administrator.'
      )
    }
  }
)

export { fetchDocuments, saveDocument, deleteDocument }
