import React from 'react'
import PropTypes from 'prop-types'
import NewscardSmall from '../news/NewscardSmall'
import Loading from '../shared/loading'
import styled from 'styled-components'

const StyledMoreNews = styled.div`
  .article-more-news {
    font-size: 1.8rem;
    color: #040303;
    margin-top: 8.5rem;
  }

  .article-related {
    margin: 3.5rem 0 8.5rem 0;

    hr {
      height: 1px;
      background-color: rgba(4, 3, 3, 0.5);
      margin-top: 2rem;
      margin-bottom: 1.4rem;
    }
  }

  .more {
    margin: 2rem 0 0 0;
    cursor: pointer;
  }

  .news-card-small {
    margin-bottom: 6rem;
  }
`
class MoreNews extends React.Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.numberOfArticles = this.props.tablet !== null ? 2 : 3
    this.state = {
      moreNews: this.numberOfArticles,
    }
  }

  componentDidMount() {
    const { tags, relatedTo, fetchNewsByTag } = this.props
    const { moreNews } = this.state
    if (tags[0]) {
      fetchNewsByTag(relatedTo, tags[0], moreNews)
    } else {
      fetchNewsByTag(relatedTo, this.context.t('Новости РКЦ'), moreNews)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { tags, relatedTo, fetchNewsByTag } = this.props
    const { moreNews } = this.state

    if (tags !== prevProps.tags) {
      fetchNewsByTag(relatedTo, tags[0], moreNews)
    }

    if (this.state.moreNews !== prevState.moreNews) {
      fetchNewsByTag(this.props.relatedTo, this.props.tags[0], moreNews)
    }
  }

  render() {
    const { articles, isFetching, nextPage } = this.props

    // console.log("article more news", this.props)

    return (
      <StyledMoreNews>
        <div className="container">
          <p className="article-more-news">{this.context.t('TAKЖЕ ПО ТЕМЕ')}</p>
          <div className="article-related">
            <div className="related-news">
              <div className="columns is-multiline">
                {articles.map(item => (
                  <NewscardSmall article={item} key={item.id} />
                ))}
              </div>
              <div className="columns">
                <div className="column is-centered">
                  {isFetching && <Loading />}
                  <hr />
                  {nextPage && (
                    <img
                      className="more"
                      alt="show more news"
                      onClick={e => {
                        this.give_me_more_news(e)
                      }}
                      src="/static/more.svg"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledMoreNews>
    )
  }
  give_me_more_news = e => {
    e.preventDefault()
    const { moreNews } = this.state

    this.setState({
      moreNews: moreNews + this.numberOfArticles,
    })
  }
}

export default MoreNews
