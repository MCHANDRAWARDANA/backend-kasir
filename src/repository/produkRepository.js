const produk = require("../models/produk");
const produkDto = require("../common/dto/produkDto");
const { Op } = require("sequelize");
const { Sequelize } =  require("sequelize")

class produkRepository {
  // Method untuk membuat produk baru
  async create(data) {
    try {
      // Jika field keuntungan belum ada, hitung berdasarkan Harga dan hargaModal
      if (!data.hasOwnProperty("keuntungan") && data.Harga && data.HargaModal) {
        data.Keuntungan =
          parseFloat(data.HargaModal) - parseFloat(data.HargaModal);
      }

      const Produk = await produk.create(data);
      return new produkDto(Produk);
    } catch (error) {
      throw new Error("Gagal membuat produk baru: " + error.message);
    }
  }

  async getCount() {
    try {
      const count = await produk.count();
      return count;
    } catch (error) {
      throw new Error("Gagal membuat produk baru: " + error.message);
    }
  }

  async getInventaris() {
    try {
      const inventaris = await produk.findOne({
        attributes: [
          // Alias "totalProduk" ditambahkan pada hasil SUM
          [
            Sequelize.fn("SUM", Sequelize.literal(`"Harga" * "Stok"`)),
            "totalProduk",
          ],
        ],
        // Opsional: gunakan raw true agar hasil query berbentuk object biasa
        raw: true,
      });

      const totalProduk = parseFloat(inventaris.totalProduk) || 0;
      return totalProduk;
    } catch (error) {
      throw new Error("Gagal menghitung total inventaris: " + error.message);
    }
  }

  // Method untuk mengambil semua produk
  async getAll() {
    try {
      const prods = await produk.findAll();
      return prods.map((prod) => {
        // Ubah data dari instance model menjadi objek JavaScript
        const prodData = prod.toJSON();

        // Jika ingin menghitung ulang hargaAkhir (jika belum otomatis dari field virtual)
        const harga = parseFloat(prodData.Harga);
        const diskon = parseFloat(prodData.Diskon) || 0;
        prodData.HargaAkhir = harga - (harga * diskon) / 100;

        // Jika field keuntungan belum dihitung (misalnya jika tidak didefinisikan sebagai virtual)
        if (!prodData.hasOwnProperty("keuntungan") && prodData.HargaModal) {
          prodData.keuntungan = harga - parseFloat(prodData.HargaModal);
        }
        return new produkDto(prodData);
      });
    } catch (error) {
      throw new Error("Gagal mengambil semua data produk: " + error.message);
    }
  }

  // Method untuk mencari produk berdasarkan nama
  async getSearch(NamaProduk) {
    try {
      const Produk = await produk.findAll({
        where: {
          NamaProduk: {
            [Op.like]: `%${NamaProduk}%`,
          },
        },
      });
      return Produk.map((prod) => new produkDto(prod));
    } catch (error) {
      throw new Error("Gagal: " + error.message);
    }
  }


  // Method untuk mengambil produk berdasarkan kategori
  async getByKategori(kategoriID) {
    try {
      const Produk = await produk.findAll({
        where: { kategoriID },
      });
      return Produk.map((prod) => new produkDto(prod));
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  }

  // Method untuk mengurutkan produk berdasarkan harga secara ascending
  async getHarga() {
    try {
      const harga = await produk.findAll({
        order: [["Harga", "ASC"]],
      });
      return harga.map((har) => new produkDto(har));
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  }

  // Method untuk mengurutkan produk berdasarkan harga secara descending
  async getHargaTinggi() {
    try {
      const harga = await produk.findAll({
        order: [["Harga", "DESC"]],
      });
      return harga.map((har) => new produkDto(har));
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  }

  // Method untuk mengurutkan produk berdasarkan stok secara descending
  async getStokTinggi() {
    try {
      const stok = await produk.findAll({
        order: [["Stok", "DESC"]],
      });
      return stok.map((s) => new produkDto(s));
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  }

  // Method untuk mengurutkan produk berdasarkan stok secara ascending
  async getStokRendah() {
    try {
      const stok = await produk.findAll({
        order: [["Stok", "ASC"]],
      });
      return stok.map((s) => new produkDto(s));
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  }

  // Method untuk mengambil produk berdasarkan ID
  async getById(produkID) {
    try {
      const prod = await produk.findByPk(produkID);
      if (!prod) {
        throw new Error("Produk tidak ditemukan");
      }
      return new produkDto(prod);
    } catch (error) {
      throw new Error("Gagal mengambil data berdasarkan ID: " + error.message);
    }
  }

  // Method untuk memperbarui produk
  async update(produkID, data) {
    try {
      const prod = await produk.findByPk(produkID);
      if (!prod) {
        throw new Error("Produk tidak ditemukan");
      }
      // Jika ada perubahan Harga atau hargaModal, hitung ulang keuntungan
      if (
        (data.Harga || data.hargaModal) &&
        (data.Harga !== undefined || data.hargaModal !== undefined)
      ) {
        const harga = data.Harga
          ? parseFloat(data.Harga)
          : parseFloat(prod.Harga);
        const hargaModal = data.hargaModal
          ? parseFloat(data.hargaModal)
          : parseFloat(prod.hargaModal);
        data.keuntungan = harga - hargaModal;
      }
      await prod.update(data);
      return new produkDto(prod);
    } catch (error) {
      throw new Error("Gagal memperbarui data produk: " + error.message);
    }
  }

  // Method untuk menghapus produk
  async delete(ProdukID) {
    try {
      const prod = await produk.findByPk(ProdukID);
      if (!prod) {
        throw new Error("Produk tidak ditemukan");
      }
      await prod.destroy();
      return new produkDto(prod);
    } catch (error) {
      throw new Error("Gagal menghapus data produk: " + error.message);
    }
  }
}

module.exports = new produkRepository();
