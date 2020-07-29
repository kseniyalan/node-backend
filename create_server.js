const config = require('./config');

const db = require('./dao');
const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const path = require('path');
const serve = require('koa-static'); //Расшаривает файлы
const mount = require('koa-mount'); //Монтирует пути до статики

const routes = require('./routes/routes');

const app = new Koa();
app.use(logger());
app.use(cors());

app.proxy = true;

app.use(routes.routes()).use(routes.allowedMethods());

//Монтирует путь к папкам со статикой
app.use(
  mount(
    '/',
    serve(__dirname),
  ),
);

module.exports = app;
