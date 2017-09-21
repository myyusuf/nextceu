'use strict';
module.exports = function(sequelize, DataTypes) {
  var Assistance = sequelize.define('Assistance', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    aventDate: DataTypes.DATEONLY,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Assistance.associate = function (models) {
    Assistance.hasMany(models.AssistanceParticipant);
  };

  return Assistance;
};
