const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class ReactionTypeService {
    constructor(reactionTypeRepository) {
        this.reactionTypeRepository = reactionTypeRepository;
    }
    createReactionType(description) {
        return this.reactionTypeRepository.create(description);
    };
    getAllReactionsType() {
        return this.reactionTypeRepository.getAll();
    };
    async deleteReactionType(reactionTypeId) {
        const reactionsType = await this.reactionTypeRepository.getById(reactionTypeId);
        if (!reactionsType) throw new ApiError(httpStatus.NOT_FOUND, 'Reaction type not found');
        await this.reactionTypeRepository.delete(reactionTypeId);
    };
}

module.exports = ReactionTypeService;
