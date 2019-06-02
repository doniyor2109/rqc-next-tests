const express = require('express');
const next = require('next');
const multer = require('multer');
const mailer = require('./mailer');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('/article/:uid', (req, res) => app.render(req, res, '/article', { uid: req.params.uid }));

    server.get('/photo/:uid', (req, res) => app.render(req, res, '/photo', { uid: req.params.uid }));

    server.get('/video/:uid', (req, res) => app.render(req, res, '/video', { uid: req.params.uid }));

    server.get('/team/:uid', (req, res) => app.render(req, res, '/team', { uid: req.params.uid }));

    server.get('/event/:uid', (req, res) => app.render(req, res, '/event', { uid: req.params.uid }));

    server.get('/search/:text', (req, res) => app.render(req, res, '/search', { text: req.params.text }));

    server.get('*', (req, res) => handle(req, res));

    const form = multer();
    server.post('/sendmail', form.none(), (req, res) => {
      const formData = req.body;
      mailer({ email: formData.email, name: formData.name, letter: formData }).then(() => {
        res.sendStatus(200);
      }).catch((error) => {
        console.log('nodemailer error', error);
        res.sendStatus(500);
      });
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
