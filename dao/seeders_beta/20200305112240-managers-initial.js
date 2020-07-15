'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('managers', [
      {
        login: 'test_manager',
        // password -  Dme8Y4VuhM
        password:
          'd7afb1ea4e709678a7459826a0073a7a483542d380a9f2098cc3af505d8d009344537fdf49c5e7ab2b05a5f0777acad9d911757b5ef18baa62dbd9703487caaf',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('managers', null, {});
  },
};
