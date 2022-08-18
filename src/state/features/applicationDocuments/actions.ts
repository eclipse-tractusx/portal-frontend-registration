import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'

const fetchDocuments = createAsyncThunk(
  'registration/application/user/fetchDocuments',
  async (applicationId: string) => {
    try {
      return await Api.getInstance().getDocuments(
        applicationId,
        'CX_FRAME_CONTRACT'
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
    temporaryId,
  }: {
    applicationId: string
    document: any
    temporaryId: string
  }) => {
    try {
      return await Api.getInstance().postDocument(
        applicationId,
        'CX_FRAME_CONTRACT',
        document
      )
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Unable to save documents. Please contact the administrator.')
    }
  }
)

export { fetchDocuments, saveDocument }
