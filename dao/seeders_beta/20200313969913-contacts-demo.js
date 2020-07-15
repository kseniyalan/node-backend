'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('contacts', [
      {
        data: JSON.stringify({
          email: 'maksimb@herbalife.com',
          call: {
            phone: '8 (800) 200-74-74',
            days: [1, 2, 3, 4, 5],
            time: ['08:30', '18:00'],
          },
        }),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('contacts', null, {});
  },
};
