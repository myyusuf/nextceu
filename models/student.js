'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    oldSid: DataTypes.STRING,
    newSid: DataTypes.STRING,
    level: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    mobilePhone: DataTypes.STRING,
    email: DataTypes.STRING,
    enrollYear: DataTypes.INTEGER,
    graduateYear: DataTypes.INTEGER,
    certificateNumber: DataTypes.STRING,
    status: DataTypes.STRING,
    ipk: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  Student.associate = function (models) {
    Student.hasMany(models.Course);
  };

  return Student;
};