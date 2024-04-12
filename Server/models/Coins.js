const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Coins = sequelize.define("Coins", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "User",
    //     key: "id",
    //   },
    // },
    coins: {
      type: DataTypes.INTEGER,
      default: 100,
    },
    betAmount: {
      type: DataTypes.INTEGER,
    },
    wonAmount: {
      type: DataTypes.INTEGER,
    },
    looseAmount: {
      type: DataTypes.INTEGER,
    },
    finalAmount: {
      type: DataTypes.INTEGER,
    },
  });

  return Coins;
};
