const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class TargetPublicService {
    constructor(targetPublicRepository) {
        this.targetPublicRepository = targetPublicRepository;
    }
    async createTargetPublic(type) {
        return this.targetPublicRepository.create(type);
    };
    async getAllTargetPublic() {
        return this.targetPublicRepository.getAll();
    };
    async getById(id){
        const targetPublic = await this.targetPublicRepository.getById(id);
        if (!targetPublic) throw new ApiError(httpStatus.NOT_FOUND, 'Target public not found.');
        return targetPublic;
    };
    async deleteTargetPublic(id) {
        await this.getById(id);
        await this.targetPublicRepository.delete(id);
    };
}

module.exports = TargetPublicService;
