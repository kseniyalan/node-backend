'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE clients ADD COLUMN "consultant_update" TIMESTAMP WITH TIME ZONE NULL;
      UPDATE clients SET "consultant_update"=(current_timestamp AT TIME ZONE 'UTC');
      ALTER TABLE clients ALTER COLUMN "consultant_update" set NOT NULL;
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE clients DROP COLUMN "consultant_update"
    `);
  },
};
