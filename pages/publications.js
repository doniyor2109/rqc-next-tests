// Cтраница rqc.ru/publications,  на которую выводятся все публикации из админки по типу «publication». 
// Есть несколько челленджей в этом компоненте:

// 1. Данные хранятся в CMS Prismic, API которого позволяет получить только 100 документов за раз. 
// (всего публикаций - 230)

// 2. Так как, нам нужен список всех авторов публикаций,
// то приходится загружать все публикации сразу, это делается через рекурсию в redux actions creators 
// Не факт, что это лучший способ, но он как минимум позволяет избежать лишнего рендеринга при вызове API

// core dependencies
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Select from 'react-select'

// components
import PubHead from '../components/publications/PubHead'
import SortedPubs from '../components/publications/SortedPubs'
import FiltersRequest from '../components/publications/FiltersRequest'
import { FilterTag } from '../components/shared/FilterTag'
import {Loading} from '../components/shared/loading'

// actions
import * as groupsActions from '../redux/actions/scigroups'
import * as publicationsActions from '../redux/actions/publications'
import * as langActions from '../redux/actions/lang'

//helpers
import {uniqArray, filterPubsbyGroup} from '../components/publications/helpers'


// Основной компонент, связывающий весь интерфейс страницы /publications воедино
class Publications extends Component {
  
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
        searchIsActive: false
    }
  }

    componentDidMount() {
        window.scrollTo(0, 0)
        // получаем публикации
        this.props.fetchPublications(this.props.lang, 100, this.state.pageNumber,  this.state.activeTag, [] )
        // получаем список научных групп
        this.props.fetchSciGroups(this.props.lang, "groupname")
    }

    componentDidUpdate(prevProps, prevState) {

        // заносим все публикации в state, чтобы потом их фильтровать
        if(this.props.publications.pubs !== prevProps.publications.pubs) {

            const arrayofAuthorswithDuplicates = this.props.publications.pubs.map(pub => pub.data.authors.map(author => author.text))
                                                                                                         .reduce((acc, val) => acc.concat(val))
            this.setState({
                pubs: this.props.publications.pubs,
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

            // сбрасываем значения групп и авторов
            this.resetAll()

            // получаем снова публикации
            this.props.fetchPublications(this.props.lang, 100, this.state.pageNumber, this.state.activeTag, [])

            // и группы
            this.props.fetchSciGroups(this.props.lang, "groupname")

            // обновляем список групп
            this.setState({
                groupsName: this.props.scigroups.groups.filter(el => el.lang === this.props.lang).map(group => group.data.groupname[0].text),
            })
        }
    }

    render() {

        console.log("publications", this.props)
        const { searchIsActive: active, activeTag, pubsearch, selectedGroupName, selectedAuthor } = this.state
        const { t } = this.context

        return (
            <Fragment>
                <PubHead fbLocale={this.props.fb_locale} />
                <div className="pubspage">
                    <div className="container">
                        <h1 className="page-main-heading">
                            {t("Публикации")}
                        </h1>
                    </div>
                    <section className="settings">
                        <div className="container">
                            <h5>{t("Фильтры и поиск")}:</h5>
                            <div className="columns is-multiline">
                                <div className="column is-7-desktop is-7-tablet is-12-mobile">
                                    <div className="columns is-multiline">
                                        <div className="column is-7-desktop is-12-tablet">
                                            <div className="select_wrapper">
                                                <p className="name">{t("Научная группа")}:</p>
                                                <Select onChange={this.handleGroupSelect} 
                                                        options={this.state.groupsName.map(group => 
                                                                ({ label: group, value: group })
                                                                )}
                                                        instanceId="groupselect"
                                                        className='group-select-container'
                                                        classNamePrefix="select"
                                                        placeholder={t("Введите название")}
                                                        isLoading={this.props.scigroups.isFetching}
                                                        isDisabled={this.props.scigroups.isFetching}
                                                        ref={c => (this.groupSelect = c)}
                                                />
                                            </div>
                                        </div>
                                        <div className="column is-5-desktop is-12-tablet">
                                            <div className="select_wrapper">
                                                <p className="name">{t("Автор")}:</p>
                                                <Select onChange={this.handleAuthorsSelect} 
                                                        options={this.state.authors.map(author => 
                                                                ({ label: author, value: author })
                                                                )}
                                                        instanceId="authorselect"
                                                        className='author-select-container'
                                                        classNamePrefix="select"
                                                        placeholder={t("Введите имя")}
                                                        isLoading={this.props.publications.isFetchingPubs}
                                                        isDisabled={this.props.publications.isFetchingPubs}
                                                        ref={c => (this.authorSelect = c)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Поиск */}

                                <div className="column is-4-desktop is-offset-1-desktop">
                                    <form className="search_form" onSubmit={e => this.searchSubmit(e)}>
                                        <input type="search" 
                                            id="input-search" 
                                            name="search" 
                                            value={pubsearch}
                                            onChange={e => this.searchChange(e)}
                                            placeholder={t("Ваш запрос")}
                                        />
                                        <button type="submit" id="input-submit-button"></button>
                                    </form>
                                </div>
                            </div>
                            <h5 className="sort">{t("Сортировать по")}:</h5>
                            <div className="columns">
                                <div className="column is-12">
                                        <FilterTag onClick={e => {this.selectTag(e, "SORT_DATE")}}
                                                    active={activeTag === "SORT_DATE" ? true : false}>
                                        {t("Дате выхода")}
                                        </FilterTag>
                                        <FilterTag onClick={e => {this.selectTag(e, "SORT_NAME")}}
                                                    active={activeTag === "SORT_NAME" ? true : false}>
                                        {t("Названию публикации")}
                                        </FilterTag>
                                        <FilterTag onClick={e => {this.selectTag(e, "SORT_JOURNAL")}}
                                                    active={activeTag === "SORT_JOURNAL" ? true : false}>
                                        {t("Названию издания")}
                                        </FilterTag>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* тэги выбранных авторов, групп, поискового запроса */}
                    <div className="container">
                        { ( this.state.selectedGroupName.length > 0 || 
                            this.state.selectedAuthor.length > 0 ||
                            (this.state.searchIsActive && this.state.pubsearch.length) > 0 )
                            &&
                            <div className="columns">
                                <div className="column is-12-tablet is-8-desktop is-offset-2-desktop">
                                    <FiltersRequest selectedGroupName={selectedGroupName}
                                                    selectedAuthor={selectedAuthor}
                                                    pubsearch={active && pubsearch}
                                                    resetAuthor={this.resetAuthor}    
                                                    resetGroup={this.resetGroup}                                
                                                    resetSearch={this.resetSearch}                                
                                
                                    />
                                </div> 
                            </div>
                        }
                        
                        {/* Список публикаций 
                            отсортированный по дате, названию или названию издания*/}
                        {this.props.publications.isFetchingPubs
                         && <Loading /> }

                        <div className="columns">
                            <div className="column is-12-tablet is-8-desktop is-offset-2-desktop ">
                                <div className="publications">
                                    {!this.props.publications.isFetchingPubs && 
                                        (
                                        <SortedPubs 
                                            pubs={active ? this.props.publications.search : this.state.pubs}
                                            search={active && pubsearch}
                                            tag={activeTag}
                                        />
                                        )
                                    }
                                    {/* если нет публикаций */}
                                    {!this.props.publications.isFetchingPubs && this.state.pubs.length === 0 
                                    &&  <div className="no_pubs">
                                            <p>
                                                {t("По вашему запросу не найдено ни одной публикации")}
                                            </p>
                                            {t("Посмотрите список ")}
                                            <a onClick={e => this.resetAll(e)}>
                                                {t("всех публикаций")}
                                            </a>
                                            {t(" или используйте фильтры для выбора публикаций определенного автора или научной группы")}
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

    // обработка сортировки
    selectTag = (e, tag) => {
        e.preventDefault()
        this.setState({
            activeTag: tag, 
        })
        if (this.state.searchIsActive === false) {
            this.props.fetchPublications(this.props.lang, 100, this.state.pageNumber, tag, [])
        } else {
            this.props.searchPublication(this.state.pubsearch, tag)
        }
    }

    // поиск
    searchChange = (e) => {
        this.setState({
            pubsearch: e.target.value
        })
    }

    searchSubmit = (e) => {
        e.preventDefault()
        if (this.state.pubsearch.length) {
            this.setState({
                searchIsActive: true
            })
            this.props.searchPublication(this.state.pubsearch, this.state.activeTag)
        }
    }
    

    // обработка селекта научных групп
    handleGroupSelect = (group) => {
        this.resetAuthor()
        this.resetSearch()
        this.setState({
            selectedGroupName: group.value,
            pubs: filterPubsbyGroup(group.value, this.props.publications.pubs)
        })
    }
    
    // обработка селекта авторов
    handleAuthorsSelect = (author) => {
        this.resetGroup()
        this.resetSearch()
        this.setState({
            selectedAuthor: author.value,
            pubs: this.props.publications.pubs.filter(el => el.data.authors.some(a => a.text === author.value))
        })
    }

    // сброс всех селектов и поиска
    resetAll = (e) => {
        this.resetGroup(e)
        this.resetAuthor(e)
        this.resetSearch(e)
    }

    // cброс селекта научной группы
    resetGroup = (e) => {
        if (e) {
            e.preventDefault()
        }
        this.setState({
            selectedGroupName: "",
            pubs: this.props.publications.pubs
        })
        if (this.groupSelect.state.value !== null) {
            this.groupSelect.state.value = null
        }
    }

    // сброс селека авторов

    resetAuthor = (e) => {
        if (e) {
            e.preventDefault()
        }        
        this.setState({
            selectedAuthor: "",
            pubs: this.props.publications.pubs
        })
        if (this.authorSelect.state.value !== null) {
            this.authorSelect.state.value = null
        }
    }    

    // сброс поиска
    resetSearch = (e) => {
        if (e) {
            e.preventDefault()
        }        
        this.setState({
            pubsearch: "",
            searchIsActive: false
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


Publications.contextTypes = {
    t: PropTypes.func
  }

export default connect(mapStateToProps, mapDispatchToProps)(Publications)
