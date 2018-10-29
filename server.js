const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const route = pathMatch()

const matchArticle = route('/article/:uid')
const matchPhoto = route('/photo/:uid')
const matchVideo = route('/video/:uid')
const matchTeam = route('/team/:uid')



app.prepare()
  .then(() => {
    createServer((req, res) => {
      const { pathname, query } = parse(req.url, true)
      const paramsArticle = matchArticle(pathname)
      const paramsPhoto = matchPhoto(pathname)
      const paramsVideo = matchVideo(pathname)
      const paramsTeam = matchTeam(pathname)


      if (paramsArticle === false || paramsPhoto === false || paramsVideo === false || paramsTeam === false) {
        handle(req, res)
        return
      }
      // assigning `query` into the params means that we still
      // get the query string passed to our application
      // i.e. /blog/foo?show-comments=true
      app.render(req, res, '/article', Object.assign(paramsArticle, query))
      app.render(req, res, '/photo', Object.assign(paramsPhoto, query))
      app.render(req, res, '/video', Object.assign(paramsVideo, query))
      app.render(req, res, '/team', Object.assign(paramsTeam, query))

    })
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  })