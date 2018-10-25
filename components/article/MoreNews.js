import React from 'react'
import PropTypes from 'prop-types'
import { NewscardSmall } from '../news/NewscardSmall.js'
import { Loading } from '../shared/loading.js'


class MoreNews extends React.Component {

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            moreNews: this.props.numberOfArticles
        }
    }
    
    componentDidMount(){
        if (this.props.tags[0]) {
            this.props.fetchNewsByTag(this.props.tags[0], this.props.numberOfArticles)
        } else {
            this.props.fetchNewsByTag(this.context.t("Новости РКЦ"), this.props.numberOfArticles)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.tags !== prevProps.tags) {
              this.props.fetchNewsByTag(this.props.tags[0], this.state.moreNews)
            }

        if (this.state.moreNews !== prevState.moreNews) {
            this.props.fetchNewsByTag(this.props.tags[0], this.state.moreNews)
        }
    }

    render(){

        const {articles, isFetching, nextPage} = this.props

        console.log("article more news", this.props)

        return (
            <div className="container">
                <p className="article-more-news">{this.context.t("TAKЖЕ ПО ТЕМЕ")}</p>
                <div className="article-related">
                    <div className="related-news">
                        <div className="columns is-multiline">
                        {articles.map((item, index) =>
                            <NewscardSmall columns="3" article={item} key={index} />
                        )}
                        </div>
                        <div className="columns">
                        <div className="column is-centered">
                            {isFetching && <Loading />}
                        <hr />
                            {nextPage &&
                            <img className="more" alt="show more news" onClick={e => {this.give_me_more_news(e)}} src="/static/more.svg" /> }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    give_me_more_news = (e) => {
        e.preventDefault()
        this.setState({
            moreNews: this.state.moreNews + this.props.numberOfArticles
        })
    }
}

export default MoreNews