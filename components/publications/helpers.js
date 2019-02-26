export const findGroupIdByName = (groups, name) => {
    var id = ""
    groups.map(group => {
        if (group.data.groupname[0].text === name) {
            id = group.id
        }
    })
    return id
}

export const findEnglishName = (groups, russianName) => {

    var englishName = ""
    var englishid = ""
    var group_leader = false
    
    groups.forEach(el => {

        if(el.data.group_leader.data.name[0].text.indexOf(russianName) > 0) {
            englishid = el.alternate_languages[0].id
            group_leader = true
        }

        if (group_leader && englishid.length > 0) {
            englishName = groups.filter(el => el.id === englishid)
                                .map(el => el.data.group_leader.data.name[0].text.split(" ").pop())
                                .reduce((acc, value) => acc + value)
        } else {
            el.data.team_list.forEach((e, index) => {
                if(e.text.indexOf(russianName) > 0) {
                    englishid = el.alternate_languages[0].id
                    englishName = groups.filter(el => el.id === englishid)
                                        .map(el => el.data.team_list[index].text.split(" ").pop())
                                        .reduce((acc, value) => acc + value)
                }
            })
        }
    })
    return englishName
}

export const getUniqueDatesfromPubs = (pubs) => {
    // получаем из публикаций значения дат
    // сортируем их и удаляем дубликаты
    return pubs.map(pub => pub.data.date.slice(0, 4)).sort().filter((item, pos, ary) => (!pos || item != ary[pos - 1]))
}

export const getUniqueFirstLettersfromPubsNames = (pubs) => {
    // получаем из публикаций значения дат
    // сортируем их и удаляем дубликаты
    return pubs.map(pub => pub.data.date.title[0].text.slice(0, 1)).sort().filter((item, pos, ary) => (!pos || item != ary[pos - 1]))
}

export const getUniqueJournalNamesfromPubs = (pubs) => {
    // получаем из публикаций значения дат
    // сортируем их и удаляем дубликаты
    return pubs.map(pub => pub.data.date.journal_name[0].text.slice(0, 1)).sort().filter((item, pos, ary) => (!pos || item != ary[pos - 1]))
}

export const uniqArray = (a) => {
    var seen = {}
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true)
    });
}


export const filterPubsbyGroup = (group, pubs) => {

    var filteredPubs = []

    for (let i = 0; i < pubs.length; i++) {
        if( (pubs[i].data.science_group.data && pubs[i].data.science_group.data.groupname[0].text === group) ||
            (pubs[i].data.science_group1.data && pubs[i].data.science_group1.data.groupname[0].text === group) ||
            (pubs[i].data.science_group2.data && pubs[i].data.science_group2.data.groupname[0].text === group) ) {
                filteredPubs.push(pubs[i])
            }
    }

    return filteredPubs
}
