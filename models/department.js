'use strict';
module.exports = function(sequelize, DataTypes) {
  var Department = sequelize.define('Department', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    color: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    duration1: DataTypes.INTEGER,
    duration2: DataTypes.INTEGER,
    duration3: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Department.associate = function(models) {
    Department.belongsToMany(models.Hospital, { through: 'HospitalDepartment' });
  };

  return Department;
};
