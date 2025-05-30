const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const Registrasi = sequelize.define(
  "Registrasi",
  {
    RegistrasiID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Role: {
      type: DataTypes.ENUM("Staff", "Admin"),
      allowNull: false,
      defaultValue: "Staff",
    },
    AccessToken: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "registrasi",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Registrasi;
