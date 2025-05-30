const Penjualan = require("../models/penjualan");
const Pelanggan = require("../models/pelanggan");
const PenjualanDto = require("../common/dto/PenjualanDto");

class PenjualanRepository {
  async create(data) {
    try {
      const penjualan = await Penjualan.create({
        ...data,
        TanggalPenjualan: new Date()
      });
      return new PenjualanDto(penjualan);
    } catch (error) {
      throw new Error("Gagal melalukan penjualan: " + error.message);
    }
  }

  async getAll() {
    try {
      const penjualan = await Penjualan.findAll({
        include: [
          {
            model: Pelanggan,
            attributes: [
              "PelangganID",
              "NamaPelanggan",
              "Alamat",
              "NomorTelepon",
            ],
          },
        ],
      });
      return penjualan.map((order) => new PenjualanDto(order));
    } catch (error) {
      throw new Error("Gagal mengambil semua data penjualan: " + error.message);
    }
  }

  async getByID(PenjualanID) {
    try {
      const penjualan = await Penjualan.findByPk(PenjualanID);
      if (!penjualan) {
        throw new Error("Data penjualan tidak ditemukan");
      }
      return new PenjualanDto(penjualan);
    } catch (error) {
      throw new Error(
        "Gagal mengambil data penjualan berdasarkan ID: " + error.message
      );
    }
  }

  async update(PenjualanID, data) {
    try {
      const penjualan = await Penjualan.findByPk(PenjualanID);
      if (!penjualan) {
        throw new Error("Data penjualan tidak ditemukan");
      }
      await penjualan.update(data);
      return new PenjualanDto(penjualan);
    } catch (error) {
      throw new Error("Gagal memperbarui data Penjualan");
    }
  }

  async delete(PenjualanID) {
    try {
      const penjualan = await Penjualan.findByPk(PenjualanID);
      if (!penjualan) {
        throw new Error("Data penjualan tidak ditemukan");
      }
      await penjualan.destroy();
      return new PenjualanDto(penjualan);
    } catch (error) {
      throw new Error("Gagal menghapus penjualan: " + error.message);
    }
  }
}

module.exports = new PenjualanRepository();
