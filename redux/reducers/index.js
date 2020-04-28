import { combineReducers } from 'redux'
import { i18nState } from 'redux-i18n'

import { news } from './news'

const rootReducer = combineReducers({
  news,
  i18nState,
})

export default rootReducer
