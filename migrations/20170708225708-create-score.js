'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Scores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      preTest: {
        type: Sequelize.FLOAT
      },
      research: {
        type: Sequelize.FLOAT
      },
      weeklyDiscussion: {
        type: Sequelize.FLOAT
      },
      test: {
        type: Sequelize.FLOAT
      },
      postTest: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('Scores');
  }
};