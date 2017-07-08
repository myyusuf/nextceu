'use strict';
module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define('Score', {
    preTest: DataTypes.FLOAT,
    research: DataTypes.FLOAT,
    weeklyDiscussion: DataTypes.FLOAT,
    test: DataTypes.FLOAT,
    postTest: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Score;
};