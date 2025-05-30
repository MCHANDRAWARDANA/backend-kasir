const express = require("express");
const router = express.Router();
const kategoriRepository = require("../repository/kategoriRepository");
const defaultBaseResponse = require("../common/baseResponse/defaultBaseResponse");
const { StatusCodes } = require("http-status-codes");

class PelangganController {
  async create(req, res) {
    try {
      const pelanggan = await kategoriRepository.create(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(
          defaultBaseResponse(
            StatusCodes.CREATED,
            true,
            "Berhasil menambahkan pelanggan baru",
            pelanggan
          )
        );
    } catch (error) {
      console.log(`error saat menambahkan pelanggan new`, error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "Terjadi kesalahan saat menambahkan pelanggan baru"
          )
        );
    }
  }

  async getAll(req, res) {
    try {
      const pelanggan = await kategoriRepository.getAll();
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(
            StatusCodes.OK,
            true,
            "Berhasil mengambil Data Pelanggan",
            pelanggan
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
      const pelanggan = await kategoriRepository.getById(req.params.id);
      if (!pelanggan) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(
            defaultBaseResponse(
              StatusCodes.NOT_FOUND,
              false,
              "pelanggan tidak di temukan"
            )
          );
      }
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(
            StatusCodes.OK,
            true,
            "Berhasil mengambil data pelanggan berdasarkan ID",
            pelanggan
          )
        );
    } catch (error) {
      console.log(
        "error bro saat mengambil data pelanggan berdasarkan ID",
        error
      );
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "terjadi kesalahan saat mengambil data pelanggan berdasarkan ID"
          )
        );
    }
  }

  async update(req, res) {
    try {
      const pelanggan = await kategoriRepository.update(
        req.params.id,
        req.body
      );
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(
            StatusCodes.OK,
            true,
            "Berhasil memperbarui data pelanggan",
            pelanggan
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
            "Terjadi kesalahan saat memperbaharui data pelanggan"
          )
        );
    }
  }

  async delete(req, res) {
    try {
      const deletes = await kategoriRepository.delete(req.params.id);
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

const kategoriController = new PelangganController();

router.post("/", kategoriController.create.bind(kategoriController));
router.get("/", kategoriController.getAll.bind(kategoriController));
router.get("/:id", kategoriController.getById.bind(kategoriController));
router.put("/:id", kategoriController.update.bind(kategoriController));
router.delete("/:id", kategoriController.delete.bind(kategoriController));

module.exports = router;
