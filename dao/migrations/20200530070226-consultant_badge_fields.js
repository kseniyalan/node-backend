'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE consultants ADD COLUMN "type_code" VARCHAR(255) NULL;
      ALTER TABLE consultants ADD COLUMN "sub_type_code" VARCHAR(255) NULL;
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE consultants DROP COLUMN "type_code";
      ALTER TABLE consultants DROP COLUMN "sub_type_code";
    `);
  },
};
