const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const Kategori = require("./kategori");

const Produk = sequelize.define(
  "Produk",
  {
    ProdukID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NamaProduk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Harga: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    Stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Diskon: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0,
    },
    Foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kategoriID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kategori,
        key: "kategoriID",
      },
    },

    HargaModal: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },

    Keuntungan: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },

    hargaAkhir: {
      type: DataTypes.VIRTUAL,
      get() {
        const harga = parseFloat(this.getDataValue("Harga"));
        const diskon = parseFloat(this.getDataValue("Diskon")) || 0;
        return harga - (harga * diskon) / 100;
      },
    },
  },
  {
    tableName: "produk",
    timestamps: true,
    paranoid: true,
  }
);

Produk.belongsTo(Kategori, {foreignKey: "kategoriID"})
Kategori.hasMany(Produk, {foreignKey: "kategoriID"})
module.exports = Produk;
