'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('consultants', [
      {
        created_at: new Date(),
        sso_access_token: '',
        sso_refresh_token: '',
        external_id: '111',
      },
      {
        created_at: new Date(),
        sso_access_token: '',
        sso_refresh_token: '',
        external_id: '222',
      },
      {
        external_id: '333',
        sso_access_token: '',
        sso_refresh_token: '',
        created_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('consultants', null, {});
  },
};
