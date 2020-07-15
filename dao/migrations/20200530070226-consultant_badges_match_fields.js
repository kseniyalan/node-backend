'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE consultants_badges ADD COLUMN "type_code" VARCHAR(255) NULL;
      ALTER TABLE consultants_badges ADD COLUMN "sub_type_code" VARCHAR(255) NULL;
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE consultants_badges DROP COLUMN "type_code";
      ALTER TABLE consultants_badges DROP COLUMN "sub_type_code";
    `);
  },
};
