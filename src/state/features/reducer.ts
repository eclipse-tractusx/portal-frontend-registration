import { combineReducers } from 'redux'
import applicationSlice from './application/slice'
import inviteSlice from './applicationInviteUser/slice'
import documentSlice from './applicationDocuments/slice'
import user from './user/reducer'
import userSlice from './user/slice'
import roleSlice from './applicationCompanyRole/slice'
import registrationData from './applicationVerifyRegister/slice'

export const reducers = {
  application: applicationSlice.reducer,
  role: roleSlice.reducer,
  invite: inviteSlice.reducer,
  document: documentSlice.reducer,
  registrationData: registrationData.reducer,
  user,
  userData: userSlice.reducer
}

const rootReducer = combineReducers(reducers)

export default rootReducer
