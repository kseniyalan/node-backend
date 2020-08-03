'use strict';

const crypto = require('crypto');
const config = require('../config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('managers', [
      {
        id: 1,
        login: 'test_manager',
        // password -  123456
        password: crypto
          .createHmac('sha512', config.passwordSalt)
          .update('123456')
          .digest('hex'),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('managers', null, {});
  },
};
