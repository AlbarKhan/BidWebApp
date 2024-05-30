const { DataTypes } = require("sequelize");
const { items } = require(".");
// const { sequelize } = require(".");
module.exports = (sequelize) => {
  const Item = sequelize.define(
    "Item",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      starting_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      current_price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: sequelize.col("starting_price"),
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: "created_at", // Custom column name for createdAt
      updatedAt: false, // Disable updatedAt
    }
  );

  //   module.exports = Item;
  return Item;
};
