"use strict";
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      name: DataTypes.STRING
    },
    {}
  );
  category.associate = function(models) {
    // associations can be defined here
    category.hasMany(models.cource, {
      as: "cource",
      foreignKey: "categoryId"
    });
  };
  return category;
};
