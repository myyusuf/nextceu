'use strict';
module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define('Course', {
    title: DataTypes.STRING,
    planStartDate: DataTypes.DATEONLY,
    realStartDate: DataTypes.DATEONLY,
    planStartDate1: DataTypes.DATEONLY,
    realStartDate1: DataTypes.DATEONLY,
    planStartDate2: DataTypes.DATEONLY,
    realStartDate2: DataTypes.DATEONLY,
    planStartDate3: DataTypes.DATEONLY,
    realStartDate3: DataTypes.DATEONLY,
    planEndDate: DataTypes.DATEONLY,
    realEndDate: DataTypes.DATEONLY,
    planEndDate1: DataTypes.DATEONLY,
    realEndDate1: DataTypes.DATEONLY,
    planEndDate2: DataTypes.DATEONLY,
    realEndDate2: DataTypes.DATEONLY,
    planEndDate3: DataTypes.DATEONLY,
    realEndDate3: DataTypes.DATEONLY,
    status: DataTypes.INTEGER,
    completion: DataTypes.INTEGER,
    problemDescription: DataTypes.STRING,
    preTestDate: DataTypes.DATEONLY,
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  Course.associate = function (models) {
    Course.belongsTo(models.Student);
    Course.belongsTo(models.Department);
    Course.hasMany(models.Score);
    Course.hasMany(models.CourseProblem);
    Course.belongsTo(models.Hospital, { as: 'hospital1' });
    Course.belongsTo(models.Hospital, { as: 'hospital2' });
    Course.belongsTo(models.Hospital, { as: 'clinic' });
  };

  return Course;
};
