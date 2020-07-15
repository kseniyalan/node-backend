'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('goals', [
      {
        id: 1,
        title: 'Повысить качество сна',
        icon: 'https://storage.yandexcloud.net/hl-dev/static/goals/sleep.png',
      },
      {
        id: 2,
        title: 'Изменить фигуру',
        icon: 'https://storage.yandexcloud.net/hl-dev/static/goals/shape.png',
      },
      {
        id: 3,
        title: 'Контролировать вес',
        icon: 'https://storage.yandexcloud.net/hl-dev/static/goals/weight.png',
      },
      {
        id: 4,
        title: 'Уменьшить процент жира',
        icon:
          'https://storage.yandexcloud.net/hl-dev/static/goals/fat-percent.png',
      },
      {
        id: 5,
        title: 'Стать активнее',
        icon: 'https://storage.yandexcloud.net/hl-dev/static/goals/sport1.png',
      },
      {
        id: 6,
        title: 'Обрести спортивную фигуру',
        icon: 'https://storage.yandexcloud.net/hl-dev/static/goals/sport2.png',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('goals', null, {});
  },
};
