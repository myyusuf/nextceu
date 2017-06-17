'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Departments', [
      {
        code: 'NEU',
        name: 'Neurologi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'ITR',
        name: 'Interna',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'RAD',
        name: 'Radiologi',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Departments', null, {});
  }
};
