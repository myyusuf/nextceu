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

  Hospital.associate = function (models) {
    Hospital.belongsToMany(models.Department, { through: 'HospitalDepartment' });
    models.Department.belongsToMany(Hospital, { through: 'HospitalDepartment' });
  };

  return Hospital;
};