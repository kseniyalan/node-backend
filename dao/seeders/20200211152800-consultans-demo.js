'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const insert = [];

    for (let i = 0; i < 40; i++) {
      insert.push({
        id: 445 + i,
        external_id: String(1 + i),
        created_at: new Date(new Date().setMinutes(4 + i)),
        sso_access_token: '',
        sso_refresh_token: '',
      });
    }

    return queryInterface.bulkInsert('consultants', [
      {
        id: 111,
        external_id: '1',
        avatar: 1,
        created_at: new Date(new Date().setMinutes(0)),
        sso_access_token: '',
        sso_refresh_token: '',
      },
      {
        id: 222,
        external_id: '2',
        avatar: 1,
        created_at: new Date(new Date().setMinutes(1)),
        sso_access_token: '',
        sso_refresh_token: '',
      },
      {
        id: 333,
        external_id: '3',
        avatar: 1,
        created_at: new Date(new Date().setMinutes(2)),
        sso_access_token: '',
        sso_refresh_token: '',
      },
      {
        id: 444,
        external_id: '4',
        avatar: 1,
        created_at: new Date(new Date().setMinutes(3)),
        sso_access_token: '',
        sso_refresh_token: '',
      },
      ...insert,
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('consultants', null, {});
  },
};
