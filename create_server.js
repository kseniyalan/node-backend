const config = require('./config');

const db = require('./dao');
const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const mount = require('koa-mount');
const logger = require('koa-logger');
const cors = require('@koa/cors');

const app = new Koa();
app.use(logger());
app.use(cors());

const mobileRoutes = require('./routes/mobile-routes');
const siteRoutes = require('./routes/site-routes');

app.proxy = true;

app.use(
  mount(
    '/.well-known',
    serve(path.join(__dirname, config.staticDirectory, config.sslDirectory)),
  ),
);
app.use(
  mount(
    '/',
    serve(
      path.join(__dirname, config.staticDirectory, config.landingDirectory),
    ),
  ),
);

app.use(mobileRoutes.routes()).use(mobileRoutes.allowedMethods());
app.use(siteRoutes.routes()).use(siteRoutes.allowedMethods());

module.exports = app;
