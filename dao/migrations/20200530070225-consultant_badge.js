'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE clients ADD COLUMN "consultant_badge" BOOLEAN NULL;
      UPDATE clients SET "consultant_badge"=true;
      ALTER TABLE clients ALTER COLUMN "consultant_badge" set NOT NULL;
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE clients DROP COLUMN "consultant_badge"
    `);
  },
};
