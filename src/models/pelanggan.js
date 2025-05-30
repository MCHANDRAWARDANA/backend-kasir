const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const Pelanggan = sequelize.define(
  "Pelanggan",
  {
    PelangganID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Role: {
      type: DataTypes.ENUM('Admin','Staff'),
      defaultValue: 'Staff'
    },
    AccessToken: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: "pelanggan",
    timestamps: "true",
  }
);

module.exports = Pelanggan;