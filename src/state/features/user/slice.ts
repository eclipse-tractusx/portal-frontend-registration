import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface UserState {
  fileNames: []
}

const initialState: UserState = {
  fileNames: []
}

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addFileNames: (state, action) => ({
      ...state,
      fileNames: action.payload,
    }),
  }
})

export const fileNamesSelector = (state: RootState): UserState =>
  state.userData

export default userSlice