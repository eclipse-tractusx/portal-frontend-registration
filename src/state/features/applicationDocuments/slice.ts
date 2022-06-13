import { createSlice } from '@reduxjs/toolkit'
import { RequestState } from '../../../types/MainTypes'
import { RootState } from '../../store'
import { fetchDocuments, saveDocument } from './actions'
import { DocumentsState } from './types'

const initialState: DocumentsState = {
  documents: [],
  request: RequestState.NONE,
  uploadRequest: null,
  error: null,
}

const inviteSlice = createSlice({
  name: 'registration/application/user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // fetch roles
    builder.addCase(fetchDocuments.pending, (state) => ({
      ...state,
      documents: [],
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchDocuments.fulfilled, (state, { payload }) => ({
      ...state,
      documents: payload || [],
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchDocuments.rejected, (state, action) => ({
      ...state,
      documents: [],
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
    builder.addCase(saveDocument.pending, (state) => ({
      ...state,
      uploadRequest: 'submit',
      error: '',
    }))
    builder.addCase(saveDocument.fulfilled, (state) => ({
      ...state,
      uploadRequest: 'true',
      error: '',
    }))
    builder.addCase(saveDocument.rejected, (state, action) => ({
      ...state,
      uploadRequest: 'false',
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): DocumentsState =>
  state.document

export default inviteSlice
