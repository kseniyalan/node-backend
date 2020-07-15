'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('consultants_badges', [
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/1%20diamond.png',
        key: '1diamond',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/15.png',
        key: '15',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/2%20diamond.png',
        key: '2diamond',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/20.png',
        key: '20',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/3%20diamond.png',
        key: '3diamond',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/30.png',
        key: '30',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/4%20diamond.png',
        key: '4diamond',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/40.png',
        key: '40',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/5-Diamond.png',
        key: '5diamond',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/50.png',
        key: '50',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/6-Diamond.png',
        key: '6diamond',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/60.png',
        key: '60',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/7-Diamond.png',
        key: '7diamond',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/70.png',
        key: '70',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/8-Diamond.png',
        key: '8diamond',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/80.png',
        key: '80',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/9-Diamond.png',
        key: '9diamond',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/90.png',
        key: '90',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/Founders%20Circle.png',
        key: 'founders',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/GET.png',
        key: 'get',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/GET_2500.png',
        key: 'get2500',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/MillTeam.png',
        key: 'millteam',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/Millionaire_Team%207500.png',
        key: 'millionare_team7500',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/PresTeam.png',
        key: 'presteam',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/QP_EMPTY.png',
        key: 'qpempty',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/SUPERVISOR.png',
        key: 'supervisor',
      },
      {
        url:
          'https://storage.yandexcloud.net/hl-dev/static/consultants_grades/WORLD_TEAM.png',
        key: 'worldteam',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('consultants_badges', null, {});
  },
};
