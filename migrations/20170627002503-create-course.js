'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      planStartDate: {
        type: Sequelize.DATE
      },
      realStartDate: {
        type: Sequelize.DATE
      },
      planStartDate1: {
        type: Sequelize.DATE
      },
      realStartDate1: {
        type: Sequelize.DATE
      },
      planStartDate2: {
        type: Sequelize.DATE
      },
      realStartDate2: {
        type: Sequelize.DATE
      },
      planStartDate3: {
        type: Sequelize.DATE
      },
      realStartDate3: {
        type: Sequelize.DATE
      },
      planEndDate: {
        type: Sequelize.DATE
      },
      realEndDate: {
        type: Sequelize.DATE
      },
      planEndDate1: {
        type: Sequelize.DATE
      },
      realEndDate1: {
        type: Sequelize.DATE
      },
      planEndtDate2: {
        type: Sequelize.DATE
      },
      realEndDate2: {
        type: Sequelize.DATE
      },
      planEndDate3: {
        type: Sequelize.DATE
      },
      realEndDate3: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Courses');
  }
};