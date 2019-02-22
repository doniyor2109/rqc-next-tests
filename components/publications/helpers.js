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