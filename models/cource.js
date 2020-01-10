"use strict";
module.exports = (sequelize, DataTypes) => {
  const cource = sequelize.define(
    "cource",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      categoryId: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      price: DataTypes.INTEGER,
      totalMaxStudent: DataTypes.INTEGER,
      startDate: DataTypes.DATEONLY,
      endDate: DataTypes.DATEONLY,
      address: DataTypes.TEXT
    },
    {}
  );
  cource.associate = function(models) {
    // associations can be defined here
    cource.belongsTo(models.category, {
      foreignKey: "categoryId",
      as: "category",
      sourceKey: "id"
    });

    cource.belongsToMany(
      models.user,
      {
        through: "courcelike",
        as: "user",
        foreignKey: "courceId"
      },
      {
        through: "courcetransaction",
        as: "user",
        foreignKey: "courceId"
      }
    );
  };
  return cource;
};
