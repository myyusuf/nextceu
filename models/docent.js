'use strict';
module.exports = function(sequelize, DataTypes) {
  var Docent = sequelize.define('Docent', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Docent.associate = function (models) {
    Docent.belongsTo(models.Hospital);
    Docent.belongsTo(models.Department);
  };

  return Docent;
};
