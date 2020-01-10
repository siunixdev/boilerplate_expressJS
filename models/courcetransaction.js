"use strict";
module.exports = (sequelize, DataTypes) => {
  const courceTransaction = sequelize.define(
    "courceTransaction",
    {
      courceId: DataTypes.STRING,
      userId: DataTypes.STRING
    },
    {}
  );
  courceTransaction.associate = function(models) {
    // associations can be defined here
    courceTransaction.belongsTo(models.cource, {
      foreignKey: "courceId",
      as: "cource",
      sourceKey: "id"
    });
    courceTransaction.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
      sourceKey: "id"
    });
  };
  return courceTransaction;
};
