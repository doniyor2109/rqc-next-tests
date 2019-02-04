import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Head from 'next/head'

import {Loading} from '../components/shared/loading'

import * as groupsActions from '../redux/actions/scigroups'
import * as publicationsActions from '../redux/actions/publications'
import * as langActions from '../redux/actions/lang'
import Publication from '../components/publications/Publication'

import '../scss/publications.scss'

// Основной компонент, связывающий весь интерфейс страницы /news воедино
class Publications extends Component {

  static contextTypes = {
    t: PropTypes.func
  }
  
  constructor(props) {
    super(props)
    this.state = {
        searchbyAuthor: "", 
        pubs: [],
        groupsName: [],
        selectedGroupName: "", 
        authors:[],
        selectedAuthor: ""
    }
  }

    componentDidMount() {
        this.props.fetchPublications(this.props.lang)
        this.props.fetchSciGroups("*")
    }

    componentDidUpdate(prevProps, prevState) {

        // заносим все публикации в state, чтобы потом их фильтровать
        if(this.props.publications.pubs !== prevProps.publications.pubs) {
            this.setState({
                pubs: this.props.publications.pubs
            })
        }


        // получаем список групп для select
        if (prevProps.scigroups.groups !== this.props.scigroups.groups) {
            this.setState({
                groupsName: this.props.scigroups.groups.filter(el => el.lang === this.props.lang).map(group => group.data.groupname[0].text),
            })
        }

        // если меняется язык
        if (this.props.lang !== prevProps.lang) {

            // получаем снова публикации
            this.props.fetchPublications(this.props.lang)

            // обновляем список групп
            this.setState({
                groupsName: this.props.scigroups.groups.filter(el => el.lang === this.props.lang).map(group => group.data.groupname[0].text),
            })
        }

        // как только у нас есть список групп, получаем список авторов для этой группы
        if(prevState.selectedGroupName !== this.state.selectedGroupName) {
            this.setState({
                authors: this.props.scigroups.groups.filter(el => 
                    el.data.groupname[0].text === this.state.selectedGroupName)[0].data.team_list.map(author => 
                        author.text.substring(author.text.lastIndexOf(" ") + 1, author.text.length)),

                // а также фильтруем публикации по группам
                pubs: this.props.publications.pubs.filter(el => el.data.science_group.id === this.findGroupIdByName(this.props.scigroups.groups, this.state.selectedGroupName))

            })
            // добавляем в список авторов группы ее руководителя
            this.setState(prevState => ({
                authors: [this.props.scigroups.groups.filter(el => 
                    el.data.groupname[0].text === this.state.selectedGroupName)[0].data.group_leader.data.name[0].text.split(" ").pop(), ...prevState.authors]
            }))


        }

        // if(this.props.publications.pubsbyAuthor !== prevProps.publications.pubsbyAuthor) {
        //     this.setState({
        //         pubs: this.props.publications.pubsbyAuthor
        //     })
        // }



    }

    render() {

        console.log("publications", this.props)

        return (
            <div className="sciencepage">
                <div className="container">
                    <div className="columns">
                        <div className="column is-4">
                            {/* <form className="search_form" onSubmit={e => this.handleSubmit(e)}>
                                <input type="search" 
                                    id="input-search" 
                                    name="search" 
                                    value={this.state.searchbyAuthor}
                                    onChange={e => this.handleChange(e)}
                                />
                                <button type="submit" id="input-submit-button">Search by author</button>
                            </form> */}
                            <div className="select">
                                <select value={this.state.selectedGroupName} onChange={this.handleGroupSelect}>
                                    <option value="choose">{this.context.t("Выберите группу")}</option> 
                                    {this.state.groupsName.map((group, index) => 
                                        <option value={group} key={index}>{group}</option>
                                    )}
                                </select>
                            </div>
                            <div className="select">
                                <select value={this.state.selectedAuthor} onChange={this.handleAuthorsSelect}>
                                    <option value="choose">{this.context.t("Выберите автора")}</option> 
                                    {this.state.authors.map((author, index) => 
                                        <option value={author} key={index}>{author}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                    {(this.props.publications.isFetchingPubs || this.props.publications.isFetchingPubsbyAuthor) && <Loading /> }
                    <div className="columns">
                        <div className="column is-6">
                            <div className="publications">
                                {(this.state.selectedAuthor.length === 0) //фильтр по автору не выбран

                                /* вывод всех публикаций */
                                ?
                                    (this.state.pubs.length === 0 //
                                    ? <p>{this.context.t("У этой научной группы еше не вышло ни одной публикации")}</p>
                                    : this.state.pubs.map((pub, index) => <Publication pub={pub} key={index} />)
                                    )
                                  
                                /* вывод публикаций по конкретному автору */
                                : 
                                    (this.props.publications.pubsByAuthor.length > 0 
                                    ? this.props.publications.pubsByAuthor.map((pub, index) => <Publication pub={pub} key={index} />)
                                    : <p>{this.context.t("Этот автора еще ничего не написал")}</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    findGroupIdByName = (groups, name) => {
        var id = ""
        groups.map(group => {
            if (group.data.groupname[0].text === name) {
                id = group.id
            }
        })
        return id
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
    
    handleGroupSelect = (event) => {
        if(event.target.value !== "choose") {
            this.setState({
                selectedGroupName: event.target.value,
                selectedAuthor: ""
            })
        }
    }

    findEnglishName = (russianName) => {

        var englishName = ""
        var englishid = ""
        var group_leader = false
        
        this.props.scigroups.groups.forEach(el => {

            if(el.data.group_leader.data.name[0].text.indexOf(russianName) > 0) {
                englishid = el.alternate_languages[0].id
                group_leader = true
            }

            if (group_leader && englishid.length > 0) {
                englishName = this.props.scigroups.groups.filter(el => el.id === englishid)
                                                         .map(el => el.data.group_leader.data.name[0].text.split(" ").pop())
                                                         .reduce((acc, value) => acc + value)
            } else {
                el.data.team_list.forEach((e, index) => {
                    if(e.text.indexOf(russianName) > 0) {
                        englishid = el.alternate_languages[0].id
                        englishName = this.props.scigroups.groups.filter(el => el.id === englishid)
                                                                 .map(el => el.data.team_list[index].text.split(" ").pop())
                                                                 .reduce((acc, value) => acc + value)
                    }
                })
            }
        })

        return englishName
    }

    handleAuthorsSelect = (event) => {

        if(event.target.value !== "choose") {
            if (this.props.scigroups.groups.length === 0) {
                return console.log("группы не загружены")
            } else {
                this.setState({selectedAuthor: event.target.value})
                if (this.props.lang === "en-gb") {
                    // обычный поиск по фамилии
                    this.props.SearchPuiblicationbyAuthor(event.target.value)
                } else {
                    // cначала находим английское соответствие фамилии,
                    // потом просто ищем по фамилии
                    console.log(this.findEnglishName(event.target.value))
                    this.props.SearchPuiblicationbyAuthor(this.findEnglishName(event.target.value))
                }
            }
        }
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
