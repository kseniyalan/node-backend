'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('messages', [
      {
        consultant_id: 111,
        client_id: 1,
        sended_by_client: false,
        created_at: new Date(),
        message:
          'Здравствуйте, я - ваш новый консультант. По всем вопросам Вы можете обратиться ко мне в этом чате',
      },
      {
        consultant_id: 222,
        client_id: 2,
        sended_by_client: false,
        created_at: new Date(),
        message:
          'Здравствуйте, я - ваш новый консультант. По всем вопросам Вы можете обратиться ко мне в этом чате',
      },
      {
        consultant_id: 333,
        client_id: 3,
        sended_by_client: false,
        created_at: new Date(),
        message:
          'Здравствуйте, я - ваш новый консультант. По всем вопросам Вы можете обратиться ко мне в этом чате',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('messages', null, {});
  },
};
