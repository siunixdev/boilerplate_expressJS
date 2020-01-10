"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.STRING,
      placeOfBirth: DataTypes.STRING,
      dateOfBirth: DataTypes.DATEONLY,
      image: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
    user.belongsToMany(
      models.cource,
      {
        through: "courcelike",
        as: "cource",
        foreignKey: "userId"
      },
      {
        through: "courcetransaction",
        as: "cource",
        foreignKey: "userId"
      }
    );
  };
  return user;
};
