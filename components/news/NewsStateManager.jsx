import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';

import GridViewDesktop from './GridViewDesktop';
import GridViewTablet from './GridViewTablet';
import GridViewMobile from './GridViewMobile';
import MoreNews from './MoreNews';
import PageHeading from '../shared/PageHeading';
import Filters from './Filters';

import { getuniqueTags } from '../shared/helpers';
import articleType from './articleType';

class NewsStateManager extends Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    fetchNews: PropTypes.func.isRequired,
    changePageSize: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    phone: PropTypes.bool,
    tablet: PropTypes.bool,
    nextPage: PropTypes.string.isRequired,
    articles: PropTypes.arrayOf(articleType),
  }

  static defaultProps = {
    phone: true,
    tablet: false,
    articles: [],
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTag: '',
    };
    this.selectTag = this.selectTag.bind(this);
    this.getMoreNews = this.getMoreNews.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { lang, fetchNews, pageSize } = this.props;
    if (lang !== prevProps.lang) {
      fetchNews(lang, pageSize);
    }
  }

  selectTag = (tag, e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      activeTag: tag,
    });
  }

  getMoreNews = (e, numberOfMoreNews) => {
    e.preventDefault();
    const {
      fetchNews, changePageSize, pageSize, lang,
    } = this.props;
    fetchNews(lang, pageSize + numberOfMoreNews);
    changePageSize(pageSize + numberOfMoreNews);
  }

  render() {
    // console.log('news state manager', this.props);

    const { t } = this.context;
    const { activeTag } = this.state;
    const {
      articles, isFetching, phone, tablet, nextPage, lang,
    } = this.props;

    const tags = getuniqueTags(articles);
    if (lang === 'ru') {
      tags.unshift('Все новости');
    } else if (lang === 'en-gb') {
      tags.unshift('All news');
    }

    let news = articles;
    if (activeTag !== t('Все новости')) {
      news = articles.filter(article => article.tags.includes(activeTag));
    }
    // console.log("filtered articles", news, "\n original articles", articles)
    return (
      <Fragment>
        <div className="newspage">
          <div className="container">
            <PageHeading title="Новости" />
            <Filters
              tags={tags}
              selectTag={this.selectTag}
              activeTag={activeTag}
            />

            <Media
              query="(max-width: 415px)"
              defaultMatches={phone !== null}
              render={() => (
                <Fragment>
                  <GridViewMobile
                    news={articles}
                    isFetching={isFetching}
                  />
                  <MoreNews
                    nextPage={nextPage}
                    getMoreNews={this.getMoreNews}
                    numberOfMoreNews={3}
                    isFetching={isFetching}
                  />
                </Fragment>
              )
                    }
            />

            <Media
              query="(min-width: 416px) and (max-width: 768px)"
              defaultMatches={tablet !== null}
              render={() => (
                <Fragment>
                  <GridViewTablet
                    news={articles}
                    isFetching={isFetching}
                  />
                  <MoreNews
                    nextPage={nextPage}
                    getMoreNews={this.getMoreNews}
                    numberOfMoreNews={2}
                    isFetching={isFetching}
                  />
                </Fragment>
              )
                              }
            />

            <Media
              query="(min-width: 769px)"
              defaultMatches={phone === null && tablet === null}
              render={() => (
                <Fragment>
                  <GridViewDesktop
                    news={news}
                    isFetching={isFetching}
                  />
                  <MoreNews
                    nextPage={nextPage}
                    getMoreNews={this.getMoreNews}
                    numberOfMoreNews={3}
                    isFetching={isFetching}
                  />
                </Fragment>
              )
                              }
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NewsStateManager;
