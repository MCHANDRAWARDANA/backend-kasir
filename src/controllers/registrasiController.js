const express = require("express");
const router = express.Router();
const registrasiRepository = require("../repository/registrasiRepository");
const defaultBaseResponse = require("../common/baseResponse/defaultBaseResponse");
const { StatusCodes } = require("http-status-codes");

class RegistrasiControllers {
  async create(req, res) {
    try {
      const produk = await registrasiRepository.create(req.body);
      console.log("Data yang diterima: ", produk);
      return res
        .status(StatusCodes.CREATED)
        .json(
          defaultBaseResponse(
            StatusCodes.CREATED,
            true,
            "Berhasil menambahkanakun registrasi baru",
            produk
          )
        );
    } catch (error) {
      console.log(`error saat menambahkan akun registrasi baru`, error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "Terjadi kesalahan saat menambahkanakun registrasi baru"
          )
        );
    }
  }

  async getAll(req, res) {
    try {
      const produk = await registrasiRepository.getAll();
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
      const produk = await registrasiRepository.getById(req.params.id);
      if (!produk) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(
            defaultBaseResponse(
              StatusCodes.NOT_FOUND,
              false,
              "Registrasi akun tidak ditemukan"
            )
          );
      }
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(
            StatusCodes.OK,
            true,
            "Berhasil mengambil Akun berdasarkan ID",
            produk
          )
        );
    } catch (error) {
      console.log("error bro saat mengambil data Registrasi berdasarkan ID", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "terjadi kesalahan saat mengambil Registrasi berdasarkan ID"
          )
        );
    }
  }

  
  async update(req, res) {
    try {
      const produk = await registrasiRepository.update(req.params.id, req.body);
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(
            StatusCodes.OK,
            true,
            "Berhasil memperbarui akun Registrasi baru",
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
            "Terjadi kesalahan saat memperbaharui akun registrasi baru"
          )
        );
    }
  }

  async delete(req, res) {
    try {
      const deletes = await registrasiRepository.delete(req.params.id);
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

const registrasiControllers = new RegistrasiControllers();

router.post("/", registrasiControllers.create.bind(registrasiControllers));
router.get("/", registrasiControllers.getAll.bind(registrasiControllers));
router.get("/:id", registrasiControllers.getById.bind(registrasiControllers));
router.put("/:id", registrasiControllers.update.bind(registrasiControllers));
router.delete("/:id", registrasiControllers.delete.bind(registrasiControllers));

module.exports = router;
