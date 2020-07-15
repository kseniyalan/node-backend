'use strict';

const crypto = require('crypto');
const config = require('../../config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('managers', [
      {
        login: 'test_manager',
        // password -  Dme8Y4VuhM
        password: crypto
          .createHmac('sha512', config.passwordSalt)
          .update('Dme8Y4VuhM')
          .digest('hex'),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('managers', null, {});
  },
};
