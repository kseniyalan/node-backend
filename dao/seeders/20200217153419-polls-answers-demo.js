'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('polls_answers', [
      {
        polls_id: 1,
        answers_count: 0,
        text: 'First poll first answer',
      },
      {
        polls_id: 1,
        answers_count: 0,
        text: 'First poll second answer',
      },
      {
        polls_id: 2,
        answers_count: 0,
        text: 'Second poll first answer',
      },
      {
        polls_id: 2,
        answers_count: 0,
        text: 'Second poll second answer',
      },
      {
        polls_id: 3,
        answers_count: 0,
        text: '3',
      },
      {
        polls_id: 3,
        answers_count: 0,
        text: '3',
      },
      {
        polls_id: 3,
        answers_count: 0,
        text: '3',
      },
      {
        polls_id: 3,
        answers_count: 0,
        text: '3',
      },
      {
        polls_id: 4,
        answers_count: 0,
        text: '4',
      },
      {
        polls_id: 4,
        answers_count: 0,
        text: '4',
      },
      {
        polls_id: 4,
        answers_count: 0,
        text: '4',
      },
      {
        polls_id: 4,
        answers_count: 0,
        text: '4',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('polls', null, {});
  },
};
