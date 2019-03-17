// export const findGroupIdByName = (groups, name) => {
//   let id = '';
//   groups.forEach((group) => {
//     const { groupid } = group;
//     if (group.data.groupname[0].text === name) {
//       id = groupid;
//     }
//   });
//   return id;
// };

// export const findEnglishName = (groups, russianName) => {
//   let englishName = '';
//   let englishid = '';
//   let groupLeader = false;

//   groups.forEach((el) => {
//     if (el.data.groupLeader.data.name[0].text.indexOf(russianName) > 0) {
//       englishid = el.alternate_languages[0].id;
//       groupLeader = true;
//     }

//     if (groupLeader && englishid.length > 0) {
//       englishName = groups.filter(elmnt => elmnt.id === englishid)
//         .map(element => element.data.groupLeader.data.name[0].text.split(' ').pop())
//         .reduce((acc, value) => acc + value);
//     } else {
//       el.data.team_list.forEach((e, index) => {
//         if (e.text.indexOf(russianName) > 0) {
//           englishid = el.alternate_languages[0].id;
//           englishName = groups.filter(group => group.id === englishid)
//             .map(filteredGroup => filteredGroup.data.team_list[index].text.split(' ').pop())
//             .reduce((acc, value) => acc + value);
//         }
//       });
//     }
//   });
//   return englishName;
// };

export const uniqArray = (a) => {
  const seen = {};
  return a.filter(item => (seen.hasOwnProperty(item) ? false : (seen[item] = true)));
};


export const filterPubsbyGroup = (pubs, group) => {
  const filteredPubs = [];
  for (let i = 0; i < pubs.length; i += 1) {
    pubs[i].data.belongs_to_group.forEach((g) => {
      if (g.sci_group.data.groupname[0].text === group) {
        filteredPubs.push(pubs[i]);
      }
    });
  }
  return filteredPubs;
};
