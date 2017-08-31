'use strict';
module.exports = function(sequelize, DataTypes) {
  var Seminar = sequelize.define('Seminar', {
    code: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Seminar.associate = function (models) {
    Seminar.hasMany(models.Participant);
  };

  return Seminar;
};
