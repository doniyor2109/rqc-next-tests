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
import PubsSortedByTitle from '../components/publications/PubsSortedByTitle'
import PubsSortedByDate from '../components/publications/PubsSortedByDate'
import PubsSortedByJournal from '../components/publications/PubsSortedByJournal'
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

        if(this.props.publications.search !== prevProps.publications.search) {
            this.setState({
                pubs: this.props.publications.search
            })
        }

        if(this.state.searchIsActive !== prevState.searchIsActive === true) {
            this.setState({
                pubs: this.props.publications.pubs
            })
        }
    }

    render() {

        console.log("publications", this.props)
        // console.log("group select", this.groupSelect)

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
                                <div className="column is-7-desktop is-7-tablet is-12-mobile">
                                    <div className="columns is-multiline">
                                        <div className="column is-7-desktop is-12-tablet">
                                            <div className="select_wrapper">
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
                                        </div>
                                        <div className="column is-5-desktop is-12-tablet">
                                            <div className="select_wrapper">
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
                                        </div>
                                    </div>
                                </div>


                                {/* Поиск */}

                                <div className="column is-4-desktop is-offset-1-desktop">
                                    <form className="search_form" onSubmit={e => this.searchSubmit(e)}>
                                        <input type="search" 
                                            id="input-search" 
                                            name="search" 
                                            value={this.state.pubsearch}
                                            onChange={e => this.searchChange(e)}
                                            placeholder={this.context.t("Ваш запрос")}
                                        />
                                        <button type="submit" id="input-submit-button"></button>
                                    </form>
                                </div>
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

                    {/* тэги выбранных авторов, групп, поискового запроса */}
                    <div className="container">
                        { ( this.state.selectedGroupName.length > 0 || 
                            this.state.selectedAuthor.length > 0 ||
                            (this.state.searchIsActive && this.state.pubsearch.length) > 0 )
                            &&
                            <div className="columns">
                                <div className="column is-12-tablet is-8-desktop is-offset-2-desktop">
                                    <FiltersRequest selectedGroupName={this.state.selectedGroupName}
                                                    selectedAuthor={this.state.selectedAuthor}
                                                    pubsearch={this.state.pubsearch}
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
                                        (this.state.activeTag === "SORT_DATE"
                                        ? <PubsSortedByDate pubs={this.state.pubs} />
                                        : (this.state.activeTag === "SORT_NAME" 
                                            ? <PubsSortedByTitle pubs={this.state.pubs} />
                                            : <PubsSortedByJournal pubs={this.state.pubs} />
                                        )
                                        )
                                    }

                                    {/* если нет публикаций */}
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

    // обработка сортировки
    selectTag = (e, tag) => {
        e.preventDefault()
        this.setState({
            activeTag: tag, 
        })
        if (this.state.searchIsActive === false) {
            this.props.fetchPublications(this.props.lang, 100, this.state.pageNumber, tag, [])
        } else {
            this.props.searchPublication(this.state.pubsearch)
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
            this.props.searchPublication(this.state.pubsearch)
        }
    }
    

    // обработка селекта научных групп
    handleGroupSelect = (group) => {
        this.resetAuthor()
        this.setState({
            selectedGroupName: group.value,
            pubs: filterPubsbyGroup(group.value, this.props.publications.pubs)
        })
    }
    
    // обработка селекта авторов
    handleAuthorsSelect = (author) => {
        this.resetGroup()
        this.setState({
            selectedAuthor: author.value,
            pubs: this.props.publications.pubs.filter(el => el.data.authors.some(a => a.text === author.value))
        })
    }

    // сброс всех селектов и поиска
    resetAll = (e) => {
        if (e) {
            this.resetGroup(e)
        } else this.resetGroup()
        
        this.resetAuthor(e)
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

export default connect(mapStateToProps, mapDispatchToProps)(Publications)
