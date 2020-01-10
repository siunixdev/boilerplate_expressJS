"use strict";
module.exports = (sequelize, DataTypes) => {
  const courceLike = sequelize.define(
    "courceLike",
    {
      courceId: DataTypes.STRING,
      likeUserId: DataTypes.STRING
    },
    {}
  );
  courceLike.associate = function(models) {
    // associations can be defined here
    courceLike.belongsTo(models.cource, {
      foreignKey: "courceId",
      as: "cource",
      sourceKey: "id"
    });
    courceLike.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
      sourceKey: "id"
    });
  };
  return courceLike;
};
