'use strict';
module.exports = function(sequelize, DataTypes) {
  var HospitalUser = sequelize.define('HospitalUser', {
    code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  HospitalUser.associate = function (models) {
    HospitalUser.belongsTo(models.User);
    HospitalUser.belongsTo(models.Hospital);
  };
  return HospitalUser;
};
