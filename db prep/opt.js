function findJournalNamebyId(journals, id) {
    var name = ""
    journals.forEach(el => {
        if (el.id === id) {
            name = el.name
        }
    })
    return name
}


var fs = require('fs');
var journals = require('./journals.json');
var publications = require('./publications.json');
var authors = require('./authors.json');

console.log("pub length", publications.publication.length)

// authors.author.forEach(el => {
//     el.name = el.inits + " " + el.lastname
//     delete el["person_id"]
//     delete el["spcfmt"]
//     delete el["inits"]
//     delete el["lastname"]

// })
// fs.writeFile('authors2.json', JSON.stringify(authors), function(err, data){
//     if (err) console.log(err);
//     console.log("Successfully Written Authors2");
// });

// publications.publication.forEach(el => {
//     el.journal = findJournalNamebyId(journals.journal, el.journal_id)
//     el.date = el.pdate
//     if (el.doi) { 
//         el.doi = "https://doi.org/" + el.doi
//     }
//     if (el.epurl) {
//         el.pdf_url = el.epurl
//     }
//     delete el["journal_id"]
//     delete el["category_id"]
//     delete el["publisher_id"]
//     delete el["conference_id"]
//     delete el["numpages"]
//     delete el["series_id"]
//     delete el["iqis"]
//     delete el["year"]
//     delete el["pdate"]
//     delete el["epurl"]
// })

// fs.writeFile('pub2.json', JSON.stringify(publications), function(err, data){
//     if (err) console.log(err) 
//     else console.log("Successfully Written Publications");
// });

// journals.journal.forEach(el => {
//     el.type = "journal"
//     el.tags = []
//     el.lang = "ru"
//     el.name = [{
//         "type": "heading1",
//         "content": {
//             "text": el.name,
//             "spans": []
//         }
//     }]

//     if (el.url) {
//         el.url = {
//             "url": el.url,
//             "preview": null
//         }
//     } 
//     delete el["issn_cdrom"]
//     delete el["issn_online"]
//     delete el["issn_print"]
//     delete el["id"]

//     fs.writeFile('journals/new_jour_ru' + Math.random().toString(36).substr(2, 9) + '.json', JSON.stringify(el), function(err, data){
//         if (err) console.log(err);
//         console.log("Successfully Written to Journals DIR.");
//     });
// })

// fs.writeFile('journals2.json', JSON.stringify(journals), function(err, data){
//     if (err) console.log(err);
//     console.log("Successfully Written to Journals 2.");
// });

