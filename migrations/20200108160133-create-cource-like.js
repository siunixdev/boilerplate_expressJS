"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("courceLikes", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      courceId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "cources",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      likeUserId: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "set null"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("courceLikes");
  }
};
