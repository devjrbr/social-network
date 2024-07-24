const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class TargetPublicService {
    constructor(targetPublicRepository) {
        this.targetPublicRepository = targetPublicRepository;
    };
    createTargetPublic(newTargetPublicType) {
        return this.targetPublicRepository.create(newTargetPublicType);
    };
    getAllTargetPublic() {
        return this.targetPublicRepository.getAll();
    };
    async getById(targetPublicId){
        const targetPublic = await this.targetPublicRepository.getById(targetPublicId);
        if (!targetPublic) throw new ApiError(httpStatus.NOT_FOUND, 'Target public not found.');
        return targetPublic;
    };
    async deleteTargetPublic(targetPublicId) {
        const targetPublic = await this.targetPublicRepository.getById(targetPublicId);
        if (!targetPublic) throw new ApiError(httpStatus.NOT_FOUND, 'Target public not found.');
        await this.targetPublicRepository.delete(targetPublicId);
    };
}

module.exports = TargetPublicService;
