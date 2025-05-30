const detailpenjualan = require("../models/detailpenjualan");
const detailpenjualanDto = require("../common/dto/detailpenjualanDto");
const Penjualan = require("../models/penjualan");
const Produk = require("../models/produk");

class detailpenjualanRepository {
  async create(data) {
    try {
      const detailpenjualan = await detailpenjualan.create(data);
      return new detailpenjualanDto(detailpenjualan);
    } catch (error) {
      throw new Error("Gagal membuat detailpenjualan baru: " + error.message);
    }
  }

  async getAll() {
    try {
      const user = await detailpenjualan.findAll({
        include: [
            {
                model: Penjualan,
                attributes: ["TanggalPenjualan", "TotalHarga"]
            },
            {
                model: Produk,
                attributes: ["ProdukID", "NamaProduk","Harga","Stok",]
            },
        ]
      });
      return user.map((detailpenjualan) => new detailpenjualanDto(detailpenjualan));
    } catch (error) {
      throw new Error("Gagal mengambil semua data user" + error.message);
    }
  }

  async getById(detailpenjualanID) {
    try {
      const user = await detailpenjualan.findByPk(detailpenjualanID);
      if (!user) {
        throw new Error("User tidak ditemukan");
      }
      return new detailpenjualanDto(user);
    } catch (error) {
      throw new Error("Gagal megambil data berdasarkan ID" + error.message);
    }
  }

  async update(detailpenjualanID, data) {
    try {
      const user = await detailpenjualan.findByPk(detailpenjualanID);
      if (!user) {
        throw new Error("User tidak ditemukan");
      }
      await user.update(data);
      return new detailpenjualanDto(user);
    } catch (error) {
      throw new Error("Gagal memperbarui data user" + error.message);
    }
  }

  async delete(detailpenjualanID, data) {
    try {
      const user = await detailpenjualan.findByPk(detailpenjualanID);
      if (!user) {
        throw new Error("User tidak ditemukan");
      }
      await user.destroy(data);
      return new detailpenjualanDto(user);
    } catch (error) {
      throw new Error("Gagal menghapus data user" + error.message);
    }
  }
}

module.exports = new detailpenjualanRepository();
