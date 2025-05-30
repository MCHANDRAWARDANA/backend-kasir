const Registrasi = require("../models/registrasi");
const RegistrasiDto = require("../common/dto/registrasiDto");
const { hashPassword } = require("../common/utils/securityUtils");

class RegistrasiRepository {
  async create(data) {
    try {
      data.Password = await hashPassword(data.Password);
      const registrasi = await Registrasi.create(data);
      return new RegistrasiDto(registrasi);
    } catch (error) {
      throw new Error("Gagal membuat registrasi baru: " + error.message);
    }
  }

  async getAll() {
    try {
      const user = await Registrasi.findAll();
      return user.map((registrasi) => new RegistrasiDto(registrasi));
    } catch (error) {
      throw new Error("Gagal mengambil semua data user" + error.message);
    }
  }

  async getById(RegistrasiID) {
    try {
      const user = await Registrasi.findByPk(RegistrasiID);
      if (!user) {
        throw new Error("User tidak ditemukan");
      }
      return new RegistrasiDto(user);
    } catch (error) {
      throw new Error("Gagal megambil data berdasarkan ID" + error.message);
    }
  }

  async getByEmail(Email) {
    try {
      const Pelanggan = await Registrasi.findOne({
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

  async update(RegistrasiID, data) {
    try {
      const user = await Registrasi.findByPk(RegistrasiID);
      if (!user) {
        throw new Error("User tidak ditemukan");
      }
      await user.update(data);
      return new RegistrasiDto(user);
    } catch (error) {
      throw new Error("Gagal memperbarui data user" + error.message);
    }
  }

  async delete(RegistrasiID, data) {
    try {
      const user = await Registrasi.findByPk(RegistrasiID);
      if (!user) {
        throw new Error("User tidak ditemukan");
      }
      await user.destroy(data);
      return new RegistrasiDto(user);
    } catch (error) {
      throw new Error("Gagal menghapus data user" + error.message);
    }
  }
}

module.exports = new RegistrasiRepository();
