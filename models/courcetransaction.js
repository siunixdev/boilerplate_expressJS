'use strict';
module.exports = (sequelize, DataTypes) => {
  const courceTransaction = sequelize.define('courceTransaction', {
    courceId: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {});
  courceTransaction.associate = function(models) {
    // associations can be defined here
  };
  return courceTransaction;
};