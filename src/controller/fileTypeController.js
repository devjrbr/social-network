const httpStatus = require('../utils/statusCodes');

class FileTypeController {
    constructor(fileTypeService) {
        this.fileTypeService = fileTypeService;
    }
    async createFileType(req, res) {
        const { type } = req.body;
        const fileType = await this.fileTypeService.createFileType(type);
        return res.status(httpStatus.CREATED).json({
            message: 'File type created successfully!',
            data: fileType
        });
    }
    async getFileTypes(req, res) {
        const fileType = await this.fileTypeService.getAllFileType();
        return res.status(httpStatus.OK).json(fileType);
    }
    async deleteFileType(req, res) {
        const { id } = req.params;
        await this.fileTypeService.deleteFileType(id);
        return res.status(httpStatus.OK).json({
            details: "File type deleted successfully"
        });
    }
}

module.exports = FileTypeController;
