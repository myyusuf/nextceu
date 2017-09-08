'use strict';
module.exports = function(sequelize, DataTypes) {
  var Portofolio = sequelize.define('Portofolio', {
    portofolioDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Portofolio.associate = function (models) {
    Portofolio.belongsTo(models.Course);
    Portofolio.belongsTo(models.PortofolioType);
  };
  return Portofolio;
};
