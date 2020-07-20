const config = require('./config');

const db = require('./dao');
const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('@koa/cors');

const app = new Koa();
app.use(logger());
app.use(cors());

app.proxy = true;

module.exports = app;
