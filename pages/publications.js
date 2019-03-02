import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Select from 'react-select'

import {Loading} from '../components/shared/loading'
import PubsSortedByTitle from '../components/publications/PubsSortedByTitle'
import PubsSortedByDate from '../components/publications/PubsSortedByDate'
import PubsSortedByJournal from '../components/publications/PubsSortedByJournal'

import * as groupsActions from '../redux/actions/scigroups'
import * as publicationsActions from '../redux/actions/publications'
import * as langActions from '../redux/actions/lang'
import PubHead from '../components/publications/PubHead'
import { FilterTag } from '../components/shared/FilterTag'
import FiltersRequest from '../components/publications/FiltersRequest'
import '../scss/publications.scss'

//helpers
import {findGroupIdByName, uniqArray, filterPubsbyGroup, findEnglishName, getUniqueDatesfromPubs} from '../components/publications/helpers'


// Основной компонент, связывающий весь интерфейс страницы /publications воедино
class Publications extends Component {

  static contextTypes = {
    t: PropTypes.func
  }
  
  constructor(props) {
    super(props)
    this.state = {
        pubsearch: "", 
        selectedAuthor: "", 
        selectedGroupName: "", 
        groupsName: [],
        pubs: [],
        authors:[],
        pageSize: 100, 
        pageNumber: 1,
        activeTag: "SORT_DATE",
        allpubsFetched: false
    }
  }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.fetchPublications(this.props.lang, 100, this.state.pageNumber,  this.state.activeTag, [] )
        this.props.fetchSciGroups(this.props.lang, "groupname")
    }

    componentDidUpdate(prevProps, prevState) {

        // console.log("updated!")

        // -------------------- DIFF's -------------------------
        // const now = Object.entries(this.props);
        // const added = now.filter(([key, val]) => {
        //     if (prevProps[key] === undefined) return true;
        //     if (prevProps[key] !== val) {
        //         console.log(`${key}
        //         - ${JSON.stringify(val)}
        //         + ${JSON.stringify(prevProps[key])}`);
        //     }
        //     return false;
        // });
        // added.forEach(([key, val]) => console.log(`${key}
        //     + ${JSON.stringify(val)}`));
        // -------------------- DIFF's -------------------------

        // --------------------------------***********************------------------------------------
        // заносим все публикации в state, чтобы потом их фильтровать
        if(this.props.publications.pubs !== prevProps.publications.pubs) {

            const arrayofAuthorswithDuplicates = this.props.publications.pubs.map(pub => pub.data.authors.map(author => author.text))
                                                                             .reduce((acc, val) => acc.concat(val))
            this.setState({
                pubs: this.props.publications.pubs,
                allpubsFetched: true,
                authors: uniqArray(arrayofAuthorswithDuplicates)
            })
        }

        // --------------------------------***********************------------------------------------
        // получаем список групп
        if (prevProps.scigroups.groups !== this.props.scigroups.groups) {
            this.setState({
                groupsName: this.props.scigroups.groups.filter(el => el.lang === this.props.lang).map(group => group.data.groupname[0].text),
            })
        }

        // --------------------------------***********************------------------------------------
        // если меняется язык
        if (this.props.lang !== prevProps.lang) {

            // получаем снова публикации
            this.props.fetchPublications(this.props.lang, 100, this.state.pageNumber, this.state.activeTag, [])

            // обновляем список групп
            this.setState({
                groupsName: this.props.scigroups.groups.filter(el => el.lang === this.props.lang).map(group => group.data.groupname[0].text),
            })
        }


        // --------------------------------***********************------------------------------------

    
    }

    render() {

        console.log("publications", this.props)
        // if (this.state.pubs.length > 0) {
        //     getUniqueDatesfromPubs(this.state.pubs)
        // }
        return (
            <Fragment>
                <PubHead fb_locale={this.props.fb_locale} />
                <div className="pubspage">
                    <div className="container">
                        <h1 className="page-main-heading">
                            {this.context.t("Публикации")}
                        </h1>
                    </div>
                    <section className="settings">
                        <div className="container">
                            <h5>{this.context.t("Фильтры и поиск")}:</h5>
                            <div className="columns is-multiline">
                                <div className="column is-5-desktop is-12-tablet">
                                    <p className="name">{this.context.t("Научная группа")}:</p>
                                    <Select onChange={this.handleGroupSelect} 
                                            options={this.state.groupsName.map(group => 
                                                     ({ label: group, value: group })
                                                    )}
                                            instanceId="groupselect"
                                            className='group-select-container'
                                            classNamePrefix="select"
                                            placeholder={this.context.t("Введите название")}
                                            isLoading={this.props.scigroups.isFetching}
                                            isDisabled={this.props.scigroups.isFetching}
                                            ref={c => (this.groupSelect = c)}
                                    />
                                </div>
                                <div className="column is-3-desktop is-12-tablet">
                                    <p className="name">{this.context.t("Автор")}:</p>
                                    <Select onChange={this.handleAuthorsSelect} 
                                            options={this.state.authors.map(author => 
                                                     ({ label: author, value: author })
                                                    )}
                                            instanceId="authorselect"
                                            className='author-select-container'
                                            classNamePrefix="select"
                                            placeholder={this.context.t("Введите имя")}
                                            isLoading={this.props.publications.isFetchingPubs}
                                            isDisabled={this.props.publications.isFetchingPubs}
                                            ref={c => (this.authorSelect = c)}
                                    />
                                </div>
                                {/* <div className="column is-4">
                                    <form className="search_form is-pulled-right" onSubmit={e => this.searchSubmit(e)}>
                                        <input type="search" 
                                            id="input-search" 
                                            name="search" 
                                            value={this.state.pubsearch}
                                            onChange={e => this.searchChange(e)}
                                            placeholder={this.context.t("Ваш запрос")}
                                        />
                                        <button type="submit" id="input-submit-button"></button>
                                    </form>
                                </div> */}
                            </div>
                            <h5 className="sort">{this.context.t("Сортировать по")}:</h5>
                            <div className="columns">
                                <div className="column is-12">
                                        <FilterTag onClick={e => {this.selectTag(e, "SORT_DATE")}}
                                                    active={this.state.activeTag === "SORT_DATE" ? true : false}>
                                        {this.context.t("Дате выхода")}
                                        </FilterTag>
                                        <FilterTag onClick={e => {this.selectTag(e, "SORT_NAME")}}
                                                    active={this.state.activeTag === "SORT_NAME" ? true : false}>
                                        {this.context.t("Названию публикации")}
                                        </FilterTag>
                                        <FilterTag onClick={e => {this.selectTag(e, "SORT_JOURNAL")}}
                                                    active={this.state.activeTag === "SORT_JOURNAL" ? true : false}>
                                        {this.context.t("Названию издания")}
                                        </FilterTag>
                                </div>
                            </div>
                        </div>
                    </section>


                    <div className="container">

                        { ( this.state.selectedGroupName.length > 0 || 
                            this.state.selectedAuthor.length > 0 ||
                            this.state.pubsearch > 0 )
                            &&
                            <div className="columns">
                                <div className="column is-12-tablet is-8-desktop is-offset-2-desktop">
                                    <FiltersRequest selectedGroupName={this.state.selectedGroupName}
                                                    selectedAuthor={this.state.selectedAuthor}
                                                    pubsearch={this.state.pubsearch}
                                                    resetAuthor={this.resetAuthor}    
                                                    resetGroup={this.resetGroup}                                
                                                    resetSearch={this.reset}                                
                                
                                    />
                                </div> 
                            </div>
                        }
                        
                        {this.props.publications.isFetchingPubs
                         && <Loading /> }

                        <div className="columns">
                            <div className="column is-12-tablet is-8-desktop is-offset-2-desktop ">
                                <div className="publications">
                                    {!this.props.publications.isFetchingPubs && 
                                        (this.state.activeTag === "SORT_DATE"
                                        ? <PubsSortedByDate pubs={this.state.pubs} />
                                        : (this.state.activeTag === "SORT_NAME" 
                                            ? <PubsSortedByTitle pubs={this.state.pubs} />
                                            : <PubsSortedByJournal pubs={this.state.pubs} />
                                        )
                                        )
                                    }
                                    {!this.props.publications.isFetchingPubs && this.state.pubs.length === 0 
                                    &&  <div className="no_pubs">
                                            <p>
                                                {this.context.t("По вашему запросу не найдено ни одной публикации")}
                                            </p>
                                            {this.context.t("Посмотрите список ")}
                                            <a onClick={e => this.resetAll(e, "click")}>
                                                {this.context.t("всех публикаций")}
                                            </a>
                                            {this.context.t(" или используйте фильтры для выбора публикаций определенного автора или научной группы")}
                                        </div> 
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
        )
    }

    selectTag = (e, tag) => {
        e.preventDefault()
        this.setState({
            activeTag: tag, 
        })
        this.props.fetchPublications(this.props.lang, 100, this.state.pageNumber, tag, [])

    }

    searchChange = (e) => {
        this.setState({
            pubsearch: e.target.value
        })
    }

    searchSubmit = (e) => {
        e.preventDefault()
        if (this.state.searchbyAuthor.length) {
            this.props.PubSearch(this.state.searchbyAuthor)
        }
    }
    
    handleGroupSelect = (event) => {
        this.resetAuthor(event, "handle")
        this.setState({
            selectedGroupName: event.value,
            pubs: filterPubsbyGroup(event.value, this.props.publications.pubs)
        })
    }
    

    handleAuthorsSelect = (event) => {
        this.resetGroup(event, "handle")
        this.setState({
            selectedAuthor: event.value,
            pubs: this.props.publications.pubs.filter(el => el.data.authors.some(author => author.text === event.value))
        })
    }

    resetAll = (e, from) => {
        this.resetGroup(e, from)
        this.resetAuthor(e, from)
        this.resetSearch(e, from)
    }

    resetGroup = (e, from) => {
        if (from === "click") {
            e.preventDefault()
        }
        this.setState({
            selectedGroupName: "",
            pubs: this.props.publications.pubs
        })
        if (this.groupSelect.state.value !== null) {
            this.groupSelect.state.value.value = ""
            this.groupSelect.state.value.label = this.context.t("Введите название")
        }
    }

    resetAuthor = (e, from) => {
        if (from === "click") {
            e.preventDefault()
        }        
        this.setState({
            selectedAuthor: "",
            pubs: this.props.publications.pubs
        })
        if (this.authorSelect.state.value !== null) {
            this.authorSelect.state.value.value = ""
            this.authorSelect.state.value.label = this.context.t("Введите имя")
        }
    }    
    resetSearch = (e, from) => {
        if (from === "click") {
            e.preventDefault()
        }        
        this.setState({
            pubsearch: ""
        })
    }
}

// Redux функции state и dispatch
const mapStateToProps = state => {
  const { publications, scigroups } = state
  const { lang } = state.i18nState
  return { publications, scigroups, lang }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({},
        publicationsActions,
        groupsActions,
        langActions,
    ), dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Publications)
