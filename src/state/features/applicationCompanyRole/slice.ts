import { createSlice } from '@reduxjs/toolkit'
import { RequestState } from '../../../types/MainTypes'
import { RootState } from '../../store'
import { fetchCompanyRole } from './actions'
import { roleAggrementState, roleDataValue } from './types'

const initialState: roleAggrementState = {
  roleData: roleDataValue,
  request: RequestState.NONE,
  error: null,
}

const roleSlice = createSlice({
  name: 'registration/application/user',
  initialState,
  reducers: {
    setUsersToAdd: (state, action) => ({
      ...state,
      newUser: action.payload,
    }),
  },
  extraReducers: (builder) => {

    // fetch roles
    builder.addCase(fetchCompanyRole.pending, (state) => ({
      ...state,
      roleData: roleDataValue,
      request: RequestState.SUBMIT,
      error: '',
    }))
    builder.addCase(fetchCompanyRole.fulfilled, (state, { payload }) => ({
      ...state,
      roleData: payload || roleDataValue,
      request: RequestState.OK,
      error: '',
    }))
    builder.addCase(fetchCompanyRole.rejected, (state, action) => ({
      ...state,
      roleData: roleDataValue,
      request: RequestState.ERROR,
      error: action.error.message as string,
    }))
  },
})

export const stateSelector = (state: RootState): roleAggrementState =>
  state.role

export default roleSlice