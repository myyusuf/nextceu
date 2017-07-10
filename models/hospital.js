'use strict';
module.exports = function(sequelize, DataTypes) {
  var Hospital = sequelize.define('Hospital', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Hospital;
};