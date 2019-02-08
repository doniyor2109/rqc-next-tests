var fs = require('fs');
var prismic_dir = '/Users/vladislavsorokin/webprojects/rqc/db_prep/prismic_content'

function deleteAllFilesExceptPublications(dir) {

    // удаляет все файлы в dir, которые не являются публикациями
    fs.readdir(dir, function(err, items) {
        for (let file of items) {
            fs.readFile(dir + "/" + file, function(err, rawdata) {
                // console.log("parsing ", file, "...")
                let content = JSON.parse(rawdata)
                if (content.type !== "publication") {
                    fs.unlink(dir + "/" + file, (err) => {
                        if (err) throw err;
                    })
                    console.log("files deleted")
                } else {
                    content.lang = "en-gb"
                    fs.writeFile('./db_prep/prismic_content/translate_' + content.grouplang + "_en-gb.json", JSON.stringify(content), function(err, data){
                        console.log("writing translate_", file.slice(0, 15), "_en-gb.json ...")
                        if (err) console.log(err) 
                        else console.log("OK")
                    })
                }
            })
        }
    })
}

deleteAllFilesExceptPublications(prismic_dir)


