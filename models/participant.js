'use strict';
module.exports = function(sequelize, DataTypes) {
  var Participant = sequelize.define('Participant', {
    fileCode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Participant.associate = function (models) {
    Participant.belongsTo(models.Student);
    Participant.belongsTo(models.Seminar);
  };

  return Participant;
};
