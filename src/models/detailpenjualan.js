const { DataTypes } = require('sequelize')
const sequelize = require("../config/databaseConfig")
const Penjualan = require("./penjualan")
const Produk = require("./produk")

const Detail = sequelize.define("Detail", {
    DetailID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PenjualanID: {
        type: DataTypes.INTEGER,
        references: {
            model: Penjualan,
            key: "PenjualanID"
        }
    },
    ProdukID: {
        type: DataTypes.INTEGER,
        references: {
            model: Produk,
            key: "ProdukID"
        }
    },
    JumlahProduk: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    SubTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
},{
    tableName: "detailpenjualan",
    timestamps: true,
    paranoid: true
})

module.exports = Detail;