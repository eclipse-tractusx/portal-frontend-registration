import { compose, createStore } from 'redux'
import reducer from '../reducers'

export const getDevToolsExt = () => {
  return []
}

const store = createStore(reducer, compose(...getDevToolsExt()))

//store.dispatch({type: actions.GlobalActions.INIT_APP});

export default store
