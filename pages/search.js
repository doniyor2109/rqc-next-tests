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
import ResultPeople from '../components/search/ResultPeople'
import ResultTeam from '../components/search/ResultTeam'
import ResultTeamLeader from '../components/search/ResultTeamLeader'
import ResultArticle from '../components/search/ResultArticle'
import ResultEvent from '../components/search/ResultEvent'
import ResultVacancy from '../components/search/ResultVacancy'
import ResultPhoto from '../components/search/ResultPhoto'
import ResultVideo from '../components/search/ResultVideo'

//other libraries
import '../scss/searchpage.scss'

class Search extends React.Component {

    static async getInitialProps (ctx) {

        const {reduxStore, query: { text }} = ctx
        
        reduxStore.dispatch(SearchRequest(text))
        const api = await Prismic.getApi(PrismicConfig.apiEndpoint)

        await api.query([Prismic.Predicates.fulltext('document', text),
                         Prismic.Predicates.not('document.type', 'about'),
                         Prismic.Predicates.not('document.type', 'research')
                        ],
                        {lang : "*",
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
            ResultTeam: 0,
            results: this.props.search.results
        }
    }


    componentDidUpdate(prevProps) {

        if(this.props.search.results !== prevProps.search.results) {
            this.setState({
                results: this.props.search.results
            })
        }


        // обработка смены языка
        // if (this.props.lang !== prevProps.lang) {
        //   this.props.fetchAbout(this.props.lang)
        // }
    
      }

    render() {

        const { text } = this.props
        console.log("search", this.props)

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
                        <div className="column is-2-desktop is-offset-1-desktop is-2-tablet is-12-mobile">
                            <div className="categories">
                                <p>
                                    <b>
                                        {this.context.t("Разделы")}:
                                    </b>
                                </p>
                                <p>
                                    {this.context.t("Вакансии")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "vacancy").length})
                                    </b>
                                </p>
                                <p>
                                    {this.context.t("Люди")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "people").length})
                                    </b>
                                </p>
                                <p>
                                    {this.context.t("Научные группы")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "science_group").length +
                                          this.props.search.results.filter(e => e.type === "scientist").length})
                                    </b>
                                </p>
                                <p>
                                    {this.context.t("Новости")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "news").length})
                                    </b>
                                </p>
                                <p>
                                    {this.context.t("Мероприятия")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "event").length})
                                    </b>
                                </p>
                                <p>
                                    {this.context.t("Фотогалереи")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "mediakit_photo_gallery").length})
                                    </b>
                                </p>
                                <p>
                                    {this.context.t("Видео")}&nbsp;
                                    <b>
                                        ({this.props.search.results.filter(e => e.type === "mediakit_video").length})
                                    </b>
                                </p>
                            </div>
                        </div>
                        <div className="column is-8-desktop">
                            <div className="search-results">
                                {this.state.results.map((result, index) => {
                                        switch (result.type) {
                                            case "people": 
                                                return <ResultPeople item={result} 
                                                                     key={index} 
                                                                     search_text={this.props.search.text}
                                                        />
                                            case "science_group": 
                                                return <ResultTeam item={result} 
                                                                   key={index} 
                                                                   search_text={this.props.search.text}
                                                        />
                                            case "news": 
                                                return <ResultArticle item={result} 
                                                                      key={index} 
                                                                      search_text={this.props.search.text}
                                                        />
                                            case "event": 
                                            return <ResultEvent item={result} 
                                                                key={index} 
                                                                search_text={this.props.search.text}
                                                    />
                                            case "vacancy": 
                                            return <ResultVacancy item={result} 
                                                                  key={index} 
                                                                  search_text={this.props.search.text}
                                                    />
                                            case "mediakit_photo_gallery": 
                                            return <ResultPhoto item={result} 
                                                                    key={index} 
                                                                    search_text={this.props.search.text}
                                                    />
                                            case "mediakit_video": 
                                            return <ResultVideo item={result} 
                                                                  key={index} 
                                                                  search_text={this.props.search.text}
                                                    />
                                            case "scientist": 
                                            return <ResultTeamLeader item={result} 
                                                                key={index} 
                                                                search_text={this.props.search.text}
                                                    />
                                        }
                                    })
                                }
                            </div>
                            <div className="more_results">
                                <hr />
                                <img className="more" alt="show more news" onClick={e => {this.give_me_more_results(e)}} src="/static/more.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
  