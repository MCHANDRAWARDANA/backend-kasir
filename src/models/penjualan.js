const { DataTypes } = require("sequelize")
const sequelize = require("../config/databaseConfig")
const Pelanggan = require("./pelanggan")

const Penjualan = sequelize.define("Penjualan", {
    PenjualanID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    TanggalPenjualan: {
        type: DataTypes.DATE,
        allowNull: false
    },
    TotalHarga: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    PelangganID: {
        type: DataTypes.INTEGER,
        references: {
            model: Pelanggan,
            key: "PelangganID"
        }
    }
},{
    tableName: "penjualan",
    timestamps: true,
    paranoid: true
})

Penjualan.belongsTo(Pelanggan, { foreignKey: "PelangganID"})
Pelanggan.hasMany(Penjualan, { foreignKey: "PelangganID"})

module.exports = Penjualan