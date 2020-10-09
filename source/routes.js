const express = require('express');

const Url = require('./controllers/Url.controller');

const routes = express.Router();

routes.get('/:slug', Url.show);
routes.post('/url', Url.store);

module.exports = routes;