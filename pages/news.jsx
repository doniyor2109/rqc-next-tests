import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as newsActions from '../redux/actions/news';
import * as langActions from '../redux/actions/lang';


import NewsHead from '../components/news/NewsHead';
import NewsStateManager from '../components/news/NewsStateManager';


// Основной компонент, связывающий весь интерфейс страницы /news воедино
class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
    };
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { fetchNews, lang } = this.props;
    const { pageSize } = this.state;
    fetchNews(lang, pageSize);
  }

  changePageSize(number) {
    this.setState({
      pageSize: number,
    });
  }

  render() {
    const {
      fetchNews, pageSize, news, fb_locale, phone, tablet, lang,
    } = this.props;

    return (
      <Fragment>
        <NewsHead fbLocale={fb_locale} />
        {news.articles.length > 0
        && (
        <NewsStateManager
          fetchNews={fetchNews}
          articles={news.articles}
          pageSize={pageSize}
          changePageSize={this.changePageSize}
          isFetching={news.isFetching}
          phone={phone}
          tablet={tablet}
          nextPage={news.nextPage}
          lang={lang}
        />
        )}
      </Fragment>
    );
  }
}


// componentDidUpdate(prevProps, prevState) {
//   // обработка смены языка
//   if (this.props.lang !== prevProps.lang) {
//     this.setState({
//       FetchFirst: true,
//     });
//     switch (this.state.activeTag) {
//       case 'SHOW_ALL':
//         return this.props.fetchNews(this.props.lang, this.state.pageSize, this.state.pageNumber);
//       case 'SHOW_OUR_NEWS':
//         return this.props.fetchArticlesByTag(this.context.t('Новости РКЦ'), this.state.pageSize);
//       case 'SHOW_WORLD_NEWS':
//         return this.props.fetchArticlesByTag(this.context.t('Квантовые технологии в мире'), this.state.pageSize);
//       default:
//         return null;
//     }
//   }

//   // фильтр новостей по тегам
//   if (this.state.activeTag !== prevState.activeTag) {
//     switch (this.state.activeTag) {
//       case 'SHOW_ALL':
//         return this.props.fetchNews(this.props.lang, this.state.pageSize, this.state.pageNumber);
//       case 'SHOW_OUR_NEWS':
//         return this.props.fetchArticlesByTag(this.context.t('Новости РКЦ'), this.state.pageSize);
//       case 'SHOW_WORLD_NEWS':
//         return this.props.fetchArticlesByTag(this.context.t('Квантовые технологии в мире'), this.state.pageSize);
//       default:
//         return null;
//     }
//   }

//   // если меняются ВСЕ новости, выводим на экран их
//   if (this.props.news.articles !== prevProps.news.articles) {
//     this.setState({
//       firstNews: this.props.news.articles,
//       nextPage: this.props.news.nextPage,
//     });
//   }

//   // если меняются новости по тегам, выводим их
//   if (this.props.byTag.articles !== prevProps.byTag.articles) {
//     this.setState({
//       firstNews: this.props.byTag.articles,
//       nextPage: this.props.byTag.nextPage,
//     });
//   }

//   // нажатие на +
//   if (this.state.pageSize !== prevState.pageSize) {
//     switch (this.state.activeTag) {
//       case 'SHOW_ALL':
//         return this.props.fetchNews(this.props.lang, this.state.pageSize, this.state.pageNumber);
//       case 'SHOW_OUR_NEWS':
//         return this.props.fetchArticlesByTag(this.context.t('Новости РКЦ'), this.state.pageSize);
//       case 'SHOW_WORLD_NEWS':
//         return this.props.fetchArticlesByTag(this.context.t('Квантовые технологии в мире'), this.state.pageSize);
//       default:
//         return null;
//     }
//   }
// }

// Redux функции state и dispatch
const mapStateToProps = (state) => {
  const { news, byTag } = state;
  const { lang } = state.i18nState;
  return { news, lang, byTag };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  newsActions,
  langActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(News);
