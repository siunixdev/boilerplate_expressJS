'use strict';
module.exports = (sequelize, DataTypes) => {
  const courceLike = sequelize.define('courceLike', {
    courceId: DataTypes.STRING,
    likeUserId: DataTypes.STRING
  }, {});
  courceLike.associate = function(models) {
    // associations can be defined here
  };
  return courceLike;
};