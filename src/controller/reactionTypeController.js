const httpStatus = require('../utils/statusCodes');

class ReactionTypeController {
    constructor (reactionTypeService, tokenService) {
        this.reactionTypeService = reactionTypeService;
        this.tokenService = tokenService;
    }
    async createReactionType(req, res) {
        const { description } = req.body;
        const reactionType = await this.reactionTypeService.createReactionType(description);
        return res.status(httpStatus.CREATED).json({
            message: 'Reaction type created successfully!',
            data: reactionType
        });
    }
    async getReactionsType(req, res) {

        const reactionsType = await this.reactionTypeService.getAllReactionsType();
        return res.status(httpStatus.OK).json(reactionsType);
    }
    async deleteReactionType(req, res) {
        const { id } = req.params;
        await this.reactionTypeService.deleteReactionType(id);
        return res.status(httpStatus.OK).json({
            details: "Reaction type deleted successfully"
        });
    }
}

module.exports = ReactionTypeController;
