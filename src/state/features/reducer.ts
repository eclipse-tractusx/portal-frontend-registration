import { combineReducers } from 'redux'
import applicationSlice from './application/slice'
import inviteSlice from './applicationInviteUser/slice'
import user from './user/reducer'

export const reducers = {
  application: applicationSlice.reducer,
  invite: inviteSlice.reducer,
  user,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
