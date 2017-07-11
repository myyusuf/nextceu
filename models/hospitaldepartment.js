'use strict';
module.exports = function(sequelize, DataTypes) {
  var HospitalDepartment = sequelize.define('HospitalDepartment', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return HospitalDepartment;
};