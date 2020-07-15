'use strict';

const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const insert = [];

    for (let client_id = 0; client_id < 3; client_id++) {
      let now = moment();
      for (let i = 0; i < 150; i++) {
        insert.push({
          client_id: client_id + 1,
          is_target: false,
          is_new: true,
          created_at: now.subtract(1, 'day').toDate(),
          values: JSON.stringify({
            weight: Number.parseInt(50 + Math.random() * 15),
            metabolism: Number.parseInt(60 + Math.random() * 15),
            fat: Number.parseInt(15 + Math.random() * 10),
            total_fat: Number.parseInt(12 + Math.random() * 15),
            water: Number.parseInt(12 + Math.random() * 10),
            metabolic_age: Number.parseInt(25 + Math.random() * 20),
            bone_mass: Number.parseInt(20 + Math.random() * 20),
            muscle_mass: Number.parseInt(20 + Math.random() * 20),
            neck: Number.parseInt(12 + Math.random() * 5),
            hands: Number.parseInt(22 + Math.random() * 5),
            chest: Number.parseInt(80 + Math.random() * 20),
            waist: Number.parseInt(30 + Math.random() * 20),
            paunch: Number.parseInt(30 + Math.random() * 20),
            hips: Number.parseInt(50 + Math.random() * 20),
            leg: Number.parseInt(70 + Math.random() * 20),
            physical_type: 4,
          }),
        });
      }
    }

    return queryInterface.bulkInsert('wellness_tests', [
      {
        client_id: 1,
        is_target: true,
        is_new: true,
        created_at: new Date(),
        values: JSON.stringify({
          weight: Number.parseInt(50 + Math.random() * 15),
          metabolism: Number.parseInt(60 + Math.random() * 15),
          fat: Number.parseInt(15 + Math.random() * 10),
          total_fat: Number.parseInt(12 + Math.random() * 15),
          water: Number.parseInt(12 + Math.random() * 10),
          metabolic_age: Number.parseInt(25 + Math.random() * 20),
          bone_mass: Number.parseInt(20 + Math.random() * 20),
          muscle_mass: Number.parseInt(20 + Math.random() * 20),
          neck: Number.parseInt(12 + Math.random() * 5),
          hands: Number.parseInt(22 + Math.random() * 5),
          chest: Number.parseInt(80 + Math.random() * 20),
          waist: Number.parseInt(30 + Math.random() * 20),
          paunch: Number.parseInt(30 + Math.random() * 20),
          hips: Number.parseInt(50 + Math.random() * 20),
          leg: Number.parseInt(70 + Math.random() * 20),
          physical_type: 4,
        }),
      },
      {
        client_id: 2,
        is_target: true,
        is_new: true,
        created_at: new Date(),
        values: JSON.stringify({
          weight: Number.parseInt(50 + Math.random() * 15),
          metabolism: Number.parseInt(60 + Math.random() * 15),
          fat: Number.parseInt(15 + Math.random() * 10),
          total_fat: Number.parseInt(12 + Math.random() * 15),
          water: Number.parseInt(12 + Math.random() * 10),
          metabolic_age: Number.parseInt(25 + Math.random() * 20),
          bone_mass: Number.parseInt(20 + Math.random() * 20),
          muscle_mass: Number.parseInt(20 + Math.random() * 20),
          neck: Number.parseInt(12 + Math.random() * 5),
          hands: Number.parseInt(22 + Math.random() * 5),
          chest: Number.parseInt(80 + Math.random() * 20),
          waist: Number.parseInt(30 + Math.random() * 20),
          paunch: Number.parseInt(30 + Math.random() * 20),
          hips: Number.parseInt(50 + Math.random() * 20),
          leg: Number.parseInt(70 + Math.random() * 20),
          physical_type: 4,
        }),
      },
      {
        client_id: 3,
        is_target: true,
        is_new: true,
        created_at: new Date(),
        values: JSON.stringify({
          weight: 50,
          metabolism: 60,
          fat: 15,
          total_fat: 12,
          water: 12,
          metabolic_age: 25,
          bone_mass: 20,
          muscle_mass: 20,
          neck: 12,
          hands: 22,
          chest: 80,
          waist: 30,
          paunch: 30,
          hips: 50,
          leg: 70,
          physical_type: 4,
        }),
      },
      ...insert,
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('wellness_tests', null, {});
  },
};
