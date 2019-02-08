var fs = require('fs');
var journals = require('./journals.json');
var publications = require('./publications.json');
var authors = require('./authors.json');
var authors_pubs = require('./authors_publication_xref.json')


function sortAuthorPubs(data) {
    data.sort((a, b) => {
        if (parseInt(a.publication_id,10) < parseInt(b.publication_id, 10)) {
            return -1
        } else if (parseInt(a.publication_id,10) === parseInt(b.publication_id, 10)) {
            if (parseInt(a.authord, 10) < parseInt(b.authord, 10)) {
                return -1
            }
        }
    })
}

sortAuthorPubs(authors_pubs.author_publication_xref)

fs.writeFile('/Users/vladislavsorokin/webprojects/rqc/db_prep/newapub.json', JSON.stringify(authors_pubs), function(err, data){
    if (err) {
        console.log(err)
    } else {
        console.log("OK")
    }
})

// function findJournalNamebyId(journals, id) {
//     var name = ""
//     journals.forEach(el => {
//         if (el.id === id) {
//             name = el.name
//         }
//     })
//     return name
// }

// function findJournalURLbyId(journals, id) {
//     var url = ""
//     var name = ""
//     journals.forEach(el => {
//         if (el.id === id) {
//             url = el.url
//             name = el.name
//         }
//     })
//     return (typeof url === "undefined") ? null : url
// }

// function findAuthorByID(id) {
//     var name = ""
//     authors.author.forEach(author => {
//         if(author.id === id) {
//             name = author.inits + " " + author.lastname
//         }
//     })
//     return name
// }

// function findAllAuthorsbyPubID(pub_id) {

//     var ArrayOfAuthors = []
//     authors_pubs.author_publication_xref.forEach(element => {
//         if(element.publication_id === pub_id) {
//             ArrayOfAuthors.push(
//                 {
//                     "type": "paragraph",
//                     "content": {
//                         "text": findAuthorByID(element.author_id),
//                         "spans": []
//                     }
//                 }   
//             )
//         }
//     })

//     return ArrayOfAuthors
// }

// publications.publication.forEach(el => {
//     el.type = "publication"
//     el.lang = "ru"
//     el.title = [
//         {
//             "type": "heading1",
//             "content": {
//                 "text": el.title,
//                 "spans": []
//             }
//         }
//     ]
//     el.date = el.pdate
//     el.journal_name = [
//         {
//             "type": "paragraph",
//             "content": {
//                 "text": findJournalNamebyId(journals.journal, el.journal_id),
//                 "spans": []
//             }
//         }
//     ]
//     if (el.journal_id) {
//         if (findJournalURLbyId(journals.journal, el.journal_id) !== null) {
//             el.journal_url = {
//                 "url": findJournalURLbyId(journals.journal, el.journal_id),
//                 "preview": null
//             }
//         } else {
//             el.journal_url = {
//                 "url": "",
//                 "preview": null
//             }
//         }
//     }
    
//     if (el.pages !== null) {
//         el.article_number = el.pages
//         delete el["pages"]
//     }
//     if(el.firstpage && el.lastpage) {
//         el.pages = [
//             {
//                 "type": "paragraph",
//                 "content": {
//                     "text": el.firstpage + " - " + el.lastpage,
//                     "spans": []
//                 }
//             }
//         ]   
//     }
//     if (el.doi) { 
//         el.doi = {
//             "url": "https://doi.org/" + el.doi,
//             "preview": null
//         } 
//     }
//     if (el.eprint) {
//         el.eprint = [
//             {
//                 "type": "paragraph",
//                 "content": {
//                     "text": el.eprint,
//                     "spans": []
//                 }
//             }
//         ] 
//     } 

//     el.authors = findAllAuthorsbyPubID(el.id)
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
//     delete el["id"]
//     delete el["note"]
//     delete el["url"]
//     delete el["verified"]
//     delete el["firstpage"]
//     delete el["lastpage"]
//     delete el["locator"]
//     delete el["isbn"]
//     delete el["book_title"]
//     delete el["chapter"]
//     delete el["editors"]
//     delete el["int_note"]
//     delete el["book_url"]

//     var filename = './db_prep/PUBS/new_pub_ru_' + Math.random().toString(36).substr(2, 9) + '.json'
//     fs.writeFile(filename, JSON.stringify(el), function(err, data){
//         console.log("writing ", filename, "...")
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("OK")
//         }
//     })
// })

