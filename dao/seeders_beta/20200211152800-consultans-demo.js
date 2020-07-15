'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('consultants', [
      {
        id: 111,
        external_id: '',
        created_at: new Date(new Date().setMinutes(0)),
        sso_access_token: '',
        sso_refresh_token: '',
      },
      {
        id: 222,
        external_id: '',
        created_at: new Date(new Date().setMinutes(1)),
        sso_access_token: '',
        sso_refresh_token: '',
      },
      {
        id: 333,
        external_id: '',
        created_at: new Date(new Date().setMinutes(2)),
        sso_access_token: '',
        sso_refresh_token: '',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('consultants', null, {});
  },
};
