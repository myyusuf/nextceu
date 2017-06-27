'use strict';
module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define('Course', {
    title: DataTypes.STRING,
    planStartDate: DataTypes.DATE,
    realStartDate: DataTypes.DATE,
    planStartDate1: DataTypes.DATE,
    realStartDate1: DataTypes.DATE,
    planStartDate2: DataTypes.DATE,
    realStartDate2: DataTypes.DATE,
    planStartDate3: DataTypes.DATE,
    realStartDate3: DataTypes.DATE,
    planEndDate: DataTypes.DATE,
    realEndDate: DataTypes.DATE,
    planEndDate1: DataTypes.DATE,
    realEndDate1: DataTypes.DATE,
    planEndtDate2: DataTypes.DATE,
    realEndDate2: DataTypes.DATE,
    planEndDate3: DataTypes.DATE,
    realEndDate3: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  Course.associate = function (models) {
    Course.belongsTo(models.Student);
  };

  return Course;
};