'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sessions', [
      {
        fruit_id: 111,
        type: 'fruit',
        status: 'ENABLED',
        token: 'fruit_apple',
        last_update: new Date(),
      },
      {
        fruit_id: 333,
        type: 'fruit',
        status: 'ENABLED',
        token: 'fruit_orange',
        last_update: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sessions', null, {});
  },
};
