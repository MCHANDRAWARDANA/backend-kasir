const express = require("express")
const router = express.Router()
const PenjualanRepository = require("../repository/PenjualanRepository")
const defaultBaseResponse = require("../common/baseResponse/defaultBaseResponse")
const { StatusCodes } = require("http-status-codes")

class PenjualanController {
    async create(req, res) {
        try {
            const penjualan = await PenjualanRepository.create(req.body);
            return res
            .status(StatusCodes.CREATED)
            .json(defaultBaseResponse(StatusCodes.CREATED, true, "Berhasil membuat data penjualan baru", penjualan))
        } catch (error) {
            console.log("Error membuat penjualan baru: ", error);
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Terjadi kesalahan saat membuat penjualan baru"))
        }
    }

    async getAll(req, res) {
        try {
            const penjualan = await PenjualanRepository.getAll()
            return res
            .status(StatusCodes.OK)
            .json(defaultBaseResponse(StatusCodes.OK, true, "Berhasil mengambil semua data penjualan", penjualan))
        } catch (error) {
            console.log("Error mengambil semua data penjualan: ", error);
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Terjadi kesalahan saat mengambil semua data penjualan"))
        }
    }

    async getByID(req, res) {
        try {
            const penjualan = await PenjualanRepository.getByID(req.params.id);
            return res
            .status(StatusCodes.OK)
            .json(defaultBaseResponse(StatusCodes.OK, true, "Berhasil mengambil penjualan berdasarkan ID", penjualan))
        } catch (error) {
            console.log("Error mengambil data penjualan berdasarkan ID", error);
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Terjadi kesalahan saat mengambil data penjualan"))
        }
    }

    async update(req, res) {
        try {
            const penjualan = await PenjualanRepository.update(req.params.id, req.body);
            return res
            .status(StatusCodes.OK)
            .json(defaultBaseResponse(StatusCodes.OK, true, "Berhasil memperbarui data", penjualan))
        } catch (error) {
            console.log("Error memperbarui data: ", error);
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Terjadi kesalahan saat memperbarui data"))
        }
    }

    async delete(req, res) {
        try {
            const penjualan = await PenjualanRepository.delete(req.params.id);
            return res
            .status(StatusCodes.OK)
            .json(defaultBaseResponse(StatusCodes.OK, true, "Berhasil menghapus data", penjualan))
        } catch (error) {
            console.log("error menghapus data: ", error);
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Terjadi kesalahan saat menghapus data"))
        }
    }
}

const penjualanController = new PenjualanController();

router.post("/", penjualanController.create.bind(penjualanController))
router.get("/", penjualanController.getAll.bind(penjualanController))
router.get("/:id", penjualanController.getByID.bind(penjualanController))
router.put("/:id", penjualanController.update.bind(penjualanController))
router.delete("/:id", penjualanController.delete.bind(penjualanController));

module.exports = router;