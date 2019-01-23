import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Head from 'next/head'

import {Loading} from '../components/shared/loading'

import * as scienceActions from '../redux/actions/publications'
import * as langActions from '../redux/actions/lang'
import Publication from '../components/publications/Publication'

import '../scss/publications.scss'

// Основной компонент, связывающий весь интерфейс страницы /news воедино
class Science extends Component {

  static contextTypes = {
    t: PropTypes.func
  }
  
  constructor(props) {
    super(props)
    this.state = {
        searchbyAuthor: "", 
        pubs: []
    }
  }

    componentDidMount() {
        this.props.fetchPublications()

    }

    componentDidUpdate(prevProps, prevState) {

        if(this.props.publications.pubsbyAuthor !== prevProps.publications.pubsbyAuthor) {
            this.setState({
                pubs: this.props.publications.pubsbyAuthor
            })
        }

        if(this.props.publications.pubs !== prevProps.publications.pubs) {
            this.setState({
                pubs: this.props.publications.pubs
            })
        }

    }

    render() {
        const { phone, tablet } = this.props

        console.log("publications", this.props)

        return (
            <div className="sciencepage">
                <div className="container">
                    <div className="columns">
                        <div className="column is-4">
                            <form className="search_form" onSubmit={e => this.handleSubmit(e)}>
                                <input type="search" 
                                    id="input-search" 
                                    name="search" 
                                    value={this.state.searchbyAuthor}
                                    onChange={e => this.handleChange(e)}
                                />
                                <button type="submit" id="input-submit-button">Search by author</button>
                            </form>
                        </div>
                    </div>
                    {(this.props.publications.isFetchingPubs || this.props.publications.isFetchingPubsbyAuthor) && <Loading /> }
                    <div className="columns">
                        <div className="column is-6">
                            <div className="publications">
                                {this.state.pubs.map((pub, index) => <Publication pub={pub} key={index} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    handleChange = (e) => {
        this.setState({
            searchbyAuthor: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.searchbyAuthor.length) {
            this.props.SearchAuthors(this.state.searchbyAuthor)
        }
    }

}
  

// Redux функции state и dispatch
const mapStateToProps = state => {
  const { publications } = state
  const { lang } = state.i18nState
  return { publications, lang }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({},
        scienceActions,
        langActions,
    ), dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Science)
