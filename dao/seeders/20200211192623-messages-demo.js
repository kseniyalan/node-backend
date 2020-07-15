'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('messages', [
      {
        consultant_id: 111,
        message: 'user 1 readed',
        client_id: 1,
        viewed: true,
        sended_by_client: true,
        created_at: new Date(new Date().setMinutes(5)),
      },
      {
        consultant_id: 111,
        message: 'user 1 unread',
        client_id: 1,
        viewed: false,
        sended_by_client: true,
        created_at: new Date(new Date().setMinutes(10)),
      },
      {
        consultant_id: 111,
        message: '',
        client_id: 2,
        viewed: true,
        image_id: 1,
        sended_by_client: true,
        created_at: new Date(new Date().setMinutes(15)),
      },
      {
        consultant_id: 111,
        message: 'user 2 unread',
        client_id: 2,
        viewed: true,
        sended_by_client: true,
        created_at: new Date(new Date().setMinutes(25)),
      },
      {
        consultant_id: 222,
        message: 'user 1 readed',
        client_id: 3,
        viewed: true,
        sended_by_client: true,
        created_at: new Date(new Date().setMinutes(5)),
      },
      {
        consultant_id: 222,
        message: 'user 1 unread',
        client_id: 3,
        viewed: false,
        sended_by_client: true,
        created_at: new Date(new Date().setMinutes(10)),
      },
      {
        consultant_id: 222,
        message: '',
        client_id: 4,
        viewed: true,
        image_id: 1,
        sended_by_client: true,
        created_at: new Date(new Date().setMinutes(15)),
      },
      {
        consultant_id: 222,
        message: 'user 2 unread',
        client_id: 4,
        viewed: true,
        sended_by_client: true,
        created_at: new Date(new Date().setMinutes(25)),
      },
      {
        consultant_id: 333,
        message: 'user 1 readed',
        client_id: 5,
        viewed: true,
        sended_by_client: true,
        created_at: new Date(new Date().setMinutes(5)),
      },
      {
        consultant_id: 333,
        message: 'user 1 unread',
        client_id: 5,
        viewed: false,
        sended_by_client: true,
        created_at: new Date(new Date().setMinutes(10)),
      },
      {
        consultant_id: 333,
        message: '',
        client_id: 6,
        viewed: true,
        image_id: 1,
        sended_by_client: true,
        created_at: new Date(new Date().setMinutes(15)),
      },
      {
        consultant_id: 333,
        message: 'user 2 unread',
        client_id: 6,
        viewed: true,
        sended_by_client: true,
        created_at: new Date(new Date().setMinutes(25)),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('messages', null, {});
  },
};
