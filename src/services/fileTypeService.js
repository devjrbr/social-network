const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class FileTypeService {
    constructor(fileTypeRepository) {
        this.fileTypeRepository = fileTypeRepository;
    };
    createFileType(newFileType) {
        return this.fileTypeRepository.create(newFileType)
    };
    async getById(fileTypeId){
        const fileType = await this.fileTypeRepository.getById(fileTypeId);
        if (!fileType) throw new ApiError(httpStatus.NOT_FOUND, 'File type not found!');
        return fileType;
    }
    getAllFileType() {
        return this.fileTypeRepository.getAll();
    };
    async deleteFileType(fileTypeId) {
        const fileType = await this.fileTypeRepository.getById(fileTypeId);
        if (!fileType) throw new ApiError(httpStatus.NOT_FOUND, 'File type not found!');
        await this.fileTypeRepository.delete(fileTypeId);
    };
}

module.exports = FileTypeService;
