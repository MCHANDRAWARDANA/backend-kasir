const pelanggan = require("../models/pelanggan");
const pelangganDto = require("../common/dto/pelangganDto");
const { hashPassword } = require("../common/utils/securityUtils");

class pelangganRepository {
  async create(data) {
    try {
      data.Password = await hashPassword(data.Password);
      const Pelanggan = await pelanggan.create(data);
      return new pelangganDto(Pelanggan);
    } catch (error) {
      throw new Error("Gagal membuat pelanggan baru: " + error.message);
    }
  }

  async getPelangganByEmail(Email) {
    try {
      const Pelanggan = await pelanggan.findOne({
        where: {
          Email: Email,
        },
        attributes: ["UserName", "Email", "Password", "Role"],
      });
      return Pelanggan;
    } catch (error) {
      throw new Error("Gagal: " + error.message);
    }
  }

  async getAll() {
    try {
      const user = await pelanggan.findAll();
      return user.map((Pelanggan) => new pelangganDto(Pelanggan));
    } catch (error) {
      throw new Error("Gagal mengambil semua data user" + error.message);
    }
  }

  async UpdateAccessToken(PelangganID, AccessToken) {
    try {
      const pelangganRecord = await pelanggan.findOne();
      if (!pelangganRecord) {
        throw new Error("Pelanggan tidak ditemukan");
      }

      await pelangganRecord.update({ AccessToken: AccessToken });
      return new pelangganDto(pelangganRecord);
    } catch (error) {
      throw new Error("Gagal Mengambil data Register: " + error.message);
    }
  }

  async getById(PelangganID) {
    try {
      const user = await pelanggan.findByPk(PelangganID);
      if (!user) {
        throw new Error("User tidak ditemukan");
      }
      return new pelangganDto(user);
    } catch (error) {
      throw new Error("Gagal megambil data berdasarkan ID" + error.message);
    }
  }

  async update(PelangganID, data) {
    try {
      const user = await pelanggan.findByPk(PelangganID);
      if (!user) {
        throw new Error("User tidak ditemukan");
      }
      await user.update(data);
      return new pelangganDto(user);
    } catch (error) {
      throw new Error("Gagal memperbarui data user" + error.message);
    }
  }

  async delete(PelangganID, data) {
    try {
      const user = await pelanggan.findByPk(PelangganID);
      if (!user) {
        throw new Error("User tidak ditemukan");
      }
      await user.destroy(data);
      return new pelangganDto(user);
    } catch (error) {
      throw new Error("Gagal menghapus data user" + error.message);
    }
  }
}


module.exports = new pelangganRepository();