
const request = require('request')

export default (req, res) => {
  // path to file
  const filePath = req.query.filepath

  // filename only
  // const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('?'));
  const fileName = req.query.filename

  // set header
  res.setHeader('content-disposition', `attachment; filename=${fileName}`)

  // send request to the original file
  request
    .get(filePath) // download original image
    .on('error', () => {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end()
    })
    .pipe(res) // pipe converted image to HTTP response
}

