'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cities', [
      {
        name: 'Москва',
      },
      {
        name: 'Новосибирск',
      },
      {
        name: 'Волгоград',
      },
      {
        name: 'Орёл',
      },
      {
        name: 'Санкт-Петербург',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cities', null, {});
  },
};
