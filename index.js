const config = require('./config');

const db = require('./dao');

const app = require('./create_server');

const HTTPServer = require('http').createServer(app.callback());

const instance = HTTPServer.listen(config.httpPort, (err) => {
  if (!err) {
    console.log(new Date() + ' app ' + config.dev + ' ' + config.httpPort);
  }
});

module.exports = instance; 