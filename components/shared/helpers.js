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

export const getuniqueTags = (arraywithTags) => {
  return uniqArray(arraywithTags.reduce((acc, val) => acc.concat(val.tags), []))
}