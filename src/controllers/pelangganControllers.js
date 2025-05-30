const express = require ('express')
const router = express.Router()
const pelangganRepository = require('../repository/pelangganRepository')
const defaultBaseResponse = require('../common/baseResponse/defaultBaseResponse')
const { StatusCodes } = require('http-status-codes') 

class PelangganController {
    async create(req, res) {
        try {
            const pelanggan= await pelangganRepository.create(req.body)
            return res
            .status(StatusCodes.CREATED)
            .json(defaultBaseResponse(StatusCodes.CREATED,true,'Berhasil menambahkan pelanggan baru', pelanggan))
        } catch (error) {
            console.log(`error saat menambahkan pelanggan new`, error);
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR,false,'Terjadi kesalahan saat menambahkan pelanggan baru'))
        }
    }

    async getAll(req, res) {
        try {
            const pelanggan= await pelangganRepository.getAll()
            return res
            .status(StatusCodes.OK)
            .json(defaultBaseResponse(StatusCodes.OK,true,'Berhasil mengambil Data Pelanggan',pelanggan))
        } catch (error) {
            console.log('error saat mengambil semua data',error);
            return res 
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR,false,'terjadi kesalahan saat menjadi semua data'))
        }
    }

    async getById(req, res){
        try {
            const pelanggan = await pelangganRepository.getById(req.params.id)
            if (!pelanggan){
                return res 
                .status(StatusCodes.NOT_FOUND)
                .json(defaultBaseResponse(StatusCodes.NOT_FOUND,false,'pelanggan tidak di temukan'))
            }
            return res 
            .status(StatusCodes.OK)
            .json(defaultBaseResponse(StatusCodes.OK,true,'Berhasil mengambil data pelanggan berdasarkan ID',pelanggan))
        } catch (error) {
            console.log("error bro saat mengambil data pelanggan berdasarkan ID", error);
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR,false,'terjadi kesalahan saat mengambil data pelanggan berdasarkan ID'))
        }
    }

    async update(req, res) {
        try {
            const pelanggan = await pelangganRepository.update(req.params.id,req.body)
            return res
            .status(StatusCodes.OK)
            .json(defaultBaseResponse(StatusCodes.OK,true,'Berhasil memperbarui data pelanggan',pelanggan))
        } catch (error) {
            console.log('error saat memperbaharui data',error);
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR,false,"Terjadi kesalahan saat memperbaharui data pelanggan"))
        }
    }

    async delete(req, res) {
        try {
            const deletes = await pelangganRepository.delete(req.params.id)
            return res 
            .status(StatusCodes.OK)
            .json(defaultBaseResponse(StatusCodes.OK,true,'Berhasil menghapus data',deletes))
        } catch (error) {
            console.log("error saat menghapus data", error);
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(defaultBaseResponse(StatusCodes.INTERNAL_SERVER_ERROR,false,"terjadi kesalahan saat menghapus data"))
        }
    }
}

const pelangganController = new PelangganController()

router.post('/', pelangganController.create.bind(pelangganController))
router.get('/',pelangganController.getAll.bind(pelangganController))
router.get('/:id', pelangganController.getById.bind(pelangganController))
router.put('/:id',pelangganController.update.bind(pelangganController))
router.delete('/:id', pelangganController.delete.bind(pelangganController))

module.exports = router;