const kategori = require("../models/kategori");
const kategoriDto = require("../common/dto/kategoriDto");

class kategoriRepository {
  async create(data) {
    try {
      const Kategori = await kategori.create(data);
      return new kategoriDto(Kategori);
    } catch (error) {
      throw new Error("Gagal membuat kategori baru: " + error.message);
    }
  }

  async getAll() {
    try {
      const user = await kategori.findAll();
      return user.map((kategori) => new kategoriDto(kategori));
    } catch (error) {
      throw new Error("Gagal mengambil semua data user" + error.message);
    }
  }

  async getById(kategoriID) {
    try {
      const user = await kategori.findByPk(kategoriID);
      if (!user) {
        throw new Error("User tidak ditemukan");
      }
      return new kategoriDto(user);
    } catch (error) {
      throw new Error("Gagal megambil data berdasarkan ID" + error.message);
    }
  }

  async update(kategoriID, data) {
    try {
      const user = await kategori.findByPk(kategoriID);
      if (!user) {
        throw new Error("User tidak ditemukan");
      }
      await user.update(data);
      return new kategoriDto(user);
    } catch (error) {
      throw new Error("Gagal memperbarui data user" + error.message);
    }
  }

  async delete(kategoriID, data) {
    try {
      const user = await kategori.findByPk(kategoriID);
      if (!user) {
        throw new Error("User tidak ditemukan");
      }
      await user.destroy(data);
      return new kategoriDto(user);
    } catch (error) {
      throw new Error("Gagal menghapus data user" + error.message);
    }
  }
}

module.exports = new kategoriRepository();
