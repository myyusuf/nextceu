'use strict';
module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define('Score', {
    scoreValue: DataTypes.FLOAT,
    scoreDate: DataTypes.DATEONLY,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Score.associate = function (models) {
    Score.belongsTo(models.Course);
    Score.belongsTo(models.ScoreType);
  };

  return Score;
};
