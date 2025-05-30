const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const Kategori = sequelize.define(
  "Kategori",
  {
    kategoriID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    namaKategori: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "kategori",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Kategori;
