// const { Sequelize, DataTypes } = require("sequelize");

// module.exports = (sequelize, DataTypes) => {
//   const Users = sequelize.define("users", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     role: {
//       type: DataTypes.STRING,
//       defaultValue: "user",
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   });
//   return Users;
// };

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
      created_at: {
        type: DataTypes.DATE,
        field: "created_at", // Custom column name for createdAt
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: "created_at", // Custom column name for createdAt
      updatedAt: false, // Disable updatedAt
    }
  );

  return User;
};
