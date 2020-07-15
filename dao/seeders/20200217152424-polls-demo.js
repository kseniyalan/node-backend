'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('polls', [
      {
        text: 'First',
        created_at: new Date(new Date().setMinutes(5)),
        status: 'ENABLED',
        for: 'ALL',
      },
      {
        text: 'Second',
        created_at: new Date(new Date().setMinutes(15)),
        for: 'ALL',
        status: 'ENABLED',
      },
      {
        text: 'Third',
        created_at: new Date(new Date().setMinutes(25)),
        for: 'CONSULTANTS',
        status: 'ENABLED',
      },
      {
        text: 'Fourth',
        created_at: new Date(new Date().setMinutes(35)),
        for: 'CLIENTS',
        status: 'ENABLED',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('polls', null, {});
  },
};
