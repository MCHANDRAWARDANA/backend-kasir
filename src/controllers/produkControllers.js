const express = require("express");
const router = express.Router();
const produkRepository = require("../repository/produkRepository");
const defaultBaseResponse = require("../common/baseResponse/defaultBaseResponse");
const { StatusCodes } = require("http-status-codes");
const upload = require("../middleware/multerConfig");

class ProdukController {
  async create(req, res) {
    try {
      const {
        NamaProduk,
        Harga,
        Stok,
        Diskon,
        kategoriID,
        HargaModal,
        Keuntungan,
        Count,
      } = req.body;
      const Foto = req.file ? req.file.filename : null;
      const produk = await produkRepository.create({
        NamaProduk,
        Harga,
        Stok,
        Diskon,
        kategoriID,
        Foto,
        HargaModal,
        Keuntungan,
        Count,
      });
      console.log("Data yang diterima: ", produk);
      return res
        .status(StatusCodes.CREATED)
        .json(
          defaultBaseResponse(
            StatusCodes.CREATED,
            true,
            "Berhasil menambahkan produk baru",
            produk
          )
        );
    } catch (error) {
      console.log(`error saat menambahkan produk new`, error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "Terjadi kesalahan saat menambahkan produk baru"
          )
        );
    }
  }

  async getInventaris(req, res) {
    try {
      const inventaris = await produkRepository.getInventaris();
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(StatusCodes.OK, true, "Berhasil", inventaris)
        );
    } catch (error) {
      console.log("Error: ", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "terjadi kesalahan saat memuat semua data"
          )
        );
    }
  }

  async getAll(req, res) {
    try {
      const produk = await produkRepository.getAll();
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(
            StatusCodes.OK,
            true,
            "Berhasil mengambil Data produk",
            produk
          )
        );
    } catch (error) {
      console.log("error saat mengambil semua data", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "terjadi kesalahan saat menjadi semua data"
          )
        );
    }
  }

  async getById(req, res) {
    try {
      const produk = await produkRepository.getById(req.params.id);
      if (!produk) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(
            defaultBaseResponse(
              StatusCodes.NOT_FOUND,
              false,
              "produk tidak di temukan"
            )
          );
      }
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(
            StatusCodes.OK,
            true,
            "Berhasil mengambil data produk berdasarkan ID",
            produk
          )
        );
    } catch (error) {
      console.log("error bro saat mengambil data produk berdasarkan ID", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "terjadi kesalahan saat mengambil data produk berdasarkan ID"
          )
        );
    }
  }

  async update(req, res) {
    try {
      const produk = await produkRepository.update(req.params.id, req.body);
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(
            StatusCodes.OK,
            true,
            "Berhasil memperbarui data produk",
            produk
          )
        );
    } catch (error) {
      console.log("error saat memperbaharui data", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "Terjadi kesalahan saat memperbaharui data produk"
          )
        );
    }
  }

  async getSearch(req, res) {
    try {
      const { NamaProduk } = req.query;
      const Produk = await produkRepository.getSearch(NamaProduk);
      return res
        .status(StatusCodes.OK)
        .json(defaultBaseResponse(StatusCodes.OK, true, "Berhasil", Produk));
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "error")
        );
    }
  }

  async getByKategori(req, res) {
    const kategoriID = req.params.kategoriID;
    try {
      const Kategori = await produkRepository.getByKategori(kategoriID);
      return res
        .status(StatusCodes.OK)
        .json(defaultBaseResponse(StatusCodes.OK, true, "Berhasil", Kategori));
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "error")
        );
    }
  }

  async getHargaRendah(req, res) {
    try {
      const harga = await produkRepository.getHarga();
      return res
        .status(StatusCodes.OK)
        .json(defaultBaseResponse(StatusCodes.OK, true, "Berhasil", harga));
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "error")
        );
    }
  }

  async getHargaTinggi(req, res) {
    try {
      const harga = await produkRepository.getHargaTinggi();
      return res
        .status(StatusCodes.OK)
        .json(defaultBaseResponse(StatusCodes.OK, true, "Berhasil", harga));
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "error")
        );
    }
  }

  async getStokTinggi(req, res) {
    try {
      const stok = await produkRepository.getStokTinggi();
      return res
        .status(StatusCodes.OK)
        .json(defaultBaseResponse(StatusCodes.OK, true, "Berhasil", stok));
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "error")
        );
    }
  }

  async getStokRendah(req, res) {
    try {
      const stok = await produkRepository.getStokRendah();
      return res
        .status(StatusCodes.OK)
        .json(defaultBaseResponse(StatusCodes.OK, true, "Berhasil", stok));
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "error")
        );
    }
  }

  async getCount(req, res) {
    try {
      const stok = await produkRepository.getCount();
      return res
        .status(StatusCodes.OK)
        .json(defaultBaseResponse(StatusCodes.OK, true, "Berhasil", stok));
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "error")
        );
    }
  }

  async delete(req, res) {
    try {
      const deletes = await produkRepository.delete(req.params.ProdukID);
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(
            StatusCodes.OK,
            true,
            "Berhasil menghapus data",
            deletes
          )
        );
    } catch (error) {
      console.log("error saat menghapus data", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "terjadi kesalahan saat menghapus data"
          )
        );
    }
  }
}

const produkController = new ProdukController();

router.post(
  "/",
  upload.single("Foto"),
  produkController.create.bind(produkController)
);
router.get("/kategori/:kategoriID",produkController.getByKategori.bind(produkController)
);
router.get("/search", produkController.getSearch.bind(produkController));
router.get("/harga/terendah",produkController.getHargaRendah.bind(produkController)
);
router.get("/harga/tertinggi",produkController.getHargaTinggi.bind(produkController)
);
router.get("/stok/tertinggi", produkController.getStokTinggi.bind(produkController)
);
router.get("/stok/terendah", produkController.getStokRendah.bind(produkController)
);
router.get("/count", produkController.getCount.bind(produkController));
router.get("/inventaris", produkController.getInventaris.bind(produkController))
router.get("/", produkController.getAll.bind(produkController));
router.get("/:id", produkController.getById.bind(produkController));
router.put("/:id", produkController.update.bind(produkController));
router.delete("/:ProdukID", produkController.delete.bind(produkController));

module.exports = router;
