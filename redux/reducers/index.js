import { combineReducers } from 'redux'
import { article } from './article'
import { related } from './related'
import { news } from './news'
import { language } from './lang'
import { byTag } from './byTag'
import { main } from './main'
import { people } from './people'
import { about } from './about'
import { vacancies } from './vacancies'
import { team } from './team'
import { mediakit } from './mediakit'
import { photo } from './photo'
import { video } from './video'
import { scigroups } from './scigroups'
import { research } from './research'
import { event } from './event'
import { events } from './events'
import { eventsbyTag } from './eventsbyTag'
import { search } from './search'
import { i18nState } from "redux-i18n"

const rootReducer = combineReducers({
  article,
  related,
  news,
  language,
  byTag,
  main, 
  people, 
  about, 
  vacancies, 
  i18nState, 
  team, 
  photo,
  mediakit, 
  video, 
  scigroups, 
  research,
  event, 
  events, 
  eventsbyTag,
  search
});

export default rootReducer
