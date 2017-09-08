'use strict';
module.exports = function(sequelize, DataTypes) {
  var PortofolioType = sequelize.define('PortofolioType', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return PortofolioType;
};