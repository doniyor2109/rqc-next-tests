import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as newsActions from '../redux/actions/news';
import * as langActions from '../redux/actions/lang';

import NewsHead from '../components/news/NewsHead';
import NewsStateManager from '../components/news/NewsStateManager';
import articleType from '../components/news/articleType';


// Основной компонент, связывающий весь интерфейс страницы /news воедино
class News extends Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    fetchNews: PropTypes.func.isRequired,
    phone: PropTypes.bool,
    tablet: PropTypes.bool,
    news: PropTypes.shape({
      articles: PropTypes.arrayOf(articleType),
      isFetching: PropTypes.bool,
      nextPage: PropTypes.string,
    }),
    fb_locale: PropTypes.string,
  }

  static defaultProps = {
    phone: true,
    tablet: false,
    news: {},
    fb_locale: 'ru',
  }

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
      fetchNews, news, fb_locale, phone, tablet, lang,
    } = this.props;

    const { pageSize } = this.state;

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
          isFetching={news.isFetching && pageSize === 10}
          isFetchingMore={news.isFetching && pageSize > 10}
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
