const express = require("express");
const router = express.Router();
const detailpenjualanRepository = require("../repository/detailpenjualanRepository");
const defaultBaseResponse = require("../common/baseResponse/defaultBaseResponse");
const { StatusCodes } = require("http-status-codes");

class DetailpenjualanController {
  async create(req, res) {
    try {
      const detailpenjualan = await detailpenjualanRepository.create(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(
          defaultBaseResponse(
            StatusCodes.CREATED,
            true,
            "Berhasil menambahkan detailpenjualan baru",
            detailpenjualan
          )
        );
    } catch (error) {
      console.log(`error saat menambahkan detailpenjualan new`, error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "Terjadi kesalahan saat menambahkan detailpenjualan baru"
          )
        );
    }
  }

  async getAll(req, res) {
    try {
      const detailpenjualan = await detailpenjualanRepository.getAll();
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(
            StatusCodes.OK,
            true,
            "Berhasil mengambil Data detailpenjualan",
            detailpenjualan
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
      const detailpenjualan = await detailpenjualanRepository.getById(req.params.id);
      if (!detailpenjualan) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(
            defaultBaseResponse(
              StatusCodes.NOT_FOUND,
              false,
              "detailpenjualan tidak di temukan"
            )
          );
      }
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(
            StatusCodes.OK,
            true,
            "Berhasil mengambil data detailpenjualan berdasarkan ID",
            detailpenjualan
          )
        );
    } catch (error) {
      console.log(
        "error bro saat mengambil data detailpenjualan berdasarkan ID",
        error
      );
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "terjadi kesalahan saat mengambil data detailpenjualan berdasarkan ID"
          )
        );
    }
  }

  async update(req, res) {
    try {
      const detailpenjualan = await detailpenjualanRepository.update(
        req.params.id,
        req.body
      );
      return res
        .status(StatusCodes.OK)
        .json(
          defaultBaseResponse(
            StatusCodes.OK,
            true,
            "Berhasil memperbarui data detailpenjualan",
            detailpenjualan
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
            "Terjadi kesalahan saat memperbaharui data detailpenjualan"
          )
        );
    }
  }

  async delete(req, res) {
    try {
      const deletes = await detailpenjualanRepository.delete(req.params.id);
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

const detailpenjualanController = new DetailpenjualanController();

router.post("/", detailpenjualanController.create.bind(detailpenjualanController));
router.get("/", detailpenjualanController.getAll.bind(detailpenjualanController));
router.get("/:id", detailpenjualanController.getById.bind(detailpenjualanController));
router.put("/:id", detailpenjualanController.update.bind(detailpenjualanController));
router.delete("/:id", detailpenjualanController.delete.bind(detailpenjualanController));

module.exports = router;
