// на входе у нас есть сложный объект, в котором нужно искать. 
// объект может состоять из массивов или других объектов
// например
            // data = {
                //     description: [
                //                     {
                //                     spans: []
                //                     text: "Группа была основана в июле 2013 года. Основные направления исследования включают в себя экспериментальное и теоретическое изучение магнитоплазмоники, активной плазмоники, сверхбыстрого оптического управления спином и генерации магнонов. Наиболее важные и перспективные области нашей работы: генерация магнонов при помощи импульса фемтосекундного лазера, магнитоплазмонные структуры и наноантенны для управления светом, а также магнитооптика гетероструктур на основе двумерных (2D) электронных материалов, топологических изоляторов и магнитных пленок. В лаборатории проводятся исследования различных фундаментальных проблем в данных областях и ведется поиск практического применения сверхчувствительной магнитометрии, биосенсоров, обработки данных на основе магнонов, а также управления фотонами с помощью магнитного поля."
                //                     type: "paragraph"
                //                     }
                //                 ], 
                //     group_leader: {
                //         data: {name: Array(1), position: Array(1)}
                //         id: "W3M8oCQAACQAa1vC"
                //         isBroken: false
                //         lang: "ru"
                //         link_type: "Document"
                //         slug: "%D0%B2%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80-%D0%B1%D0%B5%D0%BB%D0%BE%D1%82%D0%B5%D0%BB%D0%BE%D0%B2"
                //         tags: []
                //         type: "scientist"
                //         uid: "владимир-белотелов"
                //     }
                // }


// добавляем библиотку natural
var natural = require('natural')
const natOptions = {
    search: true,
    // insertion_cost: 5,
    // deletion_cost: 5,
    substitution_cost: 1
}

const natOptions2 = {
    search: true
}

// инициализируем tokenizer, функцию, которая разбивает поисковый запрос на слова
var tokenizer = new natural.WordTokenizer()


const simpleSearch = (data, search_text) => {

    // функция четкого поиска по заданной строке
    // ищет точные совпадения c помощью indexOf()

    // инициализируем переменные, в котороые будем складывать результаты
    var text_before_search = ""
    var text_after_search = ""
    var pos = null
    var str = ""

    pos = data.text.toLowerCase().indexOf(search_text.toLowerCase())

    if (pos !== -1) {
        str = data.text.slice(pos, pos + search_text.length)
        text_before_search = data.text.slice((pos - 100) < 0 ? 0 : (data.text.indexOf(" ", pos - 100)) + 1, pos)
        text_after_search = data.text.slice(pos + search_text.length, data.text.lastIndexOf(' ', pos + 100))

        return [((pos - 100) < 0) ? text_before_search : ("..." + text_before_search) , str, (text_after_search + "...")]
    } 
    else return false

}

const fuzzysearch = (data, search_text, requiredDistance, quality, options) => {

    // нечеткий поиск с помощью библиотеки natural по коэфф. Левенштейна
    // quality — это число, с помощью которого можно регулировать точность поиска, 
    // чем меньше quality, тем строже требования к совпадению запроса и результата
    // quality - это количество букв в первом слове запроса и результата, которые могут отличаться
    // изначально хотелось, чтобы могли отличаться только окончания, например "квантовая" = "квантовые"
    // но возможно нужно дать алгоритму возможность искать и что-то вроде "научный" = "науки"

    // разбиваем запрос на слова
    const searchArray = tokenizer.tokenize(search_text.toLowerCase())

    // инициализируем переменные, в котороые будем складывать результаты
    var text_before_search = ""
    var text_after_search = ""
    var pos = null
    var str = ""

    const fuzzy = natural.LevenshteinDistance(search_text.toLowerCase(), data.text.toLowerCase(), options)

    if ((fuzzy.distance <= requiredDistance) && (searchArray[0].slice(0,(searchArray[0].length - quality)) === fuzzy.substring.toLowerCase().slice(0,(searchArray[0].length - quality)))) 

        {
            pos = data.text.toLowerCase().indexOf(fuzzy.substring.toLowerCase())
            str = data.text.slice(pos, pos + search_text.length)
            text_before_search = data.text.slice((pos - 100) < 0 ? 0 : (data.text.indexOf(" ", pos - 100)) + 1, pos)
            text_after_search = data.text.slice(pos + search_text.length, data.text.lastIndexOf(' ', pos + 100))

            return [((pos - 100) < 0) ? text_before_search : ("..." + text_before_search) , str, (text_after_search + "...")]
        }

    else return false
}

const searchComplex = (result, data, search_text) => {    
    Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
            data[key].map(element => {
                if(element.text) {
                    result.push({key: key,
                                 highlight: simpleSearch(element, search_text), 
                                 rank: 0})
                    result.push({key: key,
                                 highlight: fuzzysearch(element, search_text, 4, 2, natOptions), 
                                 rank: 1})
                    result.push({key: key,
                                 highlight: fuzzysearch(element, search_text, 5, 4, natOptions2), 
                                 rank: 2})
                }
                else {
                    searchComplex(result, element, search_text)
                }
            })
        } else if ((typeof data[key] === 'object') && data[key] !== null) {
            searchComplex(result, data[key], search_text)
        }
    })
    return result.filter(e => e.highlight !== false).sort((a,b) => {
                                                    if (a.rank < b.rank) return -1
    })
}

export default searchComplex