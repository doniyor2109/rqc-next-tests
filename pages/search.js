//core modules
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

//actions
import {SearchRequest, SearchSuccess, SearchFailure} from '../redux/actions/search'
import * as langActions from '../redux/actions/lang'
import * as searchActions from '../redux/actions/search'

//components
import { Loading } from '../components/shared/loading'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../prismic-configuration'
import SearchForm from '../components/search/SearchForm'
import Results from '../components/search/Results'

//other libraries
import '../scss/searchpage.scss'

class Search extends React.Component {

    static async getInitialProps (ctx) {

        const {reduxStore, query: { text }} = ctx
        
        reduxStore.dispatch(SearchRequest(text))
        var lang = /[а-яА-ЯЁё]/.test(text) ? "ru" : "en-gb"
        const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
        await api.query([Prismic.Predicates.fulltext('document', text),
                         Prismic.Predicates.not('document.type', 'about'),
                         Prismic.Predicates.not('document.type', 'research'),
                         Prismic.Predicates.not('document.type', 'main')
                        ],
                        {lang : lang,
                         fetchLinks : ['scientist.name', 'scientist.position', 'science_group.groupname', 'science_group.uid' ], 
                         pageSize : 100 
                        })
                 .then(response => reduxStore.dispatch(SearchSuccess(text, response)))
                 .catch(error => reduxStore.dispatch(SearchFailure(text, error)))
        
        return {}
      }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props) {
        super(props) 
        this.state = {
            searchtext: this.props.search.text,
            results: [], 
            vac_cat: false,
            people_cat: false,
            sci_cat: false,
            news_cat: false,
            event_cat: false,
            photo_cat: false,
            video_cat: false, 
            pub_cat: false, 
            filtersOn: false, 
            more_results: 6
        }
    }


    componentDidUpdate(prevProps, prevState) {

        if(prevState.vac_cat !== this.state.vac_cat || 
            prevState.people_cat !== this.state.people_cat || 
            prevState.sci_cat !== this.state.sci_cat || 
            prevState.news_cat !== this.state.news_cat || 
            prevState.event_cat !== this.state.event_cat || 
            prevState.photo_cat !== this.state.photo_cat ||
            prevState.video_cat !== this.state.video_cat ||
            prevState.pub_cat !== this.state.pub_cat
            ) {
                this.setState({
                    filtersOn: this.state.vac_cat || this.state.people_cat || this.state.sci_cat || this.state.news_cat || this.state.event_cat || this.state.photo_cat || this.state.video_cat || this.state.pub_cat
                })
            }

    }

    render() {

        const { text } = this.props.search
        // console.log("search", this.props)

        return (
            <div className="search-page">
                <div className="container">
                    <div className="columns">
                        <div className="column is-6-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet is-12-mobile">
                            <SearchForm initialValue={this.props.search.text} />
                            {this.props.search && 
                                <p className="count">{this.context.t("Результатов")}: <span className="bold">{this.props.search.total_results_size}</span></p>
                            }
                        </div>
                    </div>

                    <div className="columns">
                        <div className="column is-2-desktop is-offset-1-desktop is-3-tablet is-12-mobile">
                            <div className="categories">
                                <p>
                                    <b>
                                        {this.context.t("Разделы")}:
                                    </b>
                                </p>
                                <p className={this.state.people_cat ? "cat is-active" : "cat"}
                                    onClick={e => {this.catClick(e, "people_cat", this.state.people_cat, "people")}}>
                                    {this.context.t("Люди")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "people").length})
                                    </b>
                                </p>
                                <p  className={this.state.sci_cat ? "cat is-active" : "cat"} 
                                    onClick={e => {this.catClick(e, "sci_cat", this.state.sci_cat, "science_group", "scientist")}}>
                                        {this.context.t("Научные группы")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "science_group").length +
                                          this.props.search.results.filter(e => e.type === "scientist").length})
                                    </b>
                                </p>
                                <p className={this.state.news_cat ? "cat is-active" : "cat"}
                                    onClick={e => {this.catClick(e, "news_cat", this.state.news_cat, "news")}}>
                                    {this.context.t("Новости")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "news").length})
                                    </b>
                                </p>
                                <p className={this.state.event_cat ? "cat is-active" : "cat"}
                                    onClick={e => {this.catClick(e, "event_cat", this.state.event_cat, "event")}}>
                                    {this.context.t("Мероприятия")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "event").length})
                                    </b>
                                </p>
                                <p className={this.state.pub_cat ? "cat is-active" : "cat"}
                                    onClick={e => {this.catClick(e, "pub_cat", this.state.pub_cat, "publication")}}>
                                    {this.context.t("Публикации")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "publication").length})
                                    </b>
                                </p>
                                <p className={this.state.vac_cat ? "cat is-active" : "cat"}
                                    onClick={e => {this.catClick(e, "vac_cat", this.state.vac_cat, "vacancy")}}>
                                    {this.context.t("Вакансии")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "vacancy").length})
                                    </b>
                                </p>
                                <p className={this.state.photo_cat ? "cat is-active" : "cat"}
                                    onClick={e => {this.catClick(e, "photo_cat", this.state.photo_cat, "mediakit_photo_gallery")}}>
                                    {this.context.t("Фотогалереи")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "mediakit_photo_gallery").length})
                                    </b>
                                </p>
                                <p className={this.state.video_cat ? "cat is-active" : "cat"}
                                    onClick={e => {this.catClick(e, "video_cat", this.state.video_cat, "mediakit_video")}}>
                                    {this.context.t("Видео")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "mediakit_video").length})
                                    </b>
                                </p>
                            </div>
                        </div>
                        <div className="column is-8-desktop">
                            <div className="search-results">
                                {this.state.filtersOn 
                                ? this.state.results.slice(0, this.state.more_results).map((result, index) => <Results result={result} 
                                                                                     index={index} 
                                                                                     key={index}
                                                                                     search_text={this.props.search.text}
                                                                            />)
                                : this.props.search.results.slice(0, this.state.more_results).map((result, index) => <Results result={result} 
                                                                                     index={index} 
                                                                                     key={index}
                                                                                     search_text={this.props.search.text}
                                                                            />)
                                
                            }
                            </div>
                            {(this.state.more_results < this.props.search.results.length) &&
                            <div className="more_results">
                                <hr />
                                <img className="more" alt="show more news" onClick={e => {this.give_me_more_results(e)}} src="/static/more.svg" />
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    catClick = (e, cat, cat_state, type1, type2) => {
        e.preventDefault()
        if (cat_state === false) {
            this.setState({
                [cat]: !cat_state,
                results: this.state.results.concat(this.props.search.results.filter(e => ((e.type === type1) || (e.type === type2)))),
                more_results: 6
            })
        } 
        else if (cat_state === true) {
            this.setState({
                [cat]: !cat_state,
                results: this.state.results.filter(e => ((e.type !== type1) && (e.type !== type2))),
            })

        }
    }

    give_me_more_results = (e) => {
        this.setState({
            more_results: this.state.more_results + 6
        })
    }
    
}


const mapStateToProps = state => {
    const { search } = state
    const { lang } = state.i18nState
    return { lang, search }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        langActions,
        searchActions
        ), dispatch);
}

  
export default connect(mapStateToProps, mapDispatchToProps)(Search)
  