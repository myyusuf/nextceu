'use strict';
module.exports = function(sequelize, DataTypes) {
  var Seminar = sequelize.define('Seminar', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    aventDate: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Seminar;
};