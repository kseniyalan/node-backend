'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('clients_to_goals', [
      {
        ClientId: 4,
        GoalId: 1,
        is_new: true,
        created_at: new Date(),
      },
      {
        ClientId: 4,
        GoalId: 2,
        is_new: false,
        created_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('clients_to_goals', null, {});
  },
};
