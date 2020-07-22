const config = require('./config');

const db = require('./dao');
const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('@koa/cors');

const routes = require('./routes/routes');

const app = new Koa();
app.use(logger());
app.use(cors());

app.proxy = true;

app.use(routes.routes()).use(routes.allowedMethods());

module.exports = app;
