'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sessions', [
      {
        manager_id: 1,
        type: 'manager',
        status: 'ENABLED',
        token: 'token',
        last_update: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sessions', null, {});
  },
};
