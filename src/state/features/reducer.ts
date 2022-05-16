import { combineReducers } from 'redux'
import applicationSlice from './application/slice'
import user from './user/reducer'

export const reducers = {
  application: applicationSlice.reducer,
  user,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
