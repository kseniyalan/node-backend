const config = require('./config');

const db = require('./dao');
const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const path = require('path');
const serve = require('koa-static');
const mount = require('koa-mount'); //Mounts paths to static

const routes = require('./routes/routes');

const app = new Koa();
app.use(logger());
app.use(cors());

app.proxy = true;

app.use(routes.routes()).use(routes.allowedMethods());

//Mounts path to static folders
app.use(
  mount(
    '/',
    serve(__dirname),
  ),
);

module.exports = app;
