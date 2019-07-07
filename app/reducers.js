import { combineReducers } from 'redux'
import HomeReducer         from 'containers/Home/reducer'

export default function createReducer(injectedReducers = {}) {
  const root_reducer = combineReducers({
    home: HomeReducer,
    ...injectedReducers, // supports hot reload of reducer changes
  })

  return root_reducer
}
