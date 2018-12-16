import React from 'react' 
import Link from 'next/link'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'

var natural = require('natural');
const RequiredDistance = 4
const natOptions = {
    search: true,
    // insertion_cost: 5,
    // deletion_cost: 5,
    substitution_cost: 1
}
var tokenizer = new natural.WordTokenizer()


// const dataHasTextwithTokens = (data, search_text) => {

//         /// tokenize and stem search

//         var tokenizer = new natural.WordTokenizer()
//         const searchArray = tokenizer.tokenize(search_text)

//         const searchedDistance = []
//         searchArray.forEach(element => {
//             const r = natural.LevenshteinDistance(search_text, data.text, {search: true})
//             searchedDistance.push(r.distance)
//         });
//         console.log("tokenized search in ", data.text, " with lev", searchedDistance)
//         //// -------

//     }


const dataHasText = (data, search_text) => {

    // вспомогательная функция, которая возвращает true or false  
    // в зависимости от того, встречается ли в искомом объекте с ключом text
    // искомый текст

    "use strict"

    var pos = null

    if (data.text && data.text.length > 0) {
        pos = data.text.toLowerCase().indexOf(search_text.toLowerCase())

        if (pos !== -1) return true 
        else {
            const l = natural.LevenshteinDistance(search_text.toLowerCase(), data.text, natOptions)
            console.log("dataHasText.natural for data ", data, " is - ", l);
            const searchArray = tokenizer.tokenize(search_text.toLowerCase())
            if ((l.distance <= RequiredDistance) && (searchArray[0].slice(0,(searchArray[0].length - 2)) === l.substring.toLowerCase().slice(0,(searchArray[0].length - 2)))) 
            return true
            else return false
        }
    } else return "there is no text key"
}

const searchdata = (data, search_text) => {

    // вспомогательная функция, которая возвращает массив из трех строк: 
    // [текст из 100 символов до искомого, искомый текст, текст из 100 символов после искомого]
    // работает только с объектами, в которых есть ключ text, в нем она и ищет

    "use strict"

    var text_before_search = ""
    var text_after_search = ""
    var pos = null
    var str = ""

    if (data.text && data.text.length > 0) {

        // четкий поиск с помощью .indexOf()
        pos = data.text.toLowerCase().indexOf(search_text.toLowerCase())

        if (pos !== -1) {
            str = data.text.slice(pos, pos + search_text.length)
            text_before_search = data.text.slice(((pos - 100) < 0 ? 0 : pos - 100), pos)
            text_after_search = data.text.slice(pos + search_text.length, pos + 100)
            // console.log("result from indexOf search",   [text_before_search, str, text_after_search])
            
            return [text_before_search, str, text_after_search]

        } else {

            // нечеткий поиск с помощью фильтра по расстоянию Левенштейна
            const l = natural.LevenshteinDistance(search_text.toLowerCase(), data.text, natOptions)
            // console.log("natural for data ", data.text, " is - ", l)
            const searchArray = tokenizer.tokenize(search_text.toLowerCase())
            if ((l.distance <= RequiredDistance) && (searchArray[0].slice(0,(searchArray[0].length - 2)) === l.substring.toLowerCase().slice(0,(searchArray[0].length - 2)))) 
            {
        
                pos = data.text.toLowerCase().indexOf(l.substring.toLowerCase())
                str = data.text.slice(pos, pos + search_text.length)
                text_before_search = data.text.slice(((pos - 100) < 0 ? 0 : pos - 100), pos)
                text_after_search = data.text.slice(pos + search_text.length, pos + 100)

                return [text_before_search, str, text_after_search]

            } else return false




        }
    }
}




const ResultTeam = (props, context) => {

    const {item, search_text} = props

    var result = []

    // result = searchComplex(item.data, search_text)

    

    // console.log("test", item.data.topics.some(x => dataHasText(x["topics_list"].map(el => el), search_text)))
    
    // WORKING !!!
    if (item.data.team_list.some(x => dataHasText(x, search_text))) {
        result = item.data.team_list.map(x => searchdata(x, search_text)).find(el => el)
        if (result) {
            result[0] = context.t("Участники группы") + ": " + result[0]
        }
    } else if (item.data.group_leader.data.name.some(x => dataHasText(x, search_text))) {
        result = item.data.group_leader.data.name.map(x => searchdata(x, search_text)).find(el => el)
        if (result) {
            result[0] = context.t("Руководитель группы") + ": " + result[0]
        }    
    } else if (item.data.group_leader.data.position.some(x => dataHasText(x, search_text))) {
        result = item.data.group_leader.data.position.map(x => searchdata(x, search_text)).find(el => el)
        if (result) {
            result[0] = context.t("Руководитель группы") + ": " + result[0]
        }
    } else if (item.data.description.some(x => dataHasText(x, search_text))) {
        result = item.data.description.map(x => searchdata(x, search_text)).find(el => el)
    } else if (item.data.leader_quote.some(x => dataHasText(x, search_text))) {
        result = item.data.leader_quote.map(x => searchdata(x, search_text)).find(el => el)
    } 
    else if (item.data.milestones.some(x => dataHasText(x["milestone"][0], search_text))) {
        result = item.data.milestones.map(x => searchdata(x["milestone"][0], search_text)).find(el => el)
        if (result) {
            result[0] = context.t("Успехи группы") + ": " + result[0]
        }
    } 
    else if (item.data.topics.some(x => dataHasText(x["research_topic"][0], search_text))) {
        result = item.data.topics.map(x => searchdata(x["research_topic"][0], search_text)).find(el => el)
        if (result) {
            result[0] = context.t("Направления исследований") + ": " + result[0]
        }
    } else if (item.data.topics.some(x => dataHasText(x["topics_list"].map(el => el), search_text))) {
        result = item.data.topics.map(x => x["topics_list"].map(el => searchdata(el, search_text))).reduce((a, b) => a.concat(b)).find(el => el)
        if (result) {
            result[0] = context.t("Направления исследований") + ": " + result[0]
        }
    } 

    console.log("RESULT for ", item.uid, " and search_text " , search_text, " is – ", result)



        return (
                    <div className="result result-team" >
                        <Link href={'/team?uid=' + item.uid} as={'/team/' + item.uid}>
                            <a> 
                                {context.t("Группа")}&nbsp; 
                                {RichText.render(item.data.groupname, PrismicConfig.linkResolver)}
                            </a>
                        </Link>
                        <p className="highlighted">
                            {result ? result.map((res, index) => <span key={index} 
                                                            className={index === 1 ? "bold" : "normal"}>
                                                            {res}
                                                        </span>
                                        )
                                    : ""
                            }
                        </p>
                    </div>
    ) 
}

ResultTeam.contextTypes = {
    t: PropTypes.func
  }

export default ResultTeam