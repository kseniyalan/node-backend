'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE target_values ADD COLUMN "have_progress" BOOLEAN NOT NULL DEFAULT true
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE target_values DROP COLUMN IF EXISTS "have_progress"
    `);
  },
};
