'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('fruits', [
      {
        id: 111,
        name: 'Яблоко',
        amount: 3,
        eaten: false,
        created_at: new Date(new Date().setMinutes(0)),
        avatar: 1,
      },
      {
        id: 222,
        name: 'Груша',
        amount: 1,
        eaten: false,
        created_at: new Date(new Date().setMinutes(0)),
        avatar: 1,
      },
      {
        id: 333,
        name: 'Апельсин',
        amount: 2,
        eaten: false,
        created_at: new Date(new Date().setMinutes(0)),
        avatar: 1,
      },
      {
        id: 444,
        name: 'Грейпфрут',
        amount: 1,
        eaten: false,
        created_at: new Date(new Date().setMinutes(0)),
        avatar: 1,
      },
      {
        id: 555,
        name: 'Банан',
        amount: 5,
        eaten: true,
        created_at: new Date(new Date().setMinutes(0)),
        avatar: 1,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('fruits', null, {});
  },
};