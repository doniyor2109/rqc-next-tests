import { combineReducers } from 'redux'
import { article } from './article'
import { news } from './news'
import { language } from './lang'
import { byTag } from './byTag'
import { main } from './main'
import { people } from './people'
import { about } from './about'
import { vacancies } from './vacancies'
import { team } from './team'
import { logo } from './logo'
import { mediakit } from './mediakit'
import { photo } from './photo'
import { video } from './video'
import { i18nState } from "redux-i18n"

const rootReducer = combineReducers({
  article,
  news,
  language,
  byTag,
  main, 
  people, 
  about, 
  vacancies, 
  i18nState, 
  team, 
  logo, 
  photo,
  mediakit, 
  video
});

export default rootReducer
