import { combineReducers } from 'redux'
import { i18nState } from 'redux-i18n'

import { news } from './news'
import { language } from './lang'
import { main } from './main'
import { menu } from './menu'

const rootReducer = combineReducers({
  news,
  language,
  main,
  i18nState,
  menu,
})

export default rootReducer
