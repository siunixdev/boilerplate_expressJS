'use strict';
module.exports = (sequelize, DataTypes) => {
  const userLike = sequelize.define('userLike', {
    userId: DataTypes.STRING,
    likeUserId: DataTypes.STRING
  }, {});
  userLike.associate = function(models) {
    // associations can be defined here
  };
  return userLike;
};