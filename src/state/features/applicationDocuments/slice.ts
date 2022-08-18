import { createSlice } from '@reduxjs/toolkit'
import { RequestState } from '../../../types/MainTypes'
import { RootState } from '../../store'
import { fetchDocuments, saveDocument } from './actions'
import { DocumentsState } from './types'

const initialState: DocumentsState = {
  documents: [],
  request: RequestState.NONE,
  uploadRequest: RequestState.NONE,
  error: null,
}

const documentSlice = createSlice({
  name: 'registration/application/user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch documents
    builder.addCase(fetchDocuments.pending, (state) => ({
      ...state,
      documents: [],
      request: RequestState.SUBMIT,
      uploadRequest: RequestState.NONE,
      error: '',
    }))
    builder.addCase(fetchDocuments.fulfilled, (state, { payload }) => ({
      ...state,
      documents: payload || [],
      request: RequestState.OK,
      uploadRequest: RequestState.NONE,
      error: '',
    }))
    builder.addCase(fetchDocuments.rejected, (state, action) => ({
      ...state,
      documents: [],
      request: RequestState.ERROR,
      uploadRequest: RequestState.NONE,
      error: action.error.message as string,
    }))
    builder.addCase(saveDocument.pending, (state, action) => {
      return {
        ...state,
        uploadRequest: RequestState.SUBMIT,
        error: '',
        documents: [
          {
            status: 'pending',
            documentId: '',
            documentName: action.meta.arg.document.name,
            temporaryId: action.meta.arg.temporaryId,
          },
          ...state.documents,
        ],
      }
    })
    builder.addCase(saveDocument.fulfilled, (state, action) => ({
      ...state,
      uploadRequest: RequestState.OK,
      error: '',
      documents: state.documents.map((doc) => {
        if (doc?.temporaryId === action.meta.arg.temporaryId) {
          return {
            ...doc,
            status: 'success',
          }
        }
        return doc
      }),
    }))
    builder.addCase(saveDocument.rejected, (state, action) => {
      return {
        ...state,
        uploadRequest: RequestState.ERROR,
        error: action.error.message as string,
        documents: state.documents.map((doc) => {
          if (doc?.temporaryId === action.meta.arg.temporaryId) {
            return {
              ...doc,
              status: 'error',
            }
          }
          return doc
        }),
      }
    })
  },
})

export const stateSelector = (state: RootState): DocumentsState =>
  state.document

export default documentSlice
