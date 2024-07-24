const httpStatus = require('../utils/statusCodes');

class TargetPublicController {
    constructor(targetPublicService, tokenService) {
        this.targetPublicService = targetPublicService;
        this.tokenService = tokenService;
    }
    async createTargetPublic(req, res) {
        const { type } = req.body;
        const targetPublic = await this.targetPublicService.createTargetPublic(type);
        return res.status(httpStatus.CREATED).json({
            message: 'Target public created successfully!',
            data: targetPublic
        });
    }
    async getTargetPublic(req, res) {
        const targetPublic = await this.targetPublicService.getAllTargetPublic();
        return res.status(httpStatus.OK).json(targetPublic);
    }
    async deleteTargetPublic(req, res) {
        const { id } = req.params; 
        await this.targetPublicService.deleteTargetPublic(id);
        return res.status(httpStatus.OK).json({
            details: "Target public deleted successfully"
        });
    }
}

module.exports = TargetPublicController;
