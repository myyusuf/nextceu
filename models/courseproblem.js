'use strict';
module.exports = function(sequelize, DataTypes) {
  var CourseProblem = sequelize.define('CourseProblem', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    problemDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CourseProblem;
};