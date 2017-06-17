'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    oldSid: DataTypes.STRING,
    newSid: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    mobilePhone: DataTypes.STRING,
    email: DataTypes.STRING,
    enrollYear: DataTypes.INTEGER,
    graduateYear: DataTypes.INTEGER,
    certificateNumber: DataTypes.STRING,
    ipk: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Student;
};