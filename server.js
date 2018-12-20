const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/article/:uid', (req, res) => {
      return app.render(req, res, '/article', { uid: req.params.uid })
    })

    server.get('/photo/:uid', (req, res) => {
      return app.render(req, res, '/photo', { uid: req.params.uid })
    })

    server.get('/video/:uid', (req, res) => {
      return app.render(req, res, '/video', { uid: req.params.uid })
    })

    server.get('/team/:uid', (req, res) => {
      return app.render(req, res, '/team', { uid: req.params.uid })
    })

    server.get('/event/:uid', (req, res) => {
      return app.render(req, res, '/event', { uid: req.params.uid })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })