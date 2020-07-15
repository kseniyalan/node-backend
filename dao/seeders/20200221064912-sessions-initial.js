'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sessions', [
      {
        client_id: 1,
        type: 'client',
        status: 'ENABLED',
        token: 'client_android_1',
        last_update: new Date(),
      },
      {
        client_id: 2,
        type: 'client',
        status: 'ENABLED',
        token: 'client_android_2',
        last_update: new Date(),
      },
      {
        consultant_id: 111,
        type: 'consultant',
        status: 'ENABLED',
        token: 'consultant_android_1',
        last_update: new Date(),
      },
      {
        client_id: 3,
        type: 'client',
        status: 'ENABLED',
        token: 'client_ios_1',
        last_update: new Date(),
      },
      {
        client_id: 4,
        type: 'client',
        status: 'ENABLED',
        token: 'client_ios_2',
        last_update: new Date(),
      },
      {
        consultant_id: 222,
        type: 'consultant',
        status: 'ENABLED',
        token: 'consultant_ios_1',
        last_update: new Date(),
      },
      {
        client_id: 5,
        type: 'client',
        status: 'ENABLED',
        token: 'client_test_1',
        last_update: new Date(),
      },
      {
        client_id: 6,
        type: 'client',
        status: 'ENABLED',
        token: 'client_test_2',
        last_update: new Date(),
      },
      {
        consultant_id: 333,
        type: 'consultant',
        status: 'ENABLED',
        token: 'consultant_test_1',
        last_update: new Date(),
      },
      {
        client_id: 7,
        type: 'client',
        status: 'ENABLED',
        token: 'client_android_3',
        last_update: new Date(),
      },
      {
        client_id: 8,
        type: 'client',
        status: 'ENABLED',
        token: 'client_android_4',
        last_update: new Date(),
      },
      {
        consultant_id: 444,
        type: 'consultant',
        status: 'DISABLED',
        token: 'consultant_android_1',
        last_update: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sessions', null, {});
  },
};
