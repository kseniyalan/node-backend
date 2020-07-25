'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS "images" ("id"   SERIAL , "src" TEXT NOT NULL, "width" INTEGER NOT NULL, "preview" TEXT NOT NULL, "height" INTEGER NOT NULL, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "fruits" ("id"   SERIAL , "name" VARCHAR(50) NOT NULL, "amount" INTEGER NOT NULL, "eaten" BOOLEAN NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "avatar" INTEGER REFERENCES "images" ("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id"));
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS "fruits" CASCADE;
    DROP TABLE IF EXISTS "images" CASCADE;
    `);
  },
};
