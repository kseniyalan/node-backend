'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config')['db'];
const db = {};

const sequelize = new Sequelize(
  config.PG_DATABASE,
  config.PG_USERNAME,
  config.PG_PASSWORD,
  {
    logging: config.logging,
    dialect: config.PG_DIALECT,
  },
);

sequelize
  .sync() //{force: true} will overwrite the database every time it starts
  .then((result) => {})
  .catch((err) => {});

fs.readdirSync(__dirname + '/models')
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, 'models', file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
