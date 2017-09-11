'use strict';
module.exports = function(sequelize, DataTypes) {
  var Kompre = sequelize.define('Kompre', {
    kompreDate: DataTypes.DATEONLY,
    selected: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Kompre;
};