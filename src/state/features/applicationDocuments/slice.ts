import { createSlice } from '@reduxjs/toolkit'
import { RequestState } from '../../../types/MainTypes'
import { RootState } from '../../store'
import { fetchDocuments, saveDocument, deleteDocument } from './actions'
import { DocumentsState } from './types'

const initialState: DocumentsState = {
  documents: [],
  request: RequestState.NONE,
  uploadRequest: RequestState.NONE,
  deleteRequest: RequestState.NONE,
  error: null,
}

const documentSlice = createSlice({
  name: 'registration/application/user',
  initialState,
  reducers: {
    updateProgressBar: (state, { payload }) => {
      const { percentageProgress, temporaryId } = payload

      const index = state.documents.findIndex(
        (doc) => doc.temporaryId === temporaryId
      )

      state.documents[index].progress = percentageProgress
    },
  },
  extraReducers: (builder) => {
    // fetch documents
    builder.addCase(fetchDocuments.pending, (state) => ({
      ...state,
      request: RequestState.SUBMIT,
      uploadRequest: RequestState.NONE,
      deleteRequest: RequestState.NONE,
      error: '',
    }))
    builder.addCase(fetchDocuments.fulfilled, (state, { payload }) => ({
      ...state,
      documents: payload.data || [],
      request: RequestState.OK,
      uploadRequest: RequestState.NONE,
      deleteRequest: RequestState.NONE,
      error: '',
    }))
    builder.addCase(fetchDocuments.rejected, (state, action) => ({
      ...state,
      documents: [],
      request: RequestState.ERROR,
      uploadRequest: RequestState.NONE,
      deleteRequest: RequestState.NONE,
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
            progress: 0,
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
      deleteRequest: RequestState.NONE,
      error: '',
      documents: state.documents.map((doc) => {
        if (doc?.temporaryId === action.meta.arg.temporaryId) {
          return {
            ...doc,
            status: 'success',
            progress: 100,
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
              progress: 100,
            }
          }
          return doc
        }),
      }
    })
    builder.addCase(deleteDocument.pending, (state) => ({
      ...state,
      deleteRequest: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(deleteDocument.fulfilled, (state) => ({
      ...state,
      deleteRequest: RequestState.OK,
      error: '',
    }))
    builder.addCase(deleteDocument.rejected, (state, action) => ({
      ...state,
      deleteRequest: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): DocumentsState =>
  state.document

export default documentSlice
