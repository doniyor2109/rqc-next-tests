import { combineReducers } from 'redux';
import { i18nState } from 'redux-i18n';
import { article } from './article';
import { related } from './related';
import { news } from './news';
import { language } from './lang';
import { main } from './main';
import { people } from './people';
import { person } from './person';
import { about } from './about';
import { vacancies } from './vacancies';
import { team } from './team';
import { mediakit } from './mediakit';
import { photo } from './photo';
import { video } from './video';
import { scigroups } from './scigroups';
import { research } from './research';
import { event } from './event';
import { events } from './events';
import { eventsbyTag } from './eventsbyTag';
import { search } from './search';
import { publications } from './publications';
import { products } from './products';
import { education } from './education';
import { menu } from './menu';


const rootReducer = combineReducers({
  article,
  related,
  news,
  language,
  main,
  people,
  person,
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
  search,
  publications,
  products,
  education,
  menu
});

export default rootReducer;
