const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class FileTypeService {
    constructor(fileTypeRepository) {
        this.fileTypeRepository = fileTypeRepository;
    }
    async createFileType(type) {
        return this.fileTypeRepository.create(type)
    };
    async getById(id){
        const fileType = await this.fileTypeRepository.getById(id);
        if (!fileType) throw new ApiError(httpStatus.NOT_FOUND, 'File type not found!');
        return fileType;
    }
    async getAllFileType() {
        return this.fileTypeRepository.getAll();
    };
    async deleteFileType(id) {
        await this.getById(id);
        await this.fileTypeRepository.delete(id);
    };
}

module.exports = FileTypeService;
